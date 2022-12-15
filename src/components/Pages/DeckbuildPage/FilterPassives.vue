<template>
  <div>
    <div class="global_text filter_title" @click="reset_filter_passives">
      Пассив
    </div>
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
  emits: ["set-filter", "reset-filter-passives"],
}
</script>

<style scoped>
.filter_title {
  font-size: 25px;
  margin-bottom: 15px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.passives {
  display: inline;
}
.passive {
  height: 4vh;
  width: 45%;
  margin: 1%;
}
</style>
