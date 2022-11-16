<template>
  <div>
    <div
      class="enemy-leader"
      :style="border(enemy_leader)"
      @contextmenu.prevent
      @click.right="open_card_modal"
      v-touch:longtap="open_card_modal"
      @dblclick="exec_enemy_leader"
      :id="`enemy_leader_${enemy_leader.name}`"
    >
      <img
        class="img"
        :src="enemy_leader.image"
        alt=""
        v-if="enemy_leader.hp > 0 || isNaN(enemy_leader.hp)"
      />

      <card-damage-icon
        v-if="enemy_leader.damage_per_turn"
        :style="background_color(enemy_leader)"
        :damage="enemy_leader.damage_per_turn"
      />

      <card-circle-heal v-if="enemy_leader.heal_self_per_turn"
        >+&hearts;{{ enemy_leader.heal_self_per_turn }}</card-circle-heal
      >

      <heart-icon
        :health="enemy_leader.hp"
        :style="background_color(enemy_leader)"
      />

      <ability-circle-enemy-leader :enemy_leader="enemy_leader" />
      <enemy-locked v-if="enemy_leader.locked" />
    </div>

    <enemy-leader-modal
      v-if="show_enemy_leader_modal"
      :enemy_leader="enemy_leader"
      @close_enemy_leader_modal="show_enemy_leader_modal = false"
    />
  </div>
</template>

<script>
import { background_color, border_leader } from "@/logic/border_styles"
import EnemyLeaderModal from "@/components/ModalWindows/EnemyLeaderModal"
import CardCircleHeal from "@/components/UI/CardCircleHeal"
import AbilityCircleEnemyLeader from "@/components/UI/AbilityCircleEnemyLeader"
import EnemyLocked from "@/components/UI/CardsUI/EnemyLocked"
import CardDamageIcon from "@/components/UI/CardsUI/CardDamageIcon"
import HeartIcon from "@/components/UI/CardsUI/HeartIcon"

export default {
  name: "enemy-leader",
  components: {
    HeartIcon,
    CardDamageIcon,
    EnemyLocked,
    AbilityCircleEnemyLeader,
    CardCircleHeal,
    EnemyLeaderModal,
  },
  props: {
    enemy_leader: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      show_enemy_leader_modal: false,
    }
  },
  methods: {
    open_card_modal() {
      this.show_enemy_leader_modal = true
    },
    border(leader) {
      return border_leader(leader)
    },
    background_color(leader) {
      return background_color(leader)
    },
    style(leader) {
      if (isNaN(leader.hp) && leader.hp.includes("-"))
        return { backgroundColor: "red" }
      else if (isNaN(leader.hp) && leader.hp.includes("+"))
        return { backgroundColor: "lime" }
      else return { backgroundColor: "green" }
    },
    exec_enemy_leader() {
      this.$emit("exec_enemy_leader")
    },
  },
  emits: ["exec_enemy_leader"],
}
</script>

<style scoped>
.enemy-leader {
  height: 18vh;
  width: 98%;
  border: solid 2px black;
  border-radius: 2%;
  margin-bottom: 2px;
  margin-top: 2px;
  position: relative;
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
