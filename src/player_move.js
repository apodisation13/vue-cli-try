let card_number = null



function chose_player_card(id, hand) {
    
    card_number = id
    
    alert('УРОН ' + hand[card_number].dmg + '  заряды ' + hand[card_number].charges)
    ai_cards_active = true  // только теперь можно тыкать на карты противника

    return hand
}
  