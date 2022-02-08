import store from '@/store' // stote.state OR store.commit
import { check_lose } from '@/logic/service'


function stand_still(field, i) {
  store.commit('change_health', -field[i].dmg)
  alert('враг стоит и долбит тебя))')
  check_lose(store.state.health)
}


function random_move(field, i, status) {
  if (!status) {
    let random = Math.floor(Math.random() * field.length)
    alert(random)
    if (field[random]) {
      store.commit('change_health', -field[i].dmg)
      alert('враг хотел прыгнуть туда где уже есть враг и нанёс урон')
      check_lose(store.state.health)
    }
    else {
      field[random] = field[i]  // враг прыгнул рандом клетку
      field[i] = ''
    }
    status = true
    return status
  }
}


function down_move(field, i) {
  // враги которые уже стоят внизу
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

  if (check_lose(store.state.health)) {
    return
  }
}


function ai_move(field) {
  alert('ход компа')
  let already_randomly_jumped = false

  for (let i = 11; i >= 0; i--) {
    if (field[i]) {

      if (field[i].move === "Stand-still") {
        stand_still(field, i)
      }
      else if (field[i].move === "Random") {
        already_randomly_jumped = random_move(field, i, already_randomly_jumped )
      }
      else if (field[i].move === "Down") { 
        down_move(field, i)
      }
    
    }
  }
}

export { ai_move }
