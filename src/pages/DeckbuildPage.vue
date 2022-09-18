<template>
  <div class="deck_builder_page">
    <!-- Зона кнопок - новая, карты\лидеры, открыть фильтры -->
    <deckbuilder-top-buttons-block
      @reset="cancelDeckBuilding"
      @filter_factions="filter_factions"
      @trigger_show_list="trigger_show_list"
      :empty_filters="empty_filters"
      :deckBuilding="deckBuilding"
    />
    <!-- Зона базы карт: или показывать карты, или лидеров -->
    <div class="deck-builder-body">
      <div class="database_of_cards"
        :class="deckBuilding ? 'pool_deckbuild' : 'pool_full'">
        <!-- база карт -->
        <cards-list
          v-show="showingList === 'pool'"
          :cards="pool"
          :hp_needed="true"
          :deckbuilder="true"
          @chose_player_card="append_into_deck_in_progress"
        />
        <!-- список всех лидеров из базы -->
        <cards-list
          v-show="showingList === 'leaders'"
          :cards="leaders"
          :for_leaders="true"
          :deckbuilder="true"
          @chose_player_card="chose_leader"
        />
        </div>
      <!-- Зона сбора колоды -->
      <block-assembling-the-deck 
        v-show="deckBuilding"
        :patch="patch"
        :deck="deck"
        :cant_save_deck="cant_save_deck"
        @delete_card="delete_card_from_deck"
        @save_deck="save_deck"
        @patch_deck="patch_deck"
      />
    </div>
    <div class="deckbuilder-bottom-buttons-block">
      <div class="decks_btn" @click="trigger_decks_list_modal(true)">КОЛОДЫ!</div>
      <decks-list-modal
        v-if="show_decks_list_modal"
        @close_decks_list_modal="trigger_decks_list_modal(false)"
        @change_deck="show_deck"
      />
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import CardsList from "@/components/CardsList"
import DecksListModal from "@/components/ModalWindows/DecksListModal"
import DeckbuilderTopButtonsBlock from "@/components/Pages/DeckbuildPage/DeckbuilderTopButtonsBlock"
import BlockAssemblingTheDeck from '@/components/Pages/DeckbuildPage/BlockAssemblingTheDeck'

