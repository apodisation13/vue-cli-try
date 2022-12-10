import { sound_passive_increase_damage } from "@/logic/play_sounds"

function increase_damage_in_hand(card, hand) {
  let random = Math.floor(Math.random() * hand.length)

  let temp = hand[random].damage

  hand[random].damage = `${hand[random].damage}+${card.value}`

  setTimeout(() => {
    hand[random].damage = temp
    hand[random].damage += card.value
  }, 750)

  sound_passive_increase_damage()
}

export { increase_damage_in_hand }
