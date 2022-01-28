<template>

<!-- база карт -->
<div class="card_pool_view">
  <hand-comp :hand='pool' :hp_needed=true
  @chose_player_card='append_into_deck_in_progress' />
</div>

<!-- список всех лидеров из базы -->
<div class="leader_pool_view">
  <hand-comp :hand='leaders'
  @chose_player_card='chose_leader' />
</div>


<!-- новая дека + фракции из стора -->
<div class="new_deck">
  <button class="btn_save_deck"
  @click="new_deck()">
  new deck
  </button>
  <div class="factions"
    v-for="faction in $store.state.factions" :key="faction">
      <button class="btn_save_deck"
        @click="filtering(faction)">
        {{ faction.name }}
      </button>
  </div>
</div>


<div class="deck_in_progress">
  
  <div class="leader">
    <leader-comp v-if="leader_selected" :leader=leader_in_progress  />
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


<!-- выбор деки для редакирования и просмотра -->
<!-- <div class="deck_selection"> -->
  <select-deck 
  @emit_state_deck_index="show_deck"
  />
<!-- </div> -->


</template>

<script>

import { try_post, get } from '@/logic/requests'


export default {
  data() {
    return {
      // САМЫЙ ГЛАВНЫЙ ПАРАМЕТР - РАЗМЕР ДЕКИ!!!!!!!!!!!!!!
      number_of_cards_in_deck: 10,  // Определяет количество карт в деке

      pool: this.$store.getters.all_cards,  // список все карт
      leaders: this.$store.getters.all_leaders,  // список всех лидеров       
      
      deck_is_progress: [],  // колода в процессе - целиком объкты
      leader_in_progress: null,  // лидер в процессе
      health: 0,  // жизни текущей деки
      deck_body: [],  // только {card: id} для пост-запроса
      
      number: 1,  // для сохранения деки имя1, имя2, имя3 итп
      
      faction_selected: false,  // выбрана ли фракция, можно ли добавить лидера в деку
      leader_selected: false,  // выбран лидер или нет
      leader_index: null,  // индекс выбранного лидера
      
    
    }
  },

  methods: {
    // фильтр карт и лидеров по фракции по нажатию на кнопку фракции
    filtering(faction) {
      this.pool = this.$store.getters.filtered_cards(faction)
      this.leaders = this.$store.getters.filtered_leaders(faction)
      this.faction_selected = true  // чтобы можно было добавить лидера, онли выбрав фракцию
    },

    // новая дека, обнуляем фильтры и сбрасываем все добавления
    new_deck() {
      this.pool = this.$store.getters.all_cards
      this.leaders = this.$store.getters.all_leaders
     
      this.deck_is_progress = []
      this.health = 0
      this.leader_selected = false
      this.leader_index = null      
    },

    // добавляем карты в колоду из базы карт
    append_into_deck_in_progress(index) {
      if ( // если карты там УЖЕ нету
        !this.deck_is_progress.includes(this.pool[index]) 
        && this.deck_is_progress.length < this.number_of_cards_in_deck
        && this.faction_selected
        ) 
        {
          this.deck_is_progress.push(this.pool[index])
          this.deck_body.push({"card": this.pool[index].id})  
          this.health = this.health + this.pool[index].hp
      }
      else {alert('нельзя карту добавить ещё раз или карт больше 10')}
    },

    // выбираем лидера для деки
    chose_leader(id) {
      if (this.faction_selected) {
        alert(id)
        this.leader_selected = true
        this.leader_index = id
        this.leader_in_progress = this.leaders[id]
      }
      else alert('выберете фракцию!')
      
    },

    // удалить из деки в процессе по нажатию ЛКМ
    delete_from_deck_in_progress(id) {
      this.health -= this.deck_is_progress[id].hp
      this.deck_is_progress.splice(id, 1)
      this.deck_body.splice(id, 1)
    },

    save_deck() {
      if (  // карт ровно 10 и лидер выбран
        this.deck_is_progress.length == this.number_of_cards_in_deck 
        && this.leader_selected
      ) 
      {
        alert(this.leaders[this.leader_index].name)
        let deck_name = `deck-${this.number}`
        let body = {
          name: deck_name,
          health: this.health,
          d: this.deck_body,
          leader_id: this.leaders[this.leader_index].id
        }

        let url = 'http://194.67.109.190:82/api/v1/decks/'
        try_post(body, url)

        this.number += 1  // +1 для следующего имени деки
        
        this.deck_is_progress = []  // убрать всё из поля сборки деки
        this.health = 0
        this.leader_selected = false
        this.leader_index = null
        this.faction_selected = false
        alert('сохранили деку')

        // this.$refs.deckselection.get_decks()  // обновляем деки после сохран
        let decks = 'http://194.67.109.190:82/api/v1/decks/'
        get(decks, 'get_decks')
      }

      else {alert('меньше 10 карт, или не выбран лидер')}
    },

    show_deck(index) {
      this.deck_is_progress = this.$store.state.decks[index].cards
      this.health = this.$store.state.decks[index].health
      this.leader_in_progress = this.$store.state.decks[index].leader
      this.leader_selected = true
    },

  
    
  },

}
</script>

<style scoped>
.card_pool_view {
  /* width: 800px; */
  width: 99%;
  height: 330px;
  border: solid 1px black;
  margin: 3px;
  overflow: scroll;
}

.leader_pool_view {
  width: 99%;
  height: 180px;
  border: solid 1px black;
  margin: 3px;
  overflow: scroll;
}

.new_deck {
  margin: 3px;
  margin-top: 10px;
}

.factions {
  display: inline;
  margin: 10px;
}

.deck_in_progress { 
  /* два дива в один ряд! */
  margin: 3px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.leader {
  /* width: 130px; */
  width: 10%;
  height: 190px;
  border: dashed 1px black;
  margin: 3px;
}

.deck_build_view {
  width: 89%;
  height: 180px;
  border: solid 1px black;
  margin: 3px;
  overflow: scroll;
}

.btn_save_deck {
  /* width: 100px; */
  width: 15%;
  height: 50px;
}

.deck_selection {
  /* width: 700px; */
  width: 99%;
  height: 560px;
  border: solid 1px black;
  overflow: scroll;
  position: absolute;
  margin: 3px;
  margin-top: 10px;
  /* top: 80px;
  right: 20px; */
}

</style>