<template>
  <div class="hand">
    <draggable
      v-model="draggableHand"
      item-key="id"
      @start="onDragStart"
      @end="onDragEnd($event)"

    >
      <template #item="{element, index}">
        <card-comp
            :card="element"
            :index="index"
            class="card_in_hand"
            :style="border(element)"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
import { border_for_hand_2 } from '@/logic/border_styles'
import draggable from 'vuedraggable'
import CardComp from "@/components/CardComp"
export default {
  name: 'hand-comp',
  components: { CardComp, draggable },
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
      }
    }
  },
  methods: {
    chose_player_card(card) {
      this.$emit('chose_player_card', card)  // передаём card по эмиту
    },
    border(card) {
      return border_for_hand_2(this.hand, card)
    },
    onDragStart(event) {
      console.log('ПОТЯНУЛИ ЗА КАРТУ')
      const elem = document.elementFromPoint(event.originalEvent.clientX, event.originalEvent.clientY)
      const id = elem?.id
      console.log('КАРТА В РУКЕ', id)
      if (!id) return
      const index = parseInt(id.slice(id.indexOf('_') + 1))
      console.log('ИНДЕКС КАРТЫ В РУКЕ', index, this.hand[index].name)
      this.$emit('chose_player_card', this.hand[index])
    },
    onDragEnd(event) {
      const event_type = event.originalEvent.type  // если мы с компа, то там есть этот параметр

      if (event_type === 'dragend') {
        console.log('МЫ С КОМПА!!!!')
        console.log(event.originalEvent.clientX, event.originalEvent.clientY)
        const elem = document.elementFromPoint(event.originalEvent.clientX, event.originalEvent.clientY)
        this.target_emit(elem)
      }
      else {
        console.log('МЫ С ТЕЛЕФОНА!!!')
        console.log(event.originalEvent.changedTouches[0].clientX, event.originalEvent.changedTouches[0].clientY)
        const elem = document.elementFromPoint(event.originalEvent.changedTouches[0].clientX, event.originalEvent.changedTouches[0].clientY)
        this.target_emit(elem)
      }
    },
    target_emit(elem) {
      const id = elem?.id
      console.log('ВРАГ', id)
      if (!id) return
      if (id.includes('enemy_leader')) {
        console.log('ЭТО ЛИДЕР ВРАГА')
        this.$emit('target_enemy_leader')
        return
      }
      const index = parseInt(id.slice(id.indexOf('_') + 1)) // card.name_index - вот поэтому ищем _ +1, чтоб индекс поля
      console.log('ИНДЕКС КЛЕТКИ ПОЛЯ ВРАГА', index)
      this.$emit('target_enemy', this.field[index])
    },
  },
  emits: [
    'chose_player_card',
    'target_enemy',
    'target_enemy_leader',
  ],
}
</script>

<style scoped>

.hand {
  width: 98%;
  height: 21vh;
  padding-top: 2%;
  /* border: solid 1px blue; */
  clear: both;
  overflow: auto;
  /*white-space: nowrap;*/
  /*position: absolute;*/
  /*top: 75%;*/
  /*left: 0;*/
  /*touch-action: none;*/
}

.card_in_hand {
  width: 26%;
  height: 18.5vh;
   /*border: solid 3px gold; */
  border-radius: 2%;
  display: table-row;
  overflow: hidden;
  /*touch-action: none;*/
  /*вот так было через жопу*/
  /*margin-right: -12%;*/
  /*margin-left: 0.5%;*/
  /*ну а вот так вроде всё заебись*/
  /*margin-right: 0.3%;*/
  /*margin-left: -12%;*/
  /*float: right;*/
  margin-top: 0.1%;
  position: relative;
  border-width: 3px 4px 3px 5px;
  border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
  /*transform: rotate(2deg);*/
}
.card_in_hand:hover {
  margin-top: -2%;
  z-index: 999999;
  border-width: 3px 4px 3px 5px;
  border-color: red;
  border-style: solid;
}
</style>
