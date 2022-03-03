<template>
<div class="levels" >
  ВЫБЕРИТЕ УРОВЕНЬ (дважды ЛКМ) <br>

  <div class="level" :class="{'level_btn_selected': index === selected}"
    v-for="(level, index) in levels" :key="index"
    @dblclick="set_level(index)"
    @click.right="open_level_modal"
    v-touch:longtap="open_level_modal"
    @contextmenu.prevent
  >

    {{ level.name }} <br>
    {{ level.difficulty }} <br>
    Врагов - {{ level.enemies.length }} <br>
<!--    Лидер - <br>-->
<!--    {{ level.enemy_leader.ability.name }}-->
  
  </div>
</div>

<select-deck />

</template>

<script>
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      selected: undefined,
      show_level_modal: false,
    }
  },
  computed: {
    levels() {
      return this.$store.state.levels
    }
  },
  methods: {
    set_level(index) {
      this.toast.success(`Выбран уровень ${index + 1}! `, {timeout: 1000})
      this.$store.commit("set_level", this.levels[index])
      this.$store.commit('set_enemy_leader', this.levels[index].enemy_leader)
      this.selected = index
    },
    open_level_modal() {
      alert(111)
    },

    // set_default_deck() {
    //   this.$store.dispatch(
    //     "set_deck_in_play", 
    //     {deck: this.$store.state.decks[0]}  // FIXME: вот здесь косяк
    //   )  
    // },
  },
  mounted() {
    // this.set_default_deck()
  },

}
</script>

<style scoped>

.levels {
  margin: 1%;
  width: 95%;
  height: 50vh;
  border: solid 1px orchid;
}

.level {
  margin: 1%;
  width: 8vh;
  height: 5vh;
  font-size: 6pt;
  border: solid 1px brown;
  display: inline-block;
}

.level_btn_selected {
  width: 8vh;
  height: 5vh;
  font-size: 6pt;
  background-color: green;
}

</style>