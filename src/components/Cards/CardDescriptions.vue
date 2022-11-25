<template>
  <div>
    <div>
      <!--Описание абилки - для карты игрока только-->
      <div
        v-if="!forEnemy"
        @click="showMainAbility"
        class="inlines"
        :style="{
          'background-image':
            'url(' + require(`@/assets/icons/card/sword.svg`) + ')',
        }"
      ></div>

      <!--Описание абилки хода - для карт врагов-->
      <div
        v-if="forEnemy"
        @click="showMainAbility"
        class="inlines"
        :style="{
          'background-image':
            'url(' +
            require(`@/assets/icons/enemy/enemy_move_${card.move.name}.svg`) +
            ')',
        }"
      ></div>

      <!--Описание пассивной абилки-->
      <div
        class="inlines"
        @click="showPassiveAbility"
        v-if="card.has_passive"
        :style="{
          'background-image':
            'url(' + require(`@/assets/icons/card/passive_clock.svg`) + ')',
        }"
      >
        <span v-if="card.timer !== 0">{{ card.timer }}</span>
      </div>

      <!--Описание абилки deathwish - для карт врагов-->
      <div
        v-if="forEnemy && card.has_deathwish"
        @click="showDeathwishAbility"
        class="inlines"
        :style="{
          'background-image':
            'url(' + require(`@/assets/icons/enemy/deathwish.svg`) + ')',
        }"
      ></div>
    </div>

    <!--А дальше сами описания!!!-->
    <!--Описание абилки для карты игрока-->
    <div class="text" v-if="show_ability && !forEnemy">
      {{ card.ability.description }}
    </div>
    <!--Описание абилки для карты врага-->
    <div class="text" v-if="show_ability && forEnemy">
      {{ card.move.description }}
    </div>
    <!--Описание пассивной абилки-->
    <div class="text" v-if="show_passive">
      {{ card.passive_ability.description }}
    </div>
    <!--Описание абилки deathwish, только для врага-->
    <div class="text" v-if="show_deathwish && forEnemy">
      {{ card.deathwish.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CardDescriptions",
  props: {
    card: {
      type: Object,
      required: true,
    },
    // отображать описание для врага или нет
    forEnemy: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      show_ability: true,
      show_move: true,
      show_passive: false,
      show_deathwish: false,
    }
  },
  methods: {
    showMainAbility() {
      this.show_ability = true
      this.show_move = true
      this.show_passive = false
      this.show_deathwish = false
    },
    showPassiveAbility() {
      this.show_ability = false
      this.show_move = false
      this.show_passive = true
      this.show_deathwish = false
    },
    showDeathwishAbility() {
      this.show_ability = false
      this.show_move = false
      this.show_passive = false
      this.show_deathwish = true
    },
  },
}
</script>

<style scoped>
.inlines {
  display: inline-block;
  margin: 1%;
  font-weight: bolder;
  border: solid 2px brown;
  width: 50px;
  height: 5vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.text {
  margin-bottom: 1%;
  font-size: 12pt;
}
</style>
