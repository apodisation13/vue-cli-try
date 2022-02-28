<template>
<div class="enemy-leader"
     :style="border(enemy_leader)"
     @contextmenu.prevent
     @click.right="open_card_modal"
     v-touch:longtap="open_card_modal"
>
  
  <img class="img" :src="enemy_leader.image" alt="">
  
  <div class="diamond"
       :style="background_color(enemy_leader)"
       v-if="enemy_leader.damage_per_turn"
  >
    <span3>&dagger;{{ enemy_leader.damage_per_turn }}</span3> 
  </div>
  
  <div class="circle" v-if="enemy_leader.heal_self_per_turn">
    <span>+&hearts;{{ enemy_leader.heal_self_per_turn }}</span>
  </div>
  
  <div class="hp">
    <span>&hearts;{{ enemy_leader.hp }}</span>
  </div>
  
  <div class="ability" 
  v-if="enemy_leader.ability.name==='damage-once'">
    <span>1</span>
  </div>  
  <div class="ability" 
  v-else-if="enemy_leader.ability.name==='damage-per-turn'">
    <span>&#128337;1</span>  
  </div>
  <div class="ability" 
  v-else-if="enemy_leader.ability.name==='heal-self-per-turn'">
    <span>+&hearts;</span>  
  </div>

</div>

  <enemy-leader-modal v-if="show_enemy_leader_modal"
    :enemy_leader='enemy_leader'
    @close_enemy_leader_modal="show_enemy_leader_modal=false"
  />

</template>

<script>

import {background_color, border_leader} from "@/logic/border_styles";

export default {
  name: 'enemy-leader',
  props: {
    enemy_leader: {
      required: true,
      type: Object
    },
  },
  data() {
    return {
      show_enemy_leader_modal: false,
    }
  },
  methods: {
    open_card_modal() {
      this.show_enemy_leader_modal = true
    },
    border(leader) {
      return border_leader(leader)
    },
    background_color(leader) {
      return background_color(leader)
    },
  },
}
</script>

<style scoped>
.enemy-leader {
  height: 18vh;
  width: 98%;
  border: solid 2px black;
  border-radius: 2%;
  margin-bottom: 2px;
  margin-top: 2px;
  position: relative;
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
  background-color: purple; 
  border: solid 1px yellow;
}

span3 {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 25%;
  right: 2%;
  color: black;
  font-size: 10pt;
  transform:  rotateZ(-45deg);
}

.circle {
  position: absolute;
  width: 34%;
  height: 4vh;
  border-radius: 50%;
  top: 30%;
  right: 3%;
  background: green;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8pt;
}

.charges {
  width: 20%;
  height: 20%;
  background-color: hotpink;
  position: absolute;
  bottom: 2%;
  right: 2%;
  border-radius: 20%;
}

.hp {
  width: 30%;
  height: 20%;
  background-color: green;
  position: absolute;
  bottom: 2%;
  left: 2%;
  border-radius: 20%;
}

.ability {
  position: absolute;
  width: 24%;
  height: 3vh;
  background: orangered;
  border-radius: 50%;
  top: 3%;
  left: 3%;
}
</style>