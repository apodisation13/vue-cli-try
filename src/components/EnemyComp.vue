<template>
  <div>
    <div
      class="card-enemy-component"
      @contextmenu.prevent
      @click.right="show_modal"
      v-touch:longtap="show_modal"
      :id="make_id(enemy, index)"
      :style="border(enemy)"
    >
    <div
      class="card-enemy"
      :style="[{ backgroundImage: `url(${enemy.image})`}, card_margin(enemy)]"
    ></div>
    <div class="card-enemy-information">
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
        <ability-circle-enemy :enemy="enemy" />
      </div>
    </div>
    <enemy-modal
      v-if="show_enemy_modal"
      :enemy="enemy"
      @close_field_modal="show_enemy_modal = false"
    />
  </div>
</template>

<script>
import {
  border_for_card,
  background_color,
  background_color_hp,
  card_margin,
} from "@/logic/border_styles"
import EnemyModal from "@/components/ModalWindows/EnemyModal"
import CardPassive from "@/components/UI/CardsUI/CardPassive"
import EnemyShield from "@/components/UI/EnemyShield"
import AbilityCircleEnemy from "@/components/UI/CardsUI/AbilityCircleEnemy"
import EnemyLocked from "@/components/UI/CardsUI/EnemyLocked"
import CardDamageIcon from "@/components/UI/CardsUI/CardDamageIcon"
import HeartIcon from "@/components/UI/CardsUI/HeartIcon"
import DeathwishAbility from "@/components/UI/AbilitiesEnemies/DeathwishAbility"
export default {
  name: "enemy-comp",
  components: {
    DeathwishAbility,
    HeartIcon,
    CardDamageIcon,
    EnemyLocked,
    AbilityCircleEnemy,
    EnemyShield,
    CardPassive,
    EnemyModal,
  },
  props: {
    enemy: {
      required: true,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      show_enemy_modal: false,
    }
  },
  methods: {
    border(e) {
      return border_for_card(e)
    },
    card_margin(card) {
      return card_margin(card);
    },
    background_color(e) {
      return background_color(e)
    },
    background_color_hp(color) {
      return background_color_hp(color)
    },
    show_modal() {
      this.show_enemy_modal = true
    },
    style(enemy) {
      if (isNaN(enemy.hp) && enemy.hp.includes("-"))
        return { backgroundColor: "red" }
      else if (isNaN(enemy.hp) && enemy.hp.includes("+"))
        return { backgroundColor: "lime" }
      else return { backgroundColor: "green" }
    },
    make_id(enemy, index) {
      return `${enemy.name}_${index}`
    },
  },
}
</script>

<style scoped>

.card-enemy-component {
  position: relative;
  width: 100%;
  box-shadow: -4px 0px 4px rgb(0 0 0 / 50%);
}

.card-enemy-component::before {
  content: "";
  display: block;
  padding-top: 143%;
}

.card-enemy, .card-enemy-information {
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
