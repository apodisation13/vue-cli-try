<template>
  <div class="wrapper_modal" @click.stop="hideModal">
    <div @click.stop class="modal">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpModal",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    hideModal() {
      this.$emit("close-modal")
    },
  },
  emits: ["close-modal"],
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
