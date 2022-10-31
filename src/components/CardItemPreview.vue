<template>
  <div class="card-item-wrapper"
    @contextmenu.prevent
    @click.right="show_modal"
    v-touch:longtap="show_modal"
  >
    <div
      class="card-item"
      v-if="!!user_card"
      :style="[{ backgroundImage: `url(${user_card.image})` }, border(user_card)]"
    ></div>
    <card-modal
      v-if="show_card_modal"
      :card="user_card"
      @close_card_modal="show_card_modal = false"
    />
  </div>
</template>

<script>
import { border_leader, border_for_card } from "@/logic/border_styles"
import CardModal from '@/components/ModalWindows/CardModal'
export default {
  components: { CardModal },
  props: {
    user_card: {
      type: Object,
      required: true,
    },
    is_leader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show_card_modal: false,
    }
  },
  methods: {
    border(card) {
      return this.is_leader ? border_leader(card) : border_for_card(card)
    },
    show_modal() {
      this.show_card_modal = true
    }
  },
}
</script>

<style scoped>
.card-item-wrapper {
  width: 100%;
}
.card-item {
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 2px;
}

.card-item::before {
  content: "";
  display: block;
  padding-top: 143%;
}
</style>
