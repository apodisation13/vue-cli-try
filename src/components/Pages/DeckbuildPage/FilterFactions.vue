<template>
  <div class="filter_factions">
    <div class="factions" v-for="faction in factions" :key="faction">

      <button class="faction" @click="filtering(faction)" :style="{'backgroundColor': faction.color}">
        {{ faction.name }}
      </button>

    </div>
  </div>
</template>

<script>
export default {
  name: "filter-factions",
  computed: {
    factions() {
      return this.$store.state.factions
    },
  },
  methods: {
    filtering(faction) {
      this.$emit('filter-factions', [[faction.name, "Neutral"], true])  // выбранная фракция и флаг что выбрано ТРУ
    },
  },
  emits: ['filter-factions'],
}
</script>

<style scoped>
.filter_factions {
  margin-bottom: 12%;
}
.factions {
  margin: 0.05%;
  display: inline;
}
.faction {
  height: 4vh;
  width: 45%;
  margin: 1%;
  font-size: 8pt;
}
</style>