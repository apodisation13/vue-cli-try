<template>
  <div
      @click.right="open_level_modal"
      v-touch:longtap="open_level_modal"
      @contextmenu.prevent
  >

    {{ level.name }} <br>
    {{ level.difficulty }} <br>
    Врагов - {{ level.enemies.length }} <br>

    <level-modal
        v-if="show_level_modal"
        :level="level"
        @close_level_modal="show_level_modal=false"
    />

  </div>
</template>

<script>
import LevelModal from "@/components/ModalWindows/LevelModal"
export default {
  name: "level-preview-comp",
  components: {LevelModal},
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
  },
}
</script>

<style scoped>

</style>