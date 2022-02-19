<template>

<div class="menu">
    
  <button class="menu_button"
  @click="$router.push('/')">Гл</button>
  
  <button class="menu_button" style="backgroundColor: green;"
  v-if="level"
  @click="$router.push('/game')">И</button>
  
  <button class="menu_button"
  @click="$router.push('/levelselect')">У</button>
  
  <button class="menu_button" 
  @click="$router.push('/deckbuild')">ДБ</button>
  
  <button class="menu_button"
  @click="$router.push('/about')">О</button>

</div>
</template>

<script>
export default {
  // кнопка появится только после загрузки дефолтного уровня и деки
  computed: { 
    level() {
      return this.$store.state.level
    },
  },    
}
</script>

<style>

.menu {
  width: 100%;
  /* height: 70px; */
  max-height: 5vh;
  background-color: indigo;
  display: flex;
  align-items: center;  /* вот эта хрень отвечает за то, чтобы посередине были элементы */  
  /* padding: 0 15px; */
}

.menu_button {
  /* width: 100px; */
  width: 15vh;
  /* height: 50px; */
  max-height: 3vh;
  font-size: 6pt;
  margin-left: 5%;
}

</style>