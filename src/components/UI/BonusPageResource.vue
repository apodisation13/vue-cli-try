<template>
  <div>
    <div class="element">
      <div class="price" v-if="resource_name !== 'keys'">
        <img
          :src="require(`@/assets/icons/resources/wood.svg`)"
          alt=""
          class="wood"
        />
        <span class="price-value">{{
          format_resource_price(resource_price)
        }}</span>
      </div>

      <div class="line">
        <bonus-page-resource-item
          :name="resource_name"
          :count="resource_count"
          @open_item="open_item"
          @add_item="purchase_item"
        />
      </div>

      <div
        class="item-add"
        v-if="resource_name !== 'keys'"
        @dblclick="purchase_item"
      >
        <div class="item-add_border"></div>
        <span>+</span>
      </div>
    </div>
    <yesno-modal
      v-if="modal_visible"
      :is_purchase="true"
      :item_price="resource_price"
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
      type: Number,
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
    add_item() {
      console.log("1")
      this.modal_visible = false
      this.$emit("add_item")
    },
    format_resource_price: function (price) {
      return price >= 1000 ? price / 1000 + "k" : price
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
  background: linear-gradient(
    183.6deg,
    hsl(39, 83%, 59%) 2.96%,
    hsl(47, 85%, 71%) 65.79%,
    hsl(39, 82%, 62%) 129.95%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
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
  background: linear-gradient(
    to bottom,
    hsl(39, 79%, 39%),
    hsl(44, 94%, 67%),
    hsl(39, 64%, 43%)
  );
  z-index: -2;
}

.item-add span {
  font-family: "Philosopher";
  font-size: 3rem;
  background: linear-gradient(
    183.6deg,
    hsl(39, 79%, 39%) 100%,
    hsl(44, 94%, 67%) 100%,
    hsl(39, 64%, 43%) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
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

.btn-plus {
  width: 50px;
  height: 50px;
}

.inlines {
  display: table;
  margin: 1%;
}

.kegs {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
  background-color: hsl(0, 0%, 55%);
  border: ridge 5px hsl(0, 0%, 55%);
  text-align: center;
  line-height: 7vh;
}

.kegs:active {
  top: 1px;
  left: 1px;
  background-color: hsl(0, 0%, 45%);
  border: ridge 5px hsl(0, 0%, 45%);
}
</style>
