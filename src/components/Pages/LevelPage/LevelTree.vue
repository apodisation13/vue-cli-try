<template>
  <div>
    <v-stage :config="configKonva">
      <v-layer>
        <!--для каждого уровня из списка уровней текущего сезона-->
        <div v-for="(level, index) in levs" :key="level.id">
          <!--рисуем звезды сложности, 1,2 или 3-->
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
          <!--Прямоугольник уровня, пройден\открыт\закрыт, свечение по фракции-->
          <v-rect
            :config="squareConfig(level)"
            @dblclick="setLevel(index)"
            @dbltap="setLevel(index)"
            @pointerup="end(level)"
            @pointerdown="start(level)"
          ></v-rect>
          <!--Текст внутри прямоугольника, или id или значок замка (закрыт)-->
          <v-text
            v-if="level.unlocked"
            :config="textConfig(level)"
            @dblclick="setLevel(index)"
            @dbltap="setLevel(index)"
            @pointerup="end(level)"
            @pointerdown="start(level)"
          ></v-text>
          <!--Значок замка-->
          <v-image
            v-else
            :config="imageConfig(level)"
            @dblclick="setLevel(index)"
            @dbltap="setLevel(index)"
            @pointerup="end(level)"
            @pointerdown="start(level)"
          ></v-image>
          <!--Линии связей-->
          <!--Для каждой линии из линии связей-->
          <v-line
            v-for="line in level.level.lines"
            :key="line"
            :config="lineConfig(line, level)"
          ></v-line>
        </div>
      </v-layer>
    </v-stage>
    <level-modal
      v-if="show_level_modal"
      :level="level.level"
      @close_level_modal="show_level_modal = false"
    />
  </div>
</template>

<script>
import { useToast } from "vue-toastification"
import LevelModal from "@/components/ModalWindows/LevelModal"

export default {
  name: "LevelTree",
  components: { LevelModal },
  props: {
    levels: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const toast = useToast()
    return { toast }
  },
  watch: {
    levels(oldVal, newVal) {
      if (oldVal !== newVal) this.init()
    },
  },
  created() {
    this.init()
  },
  data() {
    return {
      w: 28,
      configKonva: { width: 1000, height: 1000 },
      levs: [],
      timer: 0,
      level: null,
      show_level_modal: false,
    }
  },
  methods: {
    init() {
      this.levs = [...this.levels]
      this.levs.forEach(level => {
        level.level.lines = [] // добавляем такой ключ, чтобы потом положить туда линии
        level.level.children.forEach(ch => {
          this.calc_line(ch, level)
        })
      })
    },
    squareConfig(item) {
      return {
        x: item.level.x,
        y: item.level.y,
        width: this.w,
        height: this.w,
        fill: this.levelColor(item),
        stroke: this.levelBorder(item),
        shadowColor: this.levelFaction(item),
        shadowBlur: 7,
      }
    },
    levelColor(item) {
      if (item.finished) return "rgba(255, 231, 183, 1)"
      if (item.unlocked) return "rgba(237, 177, 62, 1)"
      return "silver"
    },
    levelBorder(item) {
      if (item.finished) return ""
      return "rgba(0, 0, 0, 0.13)"
    },
    levelFaction(item) {
      if (item.level.enemy_leader.faction === "Soldiers") return "blue"
      if (item.level.enemy_leader.faction === "Monsters") return "red"
      if (item.level.enemy_leader.faction === "Animals") return "green"
    },
    textConfig(item) {
      return {
        text: item.level.id,
        fontSize: 16,
        x:
          item.level.id >= 10
            ? item.level.x + this.w / 4
            : item.level.x + this.w / 4 + 2,
        y:
          item.level.id >= 10
            ? item.level.y + this.w / 4
            : item.level.y + this.w / 4 + 2,
      }
    },
    imageConfig(item) {
      const image = new Image()
      image.src = require("@/assets/icons/locked_level.png")
      return {
        x: item.level.x + this.w / 4,
        y: item.level.y + this.w / 4,
        width: this.w / 2,
        height: this.w / 2,
        image: image,
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
        numPoints: 5,
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

      const levIndex = this.levels.findIndex(
        lev => lev.level.id === ch.related_level_id
      )

      if (ch.line === "right") {
        x1 = this.levs[levIndex].level.x - level.x - this.w
        y1 = this.levs[levIndex].level.y - level.y
        x2 = level.x + this.w
        y2 = level.y + this.w / 2
      } else if (ch.line === "down") {
        x1 = this.levs[levIndex].level.x - level.x
        y1 = this.levs[levIndex].level.y - level.y - this.w
        x2 = level.x + this.w / 2
        y2 = level.y + this.w
      } else if (ch.line === "left") {
        x1 = this.levs[levIndex].level.x - level.x + this.w
        y1 = this.levs[levIndex].level.y - level.y
        x2 = level.x
        y2 = level.y + this.w / 2
      } else if (ch.line === "top") {
        x1 = this.levs[levIndex].level.x - level.x
        y1 = this.levs[levIndex].level.y - level.y + this.w
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
            fill: "rgba(255, 246, 193, 1)",
            points: [0, 0, x1, y1],
          })
          return
        }
      }
      level.lines.push({
        x: x2,
        y: y2,
        fill: "rgba(74, 66, 55, 1)",
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
    start(level) {
      this.timer = setTimeout(() => {
        if (this.timer > 0) this.longTap(level)
      }, 1000)
    },
    end() {
      clearTimeout(this.timer)
      this.timer = 0
    },
    longTap(level) {
      this.level = level
      this.show_level_modal = true
    },
  },
}
</script>
