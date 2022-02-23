<template>

<button class="health-btn">
  &hearts;{{ health }}
</button>

<!-- <button @click="use_health_kit"
class="health_kit"
:style="[health_kits_number ? {'backgroundColor': 'green'} : {'backgroundColor': 'red'}]"
>
  heal</button> -->

</template>

<script>

export default {
  name: 'health-comp',
  computed: {
    health() {
      return this.$store.state.health
    }
  },
  data() {
    return {
      health_kits_number: 3,  // запас аптечек
      health_kit_bonus: 20,  //  бонус жизней от одной аптечки
    }
  },
  methods: {
    // use_health_kit() {
    //   if (this.health_kits_number && this.player_cards_active) {
    //     this.health_kits_number -= 1

    //     this.$store.commit('change_health', this.health_kit_bonus)

    //     // this.$emit('use_health_kit')  // как бы название на что подписаться
    //   }
    // },
  },
  // emits: [  // если было бы
  //   'use_health_kit', 
  // ],  
}

</script>

<style scoped>

.health-btn {
  height: 4vh;
  width: 98%;
  background-color: green;
  border: 0;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

</style>