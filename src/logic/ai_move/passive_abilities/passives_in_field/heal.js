import { sound_heal } from "@/logic/play_sounds"
import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import {
  timeoutAnimationFlag,
  timeoutAnimationValue,
} from "@/logic/game_logic/timers"
import { choice_element } from "@/lib/utils"

// ЛИДЕР ВРАГОВ лечит пассивно в конце хода сам себя на VALUE
function enemy_leader_heal_self(enemy_leader) {
  timeoutAnimationValue(
    enemy_leader,
    "hp",
    `${enemy_leader.hp}+${enemy_leader.heal_self_per_turn}`,
    enemy_leader.heal_self_per_turn,
    sound_heal,
    750
  )
  timeoutAnimationFlag(enemy_leader, "healing")
}

// ВРАГ лечит пассивно в конце хода сам себя на VALUE
function heal_self(enemy) {
  timeoutAnimationValue(
    enemy,
    "hp",
    `${enemy.hp}+${enemy.value}`,
    enemy.value,
    sound_heal,
    750
  )
  timeoutAnimationFlag(enemy, "healing")
}

// враг лечит пассивно в конце хода лидера врагов на VALUE
function heal_enemy_leader(enemy, enemy_leader) {
  timeoutAnimationValue(
    enemy_leader,
    "hp",
    `${enemy_leader.hp}+${enemy.value}`,
    enemy.value,
    sound_heal,
    750
  )
  timeoutAnimationFlag(enemy, "healing")
}

// враг лечит пассивно в конце хода всех врагов на VALUE
function heal_all(enemy, field, enemy_leader) {
  let all_enemies = get_all_enemies(field, enemy_leader)

  sound_heal()
  all_enemies.forEach(e => {
    timeoutAnimationValue(
      e,
      "hp",
      `${e.hp}+${enemy.value}`,
      enemy.value,
      undefined,
      750
    )
  })
  timeoutAnimationFlag(enemy, "healing")
}

function heal_random(enemy, field, enemy_leader) {
  let all_enemies = get_all_enemies(field, enemy_leader)
  const random_enemy = choice_element(all_enemies)

  timeoutAnimationValue(
    random_enemy,
    "hp",
    `${random_enemy.hp}+${enemy.value}`,
    enemy.value,
    sound_heal,
    750
  )
  timeoutAnimationFlag(enemy, "healing")
}

function heal_self_by_highest_hp(enemy, field, enemy_leader) {
  let all_enemies = get_all_enemies(field, enemy_leader)
  all_enemies.splice(all_enemies.indexOf(enemy), 1) // EXCLUDE self)
  if (!all_enemies.length) return

  all_enemies.sort((a, b) => b.hp - a.hp)
  const target = all_enemies[0]

  timeoutAnimationValue(
    enemy,
    "hp",
    `${enemy.hp}+${target.hp}`,
    target.hp,
    sound_heal,
    750
  )
  timeoutAnimationFlag(enemy, "healing")
}

export {
  heal_self,
  enemy_leader_heal_self,
  heal_enemy_leader,
  heal_all,
  heal_random,
  heal_self_by_highest_hp,
}
