<template>
  <div class="resource-list">
    <resource-item v-for="(count, name) in resource" :key="name" :name="name" :count="count"/>
    <!-- не удаляю на случай если придется хардкодить -->
    <!-- <div class="resource-item">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="resource-image"/> <br/>
      {{ resource.scraps }}
    </div>
    <div class="resource-item">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="resource-image"/><br/>
      {{ resource.wood }}
    </div>
    <div class="resource-item">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="resource-image"/><br/>
      {{ resource.kegs }}
    </div>
    <div class="resource-item">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="resource-image"/><br/>
      {{ resource.big_kegs }}
    </div>
    <div class="resource-item">
      <img :src="require('@/assets/'+ 'ico.png')" alt="" class="resource-image"/><br/>
      {{ resource.chests }}
    </div> -->
    <!-- не удаляю на случай если придется хардкодить -->
  </div>
</template>

<script>
import ResourceItem from '@/components/UI/ResourceItem';

export default {
  components: { ResourceItem },
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

.resource-list {
  max-width: 270px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin-left: 5px;
}
</style>