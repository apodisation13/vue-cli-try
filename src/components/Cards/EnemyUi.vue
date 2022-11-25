<template>
  <div>
    <div
      class="card-enemy"
      :style="[{ backgroundImage: `url(${enemy.image})` }, card_margin(enemy)]"
    ></div>
    <div class="card-enemy-information">
      <ability-circle-enemy :enemy="enemy" />
      <card-damage-icon
        :style="background_color(enemy)"
        :damage="enemy.damage"
      />
      <card-passive v-if="enemy.has_passive" :card="enemy" />
      <enemy-shield v-if="enemy.shield" />
      <enemy-locked v-if="enemy.locked" />
      <deathwish-ability v-if="enemy.has_deathwish" />
      <heart-icon
        :health="enemy.hp"
        :bgColor="background_color_hp(enemy.color)"
      />
    </div>
  </div>
</template>

<script>
import DeathwishAbility from "@/components/UI/CardsUI/Enemies/DeathwishAbility"
import HeartIcon from "@/components/UI/CardsUI/HeartIcon"
import CardDamageIcon from "@/components/UI/CardsUI/CardDamageIcon"
import EnemyLocked from "@/components/UI/CardsUI/Enemies/EnemyLocked"
import AbilityCircleEnemy from "@/components/UI/CardsUI/Enemies/AbilityCircleEnemy"
import EnemyShield from "@/components/UI/CardsUI/Enemies/EnemyShield"
import CardPassive from "@/components/UI/CardsUI/CardPassive"
import {
  background_color,
  background_color_hp,
  card_margin,
} from "@/logic/border_styles"

export default {
  name: "EnemyUi",
  components: {
    DeathwishAbility,
    HeartIcon,
    CardDamageIcon,
    EnemyLocked,
    AbilityCircleEnemy,
    EnemyShield,
    CardPassive,
  },
  props: {
    enemy: {
      required: true,
    },
  },
  methods: {
    card_margin(card) {
      return card_margin(card)
    },
    background_color(e) {
      return background_color(e)
    },
    background_color_hp(color) {
      return background_color_hp(color)
    },
  },
}
</script>

<style scoped>
.card-enemy,
.card-enemy-information {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.card-enemy {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 2px;
  overflow: hidden;
}

.card-enemy-information {
  z-index: 2;
}
</style>
