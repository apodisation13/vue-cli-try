<template>
  <img class="page_img" :src="path" alt="#" />
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
    // console.log(this.$router.currentRoute.value.meta.image);
    // несколько раз в начале вернет indefined
    // if (!this.$router.currentRoute.value.meta.image) return '';
    // при маршрутизации meta объект не успевает подгрузиться и возвращает undefined
    // проверка на 23 строке ломает код, т.к. единожды вернув false код не будет пытаться больше
    // подгрузить картинку.
    // есть мысли что тут как-то виновата фишка с ленивой подгрузкой в маршрутизации
    // https://v3.router.vuejs.org/ru/guide/advanced/lazy-loading.html#группировка-компонентов-в-одном-фрагменте
    // const image = this.$router.currentRoute.value.meta.image;
    // console.log(image)
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
      console.log(this.$router.currentRoute.value.meta.image)
      if (this.isWorking) {
        this.time = new Date().getHours()
      }
    },
  },

  computed: {
    path() {
      const image = this.$router.currentRoute.value.meta.image
      if (!image) return ""

      if (Object.prototype.hasOwnProperty.call(image, "default")) {
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
  width: 100vw;
  /* height: 100vh; */
  z-index: -1;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
