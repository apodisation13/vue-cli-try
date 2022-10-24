<template>
  <div>
    <v-stage :config="configKonva">
      <v-layer>
        <div v-for="(level, index) in levs" :key="level.id">
          <v-star :config="starConfig(level, 0)"></v-star>
          <v-star
            :config="starConfig(level, w / 2)"
            v-if="
              level.level.difficulty === 'normal' ||
              level.level.difficulty === 'hard'
            "
          ></v-star>
          <v-star
            :config="starConfig(level, w)"
            v-if="level.level.difficulty === 'hard'"
          ></v-star>
          <v-rect
            :config="squareConfig(level)"
            @dblclick="setLevel(index)"
            @dbltap="setLevel(index)"
          ></v-rect>
          <v-text
            :config="textConfig(level)"
            @dblclick="setLevel(index)"
            @dbltap="setLevel(index)"
          ></v-text>
          <v-line
            v-for="line in level.level.lines"
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
      configKonva: { width: 1000, height: 1000 },
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
        fill: this.levelColor(item),
        stroke: this.levelFaction(item),
      }
    },
    levelColor(item) {
      if (item.finished) return "green"
      else {
        if (item.unlocked) return "grey"
        else return "orange"
      }
    },
    levelFaction(item) {
      if (item.level.enemy_leader.faction === "Soldiers") return "blue"
      if (item.level.enemy_leader.faction === "Monsters") return "red"
      if (item.level.enemy_leader.faction === "Animals") return "green"
    },
    textConfig(item) {
      return {
        text: item.level.id,
        fontSize: 12,
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
        strokeWidth: 2,
      }
    },
    starConfig(item, position) {
      return {
        x: item.level.x + position,
        y: item.level.y - 7,
        numPoints: 6,
        innerRadius: 4,
        outerRadius: 7,
        fill: "gold",
        strokeWidth: 2,
      }
    },
    calc_line(ch, item) {
      const { level } = item
      const connections = ch.connection?.split("-")
      if (!connections || !ch.line) return
      let x1 = undefined
      let y1 = undefined
      let x2 = undefined
      let y2 = undefined
      if (ch.line === "right") {
        x1 = this.levs[ch.related_level_id - 1].level.x - level.x - this.w
        y1 = this.levs[ch.related_level_id - 1].level.y - level.y
        x2 = level.x + this.w
        y2 = level.y + this.w / 2
      } else if (ch.line === "down") {
        x1 = this.levs[ch.related_level_id - 1].level.x - level.x
        y1 = this.levs[ch.related_level_id - 1].level.y - level.y - this.w
        x2 = level.x + this.w / 2
        y2 = level.y + this.w
      } else if (ch.line === "left") {
        x1 = this.levs[ch.related_level_id - 1].level.x - level.x + this.w
        y1 = this.levs[ch.related_level_id - 1].level.y - level.y
        x2 = level.x
        y2 = level.y + this.w / 2
      } else if (ch.line === "top") {
        x1 = this.levs[ch.related_level_id - 1].level.x - level.x
        y1 = this.levs[ch.related_level_id - 1].level.y - level.y + this.w
        x2 = level.x + this.w / 2
        y2 = level.y
      }
      this.push_line(connections, level, x1, y1, x2, y2)
    },
    push_line(connections, level, x1, y1, x2, y2) {
      for (const l of connections) {
        if (this.levs[parseInt(l) - 1].finished) {
          level.lines.push({
            x: x2,
            y: y2,
            fill: "green",
            points: [0, 0, x1, y1],
          })
          return
        }
      }
      level.lines.push({
        x: x2,
        y: y2,
        fill: "red",
        points: [0, 0, x1, y1],
      })
    },
    setLevel(index) {
      if (!this.levels[index].id) {
        this.toast.error("Уровень закрыт!")
        return
      }
      this.toast.success(`Выбран уровень ${index + 1}! `, { timeout: 1000 })
      this.$store.commit("set_level", this.levels[index].level)
      this.$store.commit(
        "set_enemy_leader",
        this.levels[index].level.enemy_leader
      )
    },
  },
  computed: {
    levels() {
      return this.$store.getters["all_levels"]
    },
  },
}
</script>
