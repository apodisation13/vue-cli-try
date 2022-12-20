<template>
  <!-- <fullscreen v-model="fullscreen"> -->
  <div>
    <slot></slot>
    <div v-if="openModal && gameStarted">
      <base-modal class="priority">
        <div class="request-modal">
          <base-title-text> Перейдите в полноэкранный режим </base-title-text>
          <button-to-fullscreen text="Перейти" @click="toggleApi" />
        </div>
      </base-modal>
    </div>
  </div>
  <!-- </fullscreen > -->
</template>

<script>
import BaseModal from "@/components/ModalWindows/BaseModal"
import BaseTitleText from "@/components/UI/BaseTitleText"
import ButtonToFullscreen from "@/components/UI/Buttons/ButtonToFullscreen"
export default {
  components: {
    BaseModal,
    BaseTitleText,
    ButtonToFullscreen,
  },
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
      if (this.$fullscreen.isFullscreen) {

        screen.orientation
          .lock("portrait")
          .then(() => {
            console.log(`Locked to ${"portrait"}\n`)
          })
          .catch(error => {
            console.log(`${error}\n`)
          })
      }

      appHeight()
    })
    appHeight()
  },
}
</script>

<style scoped>
.priority {
  z-index: 9999999999;
}
.request-modal {
  padding: 10px;
  text-align: center;
}
</style>
