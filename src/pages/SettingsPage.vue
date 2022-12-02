<template>
  <div class="settings">
    <h1 class="setting-title">Настройки</h1>
    <div @click="selectedSetting = null" style="margin-bottom: 10px">Назад</div>
    <!--Верхний уровень настроек-->
    <div v-if="selectedSetting === null">
      <div
        v-for="(setting, index) in settings"
        :key="index"
        @click="selectedSetting = index"
      >
        <base-button class="base-button">
          <div class="text">{{ setting }}</div>
        </base-button>
      </div>
    </div>

    <!--Уровень настроек "общие настройки"-->
    <div class="settings-list" v-if="selectedSetting === 0">
      <setting-sound class="setting-item" />
    </div>

    <!--Уровень настроек "аккаунт"-->
    <div class="settings-list" v-if="selectedSetting === 1">
      <setting-logout class="setting-item" />
      <setting-delete-all-levels class="setting-item" />
    </div>

    <!--Уровень настроек "персонализация"-->
    <div class="settings-list" v-if="selectedSetting === 2">
      <setting-choose-theme class="setting-item" />
    </div>
  </div>
</template>

<script>
import SettingLogout from "@/components/Pages/SettingsPage/SettingLogout"
import SettingDeleteAllLevels from "@/components/Pages/SettingsPage/SettingDeleteAllLevels"
import SettingSound from "@/components/Pages/SettingsPage/SettingSound"
import BaseButton from "@/components/UI/Buttons/BaseButton.vue"
import SettingChooseTheme from "@/components/Pages/SettingsPage/SettingChooseTheme.vue"
export default {
  components: {
    SettingChooseTheme,
    BaseButton,
    SettingSound,
    SettingDeleteAllLevels,
    SettingLogout,
  },
  data() {
    return {
      settings: ["Общие настройки", "Аккаунт", "Персонализация"],
      selectedSetting: null,
    }
  },
}
</script>

<style scoped>
.settings {
  padding: 15px;
}

.setting-title {
  text-align: center;
  margin-bottom: 66px;
}

.setting-item:nth-child(n + 2) {
  margin-top: 13px;
}

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
  background: linear-gradient(
    183.6deg,
    #edb13e 2.96%,
    #f4d977 65.79%,
    #eeb850 129.95%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}
</style>
