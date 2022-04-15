import {useToast} from 'vue-toastification'

const toast = useToast()


function passive_end_turn_decrease_player_damage(enemy, hand) {
  let random = Math.floor(Math.random() * hand.length)
  hand[random].damage -= 1
  toast.error(`ВРАГ ${enemy.name} уменьшил урон карты ${hand[random].name} на 1!!!`)
}


export {passive_end_turn_decrease_player_damage}