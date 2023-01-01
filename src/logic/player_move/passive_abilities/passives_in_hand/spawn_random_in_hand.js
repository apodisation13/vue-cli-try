import store from "@/store"
import { choice_element, copyObj } from "@/lib/utils"
import { timeoutAnimationFlag } from "@/logic/game_logic/timers"

export function spawn_random_in_hand(card, gameObj) {
  const { hand, leader } = gameObj
  if (hand.length >= store.state.game.hand_size) return

  const pool = store.getters["all_cards"].filter(
    c => c.card.faction === leader.faction
  )
  const random_card = choice_element(pool)
  hand.push(copyObj(random_card.card))
  timeoutAnimationFlag(card, "spawning")
}
