<template>
  <modal-window>
    <button-close @close_self="close_self" />

    {{ level.name }} - {{ level.difficulty }} <br />

    Лидер - {{ level.enemy_leader.ability.name }}
    <div class="enemy_leader">
      <enemy-leader :enemy_leader="level.enemy_leader" />
    </div>

    Врагов - {{ level.enemies.length }} <br />
    <enemy-list :enemies="level.enemies" />
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindows/ModalWindow"
import ButtonClose from "@/components/UI/Buttons/ButtonClose"
import EnemyLeader from "@/components/Cards/EnemyLeader"
import EnemyList from "@/components/Cards/EnemyList"
export default {
  name: "level-modal",
  components: { EnemyList, EnemyLeader, ButtonClose, ModalWindow },
  props: {
    level: {
      required: true,
    },
  },
  methods: {
    close_self() {
      this.$emit("close_level_modal")
    },
  },
  emits: ["close_level_modal"],
}
</script>

<style scoped>
.enemy_leader {
  width: 30%;
  margin: auto;
}
</style>
