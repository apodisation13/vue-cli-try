import { check_win } from "@/logic/service"
import { 
    damage_ai_card, 
    leader_move, 
    damage_enemy_leader_by_card,
    damage_enemy_leader_by_leader 
} from '@/logic/player_move'


function perform_damage_ai_card_by_card(
    can_draw,
    i, field, hand, player_card_number, grave,
    enemies,
    ai_cards_active, player_cards_active
) {

    can_draw = false
    damage_ai_card(
        i, 
        field, 
        hand, 
        player_card_number, 
        grave, 
    )

    // проверяем там, что врагов не осталось, поле и количество врагов
    check_win(field, enemies)  

    player_card_number = null
    ai_cards_active = false
    player_cards_active = false
}


function perform_damage_ai_card_by_leader(
    can_draw,
    leader, i, field,
    leader_active,
    enemies
) {

    can_draw = false
    leader_move(leader, i, field)
    
    leader_active = false  // снова неактивен, тыкай на него опять
    
    // проверяем там, что врагов не осталось, поле и количество врагов
    check_win(field, enemies)  
}


function perform_damage_enemy_leader_by_card(
    can_draw,
    enemy_leader, hand, player_card_number, grave,
    field, enemies,
    ai_cards_active, player_cards_active
) {
    alert(enemy_leader.ability.description)

    can_draw = false
    damage_enemy_leader_by_card(
        enemy_leader,
        hand,
        player_card_number, 
        grave
    )

    check_win(field, enemies)

    player_card_number = null
    ai_cards_active = false
    player_cards_active = false 
}



function perform_damage_enemy_leader_by_leader(
    can_draw,
    enemy_leader, leader,
    field, enemies,
    leader_active
) {
    
    alert(enemy_leader.ability.description)
    can_draw = false
    
    damage_enemy_leader_by_leader(
        enemy_leader, leader
    )

    check_win(field, enemies)

    leader_active = false
    alert(leader_active)
}


export { 
    perform_damage_ai_card_by_card, 
    perform_damage_ai_card_by_leader,
    perform_damage_enemy_leader_by_card, 
    perform_damage_enemy_leader_by_leader
}