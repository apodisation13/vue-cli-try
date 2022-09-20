<template>
  <modal-window
    :style="{ backgroundColor: 'floralwhite' }"
    v-touch:swipe="close_self"
  >
    <button-close @close_self="close_self" />

    <div>{{ card.name }}</div>

    <div class="enemy_border" :style="border(card)">
      <img class="img" :src="card.image" v-if="card.image" alt="" />
    </div>

    <div class="damage_and_hp">
      <div class="diamond" :style="background_color(card)"></div>
      <h3>
        Урон <br />
        &dagger;{{ card.damage }}
      </h3>

      <div
        class="circle"
        :style="{ backgroundColor: 'orange' }"
        v-if="card.ability.name === 'damage-all'"
      >
        <span>&#9850;</span>
      </div>
      <div
        class="circle"
        :style="{ backgroundColor: 'orange' }"
        v-if="card.ability.name === 'spread-damage'"
      >
        <span :style="{ 'font-size': '18pt' }">&#9798;</span>
      </div>
      <div
        class="circle"
        :style="{ backgroundColor: 'green' }"
        v-else-if="card.ability.name === 'heal'"
      >
        <span :style="{ 'font-size': '12pt' }">+&hearts;{{ card.heal }}</span>
      </div>
      <div
        class="circle"
        :style="{ backgroundColor: 'purple' }"
        v-else-if="card.ability.name === 'resurrect'"
      >
        <span>&#10014;&#8680;</span>
      </div>
      <div
        class="circle"
        :style="{ backgroundColor: 'purple' }"
        v-else-if="
          card.ability.name === 'draw-one-card' ||
          card.ability.name === 'play-from-deck' ||
          card.ability.name === 'play-from-grave'
        "
      >
        <span>&#127136;</span>
      </div>
      <div
        class="circle"
        :style="{ backgroundColor: 'purple' }"
        v-else-if="card.ability.name === 'give-charges-to-card-in-hand-1'"
      >
        <span>+1&#8607;</span>
      </div>

      <div
        class="triangle"
        :style="background_color(card)"
        v-if="card.has_passive"
      ></div>
      <div
        class="text"
        :style="{ 'font-size': '20pt' }"
        v-if="card.has_passive"
      >
        <b>&#8987;</b>
      </div>

      <div class="charges"></div>
      <h3>
        Заряды <br />
        {{ card.charges }}&#8607;
      </h3>

      <div class="hp" v-if="hp_needed"></div>
      <h3 v-if="hp_needed">
        Жизни <br />
        &hearts;{{ card.hp }}
      </h3>
    </div>

    <div class="text"><b>СПОСОБНОСТЬ</b> - {{ card.ability.description }}</div>

    <div class="text" v-if="card.has_passive"><b>ПАССИВНАЯ СПОСОБНОСТЬ</b></div>
    <div class="text" v-if="card.has_passive">
      {{ card.passive_ability.description }}
    </div>
    <div class="divb">
        <button class="b" @click="mill(card)" v-if="!bonus">mill</button>
        <button class="count" v-if="!bonus">{{ this.count }}</button>
        <button class="bonus_count" v-if="bonus">У вас {{ card.count }}</button>
        <button class="b" @click="craft(card)" v-if="!bonus">craft</button>
    </div>
    <yesno-modal
        :visible="show_yesno_mill"
        :resource_value="resource_value"
        @confirm="confirm_mill"
        @cancel="cancel"
      />
      <yesno-modal
        :visible="show_yesno_craft"
        :resource_value="resource_value"
        @confirm="confirm_craft"
        @cancel="cancel"
      />
    
  </modal-window>
</template>

<script>
import { border_for_card, background_color } from "@/logic/border_styles"
import ButtonClose from "@/components/UI/ButtonClose"
import ModalWindow from "@/components/UI/ModalWindow"
import YesnoModal from '@/components/ModalWindows/YesnoModal'
export default {
  name: "card-modal",
  components: { ModalWindow, ButtonClose, YesnoModal, },
  props: {
    card: {
      // объект противника по индексу поля
      required: true,
      type: Object,
    },
    count: {
      type: Number,
    },
    hp_needed: {
      // hp только для декбилдера, для игры не нужно оно
      type: Boolean,
      default: false,
    },
    bonus: { //этот пропс используется для страницы BonusPage
      type: Boolean,
      default: false,
      required: false,
    },
    deckbuilder: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show_yesno_mill: false,
      show_yesno_craft: false,
      resource_value: undefined,
    }
  },
  methods: {
    close_self() {
      this.$emit("close_card_modal")
    },
    border(e) {
      return border_for_card(e)
    },
    background_color(e) {
      return background_color(e)
    },
    cancel() {
      this.show_yesno_mill = false
      this.show_yesno_craft = false
    },
    async mill(card) {
      let can_mill = await this.$store.dispatch("calculate_value", {
        card: this.card,
        count: this.count,
        process: "mill",
      })
      if (!can_mill) return
      this.resource_value = can_mill
      this.show_yesno_mill = true
    },
    async craft(card) {
      let can_craft = await this.$store.dispatch("calculate_value", {
        card: this.card,
        count: this.count,
        process: "craft",
      })
      if (!can_craft) return
      this.resource_value = can_craft
      this.show_yesno_craft = true
      this.card = card
    },
    async confirm_mill() {
      this.show_yesno_mill = false
      let result = await this.$store.dispatch("pay_resource", {
        scraps: this.$store.getters["resource"].scraps + this.resource_value,
      })
      if (result) await this.$store.dispatch("mill_card_action", this.card)
    },
    async confirm_craft() {
      this.show_yesno_craft = false
      let result = await this.$store.dispatch("pay_resource", {
        scraps: this.$store.getters["resource"].scraps + this.resource_value,
      })
      if (result) await this.$store.dispatch("craft_card_action", this.card)
    },
  },
}
</script>

<style scoped>
.enemy_border {
  width: 65%;
  height: 60%;
  display: inline;
  float: left;
  margin-left: 1%;
  border-radius: 1%;
  margin-bottom: 1%;
}

.img {
  width: 99%;
  height: 99%;
  margin: auto;
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

.hp {
  width: 40%;
  height: 10%;
  background-color: green;
  border-radius: 20%;
  margin: 3% auto auto;
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
.divb {
  width: 98%;
  height: 3vh;
  margin-left: 0.5%;
  margin-top: 0.2%;
}

.b {
  width: 42%;
  height: 100%;
}

.count {
  width: 13%;
  height: 100%;
}

.bonus_count {
  width: 90%;
  height: 100%;
}
</style>
