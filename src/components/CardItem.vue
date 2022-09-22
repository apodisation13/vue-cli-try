<template>
  <div
    class="card-item"
    :style="{ backgroundImage: `url(${user_card.card.image})` }"
    :class="{'disable': user_card.count === 0}"
    :id="make_id(user_card.card, index)"
    @contextmenu.prevent
    @click.right="this.show_card_modal = true"
    v-touch:longtap="show_modal"
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

    <card-charges>{{ user_card.card.charges }}&#8607;</card-charges>

    <!-- <card-hp v-if="hp_needed">&hearts;{{ card.hp }}</card-hp> -->
    <heart-icon v-if="hp_needed" :health="user_card.card.hp"/>
    
    <!-- 
    <card-modal
      v-if="show_card_modal"
      :card="card"
      :hp_needed="hp_needed"
      @close_card_modal="show_card_modal = false"
    /> -->
    <card-modal
        v-if="show_card_modal"
        :user_card="user_card"
        :hp_needed="hp_needed"
        @close_card_modal="show_card_modal = false"
      />
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
import HeartIcon from '@/components/UI/HeartIcon'
export default {
  components: {
    CardHp,
    CardCharges,
    CardPassive,
    CardAbilityCircle,
    CardType,
    CardModal,
    CardDamageIcon,
    HeartIcon,
  },
  props: {
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
    background_color(card) {
      return background_color(card)
    },
    make_id(card, index) {
      if (!index && index !== 0) return ""
      return `${card.name}_${index}`
    },
  computed: {
      card() {
        return user_card.card
      }
    }
  },
}
</script>

<style scoped>
.card-item {
  position: relative;
  width: 80px;
  height: 100px;
  margin: 8px;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 2px;
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
  z-index: 1
}
</style>
