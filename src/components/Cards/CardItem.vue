<template>
  <div>
    <div
      class="card-item-component"
      @contextmenu.prevent
      @click.right="show_modal"
      v-touch:longtap="show_modal"
      :id="make_id(card, index)"
      :style="[border(card)]"
    >
      <card-ui
        :count="count"
        :card="card"
        :user_card="user_card"
        :hp_needed="hp_needed"
        :deckbuilder="deckbuilder"
        :bonus="bonus"
        :is_leader="is_leader"
      />
    </div>
    <card-modal
      v-if="show_card_modal"
      :count="count"
      :card="card"
      :user_card="user_card"
      :hp_needed="hp_needed"
      :deckbuilder="deckbuilder"
      :bonus="bonus"
      :is_leader="is_leader"
      @close_card_modal="show_card_modal = false"
    />
  </div>
</template>

<script>
import {
  background_color,
  background_color_hp,
  background_color_charges,
  border_for_card,
  border_leader,
  card_margin,
} from "@/logic/border_styles"
import CardModal from "@/components/ModalWindows/CardModal"
import CardUi from "@/components/Cards/CardUi"
export default {
  components: {
    CardUi,
    CardModal,
  },
  props: {
    // брать границу карты как для лидеров
    is_leader: {
      type: Boolean,
      default: false,
    },
    // FIXME: че это
    is_previev: {
      type: Boolean,
      default: false,
    },
    card: {
      type: Object,
      required: true,
    },
    user_card: {
      type: Object,
      default() {
        return null
      },
    },
    // показывать или нет hp - нужно только для deckbuilder, в игре не нужно
    hp_needed: {
      type: Boolean,
      default: false,
    },
    deckbuilder: {
      type: Boolean,
      default: false,
    },
    // сколько у юзера этой карты
    count: {
      type: Number,
    },
    // индекс карты в руке, по нему считается id карты, чтобы потом понять за какую карту потянули
    index: {
      type: Number,
    },
    // флаг для бонусов, чтобы там показать count, жизни, но НЕ показать кнопки милл\крафт
    bonus: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      show_card_modal: false,
    }
  },
  methods: {
    background_color_hp(color) {
      return background_color_hp(color)
    },
    background_color_charges(color) {
      return background_color_charges(color)
    },
    background_color(card) {
      return background_color(card)
    },
    make_id(card, index) {
      if (!index && index !== 0) return ""
      return `${card.name}_${index}`
    },
    show_modal() {
      this.show_card_modal = true
    },
    border(card) {
      return this.is_leader ? border_leader(card) : border_for_card(card)
    },
    card_margin(card) {
      return card_margin(card)
    },
  },
  emits: ["open_card_modal"],
}
</script>

<style scoped>
.card-item-component {
  position: relative;
  width: 100%;
  box-shadow: -4px 0 4px rgb(0 0 0 / 50%);
}

.card-item-component::before {
  content: "";
  display: block;
  padding-top: 143%;
}
</style>
