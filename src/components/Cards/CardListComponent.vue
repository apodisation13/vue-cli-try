<template>
  <!--Отображает любой список карт или список лидеров (is_leader)-->
  <div class="card-list">
    <!--Двойной клик по карте - событие действия на картой-->
    <card-item
      v-for="user_card in cards"
      :key="user_card.id"
      @dblclick="chose_player_card(user_card)"
      :count="user_card.count"
      :card="user_card.card ? user_card.card : user_card"
      :user_card="user_card.card ? user_card : null"
      :hp_needed="hp_needed"
      :deckbuilder="deckbuilder"
      :bonus="bonus"
      :is_leader="is_leader"
    />
  </div>
</template>

<script>
import CardItem from "@/components/Cards/CardItem"
export default {
  components: {
    CardItem,
  },
  props: {
    // собственно список карт, которые надо отрисовать
    cards: {
      required: true,
      type: Array,
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
    // брать ли границу карты как для карт (по цвету), ДЕФОЛТНОЕ, или как для лидеров (по фракции)
    is_leader: {
      type: Boolean,
      default: false,
    },
    // на странице бонусов мы показываем count, но не показываем mill/craft
    bonus: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  methods: {
    chose_player_card(card) {
      this.$emit("chose_player_card", card) // передаем наверх ВСЮ выбранную карту!
    },
  },
  emits: ["chose_player_card"],
}
</script>

<style scoped>
.card-list {
  padding: 8px 0;
  display: grid;
  grid-template-columns: repeat(4, 22%);
  row-gap: 10px;
  column-gap: 9px;
  justify-content: center;
}
</style>
