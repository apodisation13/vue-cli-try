import {useToast} from 'vue-toastification'

const toast = useToast()


function passive_end_turn_heal(enemy) {
  enemy.hp += enemy.passive_heal
  toast.info(`Враг ${enemy.name} увеличил свои жизни на ${enemy.passive_heal}`)
}


export {passive_end_turn_heal}