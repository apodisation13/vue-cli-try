import { useToast } from 'vue-toastification'
import {hit_one_enemy} from "@/logic/player_move/service/service_for_player_move";

const toast = useToast()


function damage_all(field, card) {
  field.forEach(enemy => {
    if (enemy) hit_one_enemy(enemy, card)
  })
  toast.warning('УРОН ВСЕМ!')
}

export { damage_all }