<template>

<div class="menu">
    
  <!-- <div>Игра</div> -->
    <div class="menu_buttons">
      <button class="menu_button" @click="$router.push('/')">Главная</button>
      <button class="menu_button" @click="$router.push('/game')">Игра</button>
      <button class="menu_button" @click="$router.push('/about')">О нас</button>
      <button class="menu_button" @click="$router.push('/deckbuild')">Деки</button>
    </div>

</div>
</template>

<script>
export default {
    
}
</script>

<style>

.menu {
  height: 70px;
  background-color: indigo;
  display: flex;
  align-items: center;  /* вот эта хрень отвечает за то, чтобы посередине были элементы */  
  padding: 0 15px;
}

/* .menu_buttons {
  margin-left: auto ;
} */


.menu_button {
  width: 100px;
  height: 50px;
  font-size: 12pt;
  margin-left: 20px;
}

</style>