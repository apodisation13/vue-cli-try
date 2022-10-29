<template>
  <div class="special-type"
    :class="{
      'gold-lightning': color === 'Gold',
      'silver-lightning': color === 'Silver',
      'bronze-lightning': color === 'Bronze' 
      }"
  
  >

  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String
    }
  }
}
</script>

<style scoped>
.special-type {
  position: absolute;
  top: -5px;
  left: 2px;
  transform: rotate(-45deg);
}

.gold-lightning, .silver-lightning, .bronze-lightning {
  width: 13px;
  height: 31px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.gold-lightning {
  background-image: url('~@/assets/icons/card/gold_lightning.svg');
}

.silver-lightning {
  background-image: url('~@/assets/icons/card/silver_lightning.svg');
}

.bronze-lightning {
  background-image: url('~@/assets/icons/card/bronze_lightning.svg');
}
</style>
