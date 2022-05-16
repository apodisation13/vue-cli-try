<template>
  <div class="pass">
    <button class="pass-btn" v-show="$store.state.game.player_turn">Пас</button>
  </div>
</template>

<script>
export default {
  name: "pass-comp",
}
</script>

<style scoped>
.pass {
  height: 12vh;
  width: 98%;
  /*border: solid 1px blue;*/
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.pass-btn {
  width: 11vh;
  height: 11vh;
  background-color: orangered;
  border-radius: 50%;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}
</style>