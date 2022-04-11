import { useToast } from 'vue-toastification'
import {hit_one_enemy} from "@/logic/player_move/service/service_for_player_move"
import {sound_damage_all} from "@/logic/play_sounds"

const toast = useToast()


function damage_all(field, card) {
  field.forEach(enemy => {
    if (enemy) hit_one_enemy(enemy, card)
  })
  toast.warning('УРОН ВСЕМ!')
  sound_damage_all()
}

export { damage_all }