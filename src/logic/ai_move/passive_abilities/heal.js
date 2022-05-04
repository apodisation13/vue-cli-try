import {sound_heal} from "@/logic/play_sounds"
import {get_all_enemies} from "@/logic/player_move/service/service_for_player_move"


// ЛИДЕР ВРАГОВ лечит пассивно в конце хода сам себя
function enemy_leader_heal_self(enemy_leader) {
  let temp = enemy_leader.hp
  enemy_leader.hp = `${temp}+${enemy_leader.heal_self_per_turn}`
  sound_heal()
  setTimeout(() => {
    enemy_leader.hp = temp
    enemy_leader.hp += enemy_leader.heal_self_per_turn
  }, 750)
}


// ВРАГ лечит пассивно в конце хода сам себя
function passive_end_turn_heal_self(enemy) {
  let temp = enemy.hp
  enemy.hp = `${temp}+${enemy.passive_heal}`
  sound_heal()
  setTimeout(() => {
    enemy.hp = temp
    enemy.hp += enemy.passive_heal
  }, 750)
}


// враг лечит пассивно в конце хода лидера врагов
function passive_end_turn_heal_enemy_leader(enemy, enemy_leader) {
  let temp = enemy_leader.hp
  enemy_leader.hp = `${temp}+${enemy.passive_heal_leader}`
  sound_heal()
  setTimeout(() => {
    enemy_leader.hp = temp
    enemy_leader.hp += enemy.passive_heal_leader
  }, 750)
}


// враг лечит пассивно в конце хода всех врагов, включая себя и лидера
function passive_end_turn_heal_all(field, enemy_leader) {
  let all_enemies = get_all_enemies(field, enemy_leader)

  let e_hps = []

  all_enemies.forEach(e => {
    e_hps.push(e.hp)  // запомнили жизни врага
    e.hp = `${e.hp}+1`  // просто отобразили всем +1
  })
  sound_heal()

  setTimeout(() => {
    for (let i = 0; i < all_enemies.length ; i++) {
      all_enemies[i].hp = e_hps[i] + 1
    }
  }, 1000)
}


export {
  passive_end_turn_heal_self,
  enemy_leader_heal_self,
  passive_end_turn_heal_enemy_leader,
  passive_end_turn_heal_all,
}