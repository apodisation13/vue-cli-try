<template>
<div>
Страница о нас <br>
ЗДЕСЬ Я ТРЕНИРУЮСЬ

<!-- <button @click="get">КНОПКА</button> -->
<!-- <a v-once>{{ get() }}</a>
<div v-for="item in results" :key="item.id">
  {{ item.id }} {{ item.item_name }} {{ item.description }} 
  <img :src="item.image" alt="" width="150" height="170">
</div>
<button @click="sort">sort</button> -->

{{ $store.state.current_deck.length }} ДЛИНА ДЕКИ


<div class="modal" v-if="flag">ОКНО</div>


<div style="display: inline-block" v-for="elem in list" :key="elem">
  <button class="btn" 
  @mouseup.right="flag = true" @mouseleave="flag = false"
  :style="[
  elem == 'red' ? {'backgroundColor': 'red'} :
  elem == 'green' ? {'backgroundColor': 'green'} :
  {'backgroundColor': 'yellow'}
  ]">
  <a v-if="elem == 'red' || elem == 'green'">{{ elem }}</a>
  <a v-else></a>
    </button>
</div>

</div>
</template>

<script>
export default {
  data() {
    return {
      results: null,
      list: ['red', 'afsaf', 'green', 'red', 'redd', 'afsaf', 'green', 'red'],
      flag: false
    }
  },
  methods: {
    get() {
      let url = 'http://127.0.0.1:8000/api/v1/itemsjson/'
      fetch(url) 
        .then((response) => response.json()) 
        .then((result) => {
          this.results = result.results
          // alert(result.results[0]); 
        });
    },
    sort() {
      return this.results.sort(function (a,b) {return a.item_name > b.item_name})
    }
  }    
}
</script>

<style scoped>
.btn {
  width: 100px;
  height: 100px;
}

.modal {
  background: rgb(100, 6, 143);
  width: 400px;
  height: 300px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8pt;

}

</style>