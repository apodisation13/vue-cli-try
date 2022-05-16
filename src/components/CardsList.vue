<template>
  <div class="cards">

    <div class="card_in_list" :style="card.card? border(card.card) : border(card)"
         v-for="card in cards" :key='card'
         @dblclick="chose_player_card(card)"
    >
      <div class="c">
        <card-comp
            :card="card.card? card.card : card"
            :hp_needed="hp_needed"
            :deckbuilder="deckbuilder"
            :count="card.count"
        />
      </div>
      <div class="divb" v-if="deckbuilder">
        <button class="b" @click="mill(card)" v-if="!bonus">mill</button>
        <button class="count" v-if="!bonus">{{ card.count }}</button>
        <button class="bonus_count" v-if="bonus">У вас {{ card.count }}</button>
        <button class="b" @click="craft(card)" v-if="!bonus">craft</button>
      </div>

      <yesno-modal
          :visible='show_yesno_mill'
          :resource_value="resource_value"
          @confirm='confirm_mill'
          @cancel='cancel'
      />
      <yesno-modal
          :visible='show_yesno_craft'
          :resource_value="resource_value"
          @confirm='confirm_craft'
          @cancel='cancel'
      />

      <br>
    </div>
  </div>
</template>

<script>
import { border_for_card, border_leader } from '@/logic/border_styles'
import CardComp from "@/components/CardComp"
import YesnoModal from "@/components/ModalWindows/YesnoModal";
export default {
  name: "cards-list",
  components: {YesnoModal, CardComp},
  props: {
    cards: {
      required: true,
      type: Array,
    },
    hp_needed: {  // hp только для декбилдера, для игры не нужно оно
      type: Boolean,
      default: false,
    },
    for_leaders: {  // брать границу карты как для лидеров
      type: Boolean,
      default: false,
    },
    deckbuilder: {
      type: Boolean,
      default: false,
    },
    bonus: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      show_yesno_mill: false,
      show_yesno_craft: false,
      card: undefined,
      resource_value: undefined,
    }
  },
  methods: {
    chose_player_card(card) {
      this.$emit('chose_player_card', card)  // передаём this.index по эмиту
    },
    border(card) {
      if (!this.for_leaders) return border_for_card(card)
      else if (this.for_leaders) return border_leader(card)
    },
    cancel() {
      this.show_yesno_mill = false
      this.show_yesno_craft = false
    },
    async mill(card) {
      let can_mill = await this.$store.dispatch("calculate_value", {card: card, process: "mill"})
      if (!can_mill) return
      this.resource_value = can_mill
      this.show_yesno_mill = true
      this.card = card
    },
    async craft(card) {
      let can_craft = await this.$store.dispatch("calculate_value", {card: card, process: "craft"})
      if (!can_craft) return
      this.resource_value = can_craft
      this.show_yesno_craft = true
      this.card = card
    },
    async confirm_mill() {
      this.show_yesno_mill = false
      let result = await this.$store.dispatch("pay_resource",
          {"scraps": this.$store.getters['resource'].scraps + this.resource_value})
      if (result) await this.$store.dispatch("mill_card_action", this.card)
    },
    async confirm_craft() {
      this.show_yesno_craft = false
      let result = await this.$store.dispatch("pay_resource",
          {"scraps": this.$store.getters['resource'].scraps + this.resource_value})
      if (result) await this.$store.dispatch("craft_card_action", this.card)
    },
  },
  emits: [
    'chose_player_card',
  ],
}
</script>

<style scoped>
.cards {
  width: 98%;
  height: 100%;
  overflow: scroll;
  /*position: relative;*/
  /*border: solid 2px red;*/
}

.card_in_list {
  width: 24%;
  height: 16.7vh;
  /* border: solid 3px gold; */
  border-radius: 2%;
  display: inline-block;
  margin-left: 0.5%;
  margin-top: 0.2%;
  position: relative;
  border-width: 3px 4px 3px 5px;
  border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
}

.c {
  width: 100%;
  height: 16vh;
  /*border: solid 3px red;*/
  border-radius: 2%;
  display: inline-block;
  margin-left: 0.5%;
  margin-top: 0.2%;
  position: relative;
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