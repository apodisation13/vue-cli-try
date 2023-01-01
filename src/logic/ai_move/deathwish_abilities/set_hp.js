import store from "@/store"
import {
  sound_deathwish,
  sound_enemy_damage_player,
  sound_heal,
} from "@/logic/play_sounds"
import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

// устанавливает жизни игрока равными enemy.deathwish_value!
export function set_hp(enemy) {
  sound_deathwish()
  let temp = store.state.game.health // сохраняем сколько было жизней
  store.commit("set_health", `${temp}-${temp - enemy.deathwish_value}`) // 43 - (42)
  setTimeout(() => {
    store.commit("set_health", enemy.deathwish_value)
  }, 750)
  sound_enemy_damage_player()
}

// устанавливает жизни самого слабого врага на поле, включая лидера врагов, равным жизням самого сильного врага на поле
export function set_weakest_hp_as_highest(gameObj) {
  sound_deathwish()
  const { field, enemy_leader } = gameObj
  let all_enemies = get_all_enemies(field, enemy_leader)
  all_enemies.sort((a, b) => b.hp - a.hp)
  if (all_enemies.length <= 1) return // выходим если там остался всего 1 враг
  let strongest = all_enemies[0]
  let weakest = all_enemies.at(-1)
  weakest.hp = strongest.hp
  sound_heal()
  timeoutAnimationFlag(weakest, "healing")
}
