<template>
  <!-- <fullscreen v-model="fullscreen"> -->
    <div>
    <slot></slot>
    <div v-if="openModal && gameStarted">
    </div>
  </div>
  <!-- </fullscreen > -->
</template>

<script>
  export default {
    data() {
      return {
        fullscreen: false,
        openModal: false,
      }
    },
    methods: {
      toggle() {
        this.fullscreen = true
      },
      toggleApi() {
        this.$fullscreen.toggle()
      },
    }, 
    computed: {
      gameStarted() {
        return this.$store.state.fullscreen.isStarted
      },
    },

    created() {
      const appHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
        )
      }
      window.addEventListener("resize", appHeight)
      window.addEventListener("fullscreenchange", () => {
        this.openModal = this.$fullscreen.isFullscreen ? false : true
        appHeight()
      })
      appHeight()
    },
  }
</script>

<style scoped>

</style>