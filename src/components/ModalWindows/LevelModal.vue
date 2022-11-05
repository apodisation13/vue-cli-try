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
import ModalWindow from "@/components/UI/ModalWindow"
import ButtonClose from "@/components/UI/ButtonClose"
import EnemyLeader from "@/components/EnemyLeader"
import EnemyList from "@/components/EnemyList"
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
  right: -35%;
  position: relative;
}

.enemies {
  width: 90%;
  height: 60%;
  position: relative;
  overflow: scroll;
  border: solid 2px red;
}

.enemy {
  top: 20%;
  width: 30%;
  display: inline-block;
  position: relative;
  text-align: justify;
}
</style>
