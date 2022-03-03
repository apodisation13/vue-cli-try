function border_for_hand(card, index) {
    if (card.color === 'Bronze') return {'border': 'solid 1px lightsalmon', 'z-index': 6 - index}
    else if (card.color === 'Silver') return {'border': 'solid 3px silver', 'z-index': 6 - index}
    else if (card.color === 'Gold') return {'border': 'solid 3px gold', 'z-index': 6 - index}
    else return {}
}


function border_for_card(card) {
    if (card.color === 'Bronze') return {'border': 'solid 1px lightsalmon'}
    else if (card.color === 'Silver') return {'border': 'solid 3px silver'}
    else if (card.color === 'Gold') return {'border': 'solid 3px gold'}
    else return {}
}


function border_leader(leader) {
    if (leader.faction === 'Soldiers') return {'border': 'solid 3px blue'}
    else if (leader.faction === 'Monsters') return {'border': 'solid 3px red'}
    else if (leader.faction === 'Animals') return {'border': 'solid 3px green'}
    else return {}
}


function background_color(card) {
    if (card.faction === 'Soldiers') {
        if (card.color === 'Bronze') return {'backgroundColor': 'blue'}
        else if (card.color === 'Silver') {
            return {'backgroundColor': 'blue', 'border': 'solid 2px silver'}
        }
        else if (card.color === 'Gold') {
            return {'backgroundColor': 'blue', 'border': 'solid 2px gold'}
        }
        else return {'backgroundColor': 'blue'}  
    } 
          
    else if (card.faction === 'Monsters') {
        if (card.color === 'Bronze') return {'backgroundColor': 'red'}
        else if (card.color === 'Silver') {
            return {'backgroundColor': 'red', 'border': 'solid 2px silver'}
        }
        else if (card.color === 'Gold') {
            return {'backgroundColor': 'red', 'border': 'solid 2px gold'}
        }
        else return {'backgroundColor': 'red'}  
    }
    else if (card.faction === 'Animals') {
        if (card.color === 'Bronze') return {'backgroundColor': 'green'}
        else if (card.color === 'Silver') {
            return {'backgroundColor': 'green', 'border': 'solid 2px silver'}
        }
        else if (card.color === 'Gold') {
            return {'backgroundColor': 'green', 'border': 'solid 2px gold'}
        }
        else return {'backgroundColor': 'green'}  
    }
    
    else return {}
}


function background_color_deck(deck) {
    if (deck.leader.faction === 'Soldiers') return {'backgroundColor': 'blue'}
    else if (deck.leader.faction === 'Monsters') return {'backgroundColor': 'red'}
    else if (deck.leader.faction === 'Animals') return {'backgroundColor': 'green'}
    else return {}
}


export { border_for_hand, border_for_card, border_leader, background_color, background_color_deck }
