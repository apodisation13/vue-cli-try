<template>
  <div class="card-item-component"
    @contextmenu.prevent
    @click.right="show_modal"
    v-touch:longtap="show_modal"
  >
    <div class="card-item-wrapper">
      <div
        class="card-item"
        :style="[{ backgroundImage: `url(${user_card.card.image})`}, border(user_card.card)]"
        :class="{'disable': user_card.count === 0}"
        :id="make_id(user_card.card, index)"
      ></div>
    </div>
    <!-- v-touch:longtap="show_modal" -->
    <div class="card-item-information">
      <card-damage-icon 
        :style="background_color(user_card.card)" 
        :damage="user_card.card.damage"
      />

      <card-ability-circle 
        :card="user_card.card"  
      />
      <card-passive
        :card="user_card.card"
        v-if="user_card.card.has_passive"
        :style="background_color(user_card.card)"
      />

      <card-charges 
        :charge="user_card.card.charges"
        :bgColor="background_color_charges(user_card.card.color)"
      />

      <heart-icon v-if="hp_needed" 
        :health="user_card.card.hp"
        :bgColor="background_color_hp(user_card.card.color)"
      />
      
      <card-modal
          v-if="show_card_modal"
          :user_card="user_card"
          :hp_needed="hp_needed"
          @close_card_modal="show_card_modal = false"
        />
    </div>
  </div>
</template>

<script>
import { background_color, background_color_hp, background_color_charges, border_for_card, border_leader } from "@/logic/border_styles"
import CardModal from "@/components/ModalWindows/CardModal"
import CardType from "@/components/UI/CardType"
import CardAbilityCircle from "@/components/UI/AbilityCircleCard"
import CardPassive from "@/components/UI/CardPassive"
import CardCharges from "@/components/UI/CardCharges"
import CardDamageIcon from "@/components/UI/CardDamageIcon"
import HeartIcon from '@/components/UI/HeartIcon'
export default {
  components: {
    CardCharges,
    CardPassive,
    CardAbilityCircle,
    CardType,
    CardModal,
    CardDamageIcon,
    HeartIcon,
  },
  props: {
    is_leader: {
      // брать границу карты как для лидеров
      type: Boolean,
      default: false,
    },
    user_card: {
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
      return (this.is_leader) ? border_leader(card): border_for_card(card);
    },
  },
  computed: {
      card() {
        return this.user_card.card
      }
    }
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
  content: '';
  display: block;
  padding-top: 143%;
}

.disable::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.85);
  z-index: 1
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
