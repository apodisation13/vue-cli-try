<template>
  <div class="element">
    <div class="price" v-if="resourceName !== 'keys'">
      <img :src="require(`@/assets/icons/resources/wood.svg`)" alt="" class="wood" />
      <span class="price-value">{{ formatResourcePrice(resourcePrice) }}</span>
    </div>
    <div class="line">
      <bonus-page-resource-item :name="resourceName" :count="resourceCount" @dblclick="openItem" />
    </div>
    <div class="item-add" v-if="resourceName !== 'keys'" @dblclick="addItem">
      <div class="test"></div>
        <span>+</span>
    </div>
  </div>
</template>
<script>
import BonusPageResourceItem from "@/components/UI/BonusPageResourceItem"
export default {
  components: { BonusPageResourceItem },
  props: {
    resourceName: {
      type: String,
    },
    resourceCount: {
      type: Number,
      required: true,
    },
    resourcePrice: {
      type: Number,
    },
  },
  methods: {
    openItem: function () {
      this.$emit("open-item")
    },
    addItem: function () {
      this.$emit("add-item")
    },
    formatResourcePrice: function(price) {
      price *= -1; 
      return price >= 1000 ? price / 1000 + "k" : price;
    }
  },
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
  background: linear-gradient(183.6deg, #EDB13E 2.96%, #F4D977 65.79%, #EEB850 129.95%);
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

.test {
  position: absolute;
top: -4px;
left: -4px;
bottom: -4px;
right: -4px;
border-radius: 50%;
background: linear-gradient(to bottom, #B07B15, #FACF5D, #B48328);
z-index: -2;
}

.item-add span {
  font-family: "Philosopher";
  font-size: 3rem;
  background: linear-gradient(183.6deg, #B07B15 100%, #FACF5D 100%, #B48328 100%);
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

.scraps_wood {
  width: 30vh;
  height: 5vh;
  margin: 1%;
  border-radius: 50% 20% / 10% 40%;
  border: dashed 2px dodgerblue;
  text-align: center;
  line-height: 5vh;
  display: table-cell;
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
