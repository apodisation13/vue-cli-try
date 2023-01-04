<template>
  <div class="filter_types">
    <base-title-text @click="reset_filter_types">Тип</base-title-text>
    <div class="types-block">
      <div class="types" v-for="type in types" :key="type">
        <button class="type" @click="filtering(type)">
          {{ type[0] }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTitleText from '@/components/UI/BaseTitleText'
export default {
  components: { BaseTitleText },
  name: "filter-types",
  data() {
    return {
      types: ["Unit", "Special"],
    }
  },
  methods: {
    filtering(type) {
      this.$emit("set-filter", "type", type)
    },
    reset_filter_types() {
      this.$emit("reset-filter-types")
    },
  },
  emits: ["set-filter", "reset-filter-types"],
}
</script>

<style scoped>
.filter_types {
  margin-top: 35px;
}
.types-block {
  margin-top: 7px;
}
.types {
  display: inline;
}
.type {
  height: 4vh;
  width: 45%;
  margin: 1%;
}
</style>
