import { sound_heal } from "@/logic/play_sounds"
import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"

// ЛИДЕР ВРАГОВ лечит пассивно в конце хода сам себя на VALUE
function enemy_leader_heal_self(enemy_leader) {
  let temp = enemy_leader.hp
  enemy_leader.hp = `${temp}+${enemy_leader.heal_self_per_turn}`
  sound_heal()
  setTimeout(() => {
    enemy_leader.hp = temp
    enemy_leader.hp += enemy_leader.heal_self_per_turn
  }, 750)
}

// ВРАГ лечит пассивно в конце хода сам себя на VALUE
function heal_self(enemy) {
  let temp = enemy.hp
  enemy.hp = `${temp}+${enemy.value}`
  sound_heal()
  setTimeout(() => {
    enemy.hp = temp
    enemy.hp += enemy.value
  }, 750)
}

// враг лечит пассивно в конце хода лидера врагов на VALUE
function heal_enemy_leader(enemy, enemy_leader) {
  let temp = enemy_leader.hp
  enemy_leader.hp = `${temp}+${enemy.value}`
  sound_heal()
  setTimeout(() => {
    enemy_leader.hp = temp
    enemy_leader.hp += enemy.value
  }, 750)
}

// враг лечит пассивно в конце хода всех врагов на VALUE
function heal_all(enemy, field, enemy_leader) {
  let all_enemies = get_all_enemies(field, enemy_leader)

  let e_hps = []

  all_enemies.forEach(e => {
    e_hps.push(e.hp) // запомнили жизни врага
    e.hp = `${e.hp}+${enemy.value}` // просто отобразили всем +value
  })
  sound_heal()

  setTimeout(() => {
    for (let i = 0; i < all_enemies.length; i++) {
      all_enemies[i].hp = e_hps[i] + enemy.value
    }
  }, 750)
}

export { heal_self, enemy_leader_heal_self, heal_enemy_leader, heal_all }
