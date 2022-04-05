function remove_dead_enemies(field) {
  for (let i = 0; i < field.length; i++) {
    if (field[i].hp <= 0) {
      field[i] = ''
    }
  }
}


function remove_dead_card(card, grave, hand, deck) {
  if (card.charges === 0) {
    grave.push(card)  // поместили карту в кладбище

    // если такая карта есть в руке, удаляем её из руки, если есть в колоде - удаляем из колоды
    if (hand.indexOf(card) !== -1) {
      hand.splice(hand.indexOf(card), 1)
      // alert('удалили карту из руки')
    }
    else if (deck.indexOf(card) !== -1) {
      deck.splice(deck.indexOf(card), 1)
      // alert('удалили карту из колоды')
    }
  }
}


export {
  remove_dead_enemies,
  remove_dead_card,
}