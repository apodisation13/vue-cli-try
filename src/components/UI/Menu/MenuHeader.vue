<template>
<div class="header" v-if="cond !== '/game'">
  <button class="menuu" @click="$router.push('/')">
    Аватарка
  </button>
  <resource-comp @click="$router.push('/bonus')" />
</div>
</template>

<script>
import ResourceComp from "@/components/ResourceComp";
export default {
  name: "MenuHeader",
  components: {ResourceComp},
  computed: {
    cond() {
      return this.$router.currentRoute.value.fullPath
    }
  },
}
</script>

<style scoped>
@media screen and (max-width: 1000px) {
  .header {
    top: 1%;
    left: 1%;
    border: solid 1px yellow;
    width: 98%;
    height: 7vh;
  }
}

@media screen and (max-width: 500px) {
  .header {
    top: 1%;
    left: 1%;
    border: solid 1px red;
    width: 98%;
    height: 7vh;
  }
}

.menuu {
  width: 13vw;
  height: 90%;
  border-radius: 50%;
}
</style>