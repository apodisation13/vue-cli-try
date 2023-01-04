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
      hp_needed
      :is_leader="true"
      v-if="show_enemy_leader_modal"
      @close_card_modal="show_enemy_leader_modal = false"
    />
  </div>
</template>

<script>
import { border_leader } from "@/logic/border_styles"
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
    exec_enemy_leader() {
      this.$emit("exec_enemy_leader")
    },
  },
  emits: ["exec_enemy_leader"],
}
</script>

<style scoped>
.enemy-leader {
  position: relative;
  margin-top: 15px;
  width: 100%;
  box-shadow: -4px 0 4px rgb(0 0 0 / 50%);
}

.enemy-leader::before {
  content: "";
  display: block;
  padding-top: 143%;
}
</style>
