import {sound_passive_increase_damage} from "@/logic/play_sounds"


function passive_end_turn_increase_self_damage(card) {
  let temp = card.damage

  card.damage = `${card.damage}+1`

  setTimeout(() => {
    card.damage = temp
    card.damage += 1
  }, 750)

  sound_passive_increase_damage()
}


export {passive_end_turn_increase_self_damage}