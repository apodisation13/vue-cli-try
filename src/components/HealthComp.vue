<template>

<br>
<div>ЖИЗНИ ИГРОКА --  {{ health }}, Аптечек -- {{ health_kits_number }} 

<a v-if="health_kits_number">
  <button class='use_health_kit_have' v-on:click='use_health_kit'>Использовать аптечку</button>
</a>
<a v-else>
  <button class='use_health_kit_donthave' v-on:click='use_health_kit'>Использовать аптечку</button>
</a>
</div>

</template>

<script>

export default {
  name: 'health-comp',
  props: {
    health: {
      required: true,
    },
    player_cards_active: {
      required: true
    }
  },
  data() {
    return {
      health_kits_number: 3,
    }
  },
  methods: {
    use_health_kit() {
      if (this.health_kits_number && this.player_cards_active) {
        this.health_kits_number -= 1
        this.$emit('use_health_kit')  // как бы название на что подписаться
      }
    },
  },
  emits: [
    'use_health_kit', 
  ],  
}

</script>

<style scoped>

.use_health_kit_have {
  width: 170px;
  height: 40px;
  background-color: green;
}

.use_health_kit_donthave {
  width: 170px;
  height: 40px;
  background-color: red;
}

</style>