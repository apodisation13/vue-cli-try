import { sound_deathwish } from "@/logic/play_sounds"
import { choice_element } from "@/lib/utils"

// уничтожает случайную карту игрока из его колоды
export function destroy_player_card_in_deck(gameObj) {
  sound_deathwish()

  const { deck } = gameObj
  if (!deck.length) return

  deck.splice(choice_element(deck), 1)
}
