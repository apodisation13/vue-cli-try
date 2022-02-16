<template>

<div class="menu">
    
<!-- <div>Игра</div> -->
  <!-- <div class="menu_buttons"> -->
    <button class="menu_button"
    @click="$router.push('/')">Гл</button>
    <button class="menu_button" style="backgroundColor: green;"
    @click="$router.push('/game')">И</button>
    <button class="menu_button"
    @click="$router.push('/levelselect')">У</button>
    <button class="menu_button" 
    @click="$router.push('/deckbuild')">ДБ</button>
    <button class="menu_button"
    @click="$router.push('/about')">О</button>
  <!-- </div> -->

</div>
</template>

<script>
export default {
    
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