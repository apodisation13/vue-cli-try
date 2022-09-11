<template>
  <div
    @contextmenu.prevent
    @click.right="show_modal"
    v-touch:longtap="show_modal"
  >
    <img
      :class="!deckbuilder || count > 0 ? 'img' : 'img2'"
      :src="card.image"
      alt=""
      v-if="card.image"
      :id="make_id(card, index)"
    />

    <card-type v-if="card.type === 'Special'">&starf;</card-type>

    <card-diamond :style="background_color(card)"
      >&dagger;{{ card.damage }}</card-diamond
    >

    <card-ability-circle :card="card" />

    <card-passive
      :card="card"
      v-if="card.has_passive"
      :style="background_color(card)"
    />

    <card-charges>{{ card.charges }}&#8607;</card-charges>

    <card-hp v-if="hp_needed">&hearts;{{ card.hp }}</card-hp>

    <card-modal
      v-if="show_card_modal"
      :card="card"
      :hp_needed="hp_needed"
      @close_card_modal="show_card_modal = false"
    />
  </div>
</template>

<script>
import { background_color } from "@/logic/border_styles"
import CardModal from "@/components/ModalWindows/CardModal"
import CardDiamond from "@/components/UI/CardDiamond"
import CardType from "@/components/UI/CardType"
import CardAbilityCircle from "@/components/UI/AbilityCircleCard"
import CardPassive from "@/components/UI/CardPassive"
import CardCharges from "@/components/UI/CardCharges"
import CardHp from "@/components/UI/CardHp"
export default {
  name: "card-comp",
  components: {
    CardHp,
    CardCharges,
    CardPassive,
    CardAbilityCircle,
    CardType,
    CardDiamond,
    CardModal,
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
      required: false,
    },
    index: {
      type: Number,
      required: false,
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
.img {
  width: 99.3%;
  height: 99.3%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-width: 3px 4px 3px 5px;
  border-radius: 95% 4% 92% 5%/4% 95% 6% 95%;
}

.img2 {
  width: 99.3%;
  height: 99.3%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  opacity: 0.25;
  border-width: 3px 4px 3px 5px;
  border-radius: 95% 4% 92% 5%/4% 95% 6% 95%;
}
</style>
