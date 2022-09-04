<template>
  <div class="settings">
    <h1 class="setting-title">Настройки</h1>
    <div class="settings-list">
      <setting-logout>
        <base-button class="setting-button">logout</base-button>
      </setting-logout>
    </div>
    <yesno-modal />
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
.setting-button:focus {
  color: #EEF1F4;
  background: #667080;
}

.setting-button:nth-child(n + 2) {
  margin-top: 13px;
}


</style>