import store from '@/store'  // вызов стора здесь!!!!!!!!!
import { useToast } from 'vue-toastification'
import { check_win } from "@/logic/service"

const toast = useToast()


function heal(card) {
    store.commit('change_health', card.heal)
    toast.success(`лечение на ${card.heal}`)
}

function damage_one(enemy, card) {
    enemy.hp -= card.damage  // нанесли урон и-тому элементу от конкретной карты
    card.charges -= 1  // вычитаем 1 заряд у карты игрока
    // toast.info('ЖИЗНИ ' + enemy.hp + ' после урона')
}

function damage_all(field, card) {
    field.forEach(enemy => {
        if (enemy) {
            enemy.hp -= card.damage
           }
       })
    card.charges -= 1
    toast.warning('УРОН ВСЕМ!')
}

function remove_dead_enemies(field) {
    for (let i = 0; i < field.length; i++) {
        if (field[i].hp <= 0) {
            field[i] = ''
        }   
    }
}

function remove_dead_card(hand, card_number, grave) {
    if (hand[card_number].charges === 0) {
        grave.push(hand[card_number])  // поместили карту в кладбище
        hand.splice(card_number, 1)
    }
}


// сюда заходим если там есть враг
function damage_ai_card(i, field, hand, card_number, grave, enemy_leader, enemies) {

    if (hand[card_number].ability.name === 'damage-one') {
        damage_one(field[i], hand[card_number])
    }

    else if (hand[card_number].ability.name === 'resurrect') {
        damage_one(field[i], hand[card_number])
    }

    else if (hand[card_number].ability.name === 'draw-one-card') {
        damage_one(field[i], hand[card_number])
    }

    else if (hand[card_number].ability.name === 'give-charges-to-card-in-hand-1') {
        damage_one(field[i], hand[card_number])
    }

    else if (hand[card_number].ability.name === 'heal') {
        damage_one(field[i], hand[card_number])
        heal(hand[card_number])
    }

    else if (hand[card_number].ability.name === 'damage-all') {
        damage_all(field, hand[card_number])
        enemy_leader.hp -= hand[card_number].damage
        if (enemy_leader.hp < 0) enemy_leader.hp = 0
    }

    // если враг убит, убираем его с поля
    // проверять надо всех врагов, потому что есть абилки на всех
    remove_dead_enemies(field)
   
    // убираем карту игрока, если в ней не осталось зарядов
    remove_dead_card(hand, card_number, grave)

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

    // если враг убит, убираем его с поля
    // проверять надо всех врагов, потому что есть абилки на всех
    remove_dead_enemies(field)

    check_win(field, enemies, enemy_leader)
}


// урон лидеру врага от карты из руки!
function damage_enemy_leader_by_card(enemy_leader, hand, card_number, grave, field, enemies) {

    if (hand[card_number].ability.name === 'damage-one') {
        damage_one(enemy_leader, hand[card_number])
    }

    else if (hand[card_number].ability.name === 'resurrect') {
        damage_one(enemy_leader, hand[card_number])
    }

    else if (hand[card_number].ability.name === 'give-charges-to-card-in-hand-1') {
        damage_one(enemy_leader, hand[card_number])
    }

    else if (hand[card_number].ability.name === 'draw-one-card') {
        damage_one(enemy_leader, hand[card_number])
    }

    else if (hand[card_number].ability.name === 'heal') {
        damage_one(enemy_leader, hand[card_number])
        heal(hand[card_number])
    }

    else if (hand[card_number].ability.name === 'damage-all') {
        enemy_leader.hp -= hand[card_number].damage
        damage_all(field, hand[card_number])
    }

    // если враг убит, убираем его с поля
    // проверять надо всех врагов, потому что есть абилки на всех
    remove_dead_enemies(field)

    // убираем карту игрока, если в ней не осталось зарядов
    remove_dead_card(hand, card_number, grave)

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
        remove_dead_enemies(field)
    }

    if (enemy_leader.hp < 0) enemy_leader.hp = 0

    check_win(field, enemies, enemy_leader)
}


export { 
    damage_ai_card, 
    leader_move, 
    damage_enemy_leader_by_card, 
    damage_enemy_leader_by_leader
}
