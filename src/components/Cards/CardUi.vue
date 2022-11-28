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

      <!--Здесь мы показываем все уроны, включая лидера врагов, отсюда и условие-->
      <card-damage-icon
        :style="background_color(card)"
        :damage="'damage_per_turn' in card ? card.damage_per_turn : card.damage"
      />

      <card-ability-circle :card="card" />
      <card-passive :card="card" v-if="card.has_passive" />

      <!--Условие для лидера врагов, который тоже приходит сюда, у него нет зарядов-->
      <card-charges
        v-if="'charges' in card"
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
  background_color_leader,
  background_color_hp,
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
    // собственно сама карта
    card: {
      type: Object,
      required: true,
    },
    // брать ли границу карты как для карт (по цвету), ДЕФОЛТНОЕ, или как для лидеров (по фракции)
    is_leader: {
      type: Boolean,
      default: false,
    },
    // показывать или не показывать hp (в игре не нужны жизни, везде нужны)
    hp_needed: {
      type: Boolean,
      default: false,
    },
    // показывать или не показывать зону кнопок милл\крафт, только для декбилдера
    deckbuilder: {
      type: Boolean,
      default: false,
    },
    // на странице бонусов мы показываем count, но не показываем mill/craft
    bonus: {
      type: Boolean,
      default: false,
      required: false,
    },
    // сколько у юзера этой карты
    count: {
      type: Number,
    },
    // FIXME: че это
    is_previev: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    background_color_hp(color) {
      return this.is_leader
        ? background_color_leader(this.card.faction)
        : background_color_hp(color)
    },
    background_color_charges(color) {
      return this.is_leader
        ? background_color_leader(this.card.faction)
        : background_color_charges(color)
    },
    background_color(card) {
      return background_color(card)
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
