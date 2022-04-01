<template>

  <!-- база карт -->
  <div class="card_pool_view">
    <cards-list
        :cards="pool"
        :hp_needed="true"
        @chose_player_card="append_into_deck_in_progress" />
  </div>

  <!-- список всех лидеров из базы -->
  <div class="leader_pool_view">
    <cards-list
        :cards="leaders"
        :for_leaders="true"
        @chose_player_card="chose_leader" />
  </div>


  <!-- новая дека + фракции из стора -->
  <div class="new_deck">
    <button class="btn" @click="new_deck()">
      new+
    </button>
    <div class="factions" v-for="faction in factions" :key="faction">
      <button class="btn" @click="filtering(faction)">
        {{ faction.name }}
      </button>
    </div>
  </div>


  <div class="deck_in_progress">

    <div class="leader">
      <leader-comp v-if="leader_selected" :leader=leader_in_progress  />
    </div>

    <div class="deck_build_view">
      <cards-list
        :cards='deck_is_progress'
        :hp_needed=true
        @chose_player_card='delete_from_deck_in_progress'
      />
    </div>
  </div>

  Лидер: {{ leader_selected }}
  Размер: {{ deck_is_progress.length }}/{{ $store.state.cards_in_deck }}
  Жизни: {{ health }} <br>
  <button class="btn_save_deck"
    v-show="this.deck_is_progress.length === this.$store.state.cards_in_deck && this.leader_selected"
    @click="save_deck"
  >
    СОХРАНИТЬ ДЕКУ
  </button>
  <br>


  <div class="decks_btn" @click="open_decks_list_modal">
    КОЛОДЫ!
  </div>

  <decks-list-modal
      v-if="show_decks_list_modal"
      @close_decks_list_modal="show_decks_list_modal=false"
  />

</template>

<script>
import CardsList from "@/components/CardsList"
import LeaderComp from "@/components/LeaderComp"
import DecksListModal from "@/components/ModalWindows/DecksListModal"
export default {
  components: {DecksListModal, LeaderComp, CardsList},
  data() {
    return {       
      faction: '',

      deck_is_progress: [],  // колода в процессе - целиком объкты
      leader_in_progress: null,  // лидер в процессе
      health: 0,  // жизни текущей деки
      deck_body: [],  // только {card: id} для пост-запроса
      
      faction_selected: false,  // выбрана ли фракция, можно ли добавить лидера в деку
      leader_selected: false,  // выбран лидер или нет
      leader_index: null,  // индекс выбранного лидера

      show_decks_list_modal: false,  // показать окно с колодами
    }
  },

  methods: {
    // фильтр карт и лидеров по фракции по нажатию на кнопку фракции
    filtering(faction) {
      this.faction = faction
      this.faction_selected = true  // чтобы можно было добавить лидера, онли выбрав фракцию
    },

    // новая дека, обнуляем фильтры и сбрасываем все добавления
    new_deck() {
      this.faction = ''
      this.deck_is_progress = []
      this.health = 0
      this.leader_selected = false
      this.faction_selected = false
      this.leader_index = null      
    },

    // добавляем карты в колоду из базы карт
    append_into_deck_in_progress(i) {
      if ( // если карты там УЖЕ нету
        !this.deck_is_progress.includes(this.pool[i]) 
        && this.deck_is_progress.length < this.$store.state.cards_in_deck
        && this.faction_selected
        ) 
        {
          this.deck_is_progress.push(this.pool[i])
          this.deck_body.push({"card": this.pool[i].id})  
          this.health = this.health + this.pool[i].hp
      }
      else {alert('нельзя карту добавить ещё раз или карт больше 12')}
    },

    // выбираем лидера для деки
    chose_leader(i) {
      if (!this.faction_selected) {
        alert('выберете фракцию!')
        return
      }
      this.leader_selected = true
      this.leader_index = i
      this.leader_in_progress = this.leaders[i]
    },

    // удалить из деки в процессе по нажатию дважды ЛКМ
    delete_from_deck_in_progress(i) {
      this.health -= this.deck_is_progress[i].hp
      this.deck_is_progress.splice(i, 1)
      this.deck_body.splice(i, 1)
    },

    save_deck() {
      // карт ровно 12 и лидер выбран
      if (this.deck_is_progress.length !== this.$store.state.cards_in_deck || !this.leader_selected) {
        alert('меньше 12 карт, или не выбран лидер')
        return
      }

      // alert(this.leaders[this.leader_index].name)
      let deck_name = 'deck-abcd'
      let body = {
        name: deck_name,
        health: this.health,
        d: this.deck_body,
        leader_id: this.leaders[this.leader_index].id
      }

      this.$store.dispatch('post_deck_get_decks', {body: body})

      this.new_deck()  // всё обнуляем!
      alert('сохранили деку')
    },

    show_deck(index) {
      this.deck_is_progress = this.$store.state.decks[index].cards
      this.health = this.$store.state.decks[index].health
      this.leader_in_progress = this.$store.state.decks[index].leader
      this.leader_selected = true
    },

    open_decks_list_modal() {
      this.show_decks_list_modal = true
    },
  },

  computed: {
    pool() {
      if (!this.faction) return this.$store.getters.all_cards
      else return this.$store.getters.filtered_cards(this.faction)
    },
    leaders() {
      if (!this.faction) return this.$store.getters.all_leaders
      else return this.$store.getters.filtered_leaders(this.faction)
    },
    factions() {
      return this.$store.state.factions.slice(1)
    },
  },

}
</script>

<style scoped>
/*база карт*/
.card_pool_view {
  width: 80%;
  height: 30vh;
  border: solid 1px black;
  margin: 1px;
  overflow: scroll;
}

/*база лидеров*/
.leader_pool_view {
  width: 80%;
  height: 18vh;
  border: solid 1px black;
  margin: 1px;
  overflow: scroll;
}

/*область новая дека + фракции*/
.new_deck {
  width: 98%;
  height: 7vh;
  margin: 1%;
  position: relative;
  display: inline;
}

/*сами фракции*/
.factions {
  display: inline;
  margin: 1%;
}

.deck_in_progress { 
  /* два дива в один ряд! */
  margin: 1%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 24vh;
}

.leader {
  width: 18%;
  border: dashed 1px black;
}

.deck_build_view {
  width: 80%;
  border: solid 1px black;
  overflow: scroll;
}

.btn {
  width: 23%;
  height: 6vh;
}

.btn_save_deck {
  width: 23%;
  height: 6vh;
  background-color: green;
}

/*кнопка КОЛОДЫ*/
.decks_btn {
  height: 5vh;
  width: 50%;
  border: solid 2px green;
  text-align: center;
  margin: 1% auto auto;
}

</style>