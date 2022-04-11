import { useToast } from 'vue-toastification'

const toast = useToast()


function passive_end_turn_increase_damage_in_hand(hand) {
  let random = Math.floor(Math.random() * hand.length)
  hand[random].damage += 1
  toast.info(`Увеличили урон карты ${hand[random].name} на 1`)
}


export {passive_end_turn_increase_damage_in_hand}