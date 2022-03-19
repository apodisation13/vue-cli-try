<template>
  <div
      @click.right="open_level_modal"
      v-touch:longtap="open_level_modal"
      @contextmenu.prevent
  >

    {{ level.name }} <br>
    {{ level.difficulty }} <br>
    Врагов - {{ level.enemies.length }} <br>
    <!--    Лидер - <br>-->
    <!--    {{ level.enemy_leader.ability.name }}-->

    <level-modal
        v-if="show_level_modal"
        :level="level"
        @close_level_modal="show_level_modal=false"
    />

  </div>
</template>

<script>
export default {
  name: "level-preview-comp",
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