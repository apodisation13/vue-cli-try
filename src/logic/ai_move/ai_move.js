import store from '@/store' // stote.state OR store.commit
import { useToast } from 'vue-toastification'

import {down_move} from "@/logic/ai_move/moves/move_down"
import {random_move} from "@/logic/ai_move/moves/move_random"
import {stand_still} from "@/logic/ai_move/moves/move_stand_still"

import {check_lose} from "@/logic/ai_move/service/check_lose"
import {set_already_jumped} from "@/logic/ai_move/service/service_for_ai_move"
import {get_all_enemies} from "@/logic/player_move/service/service_for_player_move"


const toast = useToast()


function ai_move(field) {

  store.commit('set_ai_move', true)
  set_already_jumped(field)  // установить false параметр enemy.already_jumped

  let enemies = get_all_enemies(field, {hp: 0})
  enemies.reverse()  // чтобы враги начинали снизу!!!!! ))))))

  let i = 0
  let id = setInterval( () => {
    if (i === enemies.length) {
      clearInterval(id)
      store.commit('set_ai_move', false)
    }
    else {

      // ДИСПЕТЧЕР способностей хода врагов
      if (enemies[i].move.name === "stand") {
        stand_still(field, field.indexOf(enemies[i]))
      }
      else if (enemies[i].move.name === "random" && !enemies[i].already_jumped) {
        random_move(field, field.indexOf(enemies[i]))
      }
      else if (enemies[i].move.name === "down") {
        down_move(field, field.indexOf(enemies[i]))
      }

      i += 1
    }
  }, 1000)
}


// эта функция срабатывает для лидера врагов только в начале игры 1 раз
function enemy_leader_ai_move_once(leader, deck) {
  if (leader.ability.name === "damage-once") {
    store.commit('change_health', -leader.damage_once)
    toast.error(`лидер ослабил вас на ${leader.damage_once}`)
    check_lose()
  }

  else if (leader.ability.name === 'decrease-all-player-damage-1') {
    deck.forEach(card => {
      if (card.damage > 0) card.damage -= 1
    })
    toast.error(`лидер врага уменьшил урон ВСЕХ ваших карт на 1`)
  }
}


export { ai_move, enemy_leader_ai_move_once }
