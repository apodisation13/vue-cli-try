import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function incr_dmg_to_all_grave(card, gameObj) {
  const { grave } = gameObj
  if (!grave.length) return

  grave.forEach(c => {
    c.damage += card.value
  })
  timeoutAnimationFlag(grave[0], "trigger_passive_grave")
}
