import { choice_pop } from "@/lib/utils"

export function destroy_random_enemy_in_deck(gameObj) {
  const { enemies } = gameObj
  choice_pop(enemies)
}
