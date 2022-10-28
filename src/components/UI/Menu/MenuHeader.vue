<template>
  <div class="header" v-if="menuNeeded">
    <img
      class="header__border"
      :src="require('@/assets/icons/VectorDown.svg')"
    />
    <div class="wrapper__avatar-resources">
      <button
        class="avatar"
        @click="showExpandedMenu"
        v-touch:swipe.bottom="showExpandedMenu"
      >
        <img
          class="avatar__btn"
          :src="require('@/assets/icons/' + 'Avatar.svg')"
          alt=""
        />
      </button>
      <resource-list @click="$router.push('/bonus')" v-if="isLoggedIn" />
    </div>
    <img class="header__border" :src="require('@/assets/icons/VectorUp.svg')" />
    <div
      class="expand-menu"
      v-if="expanded"
      v-touch:swipe.top="showExpandedMenu"
      @click.self="showExpandedMenu"
    >
      <div class="expand-menu__wrapper">
        <div class="expand-menu__content">
          <div class="expand-menu__top">
            <button
              v-for="button in routes"
              :key="button"
              class="menu-btn"
              @click="push(button.path)"
            >
              <span class="menu-btn__text">{{ button.title }}</span>
            </button>
          </div>
          <div class="expand-menu__footer" @click="showExpandedMenu">
            <button class="menu-btn">
              <span class="menu-btn__text">Закрыть</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceList from "@/components/ResourceList"
export default {
  name: "MenuHeader",
  components: { ResourceList },
  computed: {
    // меню не нужны, если в роутере есть notRequireMenu (страницы загрузки, игры)
    menuNeeded() {
      return !this.$router.currentRoute.value.meta.notRequireMenu
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
.header__border {
  padding: 0;
  margin: 0;
  display: flex;
}

@media screen and (max-width: 1000px) {
  .header {
    /*border: solid 1px yellow;*/
    width: 100%;
    height: 100px;
  }
}

@media screen and (max-width: 500px) {
  .header {
    /*border: solid 1px red;*/
    width: 100%;
    height: 100px;
  }
}

.header {
  padding-top: 15px;
}

.avatar {
  position: absolute;
  background: linear-gradient(180deg, #b07b15 0%, #facf5d 45%, #b48328 98.96%);
  border-radius: 40px;
  padding: 3px;
  border: 5px solid #1a1d24;
  height: 81px;
  width: 81px;
  margin-left: 12px;
  /* border: 3px solid linear-gradient(180deg,#B07B15 0%, #FACF5D 45%,#B48328 98.96%);  box-shadow: 5px solid #1a1d24; */
}

.avatar__btn {
  width: 100%;
  height: 100%;
}

.wrapper__avatar-resources {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    180deg,
    #1d252d -12.73%,
    rgba(0, 0, 0, 0.13) 56.36%,
    #282d33 129.82%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px -4px 10px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);
  margin: 0;
  height: 53px;
}

/* .wrapper__avatar-resources::before {
  background-image: url("../../../assets/icons/VectorDown.svg");
} */

.expand-menu__wrapper {
  background-image: url("../../../assets/header-menu-background.png");
  width: 207px;
  height: 271px;
  border-radius: 8px;
  margin-left: 10px;
  z-index: 8;
}

.expand-menu__content {
  background-image: linear-gradient(
    180deg,
    rgba(102, 112, 128, 0.95) 0%,
    rgba(21, 45, 81, 0.95) 100%
  );
  mix-blend-mode: multiply;
  position: relative;
  display: flex;
  box-sizing: border-box;
  margin-top: 18px;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 5px;
  height: 100%;
}

.expand-menu__content ::before {
  content: "";
  position: absolute;
  z-index: -2;
  inset: 0;
  border-radius: 5px;
  padding: 2px;
  background: linear-gradient(
    183.6deg,
    #edb13e 2.96%,
    #f4d977 65.79%,
    #eeb850 129.95%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.expand-menu__top {
  display: flex;
  flex-direction: column;
  margin: 20px 22px 39px 22px;
  gap: 22px;
}

.expand-menu__footer {
  border-top: 1px solid;
  border-image-source: linear-gradient(
    266.83deg,
    rgba(192, 150, 69, 0) 0%,
    #facf5d 46.39%,
    rgba(192, 150, 70, 0) 93.76%
  );
  border-image-slice: 1;
}

.expand-menu__footer button {
  margin: 15px 0px 21px 22px;
}

.expand-menu {
  content: "";
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.menu-btn {
  border: none;
  background: none;
  text-align: start;
}

.menu-btn__text {
  font-family: "Philosopher";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  /* identical to box height, or 110% */
  letter-spacing: -0.02em;
  /* текст градиент */
  background: linear-gradient(
    183.6deg,
    #edb13e 2.96%,
    #f4d977 65.79%,
    #eeb850 129.95%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
}

.bordered {
  border-top: 1px solid rgba(38, 50, 56, 0.16);
  padding-top: 11px;
}
</style>
