import {
  get_all_enemies,
  remove_dead_card,
} from "@/logic/player_move/service/service_for_player_move"
import { sound_destroy_enemy } from "@/logic/play_sounds"
import { choice_pop } from "@/lib/utils"
import { enemy_takes_damage } from "@/logic/player_move/abilities/enemy_takes_damage"

function passive_end_turn_destroy_2_enemies_after_3_turns(card, gameObj) {
  card.timer -= 1
  if (card.timer !== 0) {
    return
  }

  const { field, enemy_leader, hand, grave } = gameObj

  let all_enemies = get_all_enemies(field, enemy_leader)
  const target_1 = choice_pop(all_enemies) || null
  const target_2 = choice_pop(all_enemies) || null
  sound_destroy_enemy()
  const targets = [target_1, target_2]

  targets.forEach(e => {
    if (e) enemy_takes_damage(e, { damage: e.hp }, gameObj, 1000)
    card.charges = 0
  })
  remove_dead_card(card, grave, hand, undefined)
}

export { passive_end_turn_destroy_2_enemies_after_3_turns }
