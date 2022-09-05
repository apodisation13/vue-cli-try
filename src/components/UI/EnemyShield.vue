<template>
  <div class="shield">
    <span> &#128737; </span>
  </div>
</template>

<script>
export default {
  name: "enemy-shield",
}
</script>

<style scoped>
.shield {
  position: absolute;
  /*height: 8vh;*/
  /*width: 8vh;*/
  /*background-color: red;*/
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  /* border: solid 1px yellow; */
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30pt;
  color: white;
}
</style>
