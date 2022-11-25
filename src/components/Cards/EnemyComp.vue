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
      <enemy-ui :enemy="enemy" />
    </div>
    <card-modal
      :card="enemy"
      :for-enemy="true"
      v-if="show_enemy_modal"
      @close_card_modal="show_enemy_modal = false"
    />
  </div>
</template>

<script>
import { border_for_card } from "@/logic/border_styles"
import EnemyUi from "@/components/Cards/EnemyUi"
import CardModal from "@/components/ModalWindows/CardModal"
export default {
  name: "enemy-comp",
  components: {
    CardModal,
    EnemyUi,
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
    show_modal() {
      this.show_enemy_modal = true
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
  box-shadow: -4px 0 4px rgb(0 0 0 / 50%);
}

.card-enemy-component::before {
  content: "";
  display: block;
  padding-top: 143%;
}
</style>
