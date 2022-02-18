<template>
 
  <div class="enemy" v-if="enemy" :style="border(enemy)">
    
    <img class="img" :src="require('@/assets/'+ '14.jpg')" alt="">

    <div class="diamond" :style="background_color(enemy)">
      <span-diamond>&dagger;{{ enemy.damage }}</span-diamond>
    </div>
    
    <div class="hp">
      <span>&hearts;{{ enemy.hp }}</span>
    </div>
    
    <div class="circle" v-if="enemy.move==='down'">
      <span>&#8595;</span>
    </div>  
    <div class="circle" v-else-if="enemy.move==='stand'">
      <span>&#9737;</span>  
    </div>
    <div class="circle" v-else-if="enemy.move==='random'">
      <span>&#9736;</span>  
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
        if (e.color === 'Bronze') return {'border': 'solid 1px lightsalmon'}
        else if (e.color === 'Silver') return {'border': 'solid 3px silver'}
        else if (e.color === 'Gold') return {'border': 'solid 3px gold'}
        else return {}
      }, 

      background_color(e) {
        if (e.faction === 'Soldiers') {
          if (e.color === 'Bronze') return {'backgroundColor': 'blue'}
          else if (e.color === 'Silver') return {'backgroundColor': 'blue', 'border': 'solid 2px silver'}
          else if (e.color === 'Gold') return {'backgroundColor': 'blue', 'border': 'solid 2px gold'}
          else return {'backgroundColor': 'blue'}  
        } 
            
        else if (e.faction === 'Monsters') {
          if (e.color === 'Bronze') return {'backgroundColor': 'red'}
          else if (e.color === 'Silver') return {'backgroundColor': 'red', 'border': 'solid 2px silver'}
          else if (e.color === 'Gold') return {'backgroundColor': 'red', 'border': 'solid 2px gold'}
          else return {'backgroundColor': 'red'}  
        }

        else if (e.faction === 'Animals') {
          if (e.color === 'Bronze') return {'backgroundColor': 'green'}
          else if (e.color === 'Silver') return {'backgroundColor': 'green', 'border': 'solid 2px silver'}
          else if (e.color === 'Gold') return {'backgroundColor': 'green', 'border': 'solid 2px gold'}
          else return {'backgroundColor': 'green'}  
        }
      
        else return {}
      },
    },
  }
</script>

<style scoped>
.enemy {
  width: 98%;
  height: 17vh;
  border-radius: 2%;
  position: relative;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  /* background-color: purple; */
  /* border: solid 1px yellow; */
}

span-diamond {
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
  width: 24%;
  height: 3vh;
  background: orangered;
  border-radius: 50%;
  top: 3%;
  left: 3%;
}

.hp {
  width: 33%;
  height: 20%;
  background-color: green;
  position: absolute;
  bottom: 2%;
  left: 2%;
  border-radius: 20%;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10pt;
  color: white;
}

</style>