<template>
  <div class="filter_factions">
    <div class="filter_title">Фракции</div>
    <div class="factions">
      <faction-item
        v-for="faction in factions"
        :key="faction"
        :faction="faction"
      />
    </div>
  </div>
</template>

<script>
import FactionItem from "@/components/Pages/DeckbuildPage/FactionItem"

export default {
  components: { FactionItem },
  name: "filter-factions",
  computed: {
    factions() {
      return this.$store.state.database.factions
    },
  },
  methods: {
    filtering(faction) {
      // выбранная фракция и флаг что выбрано ТРУ
      this.$emit("set-filter", "faction", faction.name)
      // this.$emit("filter-factions", [[faction.name, "Neutral"], true])
    },
  },
  emits: ["set-filter"],
}
</script>

<style scoped>
.filter_title {
  background: linear-gradient(
    183.6deg,
    #edb13e 2.96%,
    #f4d977 65.79%,
    #eeb850 129.95%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-family: "Philosopher";
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 15px;
  text-align: center;
}

.factions {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
