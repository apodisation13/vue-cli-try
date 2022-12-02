<template>
  <div>
    <div v-for="(el, index) in avatars" :key="index" class="inlines">
      <div class="inlines">
        <img
          :src="require(`@/assets/icons/resources/${el.link}.svg`)"
          alt=""
          class="wood"
          @dblclick="setAvatar(el.link)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingAvatar",
  data() {
    return {
      avatars: [{ link: "wood" }, { link: "kegs" }, { link: "chests" }],
    }
  },
  methods: {
    setAvatar(path) {
      this.$store.commit("set_avatar", path)
    },
  },
}
</script>

<style scoped>
.inlines {
  display: inline;
  margin: 5px;
}

.wood {
  max-height: 60px;
}
</style>
