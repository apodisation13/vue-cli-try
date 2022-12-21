import { copyObj } from "@/lib/utils"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function if_in_grave_spawn_self_in_enemy_grave(card, gameObj) {
  const { enemies_grave } = gameObj

  const self = copyObj(card)
  self.hp = card.value
  self.base_hp = card.value
  self.move = {
    name: "down",
    description:
      "Каждый свой ход враг перемещается на одну клетку ниже, и если ему некуда ходить (он уже внизу, или под ним есть другой враг), он наносит лидеру игрока {damage} урона",
  }
  enemies_grave.push(self)
  timeoutAnimationFlag(card, "trigger_grave_passive")
}
