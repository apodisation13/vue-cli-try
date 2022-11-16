<template>
  <div>
    <div
      class="card-item-component"
      @contextmenu.prevent
      @click.right="show_modal"
      v-touch:longtap="show_modal"
      :id="make_id(card, index)"
    >
      <div class="card-item-wrapper">
        <div
          class="card-item"
          :style="[{ backgroundImage: `url(${card.image})` }, border(card)]"
          :class="{ disable: count === 0 }"
        ></div>
      </div>
      <div class="card-item-information">
        <special-type-of-card
          :color="card.color"
          v-if="card.type === 'Special'"
        />

        <card-damage-icon
          :style="background_color(card)"
          :damage="card.damage"
        />

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
      </div>
    </div>
    <card-modal
      v-if="show_card_modal"
      :count="count"
      :card="card"
      :user_card="user_card"
      :hp_needed="hp_needed"
      :deckbuilder="deckbuilder"
      :bonus="bonus"
      @close_card_modal="show_card_modal = false"
    />
  </div>
</template>

<script>
import {
  background_color,
  background_color_hp,
  background_color_charges,
  border_for_card,
  border_leader,
} from "@/logic/border_styles"
import CardModal from "@/components/ModalWindows/CardModal"
import CardAbilityCircle from "@/components/UI/CardsUI/AbilityCircleCard"
import CardPassive from "@/components/UI/CardsUI/CardPassive"
import CardCharges from "@/components/UI/CardsUI/CardCharges"
import CardDamageIcon from "@/components/UI/CardsUI/CardDamageIcon"
import HeartIcon from "@/components/UI/CardsUI/HeartIcon"
import SpecialTypeOfCard from "@/components/UI/CardsUI/SpecialTypeOfCard"
export default {
  components: {
    CardCharges,
    CardPassive,
    CardAbilityCircle,
    CardModal,
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
  data() {
    return {
      show_card_modal: false,
    }
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
    make_id(card, index) {
      if (!index && index !== 0) return ""
      return `${card.name}_${index}`
    },
    show_modal() {
      this.show_card_modal = true
    },
    border(card) {
      return this.is_leader ? border_leader(card) : border_for_card(card)
    },
  },
  emits: ["open_card_modal"],
}
</script>

<style scoped>
.card-item-component {
  position: relative;
}

.card-item-wrapper {
  border-radius: 2px;
  overflow: hidden;
}
.card-item {
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 2px;
}

.card-item::before {
  content: "";
  display: block;
  padding-top: 143%;
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
}
</style>
