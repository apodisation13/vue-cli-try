<template>
  <div class="deck_builder_page-wrapper">
    <div class="deck_builder_page">
      <!-- Зона кнопок - новая, карты\лидеры, открыть фильтры -->
      <deckbuilder-top-buttons-block
        :deckBuilding="deckBuilding"
        :showingList="showingList"
        :empty_filters="empty_filters"
        @reset="cancelDeckBuilding"
        @select_faction="select_faction"
        @trigger_show_list="trigger_show_list"
        @open-filters="showFilters = true"
      />
      <!-- Зона базы карт: или показывать карты, или лидеров -->
      <div class="deck-builder-body">
        <div class="database_of_cards-wrapper">
          <div
            class="database_of_cards"
            :class="deckBuilding ? 'pool_deckbuild' : 'pool_full'"
          >
            <!-- база карт -->
            <card-list-component
              v-show="showingList === 'pool'"
              :cards="pool"
              :hp_needed="true"
              :deckbuilder="true"
              @chose_player_card="append_into_deck_in_progress"
            />
            <!-- список всех лидеров из базы -->
            <card-list-component
              v-show="showingList === 'leaders'"
              :cards="leaders"
              :is_leader="true"
              :deckbuilder="true"
              @chose_player_card="chose_leader"
            />
          </div>
        </div>
        <!-- Зона сбора колоды -->
        <block-assembling-the-deck
          class="assembling-deck"
          v-show="deckBuilding"
          :patch="patch"
          :deck="deck"
          :cant_save_deck="cant_save_deck"
          @delete_card="delete_card_from_deck"
          @save_deck="save_deck"
          @patch_deck="patch_deck"
          @change_name_deck="change_name_deck"
        />
      </div>
      <!-- <div class="deckbuilder-bottom-buttons-block">
        <div class="decks_btn" @click="trigger_decks_list_modal(true)">КОЛОДЫ!</div>
      </div> -->
      <button-decks @click="trigger_decks_list_modal(true)" />
      <decks-list-modal
        v-if="show_decks_list_modal"
        @close_decks_list_modal="trigger_decks_list_modal(false)"
        @change_deck="show_deck"
      />
      <deckbuilder-filters
        v-if="showFilters"
        @close-modal="showFilters = false"
        @reset-filters="resetFilters"
        @set-filter="setFilter"
        :deckBuilding="deckBuilding"
      />
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import DecksListModal from "@/components/ModalWindows/DecksListModal"
import DeckbuilderTopButtonsBlock from "@/components/Pages/DeckbuildPage/DeckbuilderTopButtonsBlock"
import BlockAssemblingTheDeck from "@/components/Pages/DeckbuildPage/BlockAssemblingTheDeck"
import DeckbuilderFilters from "@/components/Pages/DeckbuildPage/DeckbuilderFilters"
import CardListComponent from "@/components/CardListComponent"
import ButtonDecks from "@/components/Pages/DeckbuildPage/Buttons/ButtonDecks"

