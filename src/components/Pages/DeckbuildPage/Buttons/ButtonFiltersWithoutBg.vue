<template>
  <div class="filter-button">
    <base-title-text>
      <slot></slot>
    </base-title-text>
  </div>
</template>

<script>
import BaseTitleText from "@/components/UI/BaseTitleText"
export default {
  components: { BaseTitleText },
}
</script>

<style scoped>
.filter-button {
  width: 100%;
  border: 1px solid #facf5d;
  border-radius: 5px;
  padding: 10px;
  margin-right: 5px;
  margin-left: 5px;
}
.filter-button:first-child {
  margin-left: 0;
}
.filter-button:last-child {
  margin-right: 0;
}
</style>
