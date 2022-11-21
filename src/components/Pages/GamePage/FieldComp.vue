<template>
  <div class="field">
    <table class="table">
      <tr v-for="i in 4" :key="i">
        <td
          v-for="j in 3"
          :key="j"
          @dblclick="exec_damage_ai_card(get_index(i, j))"
          @contextmenu.prevent
        >
          <enemy-comp
            v-if="field[get_index(i, j)]"
            :enemy="field[get_index(i, j)]"
            :index="get_index(i, j)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import EnemyComp from "@/components/EnemyComp"
export default {
  name: "field-comp",
  components: { EnemyComp },
  props: {
    field: {
      required: true,
      type: Array,
    },
  },
  methods: {
    get_index(i, j) {
      // расчёт индекса клетки поля
      return (i - 1) * 3 + (j - 1)
    },
    exec_damage_ai_card(i) {
      // эмиттим ВСЕГО врага
      this.$emit("exec_damage_ai_card", this.field[i])
    },
    // onDrop(e, index) {
    //   const card = e.dataTransfer.getData('card')
    //   console.log(e)
    //   console.log(JSON.parse(card))
    //   console.log(index)
    //   console.log(this.field[index])
    //   this.$emit('exec_damage_ai_card', this.field[index])
    // },
  },
  emits: ["exec_damage_ai_card"],
}
</script>

<style scoped>
.field {
  width: 75%;
  overflow: hidden;
}

.table {
  table-layout: fixed;
  width: 100%;
}

table tr,
td {
  /* width: 50%; */
  height: 18vh;
  border: dashed 0.5px black;
  overflow: hidden;
  padding: 5px;
  /*position: relative;*/
}
</style>
