<template>
  <div class="header" v-if="menuNeeded">
    <div class="wrapper__avatar-resources">
      <button class="avatar" @click="showExpandedMenu" v-touch:swipe.bottom="showExpandedMenu">
        Аватарка
      </button>
      <resource-comp @click="$router.push('/bonus')" />
    </div>
    <div class="expand_menu" v-if="expanded" v-touch:swipe.top="showExpandedMenu" >
      <button class="menu_btn"
        @click="push(button.path)"
        v-for="button in routes" :key="button"
      >
        {{ button.title }}
      </button>

      <div v-if="isLoggedIn">Привет, {{ username }}!</div>
      <button
          class="menu_btn"
          @click="logout"
          style="float: right"
          v-if="isLoggedIn"
      >
        ВЫХОД
      </button>
    </div>

  </div>
</template>

<script>
import ResourceComp from "@/components/ResourceComp"
export default {
  name: "MenuHeader",
  components: {ResourceComp},
  computed: {
    // меню не нужны, если в роутере есть notRequireMenu (страницы загрузки, игры)
    menuNeeded() {
      return !this.$router.currentRoute.value.meta.notRequireMenu
    },
    username() {
      return this.$store.getters['getUser'].username
    },
    isLoggedIn() {
      return this.$store.getters['isLoggedIn']
    },
  },
  data() {
    return {
      routes: [
        { title: "Главная", path: "/" },
        { title: "Правила", path: "/rules" },
        { title: "Настройки", path: "/settings" },
        { title: "О нас", path: "/about" },
      ],
      expanded: false,
    }
  },
  methods: {
    showExpandedMenu() {
      this.expanded = !this.expanded
    },
    push(path) {
      if (!path) return
      this.expanded = false
      this.$router.push(path)
    },
    logout() {
      this.$store.dispatch("logout")
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 1000px) {
  .header {
    /*border: solid 1px yellow;*/
    width: 99%;
    height: 7vh;
  }
}

@media screen and (max-width: 500px) {
  .header {
    /*border: solid 1px red;*/
    width: 99%;
    height: 7vh;
  }
}

.wrapper__avatar-resources {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}

.avatar {
  width: 17vw;
  height: 90%;
  border-radius: 50%;
  float: left;
}

.expand_menu {
  top: 7vh;
  /*border: solid 2px blue;*/
  width: 100%;
  height: 14vh;
  position: absolute;
  z-index: 999;
  background-color: darkorange;
}

.menu_btn {
  width: 19vw;
  height: 4vh;
  margin: 1px;
}
</style>