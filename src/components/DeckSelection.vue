<template>
ДВАЖДЫ ЩЁЛКНИТЕ ЛКМ на деку для её выбора

<!-- загружаем из БД список дек -->
<a v-once>{{ get_decks() }}</a>


<div class="decks_pool_view">
  <div class="deck-view"  v-for="(deck, index) in deck_pool" :key='deck'
  @dblclick="select_deck(index)"
  @click.right="delete_deck(index)" @contextmenu.prevent 
  >
    <div class="deck" >
      {{ deck.name }} <br>
      Жизни деки -- {{ deck.health }}
    </div>
  </div>
</div>
<yesno-modal :visible='show_yesno' 
@confirm='confirm_delete'
@cancel='cancel_delete'
/>

<div class="selected_deck" >
  <div v-if="is_selected">
    ВЫБРАННАЯ ДЕКА - <br>
  {{ deck_pool[selected_deck].name }} <br>
  {{ $store.state.health }} <br>
  </div>
</div>

</template>

<script>
import { try_delete } from '@/logic/requests'

export default {
  data() {
    return {
      deck_pool: [],
      selected_deck: 0,  // индекс выбранной деки
      is_selected: false,  // что хоть что-то выбрано
      show_yesno: false,  // показать да\нет для удаления деки
      index: 0,  // индекс выбранной для удаления деки
    }
  },
  methods: {
    get_decks() {
      let url = 'http://127.0.0.1:8000/api/v1/decks/'
      fetch(url) 
        .then((response) => response.json()) 
        .then((result) => {
          this.deck_pool = result
        });
    },

    select_deck(id) {
      alert(id)
      this.selected_deck = id
      this.is_selected = true
      this.$store.commit('set_current_deck', this.deck_pool[this.selected_deck].cards)
      this.$store.commit('set_health', this.deck_pool[this.selected_deck].health)
    },

    delete_deck(id) {
      this.index = id  // записали номер нажатой кнопки
      this.show_yesno = true
    },

    confirm_delete(flag) {
      this.show_yesno = flag
      let id = this.deck_pool[this.index].id  // id деки из базы по индексу
      let url = `http://127.0.0.1:8000/api/v1/decks/${id}/`
      try_delete(url)
      this.get_decks()  // заново делаем запрос на список дек
    },
    cancel_delete(flag) {
      this.show_yesno = flag
    },
    
  }

}
</script>

<style scoped>
.decks_pool_view {
  width: 800px;
  height: 330px;
  border: solid 1px black;
  margin: 10px;
  overflow: scroll;
}

.btn_save_deck {
  width: 120px;
  height: 50px;
  margin: 10px;
}

.selected_deck {
  width: 200px;
  height: 200px;
  border: solid 1px black;
  margin: 10px;
}

.deck-view {
    width: 100px;
    height: 150px;
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