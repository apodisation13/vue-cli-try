<template>
<!-- <img :src="require('@/assets/'+ 'grass.jpg')" alt=""> -->

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



  <div class="field">
    <table class="table">
      <tr>
        <td><div class="enemy">1</div></td>
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
        <td><div class="enemy">1</div></td>
        <td>12</td>
      </tr>
    </table>
  </div>

  <div class="right-panel">
    <div class="enemy-leader">
      SS1
    </div>
    <div class="enemy-leader">
      SS2
    </div>
    <div class="enemy-leader">
      <button class="pass-btn">Пас</button>
    </div>
    <div class="enemy-leader">
      SS4
    </div>
  </div>



<div class="hand">
  <div class='card' v-for="el in list" :key="el">
    <div class="diamond3">
      <span3>&dagger;{{ el * 5 }}</span3> 
    </div>
  </div>
</div>

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
    }
  },
     
}
</script>

<style scoped>

.field {
  display: inline;
  float: left;
  border: 1px solid red;
  font-size: 20pt;
  width: 75%;
  height: 74vh;
  overflow: hidden;
}

.table {
  table-layout:fixed;
  width: 100%;
}

table tr, td {
  /* width: 50%; */
  height: 18vh;
  border: solid 1px black;
  overflow: hidden;
}

.enemy {
  width: 98%;
  height: 17vh;
  border: solid 1px green
}

.right-panel {
  display: inline;
  float: right;
  width: 23%;
  height: 74vh;
  border: solid 1px orange;
}

.hand {
  width: 98%;
  height: 22vh;
  border: solid 1px blue;
  clear: both;
  overflow: auto;
  white-space: nowrap;
}

.enemy-leader {
  height: 18vh;
  width: 98%;
  border: solid 1px blue;
  margin-bottom: 2px;
  margin-top: 2px;
}

.pass-btn {
  width: 11vh;
  height: 11vh;
  background: orange;
  border-radius: 50%;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}

.card {
  width: 26%;
  height: 20vh;
  border: solid 3px gold;
  display: inline-block;
  margin-right: 1px;
  position: relative;
}

.diamond3 {
  position: relative;
  top: 1%;
  left: 60%;
  height: 5vh;
  width: 5vh;
  transform: rotateX(45deg) rotateZ(45deg);
  background-color: purple;
  border: solid 2px yellow;
}

span3 {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 25%;
  right: 15%;
  color: black;
  font-size: 10pt;
  transform:  rotateZ(-45deg);
}








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
/* .s {
  width: 40%;
  height: 150px;
} */

/* body {
  background-image: require('@/assets/'+ 'grass.jpg');
} */

/* .hand {
  display: inline-block; 
  margin: 60px;  
  background-image: url('../assets/brick.jpg');
} */

/* .card {
  width: 100px;
  height: 150px;
  border: solid 3px gold;
  margin: 0px;
  position: absolute;
} */

.card_selected {
  width: 106px;
  height: 156px;
  border: solid 2px black;
  position: absolute;
}

.active-class {
  width: 100px;
  height: 150px;
  border: solid 3px red;
  /* margin: 0px; */
  /* position: absolute; */
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

.diamond3asda {
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

/* span3 {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 15%;
  right: 15%;
  color: black;
  font-size: 10pt;
  transform:  rotateZ(-45deg);
} */


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

/* html, body {
  height: 100%;
  background: url('~@/assets/brick.jpg');
} */

.divvv {
  width: 80%;
  height: 30%;
  max-height: max-content;
  border: solid 2px red;
  /* margin-top: 30%; */
  /* position: sticky; */
  position: absolute;
  background-image: url('~@/assets/brick.jpg');
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