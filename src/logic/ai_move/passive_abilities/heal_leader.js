import {useToast} from 'vue-toastification'

const toast = useToast()


function passive_end_turn_heal_leader(enemy, enemy_leader) {
  enemy_leader.hp += enemy.passive_heal_leader
  toast.info(`Враг ${enemy.name} увеличил жизни лидера на ${enemy.passive_heal_leader}`)
}


export {passive_end_turn_heal_leader}