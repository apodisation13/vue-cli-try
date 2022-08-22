<template>
  <div class="resource-list">
    <div class="resource-item" v-for="item in resources" :key="item.id">
      <img :src="require(`@/assets/icons/resources/${item.image}`)" :alt="item.ru_name" class="resource-image"/>
      <div class="resource-count">{{ resource[item.name] }}</div>
    </div>
    <!-- <div class="resources">
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
    </div> -->
  </div>
</template>

<script>
export default {
  name: "resource-comp",
  data: () => ({
    resources: [
      { id: 0, name: 'scraps', ru_name: 'лоскуты', image: 'scrap.png', count: null },
      { id: 1, name: 'wood', ru_name: 'дерево', image: 'wood.png', count: null },
      { id: 2, name: 'kegs', ru_name: 'бочки', image: 'keg.png', count: null },
      { id: 3, name: 'big_kegs', ru_name: 'большие бочки', image: 'big_keg.png', count: null },
      { id: 4, name: 'chests', ru_name: 'сундуки', image: 'chest.png', count: null }
    ]
  }),
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

.resource-list {
  /* float: right; */
  /*border: solid 1px green;*/
  /* width: 73%;
  height: 100%; */
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 15px;
}

.resource-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* display: inline-block; */
  /*border: solid 1px black;*/
}

.resource-image {
  display: block;
  width: 25px;
  height: 25px;
  margin-bottom: 5px;
}
</style>