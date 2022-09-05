<template>
  <div class="settings">
    <h1 class="setting-title">Настройки</h1>
    <div class="settings-list">
      <setting-logout class="setting-item" />
    </div>
  </div>
</template>

<script>
import SettingLogout from "@/components/SettingLogout"

export default {
  components: { SettingLogout },
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
