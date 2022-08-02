<template>
  <draggable
    v-model="draggableLeader"
    item-key="id"
    @start="onDragStart($event)"
    @end="onDragEnd($event)"
  >
    <template #item="{element}">
      <div class="leader"
           :style="border(element)"
           @contextmenu.prevent
           @click.right="open_card_modal"
           v-touch:longtap="open_card_modal"
           @dblclick="exec_leader"
      >
        <img class="img" :src="element.image" v-if="element.charges > 0" alt="">
        <card-diamond :style="background_color(element)">&dagger;{{ element.damage }}</card-diamond>
        <card-ability-circle :card="element"/>
        <card-passive v-if="element.has_passive" :style="background_color(element)" />
        <card-charges>{{ element.charges }}&#8607;</card-charges>
      </div>
    </template>
  </draggable>

  <leader-modal
      v-if="show_card_modal"
      :leader='leader'
      @close_leader_modal="show_card_modal=false"
  />
</template>

<script>
import draggable from 'vuedraggable'
import { border_leader, background_color } from '@/logic/border_styles'
import LeaderModal from "@/components/ModalWindows/LeaderModal"
import CardDiamond from "@/components/UI/CardDiamond"
import CardAbilityCircle from "@/components/UI/AbilityCircleCard"
import CardPassive from "@/components/UI/CardPassive"
import CardCharges from "@/components/UI/CardCharges"
export default {
  name: "leader-comp",
  components: { CardCharges, CardPassive, CardAbilityCircle, CardDiamond, LeaderModal, draggable },
  props: {
    leader: {
      required: true,
      type: Object,
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
  data() {
    return {
      show_card_modal: false,
    }
  },
  computed: {
    draggableLeader: {
      get() {
        return [this.leader, ]
      },
      set(val) {
        console.log(val)
      },
    }
  },
  methods: {
    exec_leader() {
      this.$emit("exec_leader")
    },
    open_card_modal() {
      this.show_card_modal = true
    },
    border(leader) {
      return border_leader(leader)
    },
    background_color(leader) {
      return background_color(leader)
    },
    onDragStart(event) {
      console.log("ТЯНЕМ ЗА ЛИДЕРА")
      this.$emit("exec_leader")
    },
    onDragEnd(event) {
      const event_type = event.originalEvent.type  // если мы с компа, то там есть этот параметр

      if (event_type === 'dragend') {
        console.log('РАНЕЕ ПОТАЩИЛИ ЛИДЕРА, С КОМПА!!!!')
        console.log(event.originalEvent.clientX, event.originalEvent.clientY)
        const elem = document.elementFromPoint(event.originalEvent.clientX, event.originalEvent.clientY)
        this.target_emit(elem)
      }
      else {
        console.log('РАНЕЕ ПОТАЩИЛИ ЛИДЕРА, МЫ С ТЕЛЕФОНА!!!')
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
    "exec_leader",
    "target_enemy",
    "target_enemy_leader",
  ],

}
</script>

<style scoped>
.leader {
  height: 18vh;
  width: 98%;
  border-radius: 2%;
  margin-bottom: 2px;
  margin-top: 2px;
  position: relative;
  /*border: solid 1px black;*/
}

.img {
  width: 99%;
  height: 99%;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>