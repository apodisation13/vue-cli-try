<template >

<!-- <popup-comp :show='visible' @update-show='close_window'>
<br><button>закрыть</button> <br>
<hand-comp 
  v-bind:hand='deck'
/>
</popup-comp> -->

<!-- <popup-comp :show='visible' @update-show='close_window'>
<br><button>закрыть 2</button> <br>
<hand-comp 
  v-bind:hand='grave'
/>   
</popup-comp> -->


<div class='deck_and_grave'>
  <div class='deck'>Колода
    <button class="btn_deck" @contextmenu.prevent> 
        {{ deck_length }}
      <deck-grave :array='deck'/>
    </button>
  </div>
  <div class='grave'>Сброс
    <button class="btn_grave" @contextmenu.prevent> 
      {{ grave_length }}
      <deck-grave :array='grave'/>
    </button>
  </div>


</div>

</template>

<script>


export default {
  name: 'deck-comp',
  data() {
    return {
      // visible: false  // для v-model?
    }
  },
  methods: {
    // open_window() {
    //   this.visible = true
    // },
    // close_window(param) {
    //   alert(param + ' это из клоуз виндоу')
    //   this.visible = param
    //   alert(param + ' 2 это из клоуз виндоу')
    // }
  },
  props: {
    deck: {
      required: true,
      type: Array
    },
    deck_length: {
      type: Number    
    },
    grave: {
      required: true,
      type: Array
    },
    grave_length: {
      type: Number
    },

  },
  
}

</script>

<style scoped>

.deck_and_grave {
    width: 100px;
    height: 150px;
    display: inline-block;
    text-align: center;
}

.deck {
    width: 100px;
    height: 75px;
    display: inline-block;
    text-align: center;
}

.grave {
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

.btn_grave {
    width: 100px;
    height: 35px;
    background: orangered;
}

/* modal-window */
.modal_window {
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

.modal_window__content {
  text-align: center;
}

</style>
