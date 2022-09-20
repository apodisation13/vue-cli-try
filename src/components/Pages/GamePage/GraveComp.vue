<template>
  <div style="height: 3.5vh">
    <button class="grave-btn" @click="flag = true">
      Сброс {{ grave_len }}
    </button>
    <modal-window v-if="flag" v-touch:swipe="close_self">
      <button-close @close_self="close_self" />
      <cards-list :cards="grave" />
    </modal-window>
  </div>
</template>

<script>
import ModalWindow from "@/components/UI/ModalWindow"
import ButtonClose from "@/components/UI/ButtonClose"
import CardsList from "@/components/CardsList"
export default {
  name: "grave-comp",
  components: { CardsList, ButtonClose, ModalWindow },
  props: {
    grave: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      flag: false,
    }
  },
  computed: {
    grave_len() {
      return this.grave.length
    },
  },
  methods: {
    close_self() {
      this.flag = false
    },
  },
}
</script>

<style scoped>
.grave-btn {
  height: 98%;
  width: 98%;
  border: solid 1px yellow;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}
</style>
