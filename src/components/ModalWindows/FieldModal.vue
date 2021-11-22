<template>

<div class="field_view" v-if="flag">
  <h2> Жизни карты - {{ fieldindex.hp }} </h2><br>
  <h2> Урон карты - {{ fieldindex.dmg }} </h2><br>
  <p>ОПИСАНИЕ</p>

 </div>
 <div @mouseup.right="flag = true" @mouseleave="flag = false" v-if='fieldindex'>
    <p class='field_view__content'>о</p>
 </div>
 

</template>

<script>
export default {
  name: 'field-modal',
  props: {
    fieldindex: {  // объект противника по индексу поля
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

.field_view {
  background: pink;
  width: 400px;
  height: 300px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15pt;

}

.field_view__content {
  width: 70px;
  height: 30px;
  font-size: 2pt;
}

</style>