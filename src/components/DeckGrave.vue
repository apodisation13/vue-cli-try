<template>

<div class="modal_window" v-if="flag">
 <hand-comp :hand='array' />
 </div>
 <div @mouseup.right="flag = true" @mouseleave="flag = false">
    <p class='field_view__content'>о</p>
 </div>
 

</template>

<script>
import HandComp from './HandComp'

export default {
  components: {
    HandComp
  },
  props: {
    array: {  // массив объектов - или колода или кладбище
      required: true,
    },
    // deck: {
    //   required: true,
    //   type: Array
    // },
  },
  data() {
    return {
      flag : false
    }
    
  },
  
}
</script>

<style scoped>

.modal_window {
  background-color: limegreen;
  width: 1000px;
  height: 400px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.field_view__content {
  width: 70px;
  height: 30px;
  font-size: 2pt;
}

</style>