export default {
  components: {
      DecksListModal,
      CardsList,
      DeckbuilderTopButtonsBlock,
      BlockAssemblingTheDeck
    },
  // mixins: [filtering],
  data() {
    return {
      showingList: 'pool', // показывать список игровых карт ('pool') или список лидеров ('leaders')
      deckBuilding: false, // флаг - собираем мы колоду, или нет
      showFilters: false, // флаг, показать ли окно с фильтрами
      show_decks_list_modal: false, // показать окно с колодами
      patch: true,
      deck: {
        deck_id: null,
        deck_name: "",
        deck_is_progress: [], // колода в процессе - целиком объекты, для отображения
        deck_body: [], // только {card: id} для пост-запроса
        leader: null, // сам выбранный лидер
        health: 0, // жизни текущей деки
      },
      query: {
        faction: "",
        type: "",
        color: "",
        has_passive: null,
        count: null,
      },
    }
  },

  methods: {
    // триггеры показа дополнительных окон
    startDeckBuilding() {
      this.showNewDeckFactionSelect = true
    },
    
    trigger_decks_list_modal(value) {
      this.show_decks_list_modal = value
    },

    cancelDeckBuilding() {
      this.deckBuilding = false
      this.new_deck()
    },

    // новая дека, обнуляем фильтры и сбрасываем все добавления
    new_deck() {
      // сброс фильтров
      this.query = this.default_query_param()
      this.deck = this.resetDeck()
    },

    default_query_param() {
      return {
        faction: "",
        type: "",
        color: "",
        has_passive: null,
        count: null,
      }
    },
    
    resetDeck() {
      return {
        deck_id: null, 
        deck_name: "",
        deck_is_progress: [], 
        deck_body: [], 
        leader: null,
        health: 0,
      }
    },

    // добавляем карты в колоду из базы карт
    append_into_deck_in_progress(card) {
      if (this.can_add_card(card)) {
        this.deck.deck_is_progress.push(card)
        this.deck.deck_body.push({ card: card.card.id })
        this.deck.health += card.card.hp
      }
      alert("нельзя карту добавить закрытую карту, или карту ещё раз или карт больше 12")
    },

    // удалить из деки в процессе по нажатию дважды ЛКМ
    delete_from_deck_in_progress(card) {
      this.deck.health -= card.card.hp
      this.deck.deck_is_progress.splice(this.deck.deck_is_progress.indexOf(card), 1)
      this.deck.deck_body.splice(
        this.deck.deck_body.findIndex(c => c.card === card.card.id),
        1
      )
    },

    // выбираем лидера для деки
    chose_leader(leader) {
      if (!this.query.faction) {
        alert("выберете фракцию!")
        return
      }
      if (leader.count === 0) {
        alert("нельзя выбрать закрытого лидера")
        return
      }
      this.deck.leader = leader.card
    },

    async save_deck() {
      // карт ровно 12 и лидер выбран
      if (this.cant_save_deck || !this.deck.deck_name) {
        return alert("Введите имя колоды")
      }
      this.send_data_to_store("post_deck", {
            name: this.deck.deck_name,
            health: this.deck.health,
            d: this.deck.deck_body,
            leader_id: this.deck.leader.id,
          })
    },

    can_add_card(card) {
      return (
        !this.deck.deck_is_progress.filter(c => c.card.id === card.card.id).length &&
        card.count !== 0 &&
        this.deck.deck_is_progress.length < this.$store.state.game.cards_in_deck && this.query.faction
      )
    },
    // фильтр карт и лидеров по фракции по нажатию на кнопку фракции
    filter_factions(emit) {
      this.deckBuilding = true
      this.query.faction = emit // для this.query.cards
    },

    show_deck(index) {
      this.new_deck();
      this.deckBuilding = true
      debugger;
      const { deck } = _.cloneDeep(this.$store.getters["all_decks"][index])
      this.deck = {
        deck_id: deck.id,
        deck_name: deck.name,
        deck_is_progress: [...deck.cards], // колода в процессе - целиком объекты, для отображения
        deck_body: [...deck.d], // только {card: id} для пост-запроса
        leader: deck.leader, // сам выбранный лидер
        health: deck.health, // жизни текущей деки
      },
      this.query.faction = deck.leader.faction
      this.patch = true
    },
    
    async patch_deck() {
      this.send_data_to_store("patch_deck", {
        name: this.deck_name,
        health: this.health,
        d: this.deck_body,
        leader_id: this.leader.id,
        id: this.deck_id,
      })
    },

    async send_data_to_store(dispatch_name, body) {
      try {
        await this.$store.dispatch(dispatch_name, body)
        this.new_deck() // всё обнуляем!
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    cancelFilters() {
      // в режиме сбора колоды - сбрасываем все фильтры КРОМЕ фракций, иначе - вообще все фильтры
      if (!this.deckBuilding) {
        this.query = this.default_query_param()
        return
      }
    },
    
    trigger_show_list(value) {
      this.showingList = value
    }
  },

  computed: {
    pool() {
      return this.$store.getters.filtered_cards(this.query, this.count)
    },
    leaders() {
      return this.$store.getters.filtered_leaders(this.query.faction)
    },
    cant_save_deck() {
      const required_count_person = this.$store.state.game.cards_in_deck;
      return this.deck.deck_is_progress.length !== required_count_person || !this.deck.leader
    },
    empty_filters() {
      return _.isEqual(this.default_query_param(), this.query);
    },
  }
}
</script>

<style scoped>
span {
  color: white;
}

.database_of_cards {
  overflow-y: scroll;
}

/*база карт*/

.pool_full {
  height: 70vh;
  /*border: solid 1px black;*/
}

.pool_deckbuild {
  height: 50vh;
  border: solid 1px black;
}

/*кнопка КОЛОДЫ*/
.decks_btn {
  height: 3vh;
  width: 100%;
  border: solid 2px green;
  text-align: center;
  background: red;
  position: absolute;
  bottom: 7vh;
}
</style>
