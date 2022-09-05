<template>
  <div class="settings">
    <h1 class="setting-title">Настройки</h1>
    <div class="settings-list">
      <setting-logout>
        <base-button class="setting-button">logout</base-button>
      </setting-logout>
    </div>
  </div>
</template>

<script>
import SettingLogout from '../components/SettingLogout.vue'
import BaseButton from '../components/UI/BaseButton.vue'
export default {
  components: { BaseButton, SettingLogout },
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

.setting-button:nth-child(n + 2) {
  margin-top: 13px;
}
</style>

