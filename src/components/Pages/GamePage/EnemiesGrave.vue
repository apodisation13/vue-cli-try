<template>
  <div>
    <button class="enemies_grave_btn" @click="visible = true">
      КлВр {{ enemies_len }}
    </button>
    <modal-window v-if="visible" v-touch:swipe="close_self">
      <button-close @close_self="close_self" />
      <enemy-list :enemies="enemies_grave" />
    </modal-window>
  </div>
</template>

<script>
import EnemyList from "@/components/EnemyList"
import ButtonClose from "@/components/UI/ButtonClose"
import ModalWindow from "@/components/UI/ModalWindow"

export default {
  name: "enemies-grave",
  components: { EnemyList, ButtonClose, ModalWindow },
  props: {
    enemies_grave: {
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
      return this.enemies_grave.length
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
.enemies_grave_btn {
  height: 40%;
  width: 98%;
  border: solid 1px yellow;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}
</style>
