<template>
  <div class="page__wrapper">
    <h1>Тестовая страница</h1>
    <div class="page__content cards__list">
      <div v-for="card in allGameCards" :key="card.id" class="card-block">
        <img :src="card.card.image" :alt="name" class="imagecard">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({

    }),
    computed: {
      allGameCards() {
        // return [...this.$store.state.database.cards]
        return this.$store.getters.all_cards; // закомментированная строка выше просто как тест
      }
    },

    created() {
      (() => {document.title = 'Yushkevich-test'})();
    },
  }
</script>

<style scoped>
.cards__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.card-block {
  border-radius: 10px;
  overflow: hidden;
  margin: 3px;
}
.imagecard {
  display: block;
  max-width: 100px;
}
</style>