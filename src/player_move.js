function damage_ai_card(id, field, hand, card_number) {
     // сюда заходим если там есть враг
    
    alert('попали в функцию дамага компа')
    let i = id

    alert('ЖИЗНИ ' + field[i].hp + '  дамаг ' + field[i].dmg + ' до урона')
    field[i].hp -= hand[card_number].dmg  // нанесли урон и-тому элементу от конкретной карты
    hand[card_number].charges -= 1  // вычитаем 1 заряд у карты игрока
    alert('ЖИЗНИ ' + field[i].hp + '  дамаг ' + field[i].dmg + ' после урона')

    // если враг убит, убираем его с поля
    if (field[i].hp <= 0) {
        field[i] = ''

    }

    // убираем карту игрока, если в ней не осталось зарядов
    if (hand[card_number].charges === 0) {
        hand[card_number] = ''
    }

    return [field, hand, card_number]
}

export { damage_ai_card, }
