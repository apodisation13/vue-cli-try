<template>
<div class='deck'>Колода
  <button class="btn_deck" @click="flag=true"> 
      {{ deck.length }}
  </button>
   <div class="modal_window" v-if="flag">
    <button @click="flag=false">Закрыть</button><br>
    <hand-comp :hand='deck'/>
  </div>
</div>
</template>

<script>
  export default {
    name: 'deck-comp',
    props: {
      deck: {
        required: true,
        type: Array
      },
    },
    data() {
      return {
        flag: false,
      }
    },
    methods: {
      
    }  
  }
</script>

<style scoped>
.deck {
    width: 100px;
    height: 75px;
    display: inline-block;
    text-align: center;
}

.btn_deck {
    width: 100px;
    height: 35px;
    background: lightgreen;
}

.modal_window {
  background-color: limegreen;
  width: 80%;
  height: 400px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}
</style>