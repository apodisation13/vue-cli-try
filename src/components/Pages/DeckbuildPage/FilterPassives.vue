<template>
  <div class="filter_passives">
    <base-title-text @click="reset_filter_passives">Пассив</base-title-text>
    <div class="passive-block">
      <div class="passives" v-for="passive in passives" :key="passive">
        <button class="passive" @click="filtering(passive)">
          {{ passive }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTitleText from '@/components/UI/BaseTitleText.vue'
export default {
  components: { BaseTitleText },
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
.filter_passives {
  margin-top: 20px;
}
.passive-block {
  margin-top: 7px;
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
