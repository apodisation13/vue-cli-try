<template>

<!-- Страница о нас <br>
ЗДЕСЬ Я ТРЕНИРУЮС -->
<!-- <img :src="require('@/assets/'+ '1.jpg')" alt=""> -->


<!-- <div v-for="el in 3" :key="el" class="hand" @click="c(el)">
<div class='card'>
  <img class="img" :src="require('@/assets/'+ '2.jpg')">
  <div class="box">
    <div class="typee"><span2>&starf;</span2></div>
    <div class="diamond3"><span3>&dagger;8</span3></div>
    <div class="circle"><span2>&#9850;</span2></div>
    <div class="charges"><span2>3</span2></div>
    <div class="hp"><span>&hearts;12</span></div> 
  </div>   
</div>
</div> -->

<!-- <div class="divvv">
sss
</div>
<div class="divvv2">
sss2
</div> -->


<!-- <div v-for="el in list" :key="el">
  {{ setTimeout(2000) }} {{ el }}
</div> -->

<div v-for="i in 4" :key="i">
  <button>{{ l }}</button>
</div>

</template>

<script>


export default {
  data() {
    return {
      list: [1,2,3,4],
      l: []
    }
  },
  methods: {
    
  },
     
}
</script>

<style scoped>
.x {
  width: 20%;
  /* height: 100%; */
  height: 50%;
  overflow: hidden;
  max-height: 100%;
  /* overflow: auto; */
  border: solid orchid 3px;
  /* position: relative; */
  position: absolute;
 }

.hand {
    display: inline-block;  /*элементы в ряд*/
    margin: 60px;  /*отступ между картами*/
}

.card {
  width: 100px;
  height: 150px;
  border: solid 3px gold;
  /* margin: 0px; */
  position: absolute;
}

.img {
  width: 94px;
  height: 144px;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.typee {
  width: 20%;
  height: 20%;
  left: 1%;
  top: 1%; 
  position: absolute;
}

.charges {
  width: 20%;
  height: 20%;
  /* border: solid green; */
  background-color: hotpink;
  position: absolute;
  bottom: 2%;
  right: 5%;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: green;
  font-size: 10pt;
}

span2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 14pt;
}

.hp {
  width: 30%;
  height: 20%;
  /* border: solid green; */
  background-color: red;
  position: absolute;
  bottom: 2%;
  left: 5%;
}


.diamond2 {
  position: relative;
  height: 40px;
  width: 40px;
  /* line-height: 60px; */
  text-align: center;
  margin: -10px 50px;
  top: 10%;
  right: 10%;
}

.diamond3 {
  position: absolute;
  /* margin: -10px 50px; */
  top: 0;
  right: 8%;
  height: 40px;
  width: 40px;
  transform: rotateX(45deg) rotateZ(45deg);
  /* box-shadow: 0px 0px 12px red; */
  background-color: purple;
  border: solid 2px yellow;
}

span3 {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 15%;
  right: 15%;
  color: black;
  font-size: 17pt;
  transform:  rotateZ(-45deg);
}


.circle {
  position: absolute;
  width: 30px;
  height: 30px;
  background: orange;
  border-radius: 50%;
  /* margin: 30px 60px; */
  top: 30%;
  right: 3%;
}

.box {
  
  margin: -150px;
  
}

html, body {
  height: 100%;
}

.divvv {
  width: 80%;
  height: 30%;
  max-height: max-content;
  border: solid 2px red;
  /* margin-top: 30%; */
  /* position: sticky; */
  position: absolute;
}
.divvv2 {
  width: 70%;
  height: 30%;
  max-height: max-content;
  border: solid 2px green;
  margin-top: 15%;
  /* position: sticky; */
  position: absolute;
}






</style>