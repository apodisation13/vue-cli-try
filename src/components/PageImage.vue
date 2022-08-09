<template>
  <img
      class="page_img"
      :src="path()"
      alt=""
  />
</template>

<script>
export default {
  name: "PageImage",
  created() {
    // если в роутере картинки не указаны, ничего делать не будем тут
    if (!this.$router.currentRoute.value.meta.image_day) return
    setInterval(() => {
      this.date = new Date().getMinutes()
    }, 1000)
  },
  data() {
    return {
      date: 0,
      day: false,
    }
  },
  methods: {
    path() {
      const image = this.$router.currentRoute.value.meta
      // если в роутере картинки не указаны, то картинку не рисуем
      if (!image.image_day) return ''
      return this.day ? require('@/assets/' + image.image_day) : require('@/assets/' + image.image_night)
    },
  },
  watch: {
    // если часы нечетные - ставим день, четные - ставим ночь
    async date(newVal, oldVal) {
      this.day = newVal % 2 !== 0
    }
  },
}
</script>

<style scoped>
.page_img {
  position: absolute;
  width: 100vw;
  /*height: 100vh;*/
  z-index: -1;
  display: grid;
  height: 100%;
}
</style>