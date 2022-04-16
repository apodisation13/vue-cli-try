<template>
  <div class="triangle">
    <span>
      &#8987;
    </span>
  </div>
</template>

<script>
export default {
  name: "card-passive",
}
</script>

<style scoped>
.triangle {
  width: 15%;
  height: 15%;
  position: absolute;
  bottom: 25%;
  right: 2%;
  border-radius: 20%;
  font-size: 10pt;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10pt;
}
</style>