<template>
<!-- <div class='grave'>Сброс -->
  <button class="btn_grave" @click="flag=true"> 
    Сброс {{ grave_len }}
  </button>
  <div class="modal_window" v-if="flag">
    <button @click="flag=false">Закрыть</button><br>
    <hand-comp :hand='grave'/> 
  </div>
<!-- </div> -->
</template>

<script>
  export default {
    name: 'grave-comp',
    props: {
      grave: {
        required: true,
        type: Array
      },
    },
    data() {
      return {
        flag: false,
      }
    },
    computed: {
      grave_len() {return this.grave.length}
    } 
  }
</script>

<style scoped>
.grave {
    width: 100px;
    height: 75px;
    display: inline-block;
    text-align: center;
}

.btn_grave {
    width: 100px;
    height: 90%;
    background: orangered;
}

.modal_window {
  background-color: limegreen;
  width: 80%;
  height: 400px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

}
</style>