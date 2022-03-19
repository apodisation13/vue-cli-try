<template>

  <div class="enemy" :style="border(enemy)"
       @contextmenu.prevent
       @click.right="show_modal"
       v-touch:longtap="show_modal"
  >

    <img class="img" :src="enemy.image" v-if="enemy.image" alt="">

    <div class="diamond" :style="background_color(enemy)">
      <span class="span_diamond">&dagger;{{ enemy.damage }}</span>
    </div>
    
    <div class="hp">
      <span>&hearts;{{ enemy.hp }}</span>
    </div>
    
    <div class="circle" v-if="enemy.move.name==='down'">
      <span>&#8595;</span>
    </div>  
    <div class="circle" v-else-if="enemy.move.name==='stand'">
      <span>&#9737;</span>  
    </div>
    <div class="circle" v-else-if="enemy.move.name==='random'">
      <span>&#9736;</span>  
    </div>
  </div>

  <field-modal
      v-if="show_enemy_modal"
      :enemy='enemy'
      @close_field_modal="show_enemy_modal=false"
  />

</template>

<script>
import { border_for_card, background_color } from '@/logic/border_styles'
export default {
  name: 'enemy-comp',
  props: {
    enemy: {
      required: true,
    },
  },
  data() {
    return {
      show_enemy_modal: false
    }
  },
  methods: {
    border(e) {
      return border_for_card(e)
    },
    background_color(e) {
      return background_color(e)
    },
    show_modal() {
      this.show_enemy_modal = true
    },
  },  
}
</script>

<style scoped>
.enemy {
  width: 98%;
  height: 17vh;
  border-radius: 2%;
  position: relative;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.img {
  width: 99%;
  height: 99%;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.diamond {
  position: absolute;
  top: 1%;
  right: 6%;
  height: 4vh;
  width: 4vh;
  transform: rotateX(45deg) rotateZ(45deg);
  /* background-color: purple; */
  /* border: solid 1px yellow; */
}

.span_diamond {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 25%;
  right: 10%;
  color: black;
  font-size: 10pt;
  transform:  rotateZ(-45deg);
}

.circle {
  position: absolute;
  width: 24%;
  height: 3vh;
  background: orangered;
  border-radius: 50%;
  top: 3%;
  left: 3%;
}

.hp {
  width: 33%;
  height: 20%;
  background-color: green;
  position: absolute;
  bottom: 2%;
  left: 2%;
  border-radius: 20%;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10pt;
  color: white;
}

</style>