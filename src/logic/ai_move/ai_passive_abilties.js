import store from "@/store"

import {passive_end_turn_increase_damage}
  from "@/logic/ai_move/passive_abilities/increase_damage"
import {
  enemy_leader_heal_self,
  passive_end_turn_heal_all,
  passive_end_turn_heal_enemy_leader,
  passive_end_turn_heal_self
}
  from "@/logic/ai_move/passive_abilities/heal"
import {passive_end_turn_regain_shield}
  from "@/logic/ai_move/passive_abilities/regain_shield"
import {passive_end_turn_decrease_player_damage}
  from "@/logic/ai_move/passive_abilities/decrease_player_damage"

import {damage_player_by_enemy_leader} from "@/logic/ai_move/moves/damage"


function enemy_passive_abilities_end_turn(field, enemy_leader, hand) {
  store.commit('set_epa_end_turn', true)

  let passive_enemies = field.filter(e => e && e.has_passive)
  console.log(passive_enemies)

  let i = 0
  let passive_time = setInterval(() => {
    if (i === passive_enemies.length) {
      clearInterval(passive_time)
      store.commit('set_epa_end_turn', false)
    }
    else {

      // ДИСПЕТЧЕР пассивных абилок врагов
      if (passive_enemies[i].passive_ability.name === 'increase-damage') {
        passive_end_turn_increase_damage(passive_enemies[i])
      }
      else if (passive_enemies[i].passive_ability.name === 'heal') {
        passive_end_turn_heal_self(passive_enemies[i])
      }
      else if (passive_enemies[i].passive_ability.name === 'heal-leader') {
        passive_end_turn_heal_enemy_leader(passive_enemies[i], enemy_leader)
      }
      else if (passive_enemies[i].passive_ability.name === 'heal-all-by-1') {
        passive_end_turn_heal_all(field, enemy_leader)
      }
      else if (passive_enemies[i].passive_ability.name === 'regain-shield') {
        passive_end_turn_regain_shield(passive_enemies[i])
      }
      else if (passive_enemies[i].passive_ability.name === 'decrease-player-damage') {
        passive_end_turn_decrease_player_damage(passive_enemies[i], hand)
      }

      i += 1
    }
  }, 1000)
}


// эта функция срабатывает для лидера врагов каждый ход врага
function passive_leader_ai_move(enemy_leader) {
  store.commit('set_leader_ai_move', true)

  // только если у лидера больше 0 жизней идём дальше
  if (enemy_leader.hp <= 0) {
    store.commit('set_leader_ai_move', false)
    return
  }

  // ДИСПЕТЧЕР пассивных абилок лидера врага
  if (enemy_leader.ability.name === "heal-self-per-turn") {
    enemy_leader_heal_self(enemy_leader)
  }
  else if (enemy_leader.ability.name === "damage-per-turn") {
    damage_player_by_enemy_leader(enemy_leader)
  }

  store.commit('set_leader_ai_move', false)
}


export {enemy_passive_abilities_end_turn, passive_leader_ai_move}