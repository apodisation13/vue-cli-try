<template>
  <div class="filter_factions">
    <div class="global_text filter_title">{{ title }}</div>
    <div class="factions">
      <faction-item
        v-for="faction in factions"
        :key="faction"
        :faction="faction"
        @click="filtering(faction)"
      />
    </div>
  </div>
</template>

<script>
import FactionItem from "@/components/Pages/DeckbuildPage/FactionItem"

export default {
  components: { FactionItem },
  name: "filter-factions",
  props: {
    // покажем или Фракции, или "Выберите фракцию" для новой колоды
    title: {
      required: false,
      type: String,
      default: "Фракции",
    },
  },
  computed: {
    factions() {
      return this.$store.getters["all_factions"]
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
.filter_factions {
  margin-bottom: 20px;
}

.filter_title {
  font-size: 25px;
  margin-bottom: 15px;
  background: var(--primary-gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.factions {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