export default {
  components: {
    DecksListModal,
    DeckbuilderTopButtonsBlock,
    BlockAssemblingTheDeck,
    DeckbuilderFilters,
    CardListComponent,
    ButtonDecks,
  },
  data() {
    return {
      showingList: "pool", // показывать список игровых карт ('pool') или список лидеров ('leaders')
      deckBuilding: false, // флаг - собираем мы колоду, или нет
      showFilters: false, // флаг, показать ли окно с фильтрами
      show_decks_list_modal: false, // показать окно с колодами
      patch: false,
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
      this.patch = false
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
      if (!this.deckBuilding) {
        return
      }
      if (this.can_add_card(card)) {
        this.deck.deck_is_progress.push(card)
        this.deck.deck_body.push({ card: card.card.id })
        this.deck.health += card.card.hp
        return
      }
      alert(
        "нельзя карту добавить закрытую карту, или карту ещё раз или карт больше 12"
      )
    },

    // удалить из деки в процессе по нажатию дважды ЛКМ
    delete_card_from_deck(card) {
      this.deck.health -= card.card.hp
      this.deck.deck_is_progress.splice(
        this.deck.deck_is_progress.indexOf(card),
        1
      )
      this.deck.deck_body.splice(
        this.deck.deck_body.findIndex(c => c.card === card.card.id),
        1
      )
    },

    // выбираем лидера для деки
    chose_leader(leader) {
      if (!this.deckBuilding) {
        alert("выберете фракцию!")
        return
      }
      if (leader.count === 0) {
        alert("нельзя выбрать закрытого лидера")
        return
      }
      this.deck.leader = leader.card
    },

    change_name_deck(value) {
      this.deck.deck_name = value
    },

    async save_deck() {
      if (!this.deck.leader) {
        return alert("Необходимо выбрать лидера")
      }
      // карт ровно 12 и лидер выбран
      if (this.cant_save_deck) {
        return alert("Соберите колоду из 12 карт")
      }
      if (this.deck.deck_name.trim() === "") {
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
      if (this.deck.deck_is_progress.find(c => c.card.id === card.card.id)) {
        return false
      }
      if (card.count === 0) {
        return false
      }
      if (
        this.deck.deck_is_progress.length >=
        this.$store.state.game.cards_in_deck
      ) {
        return false
      }
      if (this.query.faction === "") {
        return false
      }
      return true
    },
    // фильтр карт и лидеров по фракции по нажатию на кнопку фракции
    select_faction(prop, value) {
      this.deckBuilding = true
      this.setFilter(prop, value) // для this.query.cards
    },

    show_deck(index) {
      this.new_deck()
      this.deckBuilding = true
      const { deck } = _.cloneDeep(this.$store.getters["all_decks"][index])

      ;(this.deck.deck_id = deck.id),
        (this.deck.deck_name = deck.name),
        (this.deck.deck_is_progress = [...deck.cards]), // колода в процессе - целиком объекты, для отображения
        (this.deck.deck_body = [...deck.d]), // только {card = id} для пост-запроса
        (this.deck.leader = deck.leader), // сам выбранный лидер
        (this.deck.health = deck.health), // жизни текущей деки
        (this.query.faction = deck.leader.faction)
      this.patch = true
    },

    async patch_deck() {
      this.send_data_to_store("patch_deck", {
        name: this.deck.deck_name,
        health: this.deck.health,
        d: this.deck.deck_body,
        leader_id: this.deck.leader.id,
        id: this.deck.deck_id,
      })
    },

    async send_data_to_store(dispatch_name, body) {
      try {
        await this.$store.dispatch(dispatch_name, body)
        this.cancelDeckBuilding() // всё обнуляем!
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    resetFilters() {
      // в режиме сбора колоды - сбрасываем все фильтры КРОМЕ фракций, иначе - вообще все фильтры
      if (!this.deckBuilding) {
        this.query = this.default_query_param()
        return
      }
      this.query = {
        ...this.default_query_param(),
        faction: this.query.faction,
      }
    },

    setFilter(prop, value) {
      this.query[prop] = value
    },

    trigger_show_list(value) {
      this.showingList = value
    },
  },

  computed: {
    pool() {
      return this.$store.getters.filtered_cards(this.query, this.query.count)
    },
    leaders() {
      return this.$store.getters.filtered_leaders(this.query.faction)
    },
    cant_save_deck() {
      const required_count_person = this.$store.state.game.cards_in_deck
      return (
        this.deck.deck_is_progress.length !== required_count_person ||
        !this.deck.leader
      )
    },
    empty_filters() {
      return _.isEqual(this.default_query_param(), this.query)
    },
  },
}
</script>

<style scoped>
.deck_builder_page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 57px;
}

.deck-builder-body {
  height: calc((var(--vh) * 100) - 318px);
  overflow: hidden;
}

.database_of_cards-wrapper {
  position: relative;
}

.database_of_cards-wrapper::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
}

.database_of_cards {
  width: 100%;
  background: #3c4d60;
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.7);
  padding-top: 5px;
  padding-bottom: 5px;
  overflow-y: scroll;
  overflow-x: hidden;
}
/*база карт*/
.pool_full {
  height: calc((var(--vh) * 100) - 318px);
  /* 318 это сумма высот хедера фильтровнижних кнопок */
  animation: parttofull 0.5s ease;
}

.pool_deckbuild {
  height: calc((var(--vh) * 100) - 550px);
  /* 545 это сумма высот хедера фильтровнижних кнопок и окна сбора колоды */
  animation: fulltopart 0.5s ease;
}

@keyframes fulltopart {
  0% {
    height: calc((var(--vh) * 100) - 318px);
  }
  100% {
    height: calc((var(--vh) * 100) - 550px);
  }
}

@keyframes parttofull {
  0% {
    height: calc((var(--vh) * 100) - 550px);
  }
  100% {
    height: calc((var(--vh) * 100) - 318px);
  }
}
</style>
