<template>
  <div>
    <div @click="reset_filter_passives">Пассив</div>
    <div class="passives" v-for="passive in passives" :key="passive">
      <button class="passive" @click="filtering(passive)">
        {{ passive }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter-passives",
  data() {
    return {
      passives: [true, false],
    }
  },
  methods: {
    filtering(passive) {
      this.$emit("set-filter", "has_passive", passive)
    },
    reset_filter_passives() {
      this.$emit("reset-filter-passives")
    },
  },
  emits: ["filter-passives", "reset-filter-passives"],
}
</script>

<style scoped>
.passives {
  display: inline;
}
.passive {
  height: 4vh;
  width: 45%;
  margin: 1%;
}
</style>
