<template>
  <img
    class="loading_img"
    :src="require('@/assets/'+ 'loading.jpg')"
    alt=""
  />
</template>

<script>
export default {
  name: "LoadingComp",
}
</script>

<style scoped>
.loading_img {
  width: 100vw;
  height: 100vh;
}
</style>