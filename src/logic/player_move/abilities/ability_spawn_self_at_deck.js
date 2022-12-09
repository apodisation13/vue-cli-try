import { copyObj } from "@/lib/utils"

export function spawn_self_at_deck(card, gameObj) {
  gameObj.deck.push(copyObj(card))
}
