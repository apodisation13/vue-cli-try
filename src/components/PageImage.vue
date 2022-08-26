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
    if (!this.$router.currentRoute.value.meta.image) return
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
      const image = this.$router.currentRoute.value.meta.image
      // если в роутере картинки не указаны, то картинку не рисуем
      if (!image) return ''
      return this.day ? require('@/assets/' + image.day) : require('@/assets/' + image.night)
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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 100%;
}
</style>