<template>
  <div class="diamond">
    <span class="span3">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "card-diamond",
}
</script>

<style scoped>
.diamond {
  position: absolute;
  top: 1%;
  right: 6%;
  height: 4vh;
  width: 4vh;
  transform: rotateX(45deg) rotateZ(45deg);
  /* background-color: purple; */
  /* border: solid 1px yellow; */
}

.span3 {
  position: absolute;
  /*transform: translate(-50%, -50%);*/
  top: 25%;
  right: 2%;
  color: whitesmoke;
  font-size: 11pt;
  transform:  rotateZ(-45deg);
}
</style>