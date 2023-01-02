import { copyObj } from "@/lib/utils"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"
import { sound_passive_increase_damage } from "@/logic/play_sounds"

export function set_dmg_as_highest_hand(enemy, gameObj) {
  const { hand } = gameObj
  if (!hand.length) return

  const hand_sort = copyObj(hand)
  hand_sort.sort((a, b) => b.damage - a.damage)
  let target = hand_sort[0]

  enemy.damage = target.damage
  timeoutAnimationFlag(enemy, "incr_dmg", sound_passive_increase_damage)
}
