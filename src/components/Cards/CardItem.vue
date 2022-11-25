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
import { border_for_card, border_leader } from "@/logic/border_styles"
import CardModal from "@/components/ModalWindows/CardModal"
import CardUi from "@/components/Cards/CardUi"
export default {
  components: {
    CardUi,
    CardModal,
  },
  props: {
    // собственно сама карта
    card: {
      type: Object,
      required: true,
    },
    // весь объект карты, включая верхний уровень (где есть user_card_id, count)
    user_card: {
      type: Object,
      default() {
        return null
      },
    },
    // брать ли границу карты как для карт (по цвету), ДЕФОЛТНОЕ, или как для лидеров (по фракции)
    is_leader: {
      type: Boolean,
      default: false,
    },
    // показывать или не показывать hp (в игре не нужны жизни, везде нужны)
    hp_needed: {
      type: Boolean,
      default: false,
    },
    // показывать или не показывать зону кнопок милл\крафт, только для декбилдера
    deckbuilder: {
      type: Boolean,
      default: false,
    },
    // на странице бонусов мы показываем count, но не показываем mill/craft
    bonus: {
      type: Boolean,
      default: false,
      required: false,
    },
    // сколько у юзера этой карты
    count: {
      type: Number,
    },
    // FIXME: че это
    is_previev: {
      type: Boolean,
      default: false,
    },
    // индекс карты в руке, по нему считается id карты, чтобы потом понять за какую карту потянули
    // ПРИХОДИТ ИЗ HAND_COMP!
    index: {
      type: Number,
    },
  },
  data() {
    return {
      show_card_modal: false,
    }
  },
  methods: {
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
