import store from '@/store' // stote.state OR store.commit
import { check_lose } from '@/logic/service'
import { useToast } from 'vue-toastification'

const toast = useToast()


function stand_still(field, i) {
  store.commit('change_health', -field[i].damage)
  toast.error('враг стоит и долбит тебя))')
  check_lose(store.state.health)
}


function random_move(field, i, status) {
  if (!status) {
    let random = Math.floor(Math.random() * field.length)
    if (field[random]) {
      store.commit('change_health', -field[i].damage)
      toast.error('враг хотел прыгнуть туда где уже есть враг и нанёс урон')
      check_lose(store.state.health)
    }
    else {
      field[random] = field[i]  // враг прыгнул рандом клетку
      field[i] = ''
      toast.info(`враг прыгнул на клетку ${random}`)
    }
    status = true
    return status
  }
}


function down_move(field, i) {
  // враги которые уже стоят внизу
  if (i >= 9) {
    store.commit('change_health', -field[i].damage)
    toast.error('враг внизу нанёс урон')
  }
  // ДЛЯ ОСТАЛЬНЫХ ВРАГОВ
  else {
    // ЕСЛИ У ВРАГА ЕСТЬ ВРАГ ПОД НИМ ВНИЗУ
    if (field[i+3]) {
      store.commit('change_health', -field[i].damage)
      toast.error('враг нанёс урон, потому что ему некуда ходить')
    }
    // ДЛЯ ОСТАЛЬНЫХ, КОМУ ЕСТЬ КУДА ПОХОДИТЬ
    else {
      field[i+3] = field[i]  // типа враг прыгнул на клеточку ниже
      field[i] = ''
      toast.info('враг походил')
    }
  }

  check_lose(store.state.health)
}


function ai_move(field) {
  // alert('ход компа')
  let already_randomly_jumped = false

  for (let i = 11; i >= 0; i--) {
    if (field[i]) {

      if (field[i].move.name === "stand") {
        stand_still(field, i)
      }
      else if (field[i].move.name === "random") {
        already_randomly_jumped = random_move(field, i, already_randomly_jumped )
      }
      else if (field[i].move.name === "down") {
        down_move(field, i)
      }
    
    }
  }
}


// эта функция срабатывает для лидера только в начале игры 1 раз
function leader_ai_move_once(leader) {
  if (leader.ability.name === "damage-once") {
    store.commit('change_health', -leader.damage_once)
    toast.error(`лидер ослабил вас на ${leader.damage_once}`)
    check_lose(store.state.health)
  }
}


// эта функция срабатывает для лидера каждый ход врага
function leader_ai_move(leader) {

  if (leader.hp <= 0) return  // только если у лидера больше 0 жизней идём дальше

  if (leader.ability.name === "heal-self-per-turn") {
    leader.hp += leader.heal_self_per_turn
    toast.info(`лидер вылечил себя на ${leader.heal_self_per_turn}`)
  }

  else if (leader.ability.name === "damage-per-turn") {
    store.commit('change_health', -leader.damage_per_turn)
    toast.error(`лидер пнул вас на ${leader.damage_per_turn}`)
    check_lose(store.state.health)
  }
}


export { ai_move, leader_ai_move_once, leader_ai_move }
