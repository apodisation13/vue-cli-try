<template>
<table class='field'>
  <tr v-for="i in 4" :key="i">
    <td v-for="j in 3" :key="j"
      @click.right="index=get_index(i,j); show_enemy_modal=true" 
      @mouseleave="show_enemy_modal=false"
      @click="exec_damage_ai_card(get_index(i,j))" 
      @contextmenu.prevent
    >

      <div class="enemy" v-if="field[get_index(i,j)]"
      :style="background_color(field[get_index(i,j)])"
      >
        &hearts;{{ field[get_index(i,j)].hp }} <br> 
        &dagger;{{ field[get_index(i,j)].dmg }}
      </div>
    </td>
  </tr>
</table>

<field-modal v-if="field[index]" 
:enemy='field[index]' 
:flag='show_enemy_modal'
/>

</template>

<script>
  export default {
    name: 'field-comp',
    props: {
      field: {
        required: true,
        type: Array
      },
    },
    data() {
      return {
        index: null,  // номер (индекс) клетки поля
        show_enemy_modal: false,  // показать модальное окно с врагом
      }
    },
    methods: {
      get_index(i, j) {  // расчёт индекса клетки поля
        return (i-1) * 3 + (j-1)
      },
      background_color(f) {
        if (f.color == 'Silver') return {'backgroundColor': 'silver'}
        else if (f.color == 'Gold') return {'backgroundColor': 'gold'}
        else return {}
      },
      exec_damage_ai_card(i) {  // эмиттим номер (индекс) клетки поля
        this.$emit('exec_damage_ai_card', i)
      },

    },
    emits: [
      'exec_damage_ai_card',
    ],
  }
</script>

<style scoped>
.field {
  border: 1px solid black;
  font-size: 20pt;
  width: 90%;
  /* width: 500px; */
  height: 60%;
  /* margin-top: 2.5%; */
  position: absolute;
}
th, td {
  background-color: #96D4D4;
  width: 30%;
  /* height: 130px; */
  height: 15%;
  text-align: center;
}

.enemy {
  width: 90%;
  height: 90%;
  align-self: center;
  align-content: center;
}
</style>