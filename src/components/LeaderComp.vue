<template>

  <div class="leader"
    :style="border(leader)"
    @contextmenu.prevent
    @click.right="open_card_modal"
    v-touch:longtap="open_card_modal"
    @dblclick="exec_leader"
  >

    <img class="img" :src="leader.image" v-if="leader.charges > 0" alt="">

    <card-diamond :style="background_color(leader)">&dagger;{{ leader.damage }}</card-diamond>
  
    <card-ability-circle :card="leader"/>

    <card-passive v-if="leader.has_passive" :style="background_color(leader)" />

    <card-charges>{{ leader.charges }}&#8607;</card-charges>

  </div>

  <leader-modal
      v-if="show_card_modal"
      :leader='leader'
      @close_leader_modal="show_card_modal=false"
  />

</template>

<script>
import { border_leader, background_color } from '@/logic/border_styles'
import LeaderModal from "@/components/ModalWindows/LeaderModal"
import CardDiamond from "@/components/UI/CardDiamond"
import CardAbilityCircle from "@/components/UI/CardAbilityCircle"
import CardPassive from "@/components/UI/CardPassive"
import CardCharges from "@/components/UI/CardCharges"
  export default {
    name: "leader-comp",
    components: {CardCharges, CardPassive, CardAbilityCircle, CardDiamond, LeaderModal},
    props: {
      leader: {
        required: true,
        type: Object,
      },
    },
    data() {
      return {
        show_card_modal: false, 
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
    },

    emits: [
      "exec_leader",
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