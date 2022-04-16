import store from "@/store"
import {check_lose} from "@/logic/ai_move/service/check_lose"
import {sound_enemy_damage_player, sound_enemy_move_down} from "@/logic/play_sounds"


function down_move(field, i) {
  // враги которые уже стоят внизу
  if (i >= 9) {
    store.commit('change_health', -field[i].damage)
    sound_enemy_damage_player()
  }
  // ДЛЯ ОСТАЛЬНЫХ ВРАГОВ
  else {
    // ЕСЛИ У ВРАГА ЕСТЬ ВРАГ ПОД НИМ ВНИЗУ
    if (field[i+3]) {
      store.commit('change_health', -field[i].damage)
      sound_enemy_damage_player()
    }
    // ДЛЯ ОСТАЛЬНЫХ, КОМУ ЕСТЬ КУДА ПОХОДИТЬzz
    else {
      field[i+3] = field[i]  // типа враг прыгнул на клеточку ниже
      field[i] = ''
      sound_enemy_move_down()
    }
  }

  check_lose(store.state.health)
}


export { down_move }