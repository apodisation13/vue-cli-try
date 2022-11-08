<template>
  <div class="card-interaction"></div>
</template>

<script>
export default {
  name: "CardInteractionAbility",
}
</script>

<style scoped>
.card-interaction {
  position: absolute;
  right: 4px;
  top: 30%;
  width: 20px;
  height: 20px;
  background-image: url("~@/assets/icons/card/additional_card.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
