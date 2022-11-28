<template>
  <div class="settings">
    <h1 class="setting-title">Настройки</h1>
    <div class="settings-list">
      <setting-logout class="setting-item" />
      <setting-delete-all-levels class="setting-item" />
      <setting-sound class="setting-item" />
    </div>
  </div>
</template>

<script>
import SettingLogout from "@/components/Pages/SettingsPage/SettingLogout"
import SettingDeleteAllLevels from "@/components/Pages/SettingsPage/SettingDeleteAllLevels"
import SettingSound from "@/components/Pages/SettingsPage/SettingSound"
export default {
  components: { SettingSound, SettingDeleteAllLevels, SettingLogout },
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

.setting-item:nth-child(n + 2) {
  margin-top: 13px;
}
</style>
