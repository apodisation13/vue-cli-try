<template>
  <div @click.stop="toggleVisibleDialog">
    <base-button>logout</base-button>
    <confirm-modal
      v-if="show_dialog"
      @confirm="logoutProcess"
      @close="toggleVisibleDialog"
    >
      <div class="title-modal">Вы уверены что хотите выйти?</div>
    </confirm-modal>
  </div>
</template>

<script>
import ConfirmModal from "@/components/ModalWindows/ConfirmModal"
import BaseButton from "@/components/UI/BaseButton"

export default {
  components: {
    ConfirmModal,
    BaseButton,
  },
  data() {
    return {
      show_dialog: false,
    }
  },
  methods: {
    toggleVisibleDialog() {
      this.show_dialog = !this.show_dialog
    },
    logoutProcess() {
      this.$store.dispatch("logout")
      this.$router.push("/")
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
