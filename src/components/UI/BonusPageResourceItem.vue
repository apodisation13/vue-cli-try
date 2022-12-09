<template>
  <div>
    <div class="resource-item" @dblclick="modal_open">
      <img
        :src="require(`@/assets/icons/resources/${name}.svg`)"
        :alt="name"
        class="resource-image"
      />
      <resource-count-rombus :isZero="!count">{{
        count
      }}</resource-count-rombus>
    </div>
    <yesno-modal
      v-if="open_item_visible && count > 0"
      bonus
      :name="name"
      @confirm="open_item"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import ResourceCountRombus from "@/components/UI/ResourceCountRombus"
import YesnoModal from "../ModalWindows/YesnoModal"

export default {
  name: "bonus-page-resource-item",
  components: { ResourceCountRombus, YesnoModal },
  data() {
    return {
      open_item_visible: false,
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    modal_open() {
      this.open_item_visible = true
    },
    open_item() {
      this.open_item_visible = false
      this.$emit("open_item")
    },
    cancel() {
      this.open_item_visible = false
    },
  },
  emits: ["open_item"],
}
</script>

<style scoped>
.resource-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  height: 90px;
}

.resource-item:active {
  top: 1px;
  left: 1px;
}

.resource-image {
  height: inherit;
}

/* @media (max-width: 640px) {
  .wrapper__resource-image {
    width: 25px;
    max-height: 25px;
  }
  .resource-image {
    max-width: 25px;
    max-height: 25px;
  }
} */
</style>
