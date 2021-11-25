<template>

{{ $store.state.likes }} {{ $store.state.dislikes }} 
 <button @click="$store.commit('incr_like')">+likes</button>

<br>
<div>ЖИЗНИ ИГРОКА --  {{ $store.state.health }}, Аптечек -- {{ health_kits_number }} 

<button @click="use_health_kit"
class="health_kit"
:style="[health_kits_number ? {'backgroundColor': 'green'} : {'backgroundColor': 'red'}]"
>
  Использовать аптечку</button>

</div>

</template>

<script>

export default {
  name: 'health-comp',
  props: {
    player_cards_active: {
      required: true
    }
  },
  data() {
    return {
      health_kits_number: 3,  // запас аптечек
      health_kit_bonus: 20,  //  бонус от одной аптечки
    }
  },
  methods: {
    use_health_kit() {
      if (this.health_kits_number && this.player_cards_active) {
        this.health_kits_number -= 1

        this.$store.commit('change_health', this.health_kit_bonus)

        // this.$emit('use_health_kit')  // как бы название на что подписаться
        
        // this.$store.getters['incr_likes']  // тренировка
        this.$store.commit('incr_like')
        
      }
    },
  },
  emits: [
    'use_health_kit', 
  ],  
}

</script>

<style scoped>

.health_kit {
  width: 170px;
  height: 40px;
}

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