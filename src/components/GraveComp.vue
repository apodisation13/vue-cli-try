<template>

  <button class="grave-btn" @click="flag=true"> 
    Сброс {{ grave_len }}
  </button>
  
  <div class="modal_window" v-if="flag">
    <button @click="flag=false">Закрыть</button><br>
    <hand-comp :hand='grave'/> 
  </div>

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
.grave-btn {
  height: 40%;
  width: 98%;
  border: solid 1px yellow;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.modal_window {
  background-color: limegreen;
  width: 100%;
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