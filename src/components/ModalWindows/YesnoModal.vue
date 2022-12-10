<template>
  <div class="yes_no_modal-fade" @click="onClick">
    <!--Цвет окна настраивается в зависимости от выбранной настройки благодаря styleWrapper-->
    <div class="yes_no_modal" :style="styleWrapper">
      <!--По дефолту если мы не передали item_price, покажем просто вы уверены, да\нет-->
      <div class="text text-confirm" v-if="!item_price && !bonus">
        <span>Вы уверены?</span>
      </div>

      <!--Вот это показывает нам кнопки +- для режима бонуса, для покупки ресурсов!-->
      <div class="text text-purchase" v-else-if="bonus && is_purchase">
        <resource-item name="wood" :count="item_price * quantity" />
        <div class="quantity">
          <button class="btn btn_dec" @click="decrement">-</button>
          <span>{{ quantity }}</span>
          <button class="btn btn_inc" @click="increment">+</button>
        </div>
        <span class="price">Приобрести <resource-item :name="name" />?</span>
      </div>

      <!--Вот это показывает нам открытие ресурса из бонусов, но без покупок, само открытие-->
      <div class="text text-zero" v-else-if="bonus && !is_purchase">
        <span class="price">Открытие <resource-item :name="name" /></span>
        <span>Вы уверены?</span>
      </div>

      <!--Крафт карты-->
      <div class="text" v-else-if="!bonus && is_craft">
        <div class="price">
          <span>Стоимость - </span>
          <resource-item name="scraps" :count="item_price * -1" class="price" />
        </div>
        <span>Создать?</span>
      </div>

      <!--Милл карты-->
      <div class="text" v-else-if="!bonus && !is_craft">
        <div class="price">
          <span>Вы получите - </span>
          <resource-item name="scraps" :count="item_price" class="price" />
        </div>
        <span>Уничтожить?</span>
      </div>

      <div class="content">
        <button class="btn btn_yes" @click="confirm">Да</button>
        <button class="btn btn_no" @click="cancel">Нет</button>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceItem from "@/components/UI/ResourceItem.vue"
import { styleWrapper } from "@/logic/border_styles"

export default {
  name: "yesno-modal",
  components: { ResourceItem },
  props: {
    // для бонусной страницы мы будем показывать в окне ещё кнопки +-
    bonus: {
      type: Boolean,
      default: false,
      required: false,
    },
    // для бонусной страницы, но без покупки - то есть открытие ресурса
    is_purchase: {
      type: Boolean,
      required: false,
      default: false,
    },
    // стоимость предмета, будь то милл\крафт или покупки
    item_price: {
      type: Number,
      required: false,
    },
    // крафтим ли карту (тру) или нет (милл, фолс)
    is_craft: {
      type: Boolean,
      required: false,
      default: false,
    },
    // название ресурса, чтобы показать соответствующий ресурс
    name: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      quantity: 1,
    }
  },
  computed: {
    resource() {
      return this.$store.getters["resource"]
    },
    styleWrapper() {
      return styleWrapper(this.$store.getters["selectedTheme"])
    },
  },
  methods: {
    onClick(e) {
      if (e.target.classList.contains("yes_no_modal-fade")) this.cancel()
    },
    increment() {
      if (this.item_price * (this.quantity + 1) > this.resource.wood) return
      this.quantity += 1
    },
    decrement() {
      if (this.quantity === 1) return
      this.quantity -= 1
    },
    confirm() {
      this.$emit("confirm", this.quantity)
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
  content: "";
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
  border: 1px solid #c5a87e;
  /*background: linear-gradient(to bottom, #4a4237 0, #c5a87e 50%, #4a4237 100%);*/
  /*box-shadow: inset 0 0 0 100vw hsl(356, 89%, 18%);*/
}

.text {
  display: flex;
  flex-direction: column;
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
  font-family: "Philosopher", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 100%;

  text-align: center;
  background: linear-gradient(
    153.5deg,
    #b07b15 34.99%,
    #facf5d 57.14%,
    #b48328 82.81%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.price {
  display: flex;
  flex-direction: row;
  gap: 6px;
}

.btn_inc,
.btn_dec {
  width: 20px;
  height: 20px;
  background-color: transparent;
  color: #fddc4c;
  border: 2px solid #fddc4c;
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

  font-family: "Inter", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #58050a;

  border: 1px solid #cfb369;
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
