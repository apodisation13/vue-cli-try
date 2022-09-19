<template>
  <img class="page_img" :src="path" alt="#" v-if="path" />
</template>

<script>
export default {
  name: "PageImage",

  data() {
    return {
      time: "",
      intervalId: null,
      isWorking: true,
      defaultImg: null,
    }
  },

  created() {
    this.updateTime()
    this.intervalId = setInterval(() => {
      this.updateTime()
    }, 1000)
  },

  beforeUnmount() {
    clearInterval(this.intervalId)
  },

  methods: {
    updateTime() {
      if (this.isWorking) {
        this.time = new Date().getHours()
      }
    },
  },

  computed: {
    path() {
      const image = this.$router.currentRoute.value.meta.image
      if (!image) return ""

      if (image.default) {
        clearInterval(this.intervalId)
        return require("@/assets/" + image.default)
      }

      if (this.time === "") return null
      let actualtime = parseInt(this.time)
      // actualtime = 22 проверка ручками
      if (actualtime >= 5 && actualtime < 11) {
        return require("@/assets/" + image.morning)
      } else if (actualtime >= 11 && actualtime < 18) {
        return require("@/assets/" + image.day)
      } else if (actualtime >= 18 && actualtime < 22) {
        return require("@/assets/" + image.evening)
      } else if (actualtime >= 22 || actualtime < 5) {
        return require("@/assets/" + image.night)
      } else {
        return ""
      }
    },
  },
}
</script>

<style scoped>
.page_img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
