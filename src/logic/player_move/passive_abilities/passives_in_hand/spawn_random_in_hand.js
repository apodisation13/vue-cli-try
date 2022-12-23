import store from "@/store"
import { choice_element, copyObj } from "@/lib/utils"

export function spawn_random_in_hand(gameObj) {
  const { hand, leader } = gameObj

  const pool = store.getters["all_cards"].filter(
    c => c.card.faction === leader.faction
  )
  const random_card = choice_element(pool).card
  hand.push(copyObj(random_card))
}
