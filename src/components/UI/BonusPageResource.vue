<template>
  <div>
    <div class="element">
      <!--Значок дерева и цены, сколько он стоит, кроме ключа у которого цены нет, так как нельзя купить-->
      <div class="price" v-if="resource_name !== 'keys'">
        <img
          :src="require(`@/assets/icons/resources/wood.svg`)"
          alt=""
          class="wood"
        />
        <span class="price-value">{{ resource_price }}</span>
      </div>

      <!--Сам значок соответственного ресурса с ромбом сколько его-->
      <div class="line">
        <bonus-page-resource-item
          :name="resource_name"
          :count="resource_count"
          @open_item="open_item"
        />
      </div>

      <!--Кнопка + для покупки, для всех кроме ключа, который опять же нельзя купить-->
      <div
        class="item-add"
        v-if="resource_name !== 'keys'"
        @dblclick="purchase_item"
      >
        <div class="item-add_border"></div>
        <span>+</span>
      </div>
    </div>

    <!--Модальное окно с подтверждением покупки и кнопками +- для покупки-->
    <yesno-modal
      v-if="modal_visible"
      bonus
      is_purchase
      :item_price="resource_price"
      :name="resource_name"
      @confirm="add_item"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import BonusPageResourceItem from "@/components/UI/BonusPageResourceItem"
import YesnoModal from "../ModalWindows/YesnoModal"
export default {
  components: { BonusPageResourceItem, YesnoModal },
  props: {
    resource_name: {
      type: String,
    },
    resource_count: {
      type: Number,
      required: true,
    },
    resource_price: {
      type: [Number, Object], // По умолчанию в геттере пустой объект, вот чтобы не ругалось
    },
  },
  data() {
    return {
      modal_visible: false,
    }
  },
  methods: {
    open_item() {
      this.$emit("open_item")
    },
    add_item(quantity) {
      this.modal_visible = false
      this.$emit("add_item", quantity)
    },
    purchase_item() {
      this.modal_visible = true
    },
    cancel() {
      this.modal_visible = false
    },
  },
  emits: ["open_item", "add_item"],
}
</script>
<style>
.price {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price-value {
  font-size: 1.5rem;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.wood {
  width: 50px;
}

.item-add {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: hsl(43, 100%, 93%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-add:active {
  top: 1px;
  left: 1px;
}

.item-add_border {
  position: absolute;
  top: -4px;
  left: -4px;
  bottom: -4px;
  right: -4px;
  border-radius: 50%;
  background: var(--four-gold-gradient);
  z-index: -2;
}

.item-add span {
  font-family: "Philosopher", serif;
  font-size: 3rem;
  background: var(--four-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.element {
  /*border: solid 2px red;*/
  margin-top: 20px;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

.line {
  display: inline-block;
  margin-right: 30px;
}
</style>
