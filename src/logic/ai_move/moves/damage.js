import store from "@/store"
import { sound_enemy_damage_player } from "@/logic/play_sounds"
import { check_lose } from "@/logic/ai_move/service/check_lose"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

function damage_player(field, i) {
  if (field[i].locked) return

  sound_enemy_damage_player()

  let temp = store.state.game.health // сохраняем сколько было жизней
  store.commit("set_health", `${store.state.game.health}-${field[i].damage}`) // 45-12

  timeoutAnimationFlag(field[i], "damages_player")
  setTimeout(() => {
    store.commit("set_health", temp)
    store.commit("change_health", -field[i].damage)
    check_lose()
  }, 750)
}

function damage_player_by_enemy_leader(enemy_leader) {
  if (enemy_leader.locked) return

  sound_enemy_damage_player()

  let temp = store.state.game.health // сохраняем сколько было жизней
  store.commit(
    "set_health",
    `${store.state.game.health}-${enemy_leader.damage_per_turn}`
  ) // 45-12

  setTimeout(() => {
    store.commit("set_health", temp)
    store.commit("change_health", -enemy_leader.damage_per_turn)
    check_lose()
  }, 750)
}

export { damage_player, damage_player_by_enemy_leader }
