<template>

ПОКА НЕ ИСПОЛЬЗУЕТСЯ
<div class='modal_window' v-if="show" @click.stop='close_self'>
  <div class='modal_window__content'>
  <slot></slot>
  </div>
</div>
</template>

<script>
  export default {
    props: {
      show: {
        required: true,
        default: false
      },
    },
    methods: {
      // open_self() {
      //   this.$emit('open_popup', this.visible)
      // },
      close_self() {
        alert(this.show  + 'а это из самого ёбаного окна')
        this.$emit('update-show', false)
      },
    },
    // emits: [
    //   'close_popup', 
    // ],
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

.modal_window__content {
  text-align: center;
  width: 750px;
  height: 400px;
  border: solid red 2px;
  text-align: center;
  display: inline-block;
}

</style>
