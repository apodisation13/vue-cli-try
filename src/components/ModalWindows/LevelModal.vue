<template>
  <div class="modal_window">

    <button-close @close_self="close_self" />

    {{ level.name }} - {{ level.difficulty }} <br>

    Лидер - {{ level.enemy_leader.ability.name }}
    <div class="enemy_leader">
      <enemy-leader :enemy_leader="level.enemy_leader" />
    </div>

    Врагов - {{ level.enemies.length }} <br>
    <div class="enemies">
      <div class="enemy" v-for="enemy in level.enemies" :key="enemy">
        <enemy-comp :enemy="enemy" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "level-modal",
  props: {
    level: {
      required: true
    },
  },
  methods: {
    close_self() {
      this.$emit('close_level_modal')
    },
  },
  emits: [
    'close_level_modal',
  ],
}
</script>

<style scoped>
.modal_window {
  background-color: limegreen;
  width: 100%;
  height: 90%;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -53%);
  z-index: 9999;
  font-size: 12pt;
}

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
}
</style>