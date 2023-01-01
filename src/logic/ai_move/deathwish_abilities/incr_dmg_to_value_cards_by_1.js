import { choice_element } from "@/lib/utils"
import { sound_passive_increase_damage } from "@/logic/play_sounds"

export function incr_dmg_to_value_cards_by_1(enemy, gameObj) {
  const { hand } = gameObj
  if (!hand.length) return

  sound_passive_increase_damage()
  // для deathwish_value количества карт в руке игрока увеличим их урон на 1
  for (let i = 0; i < enemy.deathwish_value; i++) {
    const random_hand = choice_element(hand)
    random_hand.damage += 1
    random_hand.incr_dmg = true
  }

  setTimeout(() => {
    hand.forEach(c => {
      if (c.incr_dmg) c.incr_dmg = false
    })
  }, 500)
}
