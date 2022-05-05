<template>
  <modal-window :style="{'backgroundColor': 'floralwhite'}" v-touch:swipe="close_self" >
    <button-close @close_self="close_self" />

    <div>
      {{ leader.name }}
    </div>

    <div class="leader_border" :style="border(leader)">
      <img class="img" :src="leader.image" v-if="leader.image" alt="">
    </div>

    <div class="damage_and_hp">
      <div class="diamond" :style="background_color(leader)"></div>
      <h3> Урон <br>
        &dagger;{{ leader.damage }}
      </h3>


      <div class="circle" :style="{'backgroundColor': 'orange'}"
           v-if="leader.ability.name === 'damage-all'">
        <span>&#9850;</span>
      </div>
      <div class="circle" :style="{'backgroundColor': 'orange'}"
           v-if="leader.ability.name === 'spread-damage'">
        <span :style="{'font-size': '14pt'}">&#9798;</span>
      </div>

      <div class="triangle" :style="background_color(leader)" v-if="leader.has_passive"></div>
      <div class="text" :style="{'font-size': '20pt'}" v-if="leader.has_passive"><b>&#8987;</b></div>


      <div class="charges"></div>
      <h3> Заряды <br>
        {{ leader.charges }}&#8607;
      </h3>
    </div>

    <div class="text">
      <b>СПОСОБНОСТЬ</b> - {{ leader.ability.description }}
    </div>

    <div class="text" v-if="leader.has_passive"><b>ПАССИВНАЯ СПОСОБНОСТЬ</b></div>
    <div class="text" v-if="leader.has_passive">{{ leader.passive_ability.description }}</div>

  </modal-window>
</template>

<script>
import { border_leader, background_color } from '@/logic/border_styles'
import ButtonClose from "@/components/UI/ButtonClose"
import ModalWindow from "@/components/UI/ModalWindow"
export default {
  name: 'leader-modal',
  components: {ModalWindow, ButtonClose},
  props: {
    leader: {
      required: true,
      type: Object,
    },
  },
  methods: {
    close_self() {
      this.$emit('close_leader_modal')
    },
    border(leader) {
      return border_leader(leader)
    },
    background_color(leader) {
      return background_color(leader)
    },
  },
  emits: [
    'close_leader_modal',
  ],
}
</script>

<style scoped>

.leader_border {
  width: 65%;
  height: 60%;
  border-radius: 1%;
  display: inline;
  float: left;
  margin-left: 1%;
  margin-bottom: 1%;
}

.damage_and_hp {
  width: 30%;
  height: 60%;
  display: inline;
  float: right;
  margin-bottom: 3%;
  /*border: solid 2px red;*/
}

h3 {
  font-size: 14pt;
  display: block;
}

.img {
  width: 99%;
  height: 99%;
  margin: auto;
}

.charges {
  width: 20%;
  height: 10%;
  background-color: hotpink;
  border-radius: 20%;
  margin: 3% auto auto;
}

.triangle {
  width: 5vh;
  height: 5vh;
  border-radius: 20%;
  font-size: 10pt;
  margin: 3% auto auto;
}

.diamond {
  /*height: 12%;*/
  /*width: 36%;*/
  height: 5vh;
  width: 5vh;
  transform: rotateX(45deg) rotateZ(45deg);
  margin: 3% auto auto;
  /* background-color: purple; */
  /* border: solid 1px yellow; */
}

.circle {
  display: inline-grid;
  width: 25%;
  height: 15%;
  background: orangered;
  border-radius: 50%;
  margin: 3% auto;
}

span {
  position: relative;
  font-size: 22pt;
  color: white;
  margin: auto;
}

.text {
  margin-bottom: 1%;
  font-size: 14pt;
}

</style>