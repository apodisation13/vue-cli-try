<template>
  <div>
    <div
      v-for="(setting, index) in settings"
      :key="index"
      @click="selectSetting(index)"
    >
      <base-button class="base-button">
        <div class="text">{{ setting }}</div>
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
  font-family: "Philosopher", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.02em;
  font-feature-settings: "calt" off;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}
</style>
