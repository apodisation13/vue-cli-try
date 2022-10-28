<template>
  <div class="page-img-wrapper" :class="{ 'page-img-gradient': withGradient }">
    <img class="page_img" :src="path" alt="#" v-if="path" />
  </div>
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
      withGradient: null,
    }
  },

  created() {
    this.withGradient = this.$router.currentRoute.value.meta.withGradient
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
.page-img-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -2;
}

.page_img {
  display: block;
  width: 100%;
  height: 100%;
}

.page-img-gradient::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    #0a305b -12.88%,
    #a3abb4 33.24%,
    #0a305b 108.88%
  );
  mix-blend-mode: multiply;
}
</style>
