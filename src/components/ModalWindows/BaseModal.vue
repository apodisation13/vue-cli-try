<template>
  <div class="background_layout_modal" @click.stop="hideModal">
    <div class="wrapper_modal">
      <div @click.stop class="modal">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    hideModal() {
      this.$emit("close-modal")
    },
  },
  emits: ["close-modal"],
}
</script>

<style scoped>
.background_layout_modal {
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
  backdrop-filter: blur(5px);
}

.wrapper_modal {
  padding: 1px;
  background-image: linear-gradient(
    180deg,
    #4A4237 0%,
    #C5A87E 50%,
    #4A4237 100%
    );
  border-radius: 20px;
  max-width: 340px;
  width: 100%;
  margin: 10px;
}

.modal {
  background: linear-gradient(
    180deg, 
    #1E2834 0%, 
    #0A0B0C 100%
  );
  border-radius: 20px;
}
</style>
