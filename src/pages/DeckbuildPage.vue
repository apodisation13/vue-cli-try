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
  <button class="btn_save_deck" @click="new_deck()">
  new deck</button>
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
    <cards-list
        :cards='deck_is_progress'
        :hp_needed=true
        @chose_player_card='delete_from_deck_in_progress' />
  </div>
</div>

Лидер: {{ leader_selected }} <br>
Размер деки: {{ deck_is_progress.length }}/{{ $store.state.cards_in_deck }} <br>
Жизни деки: {{ health }} <br>

<button class="btn_save_deck" :style="save_btn_style"
@click="save_deck">
СОХРАНИТЬ ДЕКУ
</button>


<!-- выбор деки для редакирования и просмотра -->
<select-deck 
@emit_state_deck_index="show_deck"
/>


</template>

<script>

import { try_post, get } from '@/logic/requests'


export default {
  data() {
    return {       
      faction: '',

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
      else {alert('нельзя карту добавить ещё раз или карт больше 10')}
    },

    // выбираем лидера для деки
    chose_leader(i) {
      if (this.faction_selected) {
        this.leader_selected = true
        this.leader_index = i
        this.leader_in_progress = this.leaders[i]
      }
      else alert('выберете фракцию!')
      
    },

    // удалить из деки в процессе по нажатию ЛКМ
    delete_from_deck_in_progress(i) {
      this.health -= this.deck_is_progress[i].hp
      this.deck_is_progress.splice(i, 1)
      this.deck_body.splice(i, 1)
    },

    save_deck() {
      if (  // карт ровно 10 и лидер выбран
        this.deck_is_progress.length === this.$store.state.cards_in_deck
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
        
        this.new_deck()  // всё обнуляем!
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

  computed: {
    pool() {
      if (!this.faction) return this.$store.getters.all_cards
      else return this.$store.getters.filtered_cards(this.faction)
    },
    leaders() {
      if (!this.faction) return this.$store.getters.all_leaders
      else return this.$store.getters.filtered_leaders(this.faction)
    },
    save_btn_style() {
      if (this.deck_is_progress.length < this.$store.state.cards_in_deck
          || !this.leader_selected) { 
        return {'backgroundColor': 'red'}
      }
      else return {'backgroundColor': 'green'}
    },
  }

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
  position: relative;
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

</style>