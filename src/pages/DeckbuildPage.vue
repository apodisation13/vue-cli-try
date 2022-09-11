<template>
  <div>
    <!-- Зона кнопок - новая, карты\лидеры, фильтры -->
    <deckbuilder-filters 
      @reset="cancelDeckBuilding"
    />
    <!-- Зона базы карт: или показывать карты, или лидеров -->
    <div class="database">
      <!-- база карт -->
      <div
        :class="deckBuilding ? 'pool_deckbuild' : 'pool_full'"
        v-if="!showLeaders"
      >
        <cards-list
          :cards="pool"
          :hp_needed="true"
          :deckbuilder="true"
          @chose_player_card="append_into_deck_in_progress"
        />
      </div>
      <!-- список всех лидеров из базы -->
      <div
        :class="deckBuilding ? 'pool_deckbuild' : 'pool_full'"
        v-if="showLeaders"
      >
        <cards-list
          :cards="leaders"
          :for_leaders="true"
          :deckbuilder="true"
          @chose_player_card="chose_leader"
        />
      </div>
    </div>
    <!-- Окно с фильтрами -->
    <div class="filters" v-if="showFilters">
      <button class="new" @click="showFilters = false">Закрыть</button>
      <button class="new" @click="cancelFilters">Сброс фильтров</button>
      <filter-factions
        @filter-factions="filter_factions"
        v-if="!deckBuilding"
      />
      <filter-types
        @filter-types="filter_types"
        @reset-filter-types="reset_filter_types"
      />
      <filter-colors
        @filter-colors="filter_colors"
        @reset-filter-colors="reset_filter_colors"
      />
      <filter-passives
        @filter-passives="filter_passives"
        @reset-filter-passives="reset_filter_passives"
      />
      <filter-unlocked
        @filter-unlocked="filter_unlocked"
        @reset-filter-unlocked="reset_filter_unlocked"
      />
    </div>
    <!-- Зона сбора колоды -->
    <div class="deck_in_progress" v-if="deckBuilding">
      <div class="leader">
        <leader-comp v-if="leader_selected" :leader="leader" />
      </div>
      <div class="deck_build_view">
        <cards-list
          :cards="deck_is_progress"
          :hp_needed="true"
          @chose_player_card="delete_from_deck_in_progress"
        />
      </div>
    </div>
    <!-- TODO: Все вот это должно влезть в одну строку! -->
    <div class="deck_info" v-if="deckBuilding">
      <span>Лидер: {{ leader_selected }}</span>
      <span>
        {{ deck_is_progress.length }}/{{ $store.state.game.cards_in_deck }}
      </span>
      <span>Жизни: {{ health }}</span>
      <input class="input" :disabled="cant_save_deck" v-model="deck_name" />
      <button
        class="btn_save_deck"
        v-if="!patch"
        :disabled="cant_save_deck"
        @click="save_deck"
      >
        СОХРАНИТЬ
      </button>
      <button
        class="btn_save_deck"
        v-if="patch"
        :disabled="cant_save_deck"
        @click="patch_deck"
      >
        ИЗМЕНИТЬ
      </button>
    </div>
    <div class="decks_btn" @click="open_decks_list_modal">КОЛОДЫ!</div>
    <decks-list-modal
      v-if="show_decks_list_modal"
      @close_decks_list_modal="show_decks_list_modal = false"
      @change_deck="show_deck"
    /> -->
  </div>
</template>

<script>
import CardsList from "@/components/CardsList"
import LeaderComp from "@/components/LeaderComp"
import DecksListModal from "@/components/ModalWindows/DecksListModal"
import FilterFactions from "@/components/Pages/DeckbuildPage/FilterFactions"
import FilterTypes from "@/components/Pages/DeckbuildPage/FilterTypes"
import FilterColors from "@/components/Pages/DeckbuildPage/FilterColors"
import FilterPassives from "@/components/Pages/DeckbuildPage/FilterPassives"
import filtering from "@/mixins/DeckbuildPage/filtering"
import FilterUnlocked from "@/components/Pages/DeckbuildPage/FilterUnlocked"
import CardListComponent from "@/components/CardListComponent"
import DeckbuilderFilters from '@/components/DeckbuilderFilters'

