<template>
  <div class="hand">

<!--    <div class="card_in_hand" :style="border(card)"-->
<!--      v-for="(card, index ) in hand" :key='card'-->
<!--      @dblclick="chose_player_card(card)"-->
<!--      draggable="true"-->
<!--      v-on:touchmove="onDragStart($event, card, index)"-->
<!--      v-on:touchstart="onDragStart($event, card, index)"-->
<!--      @dragstart="onDragStart($event, card, index)"-->
<!--         @dragend="onDragEnd"-->
<!--    >-->
<!--      <card-comp :card="card" />-->
      <draggable v-model="draggableHand"
                 @start="onDragStart"
                 @end="onDragEnd($event)"
                 item-key="id"
                 @touchend="onDragEndMobile($event)"
      >
        <template #item="{element}">
          <card-comp
              :card="element"
              class="card_in_hand"
              :style="border(element)"
          />
        </template>
      </draggable>


<!--    </div>-->
  </div>
</template>

<script>
import { border_for_hand, border_for_card, border_for_hand_2 } from '@/logic/border_styles'
import draggable from 'vuedraggable'
import CardComp from "@/components/CardComp"
export default {
  name: 'hand-comp',
  components: {
    CardComp,
    draggable
  },
  props: {
    hand: {
      required: true,
      type: Array,
    },
    field: {
      required: true,
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
    border(card, index) {
      // return border_for_hand(card, index)
      // return border_for_card(card)
      return border_for_hand_2(this.hand, card)
    },
    onDragStart(event) {
      // console.log(event.originalEvent.clientX, event.originalEvent.clientY)
      const elem = document.elementFromPoint(event.originalEvent.clientX, event.originalEvent.clientY)
      this.hand.forEach(card => {
        if (card.image === elem.src) {
          console.log(`Выбрали карту ${card.damage}`)
          this.$emit('chose_player_card', card)
          return
        }
      })
      // alert(index)
      // e.dataTransfer.dropEffect = 'move'
      // e.dataTransfer.effectAllowed = 'move'
      // e.dataTransfer.setData('card', JSON.stringify(card))
      // console.log('МЫ ТУТ, ТЯНЕМ ЗА КАРТУ', card)
      // this.$emit('chose_player_card', card)
    },
    onDragEnd(event) {
      if (!event.originalEvent.clientX) return
      console.log('МЫ С КОМПА!!!!')
      console.log(event.originalEvent.clientX, event.originalEvent.clientY)
      const elem = document.elementFromPoint(event.originalEvent.clientX, event.originalEvent.clientY)
      console.log(elem)
      this.field.forEach(enemy => {
        if (enemy && enemy.image === elem.src) {
          console.log(`Ткнули во врага ${enemy}`)
          this.$emit('target_enemy', enemy)
          return
        }
      })
    },
    onDragEndMobile(event) {
      console.log('МЫ С ТЕЛЕФОНА!!!')
      console.log(event)
      console.log(event.changedTouches[0].screenX, event.changedTouches[0].screenY)
      const elem = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
      console.log(elem)
      console.log(elem?.id)  //ВОТ ВИДИМО ЭТО НЕ РАБОТАЕТ ХЗ
      this.field.forEach(enemy => {
        if (enemy && enemy.image === elem.src) {
          console.log(`Ткнули во врага ${enemy}`)
          this.$emit('target_enemy', enemy)
          return
        }
      })
    },
  },
  emits: [
    'chose_player_card',
    'target_enemy',
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
