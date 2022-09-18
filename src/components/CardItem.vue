<template>
  <div
    class="card-item"
    :style="{ backgroundImage: `url(${this.card.image})` }"
    :class="{'disable': count === 0}"
    :id="make_id(card, index)"
  >
    <!-- @contextmenu.prevent
    @click.right="show_modal" эти события понадобятся позже
    v-touch:longtap="show_modal" -->
    <!-- <img
      :class="!deckbuilder || count > 0 ? 'img' : 'img2'"
      :src="card.image"
      alt=""
      v-if="card.image"
      :id="make_id(card, index)"
    /> -->

    <!-- <card-type v-if="card.type === 'Special'">&starf;</card-type> -->
    <card-damage-icon :style="background_color(card)" :damage="card.damage" />

    <card-ability-circle :card="card" />

    <card-passive
      :card="card"
      v-if="card.has_passive"
      :style="background_color(card)"
    />

    <card-charges>{{ card.charges }}&#8607;</card-charges>

    <card-hp v-if="hp_needed">&hearts;{{ card.hp }}</card-hp>
    <!-- 
    <card-modal
      v-if="show_card_modal"
      :card="card"
      :hp_needed="hp_needed"
      @close_card_modal="show_card_modal = false"
    /> -->
  </div>
</template>

<script>
import { background_color } from "@/logic/border_styles"
import CardModal from "@/components/ModalWindows/CardModal"
import CardType from "@/components/UI/CardType"
import CardAbilityCircle from "@/components/UI/AbilityCircleCard"
import CardPassive from "@/components/UI/CardPassive"
import CardCharges from "@/components/UI/CardCharges"
import CardHp from "@/components/UI/CardHp"
import CardDamageIcon from "@/components/UI/CardDamageIcon"
export default {
  name: "card-comp",
  components: {
    CardHp,
    CardCharges,
    CardPassive,
    CardAbilityCircle,
    CardType,
    CardModal,
    CardDamageIcon,
  },
  props: {
    card: {
      type: Object,
      required: true,
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
  },
  data() {
    return {
      show_card_modal: false,
    }
  },
  methods: {
    background_color(card) {
      return background_color(card)
    },
    show_modal() {
      this.show_card_modal = true
    },
    make_id(card, index) {
      if (!index && index !== 0) return ""
      return `${card.name}_${index}`
    },
  },
}
</script>

<style scoped>
.card-item {
  position: relative;
  width: 70px;
  height: 100px;
  margin: 8px;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.disable::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.85);
  z-index: 999
}
</style>
