import { copyObj } from "@/lib/utils"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function spawn_self_at_grave(card, gameObj) {
  gameObj.grave.push(copyObj(card))
  timeoutAnimationFlag(gameObj.grave[0], "trigger_grave_passive")
}
