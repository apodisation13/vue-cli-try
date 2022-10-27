<template>
  <div class="ability-heal">
    <div class="ability-heal-value">
      +{{heal}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      heal: {
        type: Number,
        require: true,
      }
    }
  }
</script>

<style scoped>
.ability-heal {
  position: absolute;
  right: 0;
  top: 30%;
  width: 20px;
  height: 20px;
  background-image: url('~@/assets/icons/card/emerald.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ability-heal-value {
  font-family: 'Inter';
  font-weight: 500;
  font-size: 7px;
  color: #FFFFFF;
}
</style>