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
      <enemy-ui :enemy="enemy_leader" />
    </div>
    <card-modal
      :card="enemy_leader"
      :for-enemy-leader="true"
      v-if="show_enemy_leader_modal"
      @close_card_modal="show_enemy_leader_modal = false"
    />
  </div>
</template>

<script>
import {
  background_color,
  border_leader,
  card_margin,
} from "@/logic/border_styles"
import CardModal from "@/components/ModalWindows/CardModal"
import EnemyUi from "@/components/Cards/EnemyUi"

export default {
  name: "enemy-leader",
  components: {
    EnemyUi,
    CardModal,
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
    card_margin(card) {
      return card_margin(card)
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

.card-enemy {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 2px;
  overflow: hidden;
}
</style>
