import {sound_passive_increase_damage} from "@/logic/play_sounds"


function passive_end_turn_increase_damage_in_hand(hand) {
  let random = Math.floor(Math.random() * hand.length)

  let temp = hand[random].damage

  hand[random].damage = `${hand[random].damage}+1`

  setTimeout(() => {
    hand[random].damage = temp
    hand[random].damage += 1
  }, 750)

  sound_passive_increase_damage()
}


export {passive_end_turn_increase_damage_in_hand}