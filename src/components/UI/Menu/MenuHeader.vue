<template>
  <div class="header" v-if="menuNeeded">
<<<<<<< HEAD
    <div class="header-fixed">
      <button class="avatar" @click="showExpandedMenu" v-touch:swipe.bottom="showExpandedMenu">
        <img :src="require('@/assets/icons/'+ 'Avatar.svg')" alt="">
=======
    <div class="wrapper__avatar-resources">
      <button
        class="avatar"
        @click="showExpandedMenu"
        v-touch:swipe.bottom="showExpandedMenu"
      >
        <img :src="require('@/assets/icons/' + 'Avatar.svg')" alt="" />
>>>>>>> dev
      </button>
      <resource-list @click="$router.push('/bonus')" />
    </div>
    <div
      class="expand-menu"
      v-if="expanded"
      v-touch:swipe.top="showExpandedMenu"
    >
      <div class="expand-menu__content">
        <div class="expand-menu__action" v-for="button in routes" :key="button">
          <button class="menu-btn" @click="push(button.path)">
            {{ button.title }}
          </button>
          <span>$</span>
        </div>
        <div class="expand-menu__action bordered" @click="showExpandedMenu">
          <button class="menu-btn">Закрыть</button>
          <span>X</span>
        </div>
      </div>
<<<<<<< HEAD

=======
>>>>>>> dev
    </div>
  </div>
</template>

<script>
//import ResourceComp from "@/components/ResourceComp"
export default {
  name: "MenuHeader",
<<<<<<< HEAD
  components: {ResourceComp},
=======
  components: { ResourceList },
>>>>>>> dev
  computed: {
    // меню не нужны, если в роутере есть notRequireMenu (страницы загрузки, игры)
    menuNeeded() {
      return (
        !this.$store.state.isGame &&
        !this.$router.currentRoute.value.meta.notRequireMenu
      )
    },
    username() {
      return this.$store.getters["getUser"].username
    },
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"]
    },
  },
  data() {
    return {
      routes: [
        { title: "Главная", path: "/" },
        { title: "Правила", path: "/rules" },
        { title: "О нас", path: "/about" },
        { title: "Настройки", path: "/settings" },
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
  .header-fixed {
    /*border: solid 1px yellow;*/
    width: 99%;
    height: 7vh;
  }
}

@media screen and (max-width: 500px) {
  .header-fixed {
    /*border: solid 1px red;*/
    width: 99%;
    height: 7vh;
  }
}

.avatar {
  background: none;
  border: none;
}

.wrapper__avatar-resources {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}

.expand-menu__content {
<<<<<<< HEAD
=======
  position: fixed;
  left: 15px;
  top: 15px;
>>>>>>> dev
  display: flex;
  margin-top: 18px;
  margin-left: 10px;
  flex-direction: column;
  justify-content: space-around;
  width: 156px;
  height: 198px;
  background: #ffffff;
  border-radius: 8px;
}

.expand-menu {
  content: "";
<<<<<<< HEAD
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  left: 0px;
  top: 0px;
=======
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
>>>>>>> dev
  width: 100%;
  height: 100%;
  z-index: 2;
}

.menu-btn {
  margin: 1px;
  border: none;
  background-color: #ffffff;
}

.menu-btn:active {
  color: #263238;
}

.expand-menu__action {
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 11px;
}

.bordered {
  border-top: 1px solid rgba(38, 50, 56, 0.16);
  padding-top: 11px;
}
</style>
