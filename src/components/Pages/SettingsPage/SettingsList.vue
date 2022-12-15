<template>
  <div>
    <div
      v-for="(setting, index) in settings"
      :key="index"
      @click="selectSetting(index)"
    >
      <base-button class="base-button">
        <div class="global_text text">{{ setting }}</div>
      </base-button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import BaseButton from "@/components/UI/Buttons/BaseButton.vue"

export default {
  name: "SettingsList",
  components: { BaseButton },
  props: {
    settings: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectSetting(index) {
      this.$emit("select-setting", index)
    },
  },
  emits: ["select-setting"],
}
</script>

<style scoped>
.base-button {
  background: linear-gradient(#1d252d, #000000, #282d33);
  margin-bottom: 13px;
  border: 2px solid #facf5d;
}
.text {
  font-size: 16px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
