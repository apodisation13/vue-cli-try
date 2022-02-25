<template>

<div class="leader"
  @contextmenu.prevent
  @click.right="show_card_modal=true" @mouseleave="show_card_modal=false"
  @click="exec_leader"
>
  
  <!-- {{ leader.ability }} -->

  <img class="img" :src="leader.image" v-if="leader.image" alt="">
  
  <div class="diamond">
    <span3>&dagger;{{ leader.damage }}</span3> 
  </div>
  
  <div class="circle" v-if="leader.ability.name === 'damage-all'">
    <span>&#9850;</span>
  </div>
  
  <div class="charges">
    <span>{{ leader.charges }}</span>
  </div>
  
  <!-- <div class="typee">
    <span>&starf;</span>
  </div> -->

</div>

<card-modal 
:card='leader' 
:show_card_modal='show_card_modal'
/>


</template>

<script>
import { background_color } from '@/logic/border_styles'
  export default {
    name: "leader-comp",
    props: {
      leader: {
        required: true,
        type: Object
      },
    },
    data() {
      return {
        show_card_modal: false, 
      }
    },
    methods: {
      exec_leader() {
        this.$emit("exec_leader")
      },
    },

    emits: [
      "exec_leader",
    ],

  }
</script>

<style scoped>

.leader {
  height: 18vh;
  width: 98%;
  border-radius: 2%;
  margin-bottom: 2px;
  margin-top: 2px;
  position: relative;
  border: solid 1px black;
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
  background: orange;
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

/* .typee {
  width: 10%;
  height: 10%;
  left: 1%;
  top: 1%; 
  position: absolute;
} */

</style>