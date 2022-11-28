<template>
  <div class="yes_no_modal-fade">
    <div class="yes_no_modal">

      <div class="text text-zero" v-if="is_zero_purchase">
        <span>У вас нет ресурса {{ name }}</span>
        <span>Желаете приобрести?</span>
      </div>

      <div class="text text-purchase" v-else-if="is_purchase">
        <div class="price">
          <span>{{ item_price }}</span>
          <img :src="require(`@/assets/icons/resources/wood.svg`)" alt="" class="wood" />
        </div>
        <div class="quantity">
          <button class="btn btn_dec" @click="decrement">-</button>
          <span>{{ quantity }}</span>
          <button class="btn btn_inc" @click="increment">+</button>
        </div>
        <span>Приобрести?</span>
      </div>

      <div class="text text-zero" v-else-if="is_open_item">
        <span>Открытие {{ name }}</span>
        <span>Вы уверены?</span>
      </div>

      <div class="text text-confirm" v-else>
        <span>Вы уверены?</span>
      </div>

      <div class="content">
        <button class="btn btn_yes" @click="confirm">Да</button>
        <button class="btn btn_no" @click="cancel">Нет</button>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "yesno-modal",
  props: {
    name: {
      type: String,
      required: false
    },
    is_zero_purchase: {
      type: Boolean,
      required: false
    },
    is_purchase: {
      type: Boolean,
      required: false
    },
    is_open_item: {
      type: Boolean,
      required: false
    },
    item_price: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      quantity: 1,
    }
  },
  methods: {
    increment() {
      this.quantity += 1
    },
    decrement() {
      if (this.quantity === 1) return;
      this.quantity -= 1
    },
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
  gap: 6px;
}

.text-zero {
  flex-direction: column;
}

.text-purchase {
  display: flex;
  flex-direction: column;
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

.price {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.wood {
  width: 25px;
}

.btn_inc,
.btn_dec {
  width: 20px;
  height: 20px;
  background-color: transparent;
  color: #FDDC4C;
  border: 2px solid #FDDC4C;
  border-radius: 50%;
}

.content {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
}

.btn_yes,
.btn_no {
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

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.btn:active {
  top: 1px;
  left: 1px;
}
</style>
