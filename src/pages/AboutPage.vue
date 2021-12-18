<template>
<div>
Страница о нас <br>
ЗДЕСЬ Я ТРЕНИРУЮСЬ

<!-- <button @click="get">КНОПКА</button> -->
<a v-once>{{ get() }}</a>
<div v-for="card in results" :key="card.id">
  {{ card.color }}
  {{ card.type }}
  {{ card.ability }}
  {{ card.damage }}
  {{ card.charges }}
  {{ card.hp }}
  {{ card.heal }} 
</div>

<button @click="post()">post</button>

</div>
</template>

<script>
import { try_post } from '@/logic/requests'

export default {
  data() {
    return {
      results: null,
      flag: false
    }
  },
  methods: {
    get() {
      let url = 'http://127.0.0.1:8000/api/v1/cards/'
      fetch(url) 
        .then((response) => response.json()) 
        .then((result) => {
          this.results = result
        });
    },
    post() {
      let data = {
        name: "sssssss"
      }
      let url = 'http://127.0.0.1:8000/api/v1/try/'
      try_post(data, url)
    },
      
      
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