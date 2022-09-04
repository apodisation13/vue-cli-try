<template>
  <div
    @click.stop="toggleVisibleDialog"
  >
    <slot></slot>
    <!-- <yesno-modal 
      :visible="visible"
      @confirm="logoutProcess"
      @canсel="toggleVisibleDialog"
    /> -->
    <base-modal v-model="show_dialog" />
  </div>
</template>

<script>
// import YesnoModal from './ModalWindows/YesnoModal.vue'
import BaseModal from './UI/BaseModal.vue'

  export default {
  components: { BaseModal },
    data() {
      return {
        visible: false,
        show_dialog: false,
      }
    },
    methods: {
      toggleVisibleDialog() {
        // this.visible = !this.visible
        this.show_dialog = true;
      },
      logoutProcess() {
        // this.$store.dispatch('logout')
        // this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>