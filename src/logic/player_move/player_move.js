import {heal} from "@/logic/player_move/abilities/ability_heal"
import {damage_one} from "@/logic/player_move/abilities/ability_damage_one"
import {damage_all} from "@/logic/player_move/abilities/ability_damage_all"

import {remove_dead_enemies, remove_dead_card} from "@/logic/player_move/service/service_for_player_move"
import {check_win} from "@/logic/player_move/service/check_win"
import {spread_damage} from "@/logic/player_move/abilities/ability_spread_damage";


// сюда заходим если там есть враг
function damage_ai_card(i, field, card, hand, deck, grave, enemy_leader, enemies) {

    if (card.ability.name === 'heal') {
        damage_one(field[i], card)
        heal(card)
    }

    else if (card.ability.name === 'damage-all') {
        damage_all(field, card)
        enemy_leader.hp -= card.damage
        if (enemy_leader.hp < 0) enemy_leader.hp = 0
    }

    else if (card.ability.name === 'spread-damage') {
        spread_damage(card, field, enemy_leader)
        if (enemy_leader.hp < 0) enemy_leader.hp = 0
    }

    else damage_one(field[i], card)


    // если враг убит, убираем его с поля
    // проверять надо всех врагов, потому что есть абилки на всех
    remove_dead_enemies(field)
   
    // убираем карту игрока, если в ней не осталось зарядов, из руки и из колоды, если играли оттуда
    remove_dead_card(card, grave, hand, deck)

    check_win(field, enemies, enemy_leader)
}


// ХОД ЛИДЕРОМ!
function leader_move(leader, i, field, enemy_leader, enemies) {
    // i - номер клетки поля
    // leader - объект лидера целиком
    
    if (leader.ability.name === "damage-one") {
        damage_one(field[i], leader)
    }

    else if (leader.ability.name === "damage-all") {
        damage_all(field, leader)
        enemy_leader.hp -= leader.damage
        if (enemy_leader.hp < 0) enemy_leader.hp = 0
    }

    else if (leader.ability.name === "spread-damage") {
        spread_damage(leader, field, enemy_leader)
        if (enemy_leader.hp < 0) enemy_leader.hp = 0
    }

    // если враг убит, убираем его с поля
    // проверять надо всех врагов, потому что есть абилки на всех
    remove_dead_enemies(field)

    check_win(field, enemies, enemy_leader)
}


// урон лидеру врага от карты из руки!
function damage_enemy_leader_by_card(enemy_leader, card, hand, deck, grave, field, enemies) {

    if (card.ability.name === 'heal') {
        damage_one(enemy_leader, card)
        heal(card)
    }

    else if (card.ability.name === 'damage-all') {
        enemy_leader.hp -= card.damage
        damage_all(field, card)
    }

    else if (card.ability.name === "spread-damage") {
        spread_damage(card, field, enemy_leader)
    }

    else damage_one(enemy_leader, card)


    // если враг убит, убираем его с поля
    // проверять надо всех врагов, потому что есть абилки на всех
    remove_dead_enemies(field)

    // убираем карту игрока, если в ней не осталось зарядов
    remove_dead_card(card, grave, hand, deck)

    if (enemy_leader.hp < 0) enemy_leader.hp = 0

    check_win(field, enemies, enemy_leader)
}


// урон лидеру врага от лидера игрока
function damage_enemy_leader_by_leader(enemy_leader, leader, field, enemies) {

    if (leader.ability.name === "damage-one") {
        damage_one(enemy_leader, leader)
    }

    else if (leader.ability.name === "damage-all") {
        enemy_leader.hp -= leader.damage
        damage_all(field, leader)
        if (enemy_leader.hp < 0) enemy_leader.hp = 0
    }

    else if (leader.ability.name === "spread-damage") {
        spread_damage(leader, field, enemy_leader)
        if (enemy_leader.hp < 0) enemy_leader.hp = 0
    }

    remove_dead_enemies(field)

    check_win(field, enemies, enemy_leader)
}


export { 
    damage_ai_card, 
    leader_move, 
    damage_enemy_leader_by_card, 
    damage_enemy_leader_by_leader
}
