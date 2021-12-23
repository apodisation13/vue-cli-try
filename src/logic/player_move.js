import store from '@/store'  // вызов стора здесь!!!!!!!!!
import { check_win } from "./service"


function damage_ai_card(id, field, hand, card_number, grave) {
     // сюда заходим если там есть враг
    
    // alert('попали в функцию дамага компа')
    let i = id

    alert('ЖИЗНИ ' + field[i].hp + '  дамаг ' + field[i].dmg + ' до урона')
    field[i].hp -= hand[card_number].damage  // нанесли урон и-тому элементу от конкретной карты
    hand[card_number].charges -= 1  // вычитаем 1 заряд у карты игрока
    alert('ЖИЗНИ ' + field[i].hp + '  дамаг ' + field[i].dmg + ' после урона')

    if (hand[card_number].ability == 'heal') {
        // alert(Object.keys(hand[card_number].ability))
        store.commit('change_health', hand[card_number].heal)
        alert(`лечение на ${hand[card_number].heal}`)
    }

    if (hand[card_number].ability == 'damage-all') {
       field.forEach(enemy => {
        if (enemy) {
            if (enemy == field[i]) {
                return
            }   
            enemy.hp -= hand[card_number].damage
           }
       });
       alert('УРОН ВСЕМ!')
    }


    // если враг убит, убираем его с поля
    // проверять надо всех врагов, потому что есть абилки на всех
    for (let index = 0; index < field.length; index++) {
        if (field[index].hp <= 0) {
            field[index] = ''
        }
        
    }
   
    // убираем карту игрока, если в ней не осталось зарядов
    if (hand[card_number].charges === 0) {
        grave.push(hand[card_number])  // поместили карту в кладбище
        // hand[card_number] = ''
        hand.splice(card_number, 1)
    }

    return [field, hand, card_number, grave]
}

export { damage_ai_card }
