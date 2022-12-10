<template>
  <div>
    <button class="enemies_grave_btn" @click="visible = true">
      Сброс {{ enemies_len }}
    </button>
    <modal-window v-if="visible" v-touch:swipe.left="close_self">
      <button-close @close_self="close_self" />
      <enemy-list :enemies="enemies_grave" />
    </modal-window>
  </div>
</template>

<script>
import EnemyList from "@/components/Cards/EnemyList"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import ModalWindow from "@/components/ModalWindows/ModalWindow"

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
  height: 98%;
  width: 47px;
  border: solid 1px red;
  position: relative;
  border-radius: 10px;
}
</style>
