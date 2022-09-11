<template>
  <div
    class="d"
    @click.right="open_level_modal"
    v-touch:longtap="open_level_modal"
    @contextmenu.prevent
  >
    <div :style="background_color(level.level)">
      {{ level.level.name }}
    </div>
    <div>Врагов - {{ level.level.enemies.length }}</div>
    <div>
      {{ level.level.difficulty }}
    </div>
    <div v-if="!level.id" style="background-color: red">УРОВЕНЬ ЗАКРЫТ!</div>
    <div v-else style="background-color: lime">Уровень открыт</div>

    <level-modal
      v-if="show_level_modal"
      :level="level.level"
      @close_level_modal="show_level_modal = false"
    />
  </div>
</template>

<script>
import LevelModal from "@/components/ModalWindows/LevelModal"

export default {
  name: "level-preview-comp",
  components: { LevelModal },
  props: {
    level: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      show_level_modal: false,
    }
  },
  methods: {
    open_level_modal() {
      this.show_level_modal = true
    },
    background_color(deck) {
      if (deck.enemy_leader.faction === "Soldiers")
        return { backgroundColor: "blue" }
      else if (deck.enemy_leader.faction === "Monsters")
        return { backgroundColor: "red" }
      else if (deck.enemy_leader.faction === "Animals")
        return { backgroundColor: "green" }
      else return {}
    },
  },
}
</script>

<style scoped>
.d {
  width: 8vh;
  height: 10vh;
}
</style>
