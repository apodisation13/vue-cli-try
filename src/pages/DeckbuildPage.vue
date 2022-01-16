<template>

<div class="deck_selection">
  <deck-selection ref="deckselection"
  @show_deck="show_deck"
   />
</div>

<!-- загружаем список карт из базы -->
<a v-once>{{ get() }}</a>


<div class="card_pool_view">
  <hand-comp :hand='filtered_pool' :hp_needed=true
  @chose_player_card='append_into_deck_in_progress' />
</div>

<div class="new_deck">
  <button class="btn_save_deck"
  @click="new_deck()"
  >new deck
  </button>

  <div class="factions"
  v-for="faction in factions" :key="faction">
    <button class="btn_save_deck"
    @click="filtering(faction)"
    >
    {{ faction.name }}
    </button>

  </div>

</div>

<div class="deck_build_view">
  <hand-comp :hand='filtered_leaders'
  @chose_player_card='chose_leader' />
</div>


<div class="total">
<div v-if="leader_selected">
  <leader-comp :leader=deck_leader />
</div>
<div class="deck_build_view">
<hand-comp :hand='deck_is_progress' :hp_needed=true
@chose_player_card='delete_from_deck_in_progress' />
</div>
</div>

Лидер: {{ leader_selected }} <br>
Размер деки: {{ deck_is_progress.length }}/{{ number_of_cards_in_deck }} <br>
Жизни деки: {{ health }} <br>

<button class="btn_save_deck" @click="save_deck"
:style="[
deck_is_progress.length < number_of_cards_in_deck || !leader_selected ? 
{'backgroundColor': 'red'} : 
{'backgroundColor': 'green'}
]">
  СОХРАНИТЬ ДЕКУ
</button>

</template>

<script>
import DeckSelection from '@/components/DeckSelection'
import { try_post, } from '@/logic/requests'
import axios from "axios"


export default {
  components: {
    DeckSelection,
  },
  data() {
    return {
      pool: [],
      filtered_pool: [],  // отфильтрованное по фракциям
      deck_is_progress: [],  // колода в процессе - целиком объкты
      deck_body: [],  // только {card: id}
      number_of_cards_in_deck: 10,  // Определяет количество карт в деке
      number: 1,  // для сохранения деки имя1, имя2, имя3 итп
      health: 0,  // жизни текущей деки
      factions: [],  // список фракций для новой деки
      leaders: [],  // список всех лидеров
      filtered_leaders: [],   // отфильтрованное по фракциям
      faction_selected: false,  // выбрана ли фракция
      leader_selected: false,  // выбран лидер или нет
      leader_index: null,  // индекс выбранного лидера
      deck_leader: null,
   }
  },
  methods: {
    get() {
      let url = 'http://127.0.0.1:8000/api/v1/cards/'
      axios.get(url)
      .then(response => {
        this.pool = response.data
        this.filtered_pool = this.pool
      })
      
      url = 'http://127.0.0.1:8000/api/v1/factions/'
      axios.get(url)
      .then(response => {
        this.factions = response.data
      })

       url = 'http://127.0.0.1:8000/api/v1/leaders/'
      axios.get(url)
      .then(response => {
        this.leaders = response.data
        this.filtered_leaders = this.leaders
      })
      
    },

    append_into_deck_in_progress(index) {
      if (
        !this.deck_is_progress.includes(this.pool[index]) 
        && this.deck_is_progress.length < this.number_of_cards_in_deck
        ) 
        {
          this.deck_is_progress.push(this.pool[index])
          this.deck_body.push({"card": this.pool[index].id})  
          this.health = this.health + this.pool[index].hp
      }
      else {alert('нельзя карту добавить ещё раз')}
    },

    delete_from_deck_in_progress(id) {
      this.health -= this.deck_is_progress[id].hp
      this.deck_is_progress.splice(id, 1)
      this.deck_body.splice(id, 1)
    },

    save_deck() {
      if (
        this.deck_is_progress.length >= this.number_of_cards_in_deck 
        && this.leader_selected
      ) 
      {
        alert(this.filtered_leaders[this.leader_index].id)
        let deck_name = `deck-${this.number}`
        let body = {
          name: deck_name,
          health: this.health,
          d: this.deck_body,
          leader_id: this.filtered_leaders[this.leader_index].id
        }

        let url = 'http://127.0.0.1:8000/api/v1/decks/'
        try_post(body, url)

        this.number += 1  // +1 для следующего имени деки
        this.deck_is_progress = []  // убрать всё из поля сборки деки
        this.health = 0
        this.leader_selected = false
        this.leader_index = null
        alert('сохранили')

        this.$refs.deckselection.get_decks()  // обновляем деки после сохран
      }

      else {alert(
        'меньше 10 карт, или не выбран лидер'
        )}
    },

    show_deck(deck) {
      this.deck_is_progress = deck.cards
      this.health = deck.health
      this.leader_selected = true
      // this.leader_index = 0
      // this.filtered_leaders[0] = deck.leader
      this.deck_leader = deck.leader

    },

    new_deck() {
      this.filtered_pool = this.pool
      this.filtered_leaders = this.leaders
      this.deck_is_progress = []
      this.health = 0
      this.leader_selected = false
      this.leader_index = null      
    },

    filtering(fac) {
      this.filtered_pool = this.pool
      this.filtered_pool = this.filtered_pool.filter(f => f.faction==fac.name)
      this.filtered_leaders = this.leaders
      this.filtered_leaders = this.filtered_leaders.filter(f => f.faction==fac.name)
      this.faction_selected = true
    },

    chose_leader(id) {
      if (this.faction_selected) {
        alert(id)
        this.leader_selected = true
        this.leader_index = id
      }
      else alert('выберете фракцию!')
      
    },
    
  },

}
</script>

<style scoped>
.card_pool_view {
  width: 800px;
  height: 330px;
  border: solid 1px black;
  margin: 10px;
  overflow: scroll;
}

.total { 
  /* два дива в один ряд! */
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.deck_build_view {
  width: 800px;
  height: 180px;
  border: solid 1px black;
  margin: 10px;
  overflow: scroll;
}

.leader {
  width: 120px;
  height: 180px;
  border: solid 1px black;
  margin: 10px;
}

.btn_save_deck {
  width: 100px;
  height: 50px;
}

.deck_selection {
  width: 700px;
  height: 560px;
  border: solid 1px black;
  overflow: scroll;
  position: absolute;
  top: 80px;
  right: 20px;
}

.new_deck {
  margin: 10px;
}

.factions {
  display: inline;
  margin: 10px;
}

</style>