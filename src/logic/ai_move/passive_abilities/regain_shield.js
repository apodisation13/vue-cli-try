import {useToast} from 'vue-toastification'
import {sound_enemy_regain_shield} from "@/logic/play_sounds"

const toast = useToast()


function passive_end_turn_regain_shield(enemy) {
  if (!enemy.shield) {
    enemy.shield = true
    toast.warning(`враг ${enemy.name} восстановил щит!`)
    sound_enemy_regain_shield()
  }
}


export {passive_end_turn_regain_shield}