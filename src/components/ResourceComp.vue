<template>
  <div class="resource">
    <div class="resources">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="image"/> <br/>
      {{ resource.scraps }}
    </div>
    <div class="resources">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="image"/><br/>
      {{ resource.wood }}
    </div>
    <div class="resources">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="image"/><br/>
      {{ resource.kegs }}
    </div>
    <div class="resources">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="image"/><br/>
      {{ resource.big_kegs }}
    </div>
    <div class="resources">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="image"/><br/>
      {{ resource.chests }}
    </div>
  </div>
</template>

<script>
export default {
  name: "resource-comp",
  computed: {
    resource() {
      return this.$store.getters["resource"]
    },
  },
}
</script>

<style scoped>
div {
  font-family: 'Brush Script MT', cursive;
  font-size: 14pt;
}

.resource {
  float: right;
  border: solid 1px green;
  width: 82%;
  height: 100%;
}

.resources {
  display: inline-block;
  /*border: solid 1px black;*/
  margin: 1px 5px 1px 1px;
  height: 99%;
  width: 17%;
}

.image {
  width: 25px;
  height: 25px;
}
</style>