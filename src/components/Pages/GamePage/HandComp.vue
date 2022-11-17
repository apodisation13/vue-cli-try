<template>
  <div class="hand">
    <draggable
      v-model="draggableHand"
      item-key="id"
      @start="onDragStart($event)"
      @end="onDragEnd($event)"
      class="hand-list"
    >
      <template #item="{ element, index }">
        <card-item
          :card="element"
          :index="index"
          class="card_in_hand"
          :style="{'--custom-z-index': 10 + index }"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
// import { border_for_hand_2 } from "@/logic/border_styles"
import draggable from "vuedraggable"
import CardItem from "@/components/CardItem"
export default {
  name: "hand-comp",
  components: { CardItem, draggable },
  props: {
    hand: {
      required: true,
      type: Array,
    },
    field: {
      required: true,
      type: Array,
    },
    enemy_leader: {
      required: true,
      type: Object,
    },
  },
  computed: {
    draggableHand: {
      get() {
        return this.hand
      },
      set(val) {
        console.log(val)
      },
    },
  },
  methods: {
    chose_player_card(card) {
      this.$emit("chose_player_card", card) // передаём card по эмиту
    },
    // border(card) {
    //   return border_for_hand_2(this.hand, card)
    // },
    // берем список дивов под картой в руке, достаем ту, у которой есть id, там cardName_fieldIndex, так находим index
    get_card(divs) {
      for (let i = 0; i < divs.length; i++) {
        if (divs[i].id) return divs[i].id
      }
    },
    onDragStart(event) {
      console.log("ПОТЯНУЛИ ЗА КАРТУ")
      const elems = document.elementsFromPoint(
        event.originalEvent.clientX,
        event.originalEvent.clientY
      )
      const id = this.get_card(elems)
      console.log("КАРТА В РУКЕ", id)
      if (!id) return
      const index = parseInt(id.slice(id.indexOf("_") + 1))
      console.log("ИНДЕКС КАРТЫ В РУКЕ", index, this.hand[index].name)
      this.$emit("chose_player_card", this.hand[index])
    },
    onDragEnd(event) {
      const event_type = event.originalEvent.type // если мы с компа, то там есть этот параметр

      if (event_type === "dragend") {
        console.log("МЫ С КОМПА!!!!")
        console.log(event.originalEvent.clientX, event.originalEvent.clientY)
        const elems = document.elementsFromPoint(
          event.originalEvent.clientX,
          event.originalEvent.clientY
        )
        this.get_target(elems)
      } else {
        console.log("МЫ С ТЕЛЕФОНА!!!")
        const elems = document.elementsFromPoint(
          event.originalEvent.changedTouches[0].clientX,
          event.originalEvent.changedTouches[0].clientY
        )
        this.get_target(elems)
      }
    },
    get_target(elems) {
      let elem = null
      elems.forEach(el => {
        if (el.className === "enemy" || el.className === "enemy-leader") {
          console.log(el.className)
          elem = el
        }
      })
      this.target_emit(elem)
    },
    target_emit(elem) {
      const id = elem?.id
      console.log("ВРАГ", id)
      if (!id) return
      if (id.includes("enemy_leader")) {
        console.log("ЭТО ЛИДЕР ВРАГА")
        this.$emit("target_enemy_leader")
        return
      }
      const index = parseInt(id.slice(id.indexOf("_") + 1)) // card.name_index - вот поэтому ищем _ +1, чтоб индекс поля
      console.log("ИНДЕКС КЛЕТКИ ПОЛЯ ВРАГА", index)
      this.$emit("target_enemy", this.field[index])
    },
  },
  emits: ["chose_player_card", "target_enemy", "target_enemy_leader"],
}
</script>

<style scoped>
.hand {
  width: 100%;
  margin-top: 2%;
}

.hand-list {
  display: flex;
  justify-content: center;
}

.card_in_hand {
  z-index: var(--custom-z-index);
  width: 26%;
  margin-left: -20%;
  margin-right: -20%;
  border-radius: 2px;
}
.card_in_hand:hover {
  margin-top: -2%;
  z-index: 999999;
}
</style>
