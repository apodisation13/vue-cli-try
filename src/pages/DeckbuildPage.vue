<template>
  <div class="deck_builder_page">
    <!-- Зона кнопок - новая, карты\лидеры, фильтры -->
    <deckbuilder-filters
      @reset="cancelDeckBuilding"
      @filter_factions="filter_factions"
      @trigger_show_leaders="trigger_show_leaders"
    />
    <!-- Зона базы карт: или показывать карты, или лидеров -->
    <div class="database">
      <!-- база карт -->
      <div
        :class="deckBuilding ? 'pool_deckbuild' : 'pool_full'"
        v-show="!showLeaders"
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
        v-show="showLeaders"
      >
        <cards-list
          :cards="leaders"
          :for_leaders="true"
          :deckbuilder="true"
          @chose_player_card="chose_leader"
        />
      </div>
    </div>
    <!-- Зона сбора колоды -->
    <div class="deck_in_progress" v-if="deckBuilding">
      <div class="leader">
        <leader-comp v-if="deck.leader" :leader="deck.leader" />
      </div>
      <div class="deck_build_view">
        <cards-list
          :cards="deck.deck_is_progress"
          :hp_needed="true"
          @chose_player_card="delete_from_deck_in_progress"
        />
      </div>
    </div>
    <!-- TODO: Все вот это должно влезть в одну строку! -->
    <div class="deck_info" v-if="deckBuilding">
      <span>Лидер: {{ !!deck.leader }}</span>
      <span>
        {{ deck.deck_is_progress.length }}/{{ $store.state.game.cards_in_deck }}
      </span>
      <span>Жизни: {{ health }}</span>
      <input class="input" :disabled="cant_save_deck" v-model="deck.deck_name" />
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
    />
  </div>
</template>

<script>
import _ from "lodash"
import CardsList from "@/components/CardsList"
import LeaderComp from "@/components/LeaderComp"
import DecksListModal from "@/components/ModalWindows/DecksListModal"
import FilterFactions from "@/components/Pages/DeckbuildPage/FilterFactions"
import FilterTypes from "@/components/Pages/DeckbuildPage/FilterTypes"
import FilterColors from "@/components/Pages/DeckbuildPage/FilterColors"
import FilterPassives from "@/components/Pages/DeckbuildPage/FilterPassives"
import FilterUnlocked from "@/components/Pages/DeckbuildPage/FilterUnlocked"
import CardListComponent from "@/components/CardListComponent"
import DeckbuilderFilters from "@/components/DeckbuilderFilters"

export default {
  components: {FilterUnlocked,FilterPassives,FilterColors,FilterTypes,FilterFactions,DecksListModal,CardsList,LeaderComp,CardListComponent,DeckbuilderFilters},
  // mixins: [filtering],
  data() {
    return {
      showLeaders: false, // показывать таб лидеров (True) или карт (default, False)
      deckBuilding: false, // флаг - собираем мы колоду, или нет
      showFilters: false, // флаг, показать ли окно с фильтрами
      deck: {
        deck_name: "",
        deck_is_progress: [], // колода в процессе - целиком объекты, для отображения
        deck_body: [], // только {card: id} для пост-запроса
        leader: null, // сам выбранный лидер
      },
      query: {
        faction: "",
        type: "",
        color: "",
        has_passive: false,
      },
      health: 0, // жизни текущей деки
      show_decks_list_modal: false, // показать окно с колодами
      patch: false,
      deck_id: null,
      count: null,
    }
  },

  methods: {
    // триггеры показа дополнительных окон
    startDeckBuilding() {
      this.showNewDeckFactionSelect = true
    },
    
    open_decks_list_modal() {
      this.show_decks_list_modal = true
    },

    cancelDeckBuilding() {
      this.deckBuilding = false
      this.new_deck()
    },

    // новая дека, обнуляем фильтры и сбрасываем все добавления
    new_deck() {
      // сброс фильтров
      this.query = this.resetQueryParam()
      this.deck = this.resetDeck()
      this.count = null

      this.health = 0
      this.patch = false
      this.deck_id = null
    },

    resetQueryParam() {
      return {
        faction: "",
        type: "",
        color: "",
        has_passive: false,
      }
    },
    
    resetDeck() {
      return {
        deck_name: "",
        deck_is_progress: [], 
        deck_body: [], 
        leader: null,
      }
    },

    // добавляем карты в колоду из базы карт
    // append_into_deck_in_progress(card) {
    //   if (this.can_add_card(card)) {
    //     this.deck.deck_is_progress.push(card)
    //     this.deck.deck_body.push({ card: card.card.id })
    //     this.health += card.card.hp
    //   } else
    //     alert(
    //       "нельзя карту добавить закрытую карту, или карту ещё раз или карт больше 12"
    //     )
    // },

    // удалить из деки в процессе по нажатию дважды ЛКМ
    // delete_from_deck_in_progress(card) {
    //   this.health -= card.card.hp
    //   this.deck.deck_is_progress.splice(this.deck.deck_is_progress.indexOf(card), 1)
    //   this.deck.deck_body.splice(
    //     this.deck.deck_body.findIndex(c => c.card === card.card.id),
    //     1
    //   )
    // },

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

    // async save_deck() {
    //   // карт ровно 12 и лидер выбран
    //   if (this.cant_save_deck || !this.deck.deck_name) {
    //     alert("Введите имя колоды")
    //     return
    //   }

    //   let body = {
    //     name: this.deck.deck_name,
    //     health: this.health,
    //     d: this.deck.deck_body,
    //     leader_id: this.deck.leader.id,
    //   }

    //   try {
    //     await this.$store.dispatch("post_deck", body)
    //     this.new_deck() // всё обнуляем!
    //   } catch (err) {
    //     console.log(err)
    //     throw err
    //   }
    // },

    // can_add_card(card) {
    //   return (
    //     !this.deck.deck_is_progress.filter(c => c.card.id === card.card.id).length &&
    //     card.count !== 0 &&
    //     this.deck.deck_is_progress.length < this.$store.state.game.cards_in_deck && this.query.faction
    //   )
    // },
    // фильтр карт и лидеров по фракции по нажатию на кнопку фракции
    filter_factions(emit) {
      this.deckBuilding = true
      this.query.faction = emit // для this.query.cards
    },

    // filter_unlocked(count) {
    //   this.count = count
    // },
    // reset_filter_unlocked() {
    //   this.count = undefined
    // },

    cancelFilters() {
      // в режиме сбора колоды - сбрасываем все фильтры КРОМЕ фракций, иначе - вообще все фильтры
      if (!this.deckBuilding) {
        this.query = this.resetQueryParam()
        // this.reset_filter_unlocked()
        return
      }
      // this.reset_filter_unlocked()
    },
    
    trigger_show_leaders(value) {
      this.showLeaders = value
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
      return (
        this.deck.deck_is_progress.length !== this.$store.state.game.cards_in_deck ||
        !this.deck.leader
      )
    },
    filters_enabled() {
      return this.count || Object.keys(this.query).length > 0
    },
  }
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
