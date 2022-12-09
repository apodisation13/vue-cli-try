import { copyObj } from "@/lib/utils"

export function spawn_self_at_grave(card, gameObj) {
  gameObj.grave.push(copyObj(card))
}
