import {sound_heal} from "@/logic/play_sounds"


// ЛИДЕР ВРАГОВ лечит пассивно в конце хода сам себя
function enemy_leader_heal_self(enemy_leader) {
  let temp = enemy_leader.hp
  enemy_leader.hp = `${temp}+${enemy_leader.heal_self_per_turn}`
  setTimeout(() => {
    enemy_leader.hp = temp
    enemy_leader.hp += enemy_leader.heal_self_per_turn
  }, 750)
  sound_heal()
}


// ВРАГ лечит пассивно в конце хода сам себя
function passive_end_turn_heal_self(enemy) {
  let temp = enemy.hp
  enemy.hp = `${temp}+${enemy.passive_heal}`
  setTimeout(() => {
    enemy.hp = temp
    enemy.hp += enemy.passive_heal
  }, 750)
  sound_heal()
}


// враг лечит пассивно в конце хода лидера врагов
function passive_end_turn_heal_enemy_leader(enemy, enemy_leader) {
  let temp = enemy_leader.hp
  enemy_leader.hp = `${temp}+${enemy.passive_heal_leader}`
  setTimeout(() => {
    enemy_leader.hp = temp
    enemy_leader.hp += enemy.passive_heal_leader
  }, 750)
  sound_heal()
}


export {passive_end_turn_heal_self, enemy_leader_heal_self, passive_end_turn_heal_enemy_leader}