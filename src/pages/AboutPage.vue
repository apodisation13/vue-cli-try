<template>

<!-- Страница о нас <br>
ЗДЕСЬ Я ТРЕНИРУЮС -->
<!-- <img :src="require('@/assets/'+ '1.jpg')" alt=""> -->

<!-- <div class="s"> -->
<!-- <div v-for="(el, i) in list" :key="i" class="hand" >
  <div :class="{'card_selected': i === active}">
<div class='card'  @click="c(i)">
  <div class="box">
    <div class="typee"><span class="span2">&starf;</span></div>
    <div class="diamond3"><span3>&dagger;8</span3></div>
    <div class="circle"><span class="span2">&#9850;</span></div>
    <div class="charges"><span class="span2">3</span></div>
    <div class="hp"><span>&hearts;12</span></div> 
  </div>   
</div> 
</div>  
</div> -->
<!-- </div> -->


<!-- <div class="divvv">
sss
</div>
<div class="divvv2">
sss2
</div> -->


<!-- <div v-for="i in 4" :key="i">
  <button>{{ l }}</button>
</div> -->
<!-- <div v-for="(value, index) in list" :key="index">
  <div class="card" 
  :class="{'active-class': index === active}"
  @click="active=index"></div>
</div> -->



  <!-- <div class="field">
    <table class="table">
      <tr>
        <td>
          <div class="enemy">
          
        <img class="img" :src="require('@/assets/'+ '14.jpg')" alt="">
        <div class="diamond3">
          <span3>&dagger;4</span3> 
        </div>
        <div class="circle">
          <span>+&hearts;2</span>
        </div>
        <div class="charges">
          <span>2</span>
        </div>
        <div class="hp">
          <span>&hearts;12</span>
        </div>
        <div class="typee">
          <span>&starf;</span>
        </div>
          
          </div>
        </td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>4</td>
        <td>5</td>
        <td><div class="enemy">1</div></td>
      </tr>
      <tr>
        <td>7</td>
        <td><div class="enemy">1</div></td>
        <td>9</td>
      </tr>
      <tr>
        <td>10</td>
        <td>
          <img class="img" :src="require('@/assets/'+ '14.jpg')" alt="">
        <div class="diamond3">
          <span3>&dagger;4</span3> 
        </div>
        <div class="circle">
          <span>+&hearts;2</span>
        </div>
        <div class="charges">
          <span>2</span>
        </div>
        <div class="hp">
          <span>&hearts;12</span>
        </div>
        <div class="typee">
          <span>&starf;</span>
        </div>
        </td>
        <td>12</td>
      </tr>
    </table>
  </div>

  <div class="right-panel">
    
    <div class="enemy-leader">
      
        <img class="img" :src="require('@/assets/'+ '4.jpg')" alt="">
        <div class="diamond3">
          <span3>&dagger;4</span3> 
        </div>
        <div class="circle">
          <span>+&hearts;2</span>
        </div>
        <div class="charges">
          <span>2</span>
        </div>
        <div class="hp">
          <span>&hearts;12</span>
        </div>
        <div class="typee">
          <span>&starf;</span>
        </div>
    </div>
    
    <div class="div-pass-btn2">
      <button class="single-btn2">КлВр</button>
      <button class="single-btn2">Вр</button>
    </div>
    <div class="div-draw">
      <button class="single-btn2">ДРО</button>
    </div>
    <div class="div-pass-btn">
      <button class="pass-btn">Пас</button>
    </div>
    <div class="div-pass-btn2">
      <button class="single-btn2">Колода</button>
      <button class="single-btn2">Клад</button>
    </div>
    
    <div class="enemy-leader">
      <img class="img" :src="require('@/assets/'+ '50.jpg')" alt="">
        <div class="diamond3">
          <span3>&dagger;4</span3> 
        </div>
        <div class="circle">
          <span>+&hearts;2</span>
        </div>
        <div class="charges">
          <span>2</span>
        </div>
        <div class="hp">
          <span>&hearts;12</span>
        </div>
        <div class="typee">
          <span>&starf;</span>
        </div>
    </div>
  
    
    <button class="health-btn">&hearts;142</button>
  

  </div> -->



<!-- <div class="hand">
  <div class='card' v-for="el in list" :key="el">
    <img class="img" :src="require('@/assets/'+ '2.jpg')" alt="">
    <div class="diamond3">
      <span3>&dagger;{{ el * 5 }}</span3> 
    </div>
    <div class="circle">
      <span>+&hearts;{{ el * 4 }}</span>
    </div>
    <div class="charges">
      <span>{{ el }}</span>
    </div>
    <div class="hp">
      <span>&hearts;{{ el }}</span>
    </div>
    <div class="typee">
      <span>&starf;</span>
    </div>
  </div>
</div> -->

<!--<div class="hand">-->
<!--  <div class='card0'>-->
<!--    <div class="diamond3">-->
<!--      <span3>&dagger;{{ list[0] * 5 }}</span3> -->
<!--    </div>-->
<!--  </div>-->
<!--  <div class='card1'>-->
<!--    <div class="diamond3">-->
<!--      <span3>&dagger;{{ list[1] * 5 }}</span3> -->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->

