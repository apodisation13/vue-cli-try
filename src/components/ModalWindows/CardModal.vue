<template>

<div class="card_view" v-if="flag">
    <h2> Урон карты - {{ handindex.dmg }} </h2><br>
    <h2> Заряды карты - {{ handindex.charges }} </h2><br>
    <h2> Тип абилки - {{ handindex.ability }} </h2><br>
    <p>ОПИСАНИЕ</p>

 </div>
 <div @mouseup.right="flag = true" @mouseleave="flag = false">
    <p class='card_view__content'>о</p>
 </div>
 

</template>

<script>
export default {
  name: 'card-modal',
  props: {
    handindex: {  // объект карты по индексу
      required: true,
    },
  },
  data() {
    return {
      flag : false
    }
    
  },
  
}
</script>

<style scoped>

.card_view {
  background: rgb(100, 6, 143);
  width: 400px;
  height: 300px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8pt;

}

.card_view__content {
  width: 30px;
  height: 50px;
  font-size: 2pt;
  text-align: center;
}

</style>