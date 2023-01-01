import {
  spawn_self,
  spawn_self_at_deck,
  spawn_self_at_grave,
} from "@/logic/ai_move/deathwish_abilities/spawn_self"
import {
  spawn_tokens,
  spawn_tokens_at_deck,
} from "@/logic/ai_move/deathwish_abilities/spawn_tokens"
import { incr_dmg_to_value_cards_by_1 } from "@/logic/ai_move/deathwish_abilities/incr_dmg_to_value_cards_by_1"
import { deathwish_heal_all } from "@/logic/ai_move/deathwish_abilities/heal"
import { destroy_player_card_in_deck } from "@/logic/ai_move/deathwish_abilities/destroy_player_card"
import {
  set_hp,
  set_weakest_hp_as_highest,
} from "@/logic/ai_move/deathwish_abilities/set_hp"
import {
  give_shield_to_all_deck,
  give_shields_to_all,
} from "@/logic/ai_move/deathwish_abilities/give_shields"
import {
  spawn_faction_unit,
  spawn_faction_unit_at_deck,
} from "@/logic/ai_move/passive_abilities/passives_in_field/spawns"
import { sound_deathwish } from "@/logic/play_sounds"

// ДИСПЕТЧЕР абилок deathwish у врага
export function deathwish(deathwish_enemy, gameObj) {
  if (!deathwish_enemy) return

  const d = deathwish_enemy.deathwish.name
  if (d === "spawn-self") spawn_self(deathwish_enemy, gameObj)
  else if (d === "spawn-tokens") spawn_tokens(deathwish_enemy, gameObj)
  else if (d === "incr-dmg-to-value-cards-by-1") {
    incr_dmg_to_value_cards_by_1(deathwish_enemy, gameObj)
  } else if (d === "heal-all") deathwish_heal_all(deathwish_enemy, gameObj)
  else if (d === "spawn-self-at-deck") {
    spawn_self_at_deck(deathwish_enemy, gameObj)
  } else if (d === "destroy_random_card_in_player_deck") {
    destroy_player_card_in_deck(gameObj)
  } else if (d === "set_hp") {
    set_hp(deathwish_enemy)
  } else if (d === "spawn-tokens-at-deck") {
    spawn_tokens_at_deck(deathwish_enemy, gameObj)
  } else if (d === "spawn-self-at-grave") {
    spawn_self_at_grave(deathwish_enemy, gameObj)
  } else if (d === "give-shields-to-all") {
    give_shields_to_all(gameObj)
  } else if (d === "give-shields-to-all-deck") {
    give_shield_to_all_deck(gameObj)
  } else if (d === "set-weakest-hp-as-highest") {
    set_weakest_hp_as_highest(gameObj)
  } else if (d === "spawn-faction-unit") {
    sound_deathwish()
    spawn_faction_unit(deathwish_enemy, gameObj) // а вот это из пассивок! один в один
  } else if (d === "spawn-faction-unit-at-deck") {
    sound_deathwish()
    spawn_faction_unit_at_deck(deathwish_enemy, gameObj) // а вот это из пассивок! один в один
  } else if (d === "spawn-unit") {
    sound_deathwish()
    spawn_faction_unit(deathwish_enemy, gameObj, false) // передаем false, чтобы взять вообще любого врага
  }
}
