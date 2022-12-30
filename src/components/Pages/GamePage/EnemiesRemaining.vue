<template>
  <div>
    <button
      class="remaining-enemies-btn"
      @click="visible = true"
      :style="{ backgroundColor: trigger_passive ? 'yellow' : '' }"
    >
      Враги {{ enemies_len }}
    </button>
    <modal-window v-if="visible" v-touch:swipe.left="close_self">
      <button-close @close_self="close_self" />
      <enemy-list :enemies="enemies" />
    </modal-window>
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindows/ModalWindow"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import EnemyList from "@/components/Cards/EnemyList"
export default {
  name: "remaining-enemies",
  components: { EnemyList, ButtonClose, ModalWindow },
  props: {
    enemies: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    enemies_len() {
      return this.enemies.length
    },
    trigger_passive() {
      for (const e of this.enemies) {
        if (e.trigger_deck_passive) return true
      }
      return false
    },
  },
  methods: {
    close_self() {
      this.visible = false
    },
  },
}
</script>

<style scoped>
.remaining-enemies-btn {
  height: 98%;
  width: 47px;
  border: solid 1px yellow;
  position: relative;
  border-radius: 10px;
}
</style>
