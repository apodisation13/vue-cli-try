<template>
  <!-- <fullscreen v-model="fullscreen"> -->
  <div class="wrapper__bg">
    <div class="app">
      <!--картинка страницы по параметрам из роутера-->
      <page-image />
      <!--верхняя часть меню, хэдер-->
      <menu-header />

      <!--собственно рендер самого приложения через роутер, формат {путь(роут): компонент}-->
      <router-view />

      <!--нижняя часть меню, в футере, показываем только авторизованному-->
      <menu-footer v-if="isLoggedIn" />
    </div>
  </div>
  <!-- </fullscreen> -->
</template>

<script>
import MenuFooter from "@/components/UI/Menu/MenuFooter"
import MenuHeader from "@/components/UI/Menu/MenuHeader"
import PageImage from "@/components/PageImage"
// import {
//     ref,
//     toRefs,
//     reactive
//   } from 'vue'

export default {
  components: {
    PageImage,
    MenuHeader,
    MenuFooter,
  },
  // methods: {
  //     toggleApi () {
  //       this.$fullscreen.toggle()
  //     }
  //   },
  //   setup () {
  //     const root = ref()
  //     const state = reactive({
  //       fullscreen: false,
  //     })
  //     function toggle () {
  //       state.fullscreen = !state.fullscreen
  //     }
  //     return {
  //       root,
  //       ...toRefs(state),
  //       toggle
  //     }
  //   },
  async created() {
    const appHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      )
    }
    window.addEventListener("resize", appHeight)
    window.addEventListener("fullscreenchange", appHeight)
    appHeight()

    // вот здесь мы просто добавим setTimeOut и переход дальше через 2сек
    await this.$router.push("/")
    try {
      await this.$store.dispatch("check_auth") // пытаемся послать запрос на логин с данными из локалсторадж
      await this.$store.dispatch("fetchNews")
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"]
    },
  },

  mounted() {
    // const appHeight = () => {
    //   document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`)
    // }
    // window.addEventListener('resize', appHeight);
    // appHeight();
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Philosopher&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  font-family: "Roboto", "Inter", "Philosopher", sans-serif;
  /* font-family: Arial, Helvetica, sans-serif; единый на всё */
}

.app {
  padding: 0;
}

/*заблокировать перезагрузку страницы на мобилке по прокрутке вверх*/
html,
body {
  overscroll-behavior-y: contain;
}

.app {
  position: relative;
  z-index: -2;
  background: #fff;
  width: 100%;
  height: 100%;
}

.wrapper__bg {
  position: absolute;
  z-index: -3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}

@media (min-width: 900px) {
  .app {
    position: relative;
    max-width: 425px;
    /* max-height: 930px; */
    border-radius: 8px;
    margin: 0 auto;
  }
}
</style>
