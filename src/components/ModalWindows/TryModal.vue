<template>
  <div class="modal" v-if="show_modal">
   
  <div class="question_text">
  {{ choices[index][0] }}
  </div> 
  
   <div class="choices">
    <input type="radio" name="answer" value="1"><label>{{ choices[index][1] }}</label>
    <input type="radio" name="answer" value="2"><label>{{ choices[index][2] }}</label>
   </div>
   

  <div class="modal_view">
    <button class="close_button" v-if="index > 0" 
    @click="prev_q">prev</button>
    <button class="close_button" v-if="index < choices.length - 1"
    @click="next_q">next</button>
  </div>

  <button @click="close_window">Забить</button>

  </div>
</template>

<script>
  export default {
    props: {
      show_modal:
        {
          required: true,
          type: Boolean
        }  
    },
    data() {
      return {
        choices: [
          ['текст вопроса 1', 'колбаса', 'сыр'], 
          ['текст вопроса 2', 'красный', 'синий'], 
          ['текст вопроса 3', 'реал', 'барса'],
        ],
        index: 0,

      }
    },
    methods: {
      next_q() {
        this.index += 1
      },
      prev_q() {
        this.index -= 1
      },
      close_window() {
        this.$emit('close_modal', false)
      },
    }
  }
</script>

<style scoped>
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
  font-size: 14pt;
}

.choices {
  width: 400px;
  height: 100px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14pt;
}

.question_text {
  width: 400px;
  height: 100px;
  text-align: center;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14pt;
}

.modal_view {
  width: 200px;
  height: 150px;
  border-radius: 12px;
  text-align: center;
  position: fixed;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12pt;
  display: inline-block;
}

.close_button {
  width: 75px;
  height: 50px;
  margin: 1px;
}
</style>