export default {
  components: {
    FilterUnlocked,
    FilterPassives,
    FilterColors,
    FilterTypes,
    FilterFactions,
    DecksListModal,
    CardsList,
    LeaderComp,
    CardListComponent,
    DeckbuilderFilters,
  },
  mixins: [filtering],
  data() {
    return {
      showLeaders: false, // показывать таб лидеров (True) или карт (default, False)
      // showNewDeckFactionSelect: false,
      deckBuilding: false, // флаг - собираем мы колоду, или нет
      showFilters: false, // флаг, показать ли окно с фильтрами

      deck_is_progress: [], // колода в процессе - целиком объекты, для отображения
      deck_body: [], // только {card: id} для пост-запроса
      health: 0, // жизни текущей деки
      deck_name: "",

      faction_selected: false, // выбрана ли фракция, можно ли добавить лидера в деку
      leader_selected: false, // выбран лидер или нет
      leader: null, // сам выбранный лидер

      show_decks_list_modal: false, // показать окно с колодами

      patch: false,
      deck_id: null,
    }
  },

  methods: {
    startDeckBuilding() {
      this.showNewDeckFactionSelect = true
    },
    cancelDeckBuilding() {
      this.deckBuilding = false;
      this.new_deck();
    },

    // новая дека, обнуляем фильтры и сбрасываем все добавления
    new_deck() {
      // сброс фильтров
      this.query = {}
      this.faction = ""
      this.count = undefined

      this.deck_is_progress = []
      this.deck_body = []
      this.health = 0
      this.deck_name = ""
      this.leader_selected = false
      this.faction_selected = false
      this.patch = false
      this.deck_id = null
    },

    // добавляем карты в колоду из базы карт
    append_into_deck_in_progress(card) {
      if (this.can_add_card(card)) {
        this.deck_is_progress.push(card)
        this.deck_body.push({ card: card.card.id })
        this.health = this.health + card.card.hp
      } else
        alert(
          "нельзя карту добавить закрытую карту, или карту ещё раз или карт больше 12"
        )
    },

    // удалить из деки в процессе по нажатию дважды ЛКМ
    delete_from_deck_in_progress(card) {
      this.health -= card.card.hp
      this.deck_is_progress.splice(this.deck_is_progress.indexOf(card), 1)
      this.deck_body.splice(
        this.deck_body.findIndex(c => c.card === card.card.id),
        1
      )
    },

    // выбираем лидера для деки
    chose_leader(leader) {
      if (!this.faction_selected) {
        alert("выберете фракцию!")
        return
      }
      if (leader.count === 0) {
        alert("нельзя выбрать закрытого лидера")
        return
      }

      this.leader_selected = true
      this.leader = leader.card
    },

    async save_deck() {
      // карт ровно 12 и лидер выбран
      if (this.cant_save_deck || !this.deck_name) {
        alert("Введите имя колоды")
        return
      }

      let body = {
        name: this.deck_name,
        health: this.health,
        d: this.deck_body,
        leader_id: this.leader.id,
      }

      try {
        await this.$store.dispatch("post_deck", body)
        this.new_deck() // всё обнуляем!
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    show_deck(index) {
      this.new_deck()
      this.deckBuilding = true
      let deck = JSON.parse(
        JSON.stringify(this.$store.getters["all_decks"][index])
      )
      this.deck_is_progress = deck.deck.cards
      this.deck_body = deck.deck.d
      this.leader = deck.deck.leader
      this.leader_selected = true
      this.health = deck.deck.health
      this.deck_name = deck.deck.name
      this.query.faction = [deck.deck.leader.faction, "Neutral"]
      this.faction = deck.deck.leader.faction
      this.faction_selected = true
      this.patch = true
      this.deck_id = deck.deck.id
    },

    async patch_deck() {
      let body = {
        name: this.deck_name,
        health: this.health,
        d: this.deck_body,
        leader_id: this.leader.id,
        id: this.deck_id,
      }

      try {
        await this.$store.dispatch("patch_deck", body)
        this.new_deck() // всё обнуляем!
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    open_decks_list_modal() {
      this.show_decks_list_modal = true
    },

    can_add_card(card) {
      return (
        !this.deck_is_progress.filter(c => c.card.id === card.card.id).length &&
        card.count !== 0 &&
        this.deck_is_progress.length < this.$store.state.game.cards_in_deck &&
        this.faction_selected
      )
    },
  },

  computed: {
    pool() {
      return this.$store.getters.filtered_cards(this.query, this.count)
    },
    leaders() {
      if (!this.faction) return this.$store.getters.all_leaders
      else return this.$store.getters.filtered_leaders(this.faction)
    },
    cant_save_deck() {
      return (
        this.deck_is_progress.length !== this.$store.state.game.cards_in_deck ||
        !this.leader_selected
      )
    },
    filters_enabled() {
      return this.count || Object.keys(this.query).length > 0
    },
  },
}
</script>

<style scoped>
span {
  color: white;
}

.database {
  display: inline;
  float: left;
  width: 100%;
  /*border: solid 1px red;*/
}

.filters {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  /*max-width: 335px;*/
  width: 100%;
  border-radius: 18px;
  padding: 45px 22px;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/*база карт*/

.pool_full {
  height: 70vh;
  /*border: solid 1px black;*/
  margin: 0.05%;
  overflow: scroll;
}

.pool_deckbuild {
  height: 50vh;
  border: solid 1px black;
  margin: 0.05%;
  overflow: scroll;
}

.new {
  height: 4vh;
  width: 92%;
}

.deck_in_progress {
  /* два дива в один ряд! */
  clear: both;
  height: 18vh;
  /*border: solid 2px yellow;*/
  width: 99%;
  margin: 0.05% 0.05% 1%;
}

.leader {
  width: 20%;
  height: 100%;
  border: dashed 1px black;
  display: inline;
  float: left;
  /*margin: 0.05%;*/
}

.deck_build_view {
  width: 79%;
  height: 100%;
  border: solid 1px black;
  overflow: scroll;
  display: inline;
  float: right;
  margin: 0.05%;
}

.deck_info {
  width: 100%;
}

.btn_save_deck {
  height: 3vh;
  width: 23%;
}

.input {
  width: 23%;
  height: 3vh;
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
