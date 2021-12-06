<template>
<div class="card_view" v-if="show_card_modal">
  <div class='card_view__content'>
    <div class='data'>
      <h2> Урон карты - {{ card.dmg }} </h2><br>
      <h2> Заряды карты - {{ card.charges }} </h2><br>
      <h2> Тип абилки - {{ card.ability }} </h2><br>
      <p>ОПИСАНИЕ</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'card-modal',
  props: {
    show_card_modal: {
      required: true,
      type: Boolean
    },
    card: {
      required: true,
      type: Object
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
  width: 300px;
  height: 200px;
  border: solid 1px red;
  border-radius: 5px;
  font-size: 8pt;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
}

.smth {
  width: 30px;
  height: 50px;
  font-size: 2pt;
  text-align: center;
}

/* ВОПРОС ВОТ ТУТ */
.data {
  position: relative;
  align-self: center;
}

</style>