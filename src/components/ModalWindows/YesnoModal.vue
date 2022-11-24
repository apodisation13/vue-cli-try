<template>
  <div class="yes_no_modal-fade" v-if="visible">
    <div class="yes_no_modal">
      <div class="text text-confirm">
        <span>Вы уверены?</span>
      </div>
      <div class="content">
        <button class="btn btn_yes" @click="confirm">Да</button>
        <button class="btn btn_no" @click="cancel">Нет</button>
      </div>
      <div v-if="resource_value">Цена {{ resource_value }}</div>
    </div>
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
.yes_no_modal-fade {
  position: fixed;
  content: '';
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.yes_no_modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 350px;
  height: 210px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15pt;
  z-index: 9999;

  /* Градиентная обводка */
  border: 3px solid transparent;
  background: linear-gradient(to bottom, #4A4237 0, #C5A87E 50%, #4A4237 100%);
  box-shadow: inset 0px 0px 0px 100vw hsl(356, 89%, 18%);
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text span {
  font-family: 'Philosopher';
font-style: normal;
font-weight: 700;
font-size: 26px;
line-height: 100%;

text-align: center;
background: linear-gradient(153.5deg, #B07B15 34.99%, #FACF5D 57.14%, #B48328 82.81%);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
text-fill-color: transparent;
}
.content {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.btn {
  width: 120px;
  height: 35px;
  background: hsl(44, 94%, 67%);
  box-shadow: inset 0 0 5px 5px rgba(0, 0, 0, 0.25);

  font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 16px;
color: #58050A;

  border: 1px solid #CFB369;
  border-radius: 6px;
}
.btn_yes {
  /* background-color: green; */

}

.btn_no {
  /* background-color: red; */
}
</style>
