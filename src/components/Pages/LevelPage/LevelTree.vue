<template>
  <div>
    <v-stage :config="configKonva">
      <v-layer>
        <div v-for="level in levs" :key="level.id">
          <v-rect :config="squareConfig(level)"></v-rect>
          <v-text :config="textConfig(level)"></v-text>
          <v-line
            v-for="line in level.lines"
            :key="line"
            :config="lineConfig(line, level)"
          ></v-line>
        </div>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { useToast } from "vue-toastification"

export default {
  name: "LevelTree",
  setup() {
    const toast = useToast()
    return { toast }
  },
  created() {
    this.levs = this.levels
    console.log("ЗАГРУЗКА ДЕРЕВА")
    this.levs.forEach(level => {
      level.level.lines = [] // добавляем такой ключ, чтобы потом положить туда линии
      level.level.children.forEach(ch => {
        this.calc_line(ch, level)
      })
    })
  },
  data() {
    return {
      w: 25,
      configKonva: { width: 370, height: 600 },
      levs: [],
    }
  },
  methods: {
    squareConfig(item) {
      return {
        x: item.level.x,
        y: item.level.y,
        width: this.w,
        height: this.w,
        fill: item.finished ? "green" : "grey",
        stroke: item.faction === 1 ? "blue" : "red",
      }
    },
    textConfig(item) {
      return {
        text: item.level.id,
        fontSize: 8,
        x: item.level.x + this.w / 4,
        y: item.level.y + this.w / 4,
        align: "center",
        verticalAlign: "middle",
      }
    },
    lineConfig(arrow) {
      return {
        x: arrow.x,
        y: arrow.y,
        points: [
          arrow.points[0],
          arrow.points[1],
          arrow.points[2],
          arrow.points[3],
        ],
        fill: arrow.fill,
        stroke: arrow.fill,
        strokeWidth: 4,
      }
    },
    calc_line(ch, item) {
      const { level } = item
      console.log(level)
      console.log(ch, "ИЗ ДЕРЕЕВАВВВВВВВВВВВВВВВВВВВВВВВВВВ")
      const connections = ch.connection?.split("-")
      if (!connections || !ch.line) return
      let x1 = undefined
      let y1 = undefined
      let x2 = undefined
      let y2 = undefined
      if (ch.line === "right") {
        console.log(this.levels[level.id - 1].level.x, level.x)
        x1 = this.levels[ch.id - 1].level.x - level.x - this.w
        y1 = this.levels[ch.id - 1].level.y - level.y
        x2 = level.x + this.w
        y2 = level.y + this.w / 2
      } else if (ch.line === "down") {
        x1 = this.levels[ch.id - 1].level.x - level.x
        y1 = this.levels[ch.id - 1].level.y - level.y - this.w
        x2 = level.x + this.w / 2
        y2 = level.y + this.w
      } else if (ch.line === "left") {
        x1 = this.levels[ch.id - 1].level.x - level.x + this.w
        y1 = this.levels[ch.id - 1].level.y - level.y
        x2 = level.x
        y2 = level.y + this.w / 2
      } else if (ch.line === "top") {
        x1 = this.levels[ch.id - 1].level.x - level.x
        y1 = this.levels[ch.id - 1].level.y - level.y + this.w
        x2 = level.x + this.w / 2
        y2 = level.y
      }
      console.log(connections, x1, y1, x2, y2)
      this.push_line(connections, level, x1, y1, x2, y2)
    },
    push_line(connections, level, x1, y1, x2, y2) {
      for (const l of connections) {
        if (this.levels[parseInt(l) - 1].finished) {
          level.lines.push({
            x: x2,
            y: y2,
            fill: "green",
            points: [0, 0, x1, y1],
          })
          // console.log('Добавили' + connections + `Линюю зеленую, уровень ${l} же открыт`)
          return
        }
      }
      level.lines.push({
        x: x2,
        y: y2,
        fill: "red",
        points: [0, 0, x1, y1],
      })
      // console.log('Добавили' + connections + 'Линюю серую, все дети закрыты')
    },
  },
  computed: {
    levels() {
      return this.$store.getters["all_levels"]
    },
  },
}
</script>

<style scoped>

</style>