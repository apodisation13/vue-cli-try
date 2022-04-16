import { useToast } from 'vue-toastification'

const toast = useToast()


function passive_end_turn_increase_self_damage(card) {
  card.damage += 1
  toast.info(`Карта ${card.name} увеличила у себя урон`)
}


export {passive_end_turn_increase_self_damage}