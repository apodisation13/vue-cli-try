<template>
  <div class='redraw_modal_window' v-if='visible'>
 
 <button class="close_button" @click="close_self">ПРИНЯТЬ</button><br>
 
 <hand-comp :hand='hand_current' 
 @chose_player_card='chose_player_card' 
 />
 
 <h1>Изменить карту можно ещё {{ redraws }} раз</h1><br>
 <h2>В колоде осталось ещё {{ deck_current.length }} карт</h2>
 </div>
</template>

<script>
export default {
  name: 'redraw-modal',
  data() {
    return {
      visible: true,
      redraws: 3,
      hand_current: this.hand.slice(),
      deck_current: this.deck.slice(),
      redraw_array: []
    }
  },
  props: {
    deck: {
      required: true,
      type: Array
    },
    hand: {
      required: true,
      type: Array
    },

  },
  methods: {
    close_self() {
      this.visible = false
      
      this.redraw_array.forEach(element => {
      this.deck_current.push(element)  // вернуть в деку карты
      })

      this.$emit('redraw_finished', {'deck': this.deck_current, 'hand': this.hand_current})
      
    },
    chose_player_card(id) {
      this.redraws -= 1
      
      this.redraw_array.push(this.hand_current[id])  // добавили карту в темп-список
      let random = Math.floor(Math.random() * this.deck_current.length);
      this.hand_current.splice(id, 1, this.deck_current[random])  // обновить
      this.deck_current.splice(random, 1)  // удалить этот i-й элемент
      
      if (this.redraws == 0) {
        this.close_self()
      }
    }
  } 
}
</script>

<style scoped>
.redraw_modal_window {
  background-color: limegreen;
  width: 1000px;
  height: 400px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.field_view__content {
  width: 70px;
  height: 30px;
  font-size: 2pt;
}

.close_button {
  width: 150px;
  height: 50px;
}

</style>
