import {useToast} from 'vue-toastification'

const toast = useToast()


function passive_end_turn_regain_shield(enemy) {
  if (!enemy.shield) enemy.shield = true
  toast.warning(`враг ${enemy.name} восстановил щит!`)
}


export {passive_end_turn_regain_shield}