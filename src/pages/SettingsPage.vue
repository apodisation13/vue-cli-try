<template>
  <div class="settings">
    <h1 class="setting-title">Настройки</h1>
    <div class="settings-list">
      <base-button class="setting-button">logout</base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/UI/BaseButton.vue'
export default {
  components: { BaseButton },
}
</script>

<style scoped>
.settings {
  padding: 15px;
}

.setting-title {
  text-align: center;
  margin: 75px;
}

.setting-button {
  padding: 13px;
  text-align: center;
  background: #EEF1F4;
  border-radius: 6px;
  color: #667080;
  font-weight: 700;
  font-size: 1rem;
}

.setting-button:hover {
  color: #EEF1F4;
  background: #667080;
}

.setting-button:nth-child(n + 2) {
  margin-top: 13px;
}


</style>