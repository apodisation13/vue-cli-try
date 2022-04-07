import {heal} from "@/logic/player_move/abilities/ability_heal"
import {damage_one} from "@/logic/player_move/abilities/ability_damage_one"
import {damage_all} from "@/logic/player_move/abilities/ability_damage_all"

import {remove_dead_enemies, remove_dead_card} from "@/logic/player_move/service/service_for_player_move"
import {check_win} from "@/logic/player_move/service/check_win"
import {spread_damage} from "@/logic/player_move/abilities/ability_spread_damage";
import {damage_row} from "@/logic/player_move/abilities/ability_damage_row";
import {damage_column} from "@/logic/player_move/abilities/ability_damage_column";


// сюда заходим если там есть враг
// card - EITHER player_card or player_leader WHO we chose to play,
// enemy - EITHER enemy or enemy_leader, WHO we target
// field - for damage-all, damage-row, damage-column, check win, remove dead enemies
// hand,deck,grave - remove dead card if isCard;
// enemies - list of remaining enemies for check win,
// isCard - FLAG: need to remove dead card (hand) or not, Boolean
function damage_ai_card(card, enemy, field, enemy_leader, hand, deck, grave, enemies, isCard) {

    if (card.ability.name === 'heal') {
        damage_one(enemy, card)
        heal(card)
    }

    else if (card.ability.name === 'damage-all') {
        damage_all(field, card)
        enemy_leader.hp -= card.damage
    }

    else if (card.ability.name === 'spread-damage') {
        spread_damage(card, field, enemy_leader, grave, hand, deck, isCard, enemies)
        return  // ретерн здесь, так как общие штуки в конце выполняются прям там изза sleep
    }

    else if (card.ability.name === 'damage-row') {
        damage_row(enemy, card, field)
    }

    else if (card.ability.name === 'damage-column') {
        damage_column(enemy, card, field)
    }

    else damage_one(enemy, card)


    // если враг убит, убираем его с поля, проверять надо всех врагов, потому что есть абилки на всех
    remove_dead_enemies(field)

    // проверяем, умер ли лидер врагов
    if (enemy_leader.hp < 0) enemy_leader.hp = 0
   
    // убираем карту игрока, если в ней не осталось зарядов, из руки и из колоды, если играли оттуда
    card.charges -= 1
    if (isCard) remove_dead_card(card, grave, hand, deck)

    // проверяем, не выиграли ли мы
    check_win(field, enemies, enemy_leader)
}

export { damage_ai_card }