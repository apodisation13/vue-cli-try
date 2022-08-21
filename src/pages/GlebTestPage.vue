<template>
  <div v-for="el in showState" :key="el.id">{{ el.level.name }}</div>
</template>

<script>


export default {
  name: "GlebTestPage",

  computed: {
    showState() {
        // проверка получение данных по модулям из общего стейта
        // database state factions
        console.log(this.$store.state.database.factions);
        // database state обращение как свойствам (геттеры)
        // console.log(this.$store.database);
        // вопрос с обращением, откуда из какого хранилища вызываю геттеры, хранилищ может быть много, нет?
        console.log(this.$store.getters["all_levels"]);
        // тот же вопрос и с коммитом. Как понял он выполняет роль methods 
        //  this.$store.commit('set_enemy_leader', this.levels[index].level.enemy_leader)
      return this.$store.getters["all_levels"];
    },
  },
};
</script>

<style>
</style>