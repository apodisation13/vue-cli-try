<template>
  <div class="wrapper_modal" @click.stop="hideModal">
    <div @click.stop class="modal">
      <h2 class="header"></h2>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PolicyModal",
  props: {
    text: {
      type: String,
      required: false,
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
  background: hsla(216, 23%, 9%, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  font-family: "Philosopher", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 100%;
  /* or 25px */

  text-align: center;
  font-feature-settings: "calt" off;

  background: linear-gradient(
    153.5deg,
    #b07b15 16.64%,
    #facf5d 58.23%,
    #b48328 106.44%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content {
  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: -0.02em;
  font-feature-settings: "calt" off;

  color: #fceabc;

  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}

.modal {
  height: 80%;
  overflow-y: scroll;
  max-width: 335px;
  width: 100%;
  background: linear-gradient(
    180deg,
    #1d252d -21.82%,
    rgba(0, 0, 0, 0.13) 44.55%,
    #282d33 109.53%
  );
  border-radius: 18px;
  padding: 45px 22px;
  display: flex;
  flex-direction: column;

  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}
</style>
