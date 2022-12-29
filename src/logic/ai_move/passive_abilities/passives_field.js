import {
  incr_random_dmg,
  incr_self_dmg,
} from "@/logic/ai_move/passive_abilities/passives_in_field/increase_damage"
import {
  heal_all,
  heal_enemy_leader,
  heal_random,
  heal_self,
} from "@/logic/ai_move/passive_abilities/passives_in_field/heal"
import { regain_shield } from "@/logic/ai_move/passive_abilities/passives_in_field/regain_shield"
import { decrease_player_damage } from "@/logic/ai_move/passive_abilities/passives_in_field/decrease_player_damage"
import { allowActionTimer } from "@/logic/game_logic/timers"

export function field_passives(enemy, gameObj) {
  if (!allowActionTimer(enemy)) return

  const { enemy_leader, field, hand } = gameObj
  const pea = enemy.passive_ability.name

  if (pea === "incr-self-dmg") {
    incr_self_dmg(enemy)
  } else if (pea === "heal-self") {
    heal_self(enemy)
  } else if (pea === "heal-leader") {
    heal_enemy_leader(enemy, enemy_leader)
  } else if (pea === "regain-shield") {
    regain_shield(enemy)
  } else if (pea === "heal-all") {
    heal_all(enemy, field, enemy_leader)
  } else if (pea === "heal-random") {
    heal_random(enemy, field, enemy_leader)
  } else if (pea === "incr-random-dmg") {
    incr_random_dmg(enemy, field)
  } else if (pea === "decrease-player-damage") {
    decrease_player_damage(enemy, hand)
  }
}
