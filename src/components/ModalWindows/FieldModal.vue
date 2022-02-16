<template>
<div class="field_view" v-if="flag">
  <h2> Жизни карты - {{ enemy.hp }} </h2><br>
  <h2> Урон карты - {{ enemy.dmg }} </h2><br>
  <h2> Ходит - {{ enemy.move }} </h2><br>
  <p>ОПИСАНИЕ</p>
 </div>
</template>

<script>
export default {
  name: 'field-modal',
  props: {
    enemy: {  // объект противника по индексу поля
      required: true,
      type: Object
    },
    flag: {
      required: true,
      type: Boolean
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

</style>