import store from '@/store' // stote.state OR store.commit
import { useToast } from 'vue-toastification'

import {down_move} from "@/logic/ai_move/moves/move_down"
import {random_move} from "@/logic/ai_move/moves/move_random"
import {stand_still} from "@/logic/ai_move/moves/move_stand_still"

import {check_lose} from "@/logic/ai_move/service/check_lose"
import {set_already_jumped} from "@/logic/ai_move/service/service_for_ai_move"

const toast = useToast()


function ai_move(field) {

  set_already_jumped(field)  // установить false параметр enemy.already_jumped

  for (let i = 11; i >= 0; i--) {
    if (field[i]) {

      if (field[i].move.name === "stand") {
        stand_still(field, i)
      }
      else if (field[i].move.name === "random" && !field[i].already_jumped) {
        random_move(field, i)
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
    toast.error(`лидер нанёс вам ${leader.damage_per_turn} урона`)
    check_lose(store.state.health)
  }
}


export { ai_move, leader_ai_move_once, leader_ai_move }
