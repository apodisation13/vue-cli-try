<template>
  <div>
    <draggable
      v-model="draggableLeader"
      item-key="id"
      @start="onDragStart($event)"
      @end="onDragEnd($event)"
    >
      <template #item="{ element }">
        <card-item
          :card="element"
          :user_card="element"
          :class="{
            'not-charges': element.charges === 0 && !element.has_passive,
          }"
          :is_leader="true"
          :is_previev="element.charges === 0 && !element.has_passive"
          @dblclick="exec_leader"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import CardItem from "@/components/Cards/CardItem.vue"
export default {
  components: {
    draggable,
    CardItem,
  },
  props: {
    leader: {
      required: true,
      type: Object,
    },
    field: {
      required: false,
      type: Array,
    },
  },
  computed: {
    draggableLeader: {
      get() {
        return [this.leader]
      },
      set(val) {
        console.log(val)
      },
    },
  },
  methods: {
    exec_leader() {
      this.$emit("exec_leader")
    },
    onDragStart() {
      console.log("ТЯНЕМ ЗА ЛИДЕРА")
      this.$emit("exec_leader")
    },
    onDragEnd(event) {
      const event_type = event.originalEvent.type // если мы с компа, то там есть этот параметр

      if (event_type === "dragend") {
        console.log("РАНЕЕ ПОТАЩИЛИ ЛИДЕРА, С КОМПА!!!!")
        console.log(event.originalEvent.clientX, event.originalEvent.clientY)
        const elems = document.elementsFromPoint(
          event.originalEvent.clientX,
          event.originalEvent.clientY
        )
        this.get_target(elems)
      } else {
        console.log("РАНЕЕ ПОТАЩИЛИ ЛИДЕРА, МЫ С ТЕЛЕФОНА!!!")
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
        if (
          el.className === "card-enemy-component" ||
          el.className === "enemy-leader"
        ) {
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

  emits: ["exec_leader", "target_enemy", "target_enemy_leader"],
}
</script>

<style>
/* добавляем псевдоэлемент к семантичному селектору card-item-component*/
.not-charges > div.card-item-component::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
