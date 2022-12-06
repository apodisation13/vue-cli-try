<template>
  <div>
    <button class="grave-btn" @click="flag = true">
      Сброс {{ grave_len }}
    </button>
    <modal-window v-if="flag" v-touch:swipe="close_self">
      <button-close @close_self="close_self" />
      <card-list-component :cards="grave" />
    </modal-window>
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindows/ModalWindow"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import CardListComponent from "@/components/Cards/CardListComponent"
export default {
  name: "grave-comp",
  components: { CardListComponent, ButtonClose, ModalWindow },
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
  width: 47px;
  border: solid 1px red;
  position: relative;
  border-radius: 10px;
}
</style>