<!--<div class="hand">-->
<!--  <div class='card' v-for="(el, index) in list" :key="el"-->
<!--  :style="{'z-index': 6 - index}">-->
<!--    <div class="diamond3">-->
<!--      <span3>&dagger;{{ el * 5 }}</span3> -->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->

  <div class="card" v-touch="sss" v-touch:rollover="ee">
    {{ list[0] }}
  </div><br>
  <div class="card" v-touch:longtap="sss">
    {{ list[1] }}
  </div><br>
  <div class="card" v-touch:swipe.left="ee">
    {{ list[2] }}
  </div><br>
  <div class="card" v-touch:drag.once="ff" v-touch:release="gg">
<!--    <img class="img" :src="require('@/assets/'+ '2.jpg')" alt="">-->
    {{ list[3] }}
  </div><br>
  <div class="card" v-on:touchmove="ff" v-touch:release="gg">
    <img class="img" :src="require('@/assets/'+ '2.jpg')" alt="">
    {{ list[4] }}
  </div><br>



</template>

<script>


export default {
  data() {
    return {
      list: [1,2,3,4,5,6],
      l: [],
      active: undefined
    }
  },
  methods: {
    c(el) {
      // alert(el)
      alert(window.screen.height)
      alert(window.screen.width)
      this.active = el
    },
    sss() {
      alert(111)
    },
    ddd() {
      alert(222)
    },
    ee() {
      alert(333)
    },
    ff() {
      console.log(4)
    },
    gg() {
      alert(5)
    },
  },
     
}
</script>

<style scoped>

/* САМО ПОЛЕ ДИВ */
.field {
  display: inline;
  float: left;
  /* border: 1px solid red; */
  font-size: 20pt;
  width: 75%;
  height: 74vh;
  overflow: hidden;
}

/* ТАБЛИЦА  */
.table {
  table-layout:fixed;
  width: 100%;
}

/* КЛЕТКИ ТАБЛИЦЫ */
table tr, td {
  /* width: 50%; */
  height: 18vh;
  border: dashed 0.5px black;
  overflow: hidden;
  position: relative;
}

/* ДИВ ВНУТРИ ТАБЛИЦЫ, ну чтобы он там не полностью клетку занимал */
.enemy {
  width: 98%;
  height: 17vh;
  border: solid 2px green;
  border-radius: 2%;
  position: relative;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.right-panel {
  display: inline;
  float: right;
  width: 24.5%;
  height: 74vh;
  /* border: solid 1px orange; */
  position: relative;
  margin-right: 0.4%;
}

.hand {
  width: 98%;
  height: 21vh;
  /* border: solid 1px blue; */
  clear: both;
  overflow: auto;
  white-space: nowrap;
}

.enemy-leader {
  height: 18vh;
  width: 98%;
  border: solid 2px blue;
  border-radius: 2%;
  margin-bottom: 2px;
  margin-top: 2px;
  position: relative;
}


.div-pass-btn {
  height: 12vh;
  width: 98%;
  border: solid 1px blue;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.pass-btn {
  width: 11vh;
  height: 11vh;
  background: orange;
  border-radius: 50%;
  border-color: fuchsia;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}
.div-pass-btn2 {
  height: 7.5vh;
  width: 98%;
  border: solid 1px red;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.div-draw {
  height: 4.3vh;
  width: 98%;
  border: solid 1px red;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.single-btn {
  height: 20%;
  width: 98%;
  border: solid 1px yellow;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.single-btn2 {
  height: 40%;
  width: 98%;
  border: solid 1px yellow;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}

.health-btn {
  height: 4vh;
  width: 98%;
  background-color: green;
  border: 0;
  margin-bottom: 1%;
  margin-top: 1%;
  position: relative;
}


.card {
  width: 26%;
  height: 18.5vh;
  border: solid 3px gold;
  border-radius: 2%;
  display: inline-block;
  margin-right: -13%;
  margin-left: 0.5%;
  margin-top: 0.1%;
  position: relative;
}

.diamond3 {
  position: absolute;
  top: 1%;
  /* left: 60%; */
  right: 6%;
  /* right: 1vmax; */
  height: 4vh;
  width: 4vh;
  transform: rotateX(45deg) rotateZ(45deg);
  background-color: purple;
  border: solid 1px yellow;
}

span3 {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 25%;
  right: 10%;
  color: black;
  font-size: 10pt;
  transform:  rotateZ(-45deg);
}


.circle {
  position: absolute;
  width: 34%;
  height: 4vh;
  background: gray;
  border-radius: 50%;
  top: 30%;
  right: 3%;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8pt;
}

.charges {
  width: 20%;
  height: 20%;
  background-color: hotpink;
  position: absolute;
  bottom: 2%;
  right: 2%;
  border-radius: 20%;
}

.hp {
  width: 30%;
  height: 20%;
  background-color: green;
  position: absolute;
  bottom: 2%;
  left: 2%;
  border-radius: 20%;
}

.typee {
  width: 10%;
  height: 10%;
  left: 1%;
  top: 1%; 
  position: absolute;
}

.img {
  /* width: 94px;
  height: 144px; */
  width: 99%;
  height: 99%;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}


.card0 {
  width: 26%;
  height: 18.5vh;
  border: solid 3px gold;
  border-radius: 2%;
  display: inline-block;
  margin-right: 1%;
  margin-left: 0.5%;
  margin-top: 0.1%;
  position: relative;
  z-index: 6;
}
.card1 {
  width: 26%;
  height: 18.5vh;
  border: solid 3px gold;
  border-radius: 2%;
  display: inline-block;
  margin-right: 1%;
  margin-left: -20%;
  margin-top: 0.1%;
  position: relative;
  z-index: 5;
}
</style>