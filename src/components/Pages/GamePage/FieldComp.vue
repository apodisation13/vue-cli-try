<template>
  <div class="field">
    <table class="table">
      <tr v-for="i in 4" :key="i">
        <td v-for="j in 3" :key="j"
          @click.right="index=get_index(i,j); show_enemy_modal=true" 
          @close_field_modal="show_enemy_modal=false"
          @dblclick="exec_damage_ai_card(get_index(i,j))"
          @contextmenu.prevent
        >

          <enemy-comp v-if="field[get_index(i,j)]"
            :enemy='field[get_index(i,j)]'
          />

        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import EnemyComp from "@/components/EnemyComp"
export default {
  name: 'field-comp',
  components: {EnemyComp},
  props: {
    field: {
      required: true,
      type: Array,
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
  display: inline;
  float: left;
  /* border: 1px solid red; */
  font-size: 20pt;
  width: 75%;
  height: 74vh;
  overflow: hidden;
}

.table {
  table-layout:fixed;
  width: 100%;
}

table tr, td {
  /* width: 50%; */
  height: 18vh;
  border: dashed 0.5px black;
  overflow: hidden;
  /*position: relative;*/
}

</style>