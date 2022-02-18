<template>
<div class="enemy-leader">
  
  <!-- <img class="img" :src="require('@/assets/'+ '50.jpg')" alt=""> -->
  
  <div class="diamond">
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
</template>

<script>
export default {
  name: 'enemy-leader',
}
</script>

<style scoped>
.enemy-leader {
  height: 18vh;
  width: 98%;
  border: solid 2px blue;
  border-radius: 2%;
  margin-bottom: 2px;
  margin-top: 2px;
  position: relative;
}

.img {
  width: 99%;
  height: 99%;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.diamond {
  position: absolute;
  top: 1%;
  right: 6%;
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
  right: 2%;
  color: black;
  font-size: 10pt;
  transform:  rotateZ(-45deg);
}

.circle {
  position: absolute;
  width: 34%;
  height: 4vh;
  border-radius: 50%;
  top: 30%;
  right: 3%;
  background: gray;
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
</style>