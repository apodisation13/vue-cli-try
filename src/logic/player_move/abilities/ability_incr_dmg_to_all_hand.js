import { sound_passive_increase_damage } from "@/logic/play_sounds"

export function incr_dmg_to_all_hand(card, gameObj) {
  const { hand } = gameObj
  hand.forEach(c => {
    c.damage += card.value
    c.incr_dmg = true
  })
  sound_passive_increase_damage()

  setTimeout(() => {
    hand.forEach(c => {
      c.incr_dmg = false
    })
  }, 500)
}
