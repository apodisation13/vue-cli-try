<template>
  <div>
    <div
      class="card-enemy"
      :class="{'not-charges': enemy.hp <= 0}"
      :style="[{ backgroundImage: `url(${enemy.image})` }, card_margin(enemy)]"
    ></div>
    <div class="card-enemy-information">
      <!--Иконка хода для всех врагов, а лидеру врагов не надо, отсюда и условие-->
      <ability-circle-enemy :enemy="enemy" v-if="enemy.move" />

      <!--Иконка урона, для всех врагов или если у лидера врага есть урон-->
      <card-damage-icon
        v-if="enemy.damage || enemy.damage_per_turn"
        :style="background_color(enemy)"
        :damage="enemy.damage_per_turn ? enemy.damage_per_turn : enemy.damage"
      />

      <!--У лидера врагов есть абилка на самолечение-->
      <heal-ability
        v-if="enemy.heal_self_per_turn"
        :heal="enemy.heal_self_per_turn"
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
import {
  background_color,
  background_color_hp,
  card_margin,
} from "@/logic/border_styles"
import DeathwishAbility from "@/components/UI/CardsUI/Enemies/DeathwishAbility"
import HeartIcon from "@/components/UI/CardsUI/HeartIcon"
import CardDamageIcon from "@/components/UI/CardsUI/CardDamageIcon"
import EnemyLocked from "@/components/UI/CardsUI/Enemies/EnemyLocked"
import AbilityCircleEnemy from "@/components/UI/CardsUI/Enemies/AbilityCircleEnemy"
import EnemyShield from "@/components/UI/CardsUI/Enemies/EnemyShield"
import CardPassive from "@/components/UI/CardsUI/CardPassive"
import HealAbility from "@/components/UI/CardsUI/HealAbility"

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
    HealAbility,
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


/* добавляем псевдоэлемент к семантичному селектору card-item-component*/
.not-charges::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
