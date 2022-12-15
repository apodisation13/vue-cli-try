<template>
  <div class="filter_types">
    <div class="global_text filter_title" @click="reset_filter_types">Тип</div>
    <div class="types" v-for="type in types" :key="type">
      <button class="type" @click="filtering(type)">
        {{ type[0] }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
  margin-bottom: 12%;
}
.filter_title {
  font-size: 25px;
  margin-bottom: 15px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
