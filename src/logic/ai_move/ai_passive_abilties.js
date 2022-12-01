import store from "@/store"

import { incr_self_dmg } from "@/logic/ai_move/passive_abilities/increase_damage"
import {
  enemy_leader_heal_self,
  heal_all,
  heal_enemy_leader,
  heal_self,
} from "@/logic/ai_move/passive_abilities/heal"
import { regain_shield } from "@/logic/ai_move/passive_abilities/regain_shield"
import { decrease_player_damage } from "@/logic/ai_move/passive_abilities/decrease_player_damage"

import { damage_player_by_enemy_leader } from "@/logic/ai_move/moves/damage"

function enemy_passive_abilities_end_turn(field, enemy_leader, hand) {
  store.commit("set_epa_end_turn", true)

  let passive_enemies = field.filter(e => e && e.has_passive)
  console.log(passive_enemies)

  let i = 0
  let passive_time = setInterval(() => {
    if (i === passive_enemies.length) {
      clearInterval(passive_time)
      store.commit("set_epa_end_turn", false)
    } else {
      // ДИСПЕТЧЕР пассивных абилок врагов
      const pea = passive_enemies[i].passive_ability.name
      if (pea === "incr-self-dmg") {
        incr_self_dmg(passive_enemies[i])
      } else if (pea === "heal-self") {
        heal_self(passive_enemies[i])
      } else if (pea === "heal-leader") {
        heal_enemy_leader(passive_enemies[i], enemy_leader)
      } else if (pea === "heal-all") {
        heal_all(passive_enemies[i], field, enemy_leader)
      } else if (pea === "regain-shield") {
        regain_shield(passive_enemies[i])
      } else if (pea === "decrease-player-damage") {
        decrease_player_damage(passive_enemies[i], hand)
      }

      i += 1
    }
  }, 1000)
}

// эта функция срабатывает для лидера врагов каждый ход врага
function passive_leader_ai_move(enemy_leader) {
  if (enemy_leader.hp <= 0) return
  if (enemy_leader.locked || !enemy_leader.has_passive) return

  // дальше идём, если у врага жизней не ноль И он не locked
  store.commit("set_leader_ai_move", true)

  // ДИСПЕТЧЕР пассивных абилок лидера врага
  if (enemy_leader.ability.name === "heal-self-per-turn") {
    enemy_leader_heal_self(enemy_leader)
  } else if (enemy_leader.ability.name === "damage-per-turn") {
    damage_player_by_enemy_leader(enemy_leader)
  }

  store.commit("set_leader_ai_move", false)
}

export { enemy_passive_abilities_end_turn, passive_leader_ai_move }
