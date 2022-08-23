<template>
  <div class="resource-list">
    <div class="resource-item" v-for="(count, name) in resource" :key="count">
      <img :src="require(`@/assets/icons/resources/${name}.png`)" :alt="name" class="resource-image"/>
      <div class="resource-count">{{ count}}</div>
      <!-- <div class="resource-item"> // не удаляю на случай если придется хардкодить
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

.resource-list {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 15px;
}

.resource-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resource-image {
  display: block;
  width: 35px;
  height: 35px;
  margin-bottom: 5px;
}
</style>