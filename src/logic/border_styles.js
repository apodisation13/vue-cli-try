function border(card) {
    if (card.color === 'Bronze') return {'border': 'solid 1px lightsalmon'}
    else if (card.color === 'Silver') return {'border': 'solid 3px silver'}
    else if (card.color === 'Gold') return {'border': 'solid 3px gold'}
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

export { border, background_color }
