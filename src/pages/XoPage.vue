<template>
<table class='field'>
  <tr v-for="i in 3" :key="i">
    <td v-for="j in 3" :key="j" @click="place_x(get_index(i,j))">
      {{ f[get_index(i,j)] }}
    </td>
  </tr>
</table>

<div class="win" v-if="win == 1">ВЫ ВЫИГРАЛИ!!!</div>
<div class="lose" v-if="win == 2">ВЫ ПРОИГРАЛИ!!!</div>
<div class="lose" v-if="move == 6">НИЧЬЯ!!!</div>

<button class="btn_start_again" 
@click="start_again"
v-if="win == 1 | win == 2 | move == 6">
НАЧАТЬ С НАЧАЛА
</button>

</template>

<script>
import {o_logic} from '@/logic/xo_logic'

export default {
  data() {
    return {
      f: ['', '', '', '', '', '', '', '', '',],
      win: 0,
      move: 1  // ход
    }
  },
  methods: {
    get_index(i, j) {  // фукнция для поля, вернуть номер элемента поля
      return (i-1) * 3 + (j-1)
    },

    place_x(id) {

      if (!this.win && this.move != 6) {
        this.f[id] = 'X'
        this.check_win('X')
      
        if (!this.win) {
          this.ai_move()
        }
      }

    },

    ai_move() {

      if (this.move == 1) {
        if (!this.f[4]) {
          this.f[4] = 'O'
        }
        else {
          let random = Math.floor(Math.random() * this.f.length)
          if (random != 4) {
            this.f[random] = 'O'
          }
          else {
            this.f[0] = 'O'
          }
        }
      }

      if (this.move != 1) {
        o_logic(this.f)
        this.check_win('O')
      }

      this.move += 1
      
    },

    check_win(s) {
      let win1 = this.f[0] == s && this.f[1] == s && this.f[2] == s
      let win2 = this.f[3] == s && this.f[4] == s && this.f[5] == s
      let win3 = this.f[6] == s && this.f[7] == s && this.f[8] == s
      let win4 = this.f[0] == s && this.f[3] == s && this.f[6] == s
      let win5 = this.f[1] == s && this.f[4] == s && this.f[7] == s
      let win6 = this.f[2] == s && this.f[5] == s && this.f[8] == s
      let win7 = this.f[0] == s && this.f[4] == s && this.f[8] == s
      let win8 = this.f[2] == s && this.f[4] == s && this.f[6] == s
      
      if (win1 | win2 | win3 | win4 | win5 | win6 | win7 | win8) {
        if (s == 'X') {
          this.win = 1
        }
        else if (s == 'O') {
          this.win = 2
        }
      }
    },

    start_again() {
      this.f = ['', '', '', '', '', '', '', '', '',]
      this.win = 0
      this.move = 1
    },


  }
}
</script>

<style scoped>
.field {
  border: 1px solid black;
  font-size: 20pt;
  margin: 5px;
}
th, td {
  background-color: #96D4D4;
  width: 170px;
  height: 130px;
  text-align: center;
  font-size: 25pt;
}

.win {
  background-color: green;
  font-size: 25pt;
  width: 525px;
  height: 70px;
}

.lose {
  background-color: red;
  font-size: 25pt;
  width: 525px;
  height: 70px;
}

.btn_start_again {
  width: 160px;
  height: 30px
}
</style>