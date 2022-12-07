<template>
  <div class="settings">
    <h1 class="text">Настройки</h1>
    <div
      @click="goBack"
      class="back_icon"
      v-if="selectedSetting !== null"
    ></div>

    <!--Верхний уровень настроек-->
    <div v-if="selectedSetting === null">
      <settings-list :settings="settings" @select-setting="selectSetting" />
    </div>

    <!--Уровень настроек "общие настройки"-->
    <div v-if="selectedSetting === 0">
      <settings-list
        :settings="mainSettings"
        @select-setting="selectMainSetting"
      >
        <setting-sound v-if="selectedMainSetting === 0" />
        <!--Сюда так же добавим ещё настройки-->
      </settings-list>
    </div>

    <!--Уровень настроек "аккаунт"-->
    <div v-if="selectedSetting === 1">
      <settings-list
        :settings="accountSettings"
        @select-setting="selectAccountSetting"
      >
        <!--Сюда так же добавим ещё настройки-->
        <setting-delete-all-levels v-if="selectedAccountSetting === 2" />
        <setting-logout v-if="selectedAccountSetting === 3" />
      </settings-list>
    </div>

    <!--Уровень настроек "персонализация"-->
    <div v-if="selectedSetting === 2">
      <settings-list
        :settings="personalSettings"
        @select-setting="selectPersonalSetting"
      >
        <setting-choose-theme v-if="selectedPersonalSetting === 0" />
        <setting-avatar v-if="selectedPersonalSetting === 1" />
        <!--Сюда так же добавим ещё настройки-->
      </settings-list>
    </div>
  </div>
</template>

<script>
import SettingLogout from "@/components/Pages/SettingsPage/SettingLogout"
import SettingDeleteAllLevels from "@/components/Pages/SettingsPage/SettingDeleteAllLevels"
import SettingSound from "@/components/Pages/SettingsPage/SettingSound"
import SettingChooseTheme from "@/components/Pages/SettingsPage/SettingChooseTheme.vue"
import SettingsList from "@/components/Pages/SettingsPage/SettingsList.vue"
import SettingAvatar from "@/components/Pages/SettingsPage/SettingAvatar.vue"
export default {
  components: {
    SettingAvatar,
    SettingsList,
    SettingChooseTheme,
    SettingSound,
    SettingDeleteAllLevels,
    SettingLogout,
  },
  data() {
    return {
      settings: ["Общие настройки", "Аккаунт", "Персонализация"],
      mainSettings: ["Звук", "Язык", "Яркость"],
      accountSettings: ["Данные", "Пароль", "Сброс уровней", "Выйти"],
      personalSettings: ["Цветовая тема", "Аватар", "Стиль карт"],
      selectedSetting: null,
      selectedMainSetting: null,
      selectedAccountSetting: null,
      selectedPersonalSetting: null,
    }
  },
  methods: {
    selectSetting(index) {
      this.selectedSetting = index
    },
    selectMainSetting(index) {
      this.selectedMainSetting = index
    },
    selectAccountSetting(index) {
      this.selectedAccountSetting = index
    },
    selectPersonalSetting(index) {
      this.selectedPersonalSetting = index
    },
    goBack() {
      this.selectedSetting = null
      this.selectedMainSetting = null
      this.selectedPersonalSetting = null
      this.selectedAccountSetting = null
    },
  },
}
</script>

<style scoped>
.settings {
  padding: 15px;
}

.back_icon {
  position: absolute;
  left: 22px;
  top: 115px;
  width: 35px;
  height: 35px;
  background-image: url("~@/assets/icons/buttons/back_icon.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-family: "Philosopher", serif;
  font-style: normal;
  font-weight: 700;
  font-size: 29px;
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
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;
  margin-top: 8px;
}
</style>
