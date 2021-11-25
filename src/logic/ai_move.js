import store from '@/store' // stote.state OR store.commit
import { check_health } from '@/logic/service'


function ai_move(field) {
  alert('ход компа')
  
  for (let i = 11; i >= 0; i--) {
    if (field[i]) {

      // ДЛЯ ВРАГОВ КОТОРЫЕ СТОЯТ ВНИЗУ
      if (i >= 9) {
        store.commit('change_health', -field[i].dmg)
        alert('враг внизу нанёс урон')
      }

      // ДЛЯ ОСТАЛЬНЫХ ВРАГОВ
      else {

        // ЕСЛИ У ВРАГА ЕСТЬ ВРАГ ПОД НИМ ВНИЗУ
        if (field[i+3]) {
          store.commit('change_health', -field[i].dmg)
          alert('враг нанёс урон, потому что ему некуда ходить')
        }

        // ДЛЯ ОСТАЛЬНЫХ, КОМУ ЕСТЬ КУДА ПОХОДИТЬ
        else {
          field[i+3] = field[i]  // типа враг прыгнул на клеточку ниже
          field[i] = ''
          alert('враг походил')
        }

      }

      if (check_health(store.state.health)) {
        alert('ВЫ ПРОИГРАЛИ')
        return
      }

    }
  }
  // return field
}

export { ai_move }
