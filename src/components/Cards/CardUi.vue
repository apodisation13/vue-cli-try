<template>
  <div>
    <div
      class="card-item"
      :style="[{ backgroundImage: `url(${card.image})` }, card_margin(card)]"
      :class="{ disable: count === 0 }"
    ></div>
    <div class="card-item-information" v-if="!is_previev">
      <special-type-of-card
        :color="card.color"
        v-if="card.type === 'Special'"
      />

      <card-damage-icon :style="background_color(card)" :damage="card.damage" />

      <card-ability-circle :card="card" />
      <card-passive :card="card" v-if="card.has_passive" />

      <card-charges
        :charge="card.charges"
        :bgColor="background_color_charges(card.color)"
      />

      <heart-icon
        v-if="hp_needed"
        :health="card.hp"
        :bgColor="background_color_hp(card.color)"
      />

      <card-count-triangle
        v-if="deckbuilder || bonus"
        :count="count"
        :card-color="background_color_hp(card.color)"
      />
    </div>
  </div>
</template>

<script>
import CardCountTriangle from "@/components/UI/CardsUI/Cards/CardCountTriangle"
import CardCharges from "@/components/UI/CardsUI/Cards/CardCharges"
import CardPassive from "@/components/UI/CardsUI/CardPassive"
import CardAbilityCircle from "@/components/UI/CardsUI/Cards/AbilityCircleCard"
import CardDamageIcon from "@/components/UI/CardsUI/CardDamageIcon"
import HeartIcon from "@/components/UI/CardsUI/HeartIcon"
import SpecialTypeOfCard from "@/components/UI/CardsUI/Cards/SpecialTypeOfCard"
import {
  background_color,
  background_color_charges,
  background_color_hp,
  border_for_card,
  border_leader,
  card_margin,
} from "@/logic/border_styles"

export default {
  name: "CardUi",
  components: {
    CardCountTriangle,
    CardCharges,
    CardPassive,
    CardAbilityCircle,
    CardDamageIcon,
    HeartIcon,
    SpecialTypeOfCard,
  },
  props: {
    is_leader: {
      // брать границу карты как для лидеров
      type: Boolean,
      default: false,
    },
    is_previev: {
      // брать границу карты как для лидеров
      type: Boolean,
      default: false,
    },
    card: {
      type: Object,
      required: true,
    },
    user_card: {
      type: Object,
      default() {
        return null
      },
    },
    hp_needed: {
      // hp только для декбилдера, для игры не нужно оно
      type: Boolean,
      default: false,
    },
    deckbuilder: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
    },
    index: {
      type: Number,
    },
    bonus: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  methods: {
    background_color_hp(color) {
      return background_color_hp(color)
    },
    background_color_charges(color) {
      return background_color_charges(color)
    },
    background_color(card) {
      return background_color(card)
    },
    border(card) {
      return this.is_leader ? border_leader(card) : border_for_card(card)
    },
    card_margin(card) {
      return card_margin(card)
    },
  },
}
</script>

<style scoped>
.card-item,
.card-item-information {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.card-item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 2px;
  overflow: hidden;
}

.disable::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.85);
  z-index: 1;
}

.card-item-information {
  z-index: 2;
}
</style>
