<template>
  <div class="cards">

    <div class="card_in_list" :style="border(card.card)"
         v-for="card in cards" :key='card'
         @dblclick="chose_player_card(card)"
    >
      <div class="c">
        <card-comp
            :card="card"
            :hp_needed="hp_needed"
            :deckbuilder="deckbuilder"
        />
      </div>
      <div class="divb" v-if="deckbuilder">
        <button class="b" @click="s(card)">mill</button>
        <button class="b">{{ card.count }}</button>
        <button class="b">craft</button>
      </div>

      <br>
    </div>
  </div>
</template>

<script>
import { border_for_card, border_leader } from '@/logic/border_styles'
import CardComp from "@/components/CardComp"
export default {
  name: "cards-list",
  components: {CardComp},
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
  },
  methods: {
    chose_player_card(card) {
      this.$emit('chose_player_card', card)  // передаём this.index по эмиту
    },
    border(card) {
      if (!this.for_leaders) return border_for_card(card)
      else if (this.for_leaders) return border_leader(card)
    },
    s(card) {
      alert(card.card.name)
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
  width: 33%;
  height: 100%;
}

</style>