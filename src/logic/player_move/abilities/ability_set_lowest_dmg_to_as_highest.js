import { copyObj } from "@/lib/utils"
import { sound_passive_increase_damage } from "@/logic/play_sounds"

export function set_lowest_dmg_to_as_highest(gameObj) {
  const { hand } = gameObj
  const hand_calc = copyObj(hand)
  const highest_dmg_card = hand_calc.sort((a, b) => b.damage - a.damage)[0]
  const lowest_dmg_card = hand_calc.sort((a, b) => a.damage - b.damage)[0]
  const card = hand.filter(c => c.id === lowest_dmg_card.id)[0]
  hand[hand.indexOf(card)].damage = highest_dmg_card.damage
  sound_passive_increase_damage()
}
