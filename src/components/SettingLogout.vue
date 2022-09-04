<template>
  <div
    @click.stop="toggleVisibleDialog"
  >
    <slot></slot>
    <yesno-modal 
      :visible="visible"
      @confirm="logoutProcess"
      @canсel="toggleVisibleDialog"
    />
  </div>
</template>

<script>
import YesnoModal from './ModalWindows/YesnoModal.vue'

  export default {
  components: { YesnoModal },
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      toggleVisibleDialog() {
        this.visible = !this.visible
      },
      logoutProcess() {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>