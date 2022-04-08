import { useToast } from 'vue-toastification'
import {hit_one_enemy} from "@/logic/player_move/service/service_for_player_move";
import store from "@/store"

const toast = useToast()


function damage_all(field, card) {
  field.forEach(enemy => {
    if (enemy) hit_one_enemy(enemy, card)
  })
  toast.warning('УРОН ВСЕМ!')
  if (store.state.play_sound) {
    const audio = new Audio(require('@/assets/audio/sounds/damage_all.wav'))
    audio.play()
  }
}

export { damage_all }