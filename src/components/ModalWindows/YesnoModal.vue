<template>
  <div class="yes_no_modal" v-if="visible">
    Подтвердить? <br />
    <div class="content">
      <button class="btn_yes" @click="confirm">ДА</button>
      <button class="btn_no" @click="cancel">нет</button>
    </div>
    <div v-if="resource_value">Цена {{ resource_value }}</div>
  </div>
</template>

<script>
export default {
  name: "yesno-modal",
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
    resource_value: {
      type: Number,
      required: false,
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm")
    },
    cancel() {
      this.$emit("cancel")
    },
  },
  emits: ["confirm", "cancel"],
}
</script>

<style scoped>
.yes_no_modal {
  background: brown;
  width: 200px;
  height: 150px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15pt;
  z-index: 99999;
}

.content {
  width: 70px;
  height: 30px;
  font-size: 12pt;
  display: inline;
  margin: 6px;
}

.btn_yes {
  background-color: green;
  width: 50px;
  height: 50px;
}

.btn_no {
  background-color: red;
  width: 50px;
  height: 50px;
}
</style>
