<template>

  <div class="enemy" :style="border(enemy)"
       @contextmenu.prevent
       @click.right="show_modal"
       v-touch:longtap="show_modal"
  >

    <img class="img" :src="enemy.image" v-if="enemy.image" alt="">

    <card-diamond :style="background_color(enemy)">&dagger;{{ enemy.damage }}</card-diamond>

    <card-passive v-if="enemy.passive" :style="background_color(enemy)"/>

    <enemy-shield v-if="enemy.shield"/>

    <card-hp :style="style(enemy)">&hearts;{{ enemy.hp }}</card-hp>
    
    <ability-circle-enemy :enemy="enemy"/>
  </div>

  <enemy-modal
      v-if="show_enemy_modal"
      :enemy='enemy'
      @close_field_modal="show_enemy_modal=false"
  />

</template>

<script>
import { border_for_card, background_color } from '@/logic/border_styles'
import EnemyModal from "@/components/ModalWindows/EnemyModal"
import CardDiamond from "@/components/UI/CardDiamond"
import CardPassive from "@/components/UI/CardPassive"
import EnemyShield from "@/components/UI/EnemyShield"
import CardHp from "@/components/UI/CardHp"
import AbilityCircleEnemy from "@/components/UI/AbilityCircleEnemy"
export default {
  name: 'enemy-comp',
  components: {AbilityCircleEnemy, CardHp, EnemyShield, CardPassive, CardDiamond, EnemyModal},
  props: {
    enemy: {
      required: true,
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
    background_color(e) {
      return background_color(e)
    },
    show_modal() {
      this.show_enemy_modal = true
    },
    style(enemy) {
      if (isNaN(enemy.hp) && enemy.hp.includes('-')) return {'backgroundColor': 'red'}
      else if (isNaN(enemy.hp) && enemy.hp.includes('+')) return {'backgroundColor': 'lime'}
      else return {'backgroundColor': 'green'}
    },
  },  
}
</script>

<style scoped>
.enemy {
  width: 98%;
  height: 17vh;
  border-radius: 2%;
  position: relative;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.img {
  width: 99%;
  height: 99%;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>