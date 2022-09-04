<template>
  <div class="wrapper_modal" @click.stop="hideModal" v-if="modelValue" >
    <div @click.stop class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: Boolean,
        required: true,
      }
    },
    methods: {
      hideModal() {
        this.$emit('update:modelValue', false);
      }
    },

  }
</script>

<style scoped>
.wrapper_modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  max-width: 335px;
  width: 100%;
  background: #fff;
  border-radius: 18px;
  padding: 45px 22px;
  display: flex;
  flex-direction: column;
}
</style>