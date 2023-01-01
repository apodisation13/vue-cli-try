import store from "@/store"
import { sound_deathwish, sound_enemy_damage_player } from "@/logic/play_sounds"

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
