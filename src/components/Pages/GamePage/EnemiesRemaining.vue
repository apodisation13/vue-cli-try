<template>
  <div>
    <button class="remaining-enemies-btn" @click="visible = true">
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
import EnemyList from "@/components/EnemyList"
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
  height: 40%;
  width: 98%;
  border: solid 1px yellow;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}
</style>
