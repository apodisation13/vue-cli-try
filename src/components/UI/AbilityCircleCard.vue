<template>
  <!--  Кружок абилок карт игрока и лидера игрока-->
  <card-circle-heal v-if="card.ability.name === 'heal'">+&hearts;{{ card.heal }}</card-circle-heal>
  <card-circle :style="{'backgroundColor': 'orange'}" v-if="card.ability.name === 'damage-all'">
    &#9850;
  </card-circle>
  <card-circle :style="{'backgroundColor': 'orange'}" v-else-if="card.ability.name === 'spread-damage'">
    &#9798;
  </card-circle>
  <card-circle :style="{'backgroundColor': 'purple'}" v-else-if="card.ability.name === 'resurrect'">
    &#10014;&#8680;
  </card-circle>
  <card-circle :style="{'backgroundColor': 'purple'}"
               v-else-if="
        card.ability.name === 'draw-one-card' ||
        card.ability.name === 'play-from-deck' ||
        card.ability.name === 'play-from-grave'
      ">
    &#127136;
  </card-circle>
  <card-circle :style="{'backgroundColor': 'purple'}" v-else-if="card.ability.name === 'give-charges-to-card-in-hand-1'">
    +1&#8607;
  </card-circle>
</template>

<script>
import CardCircle from "@/components/UI/CardCircle";
import CardCircleHeal from "@/components/UI/CardCircleHeal";
export default {
  name: "card-ability-circle",
  components: {CardCircleHeal, CardCircle},
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>