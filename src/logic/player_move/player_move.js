import { hit_one_enemy } from "@/logic/player_move/abilities/hit_one_enemy"

import { heal } from "@/logic/player_move/abilities/ability_heal"
import { damage_one } from "@/logic/player_move/abilities/ability_damage_one"
import { damage_all } from "@/logic/player_move/abilities/ability_damage_all"
import { spread_damage } from "@/logic/player_move/abilities/ability_spread_damage"
import { damage_row } from "@/logic/player_move/abilities/ability_damage_row"
import { damage_column } from "@/logic/player_move/abilities/ability_damage_column"
import { destroy_highest_hp } from "@/logic/player_move/abilities/ability_destroy_highest_hp"
import { destroy_highest_damage } from "@/logic/player_move/abilities/ability_destroy_highest_damage"
import { destroy_random } from "@/logic/player_move/abilities/ability_destroy_random"
import { destroy_all_same_hp } from "@/logic/player_move/abilities/ability_destroy_all_same_hp"

import { player_passive_abilities_upon_playing_a_card } from "@/logic/player_move/player_passive_abilities"
import { remove_dead_card } from "@/logic/player_move/service/service_for_player_move"
import { check_win } from "@/logic/player_move/service/check_win"
import { lock_enemy } from "@/logic/player_move/abilities/ability_lock"

// Сюда заходим если там есть враг
// card - карта, которую мы играем (или из руки, или лидер).
// enemy - тот враг, в которого мы стреляем (или карта на поле, или лидер врагов).
// isCard - флаг, картой или лидером мы ходим, нужен для сброса в кладбище
function damage_ai_card(card, enemy, isCard, gameObj) {
  const { field, enemy_leader, hand, deck, grave, enemies, leader } = gameObj
  if (card.ability.name === "heal") {
    damage_one(enemy, card, field, enemy_leader, enemies)
    heal(card)
  } else if (card.ability.name === "damage-all") {
    damage_all(field, card, enemy_leader, enemies)
    if (enemy_leader.hp > 0)
      hit_one_enemy(enemy_leader, card, field, enemy_leader, enemies)
    setTimeout(() => check_win(field, enemies, enemy_leader), 1200)
  } else if (card.ability.name === "spread-damage") {
    spread_damage(card, field, enemy_leader, grave, hand, deck, enemies)
  } else if (card.ability.name === "damage-row") {
    damage_row(enemy, card, field, enemy_leader, enemies)
  } else if (card.ability.name === "damage-column") {
    damage_column(enemy, card, field, enemy_leader, enemies)
  } else if (card.ability.name === "destroy-highest-hp") {
    destroy_highest_hp(field, enemy_leader, enemies)
  } else if (card.ability.name === "destroy-highest-damage") {
    destroy_highest_damage(field, enemy_leader, enemies)
  } else if (card.ability.name === "destroy-random") {
    destroy_random(field, enemy_leader, enemies)
  } else if (card.ability.name === "destroy-all-same-hp") {
    destroy_all_same_hp(enemy, field, enemy_leader, enemies)
  } else if (card.ability.name === "lock") {
    damage_one(enemy, card, field, enemy_leader, enemies)
    lock_enemy(enemy)
  } else damage_one(enemy, card, field, enemy_leader, enemies)

  // убираем карту игрока, если в ней не осталось зарядов, из руки и из колоды, если играли оттуда
  card.charges -= 1
  if (isCard) remove_dead_card(card, grave, hand, deck)

  // пассивные абилки от хода
  // пока только лидер игрока, +заряд от спецкарты
  player_passive_abilities_upon_playing_a_card(card, leader)
}

export { damage_ai_card }
