import {useToast} from 'vue-toastification'

const toast = useToast()


function passive_end_turn_increase_damage(enemy) {
  enemy.damage += enemy.passive_increase_damage
  toast.info(`Враг ${enemy.name} увеличил свой урон на ${enemy.passive_increase_damage}`)
}


export {passive_end_turn_increase_damage}