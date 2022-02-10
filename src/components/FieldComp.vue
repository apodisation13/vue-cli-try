<template>
<table class='field'>
  <tr v-for="i in 4" :key="i">
    <td v-for="j in 3" :key="j"
      @click.right="index=get_index(i,j); show_enemy_modal=true" 
      @mouseleave="show_enemy_modal=false"
      @click="exec_damage_ai_card(get_index(i,j))" 
      @contextmenu.prevent
    >
      <enemy-comp 
      :enemy='field[get_index(i,j)]'
      />
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
  width: 80%;
  /* width: 500px; */
  /* height: 60%; */
  /* background-image: url('../assets/grass.jpg'); */
  /* background-image: url('../assets/brick.jpg'); */
}
th, td {
  /* background-color: #96D4D4; */
  width: 33%;
  height: 300px;
  /* height: 130px; */
  text-align: center;
  vertical-align: middle;
  border: solid 2px black;
}


</style>