// import store from '@/store'  // вызов стора здесь!!!!!!!!!
import { check_win } from "./service"


let GRAVE = []  // карты, у которых осталось 0 зарядов, попадают в кладбище


function damage_ai_card(id, field, hand, card_number, grave) {
     // сюда заходим если там есть враг
    
    // alert('попали в функцию дамага компа')
    let i = id

    // if (Object.keys(hand[card_number]).ability[0] == 'heal') {
    //     alert('Ы')
    // }

    alert('ЖИЗНИ ' + field[i].hp + '  дамаг ' + field[i].dmg + ' до урона')
    field[i].hp -= hand[card_number].dmg  // нанесли урон и-тому элементу от конкретной карты
    hand[card_number].charges -= 1  // вычитаем 1 заряд у карты игрока
    alert('ЖИЗНИ ' + field[i].hp + '  дамаг ' + field[i].dmg + ' после урона')

    // если враг убит, убираем его с поля
    if (field[i].hp <= 0) {
        field[i] = ''
        // store.commit('incr_like')  // доступ к функциям СТОРА!!!
        
        // if (check_win(field)) {alert('ВЫ ВЫИГРАЛИ, ПОЗДРАВЛЯЮ!')}
    }

    // убираем карту игрока, если в ней не осталось зарядов
    if (hand[card_number].charges === 0) {
        GRAVE.push(hand[card_number])  // поместили карту в кладбище
        hand[card_number] = ''
    }

    return [field, hand, card_number, grave]
}

export { damage_ai_card, GRAVE }
