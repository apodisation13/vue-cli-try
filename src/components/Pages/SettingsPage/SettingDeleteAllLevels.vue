<template>
  <div @click.stop="toggleVisibleDialog">
    <base-button>reset levels</base-button>
    <confirm-modal
      v-if="show_dialog"
      @confirm="resetLevels"
      @close="toggleVisibleDialog"
    >
      <div class="title-modal">Точно обнулить уровни?</div>
    </confirm-modal>
  </div>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton"
import ConfirmModal from "@/components/ModalWindows/ConfirmModal"
export default {
  name: "SettingDeleteAllLevels",
  components: { ConfirmModal, BaseButton },
  data() {
    return {
      show_dialog: false,
    }
  },
  methods: {
    toggleVisibleDialog() {
      this.show_dialog = !this.show_dialog
    },
    async resetLevels() {
      const result = await this.$store.dispatch("reset_levels")
      console.log(result)
      this.toggleVisibleDialog()
    },
  },
}
</script>

<style scoped>
.title-modal {
  font-weight: 700;
  font-size: 1.5rem;
  color: #667080;
  margin-bottom: 20px;
}
</style>
