import store from "@/store"
import { useToast } from 'vue-toastification'
import {check_lose} from "@/logic/ai_move/service/check_lose"
import {sound_enemy_damage_player} from "@/logic/play_sounds"

const toast = useToast()


function down_move(field, i) {
  // враги которые уже стоят внизу
  if (i >= 9) {
    store.commit('change_health', -field[i].damage)
    toast.error(`враг внизу нанёс урон ${field[i].damage}`)
    sound_enemy_damage_player()
  }
  // ДЛЯ ОСТАЛЬНЫХ ВРАГОВ
  else {
    // ЕСЛИ У ВРАГА ЕСТЬ ВРАГ ПОД НИМ ВНИЗУ
    if (field[i+3]) {
      store.commit('change_health', -field[i].damage)
      toast.error(`враг нанёс урон ${field[i].damage}, потому что ему некуда ходить`)
      sound_enemy_damage_player()
    }
    // ДЛЯ ОСТАЛЬНЫХ, КОМУ ЕСТЬ КУДА ПОХОДИТЬzz
    else {
      field[i+3] = field[i]  // типа враг прыгнул на клеточку ниже
      field[i] = ''
      toast.info('враг походил')
    }
  }

  check_lose(store.state.health)
}


export { down_move }