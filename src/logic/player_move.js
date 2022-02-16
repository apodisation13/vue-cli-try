import store from '@/store'  // вызов стора здесь!!!!!!!!!
import { useToast } from 'vue-toastification'

const toast = useToast()


function heal(card) {
    store.commit('change_health', card.heal)
    toast.success(`лечение на ${card.heal}`)
}

function damage_one(enemy, card) {
    enemy.hp -= card.damage  // нанесли урон и-тому элементу от конкретной карты
    card.charges -= 1  // вычитаем 1 заряд у карты игрока
    toast.info('ЖИЗНИ ' + enemy.hp + ' после урона')
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
function damage_ai_card(i, field, hand, card_number, grave) {

    if (hand[card_number].ability === 'damage-one') {
        damage_one(field[i], hand[card_number])
    }

    else if (hand[card_number].ability === 'resurrect') {
        damage_one(field[i], hand[card_number])
    }

    else if (hand[card_number].ability === 'heal') {
        damage_one(field[i], hand[card_number])
        heal(hand[card_number])
    }

    else if (hand[card_number].ability === 'damage-all') {
       damage_all(field, hand[card_number])
    }

    // если враг убит, убираем его с поля
    // проверять надо всех врагов, потому что есть абилки на всех
    remove_dead_enemies(field)
   
    // убираем карту игрока, если в ней не осталось зарядов
    remove_dead_card(hand, card_number, grave)
}


// ХОД ЛИДЕРОМ!
function leader_move(leader, i, field) {
    // i - номер клетки поля
    // leader - объект лидера целиком
    
    if (leader.ability === "damage-one") {
        damage_one(field[i], leader)
    }

    else if (leader.ability === "damage-all") {
        damage_all(field, leader)
    }

    // если враг убит, убираем его с поля
    // проверять надо всех врагов, потому что есть абилки на всех
    remove_dead_enemies(field)

}

export { damage_ai_card, leader_move }
