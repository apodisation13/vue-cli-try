<template>
  <div>
    <div class="enemy" v-if="enemy"
      :style="border(enemy)"
      >
      <!-- &dagger;{{ enemy.dmg }} -->
      <div class="diamond3">
        <span>&dagger;{{ enemy.damage }}</span>
      </div>
      <div class="hp">
        &hearts;{{ enemy.hp }}
      </div>
      
      <div class="circle" v-if="enemy.move==='down'">
        &#8595;
      </div>  
      <div class="circle" v-else-if="enemy.move==='stand'">
        &#9737;  
      </div>
      <div class="circle" v-else-if="enemy.move==='random'">
        &#9736;  
      </div>

          
      </div>
  </div>
</template>

<script>
  export default {
    name: 'enemy-comp',
    props: {
      enemy: {
        required: true,
      },
    },
    methods: {
      border(e) {
        if (e.color === 'Bronze') return {'border': 'solid 3px lightsalmon'}
        else if (e.color === 'Silver') return {'border': 'solid 4px silver'}
        else if (e.color === 'Gold') return {'border': 'solid 5px gold'}
        else return {}
    }, 
    },
  }
</script>

<style scoped>
.enemy {
  width: 70%;
  /* height: 270px; */
  height: 110px;
  margin: auto;
  /* color: white; */
  border-radius: 5px;
  position: relative;
}

span {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 15%;
  right: 15%;
  color: black;
  font-size: 25pt;
  transform:  rotateZ(-45deg);
}

.hp {
  width: 90px;
  height: 30px;
  background-color: lawngreen;
  position: absolute;
  bottom: 2%;
  left: 2%;
  border-radius: 2px;
}

.diamond3 {
  position: absolute;
  top: 5%;
  right: 5%;
  height: 70px;
  width: 70px;
  transform: rotateX(45deg) rotateZ(45deg);
  border: solid 2px blue;
}

.circle {
  position: absolute;
  width: 40px;
  height: 40px;
  background: blue;
  border-radius: 50%;
  top: 3%;
  left: 3%;
  font-size: 25pt;
}
</style>