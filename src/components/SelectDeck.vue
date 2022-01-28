<template>
<div class="selected_deck" >
  <div v-if="$store.state.current_deck.length > 0">
    ВЫБРАННАЯ ДЕКА - <br>
    <!-- Название {{ $store.state. }} <br> -->
    Жизни {{ $store.state.health }} <br>
    Лидер {{ $store.state.leader.name }}
  </div>
</div>

<div class="decks_pool_view">
ДВАЖДЫ ЩЁЛКНИТЕ ЛКМ на деку для её выбора <br>
  
  <div class="deck-view"
  :style="[
        deck.leader.faction == 'Soldiers' ? {'backgroundColor': 'blue'} :
        deck.leader.faction == 'Monsters' ? {'backgroundColor': 'red'} :
        deck.leader.faction == 'Animals' ? {'backgroundColor': 'green'} :
        {}    
      ]"  
  v-for="(deck, index) in $store.state.decks" :key='deck'
  @dblclick="select_deck(index)"
  @click="emit_state_deck_index(index)"
  @click.right="selected_deck=index, show_deck=true" 
  @mouseleave="show_deck=false"
  @contextmenu.prevent 
  >
    <div class="deck">
      
      {{ deck.name }} <br>
      Жизни -- {{ deck.health }} <br><br>
      Лидер: <br>
      {{ deck.leader.name }} <br>
      {{ deck.leader.ability}}
    </div>
  </div>
</div>

<hand-comp 
v-if="show_deck"
:hand='$store.state.decks[selected_deck].cards'
/>

</template>

<script>
  export default {
    name: 'select-deck',

    data() {
      return {
        is_selected: false,  // какая-то дека выбрана
        selected_deck: undefined,  // номер выбранной деки
        show_deck: false,  // показать состав деки
      }
    },

    methods: {

      // осуществить выбор деки для игры дважды ЛКМ
      select_deck(i) {
        this.selected_deck = i
        this.is_selected = true
        // this.$store.commit('set_current_deck', this.$store.state.decks[this.selected_deck].cards)
        // this.$store.commit('set_health', this.$store.state.decks[this.selected_deck].health)
        // this.$store.commit('set_leader', this.$store.state.decks[this.selected_deck].leader)
        this.$store.dispatch(
        "set_deck_in_play", 
        {decks: this.$store.state.decks, i: this.selected_deck}
      )  
      
      },

      emit_state_deck_index(index) {
        this.$emit('emit_state_deck_index', index)
      },
    },

    emits: [
      'emit_state_deck_index',
    ]
  }
</script>

<style scoped>

.selected_deck {
  width: 250px;
  height: 70px;
  border: solid 1px black;
  margin: 10px;
}

.decks_pool_view {
  /* width: 800px; */
  width: 99%;
  height: 220px;
  border: solid 1px black;
  margin: 10px;
  overflow: scroll;
}

.deck-view {
    width: 150px;
    height: 170px;
    border: solid 1px black;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
    margin: 3px;
}

.deck {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

</style>