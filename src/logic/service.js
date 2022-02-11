import router from '@/router/router';

// проверка выигрыша - если осталось 0 врагов и на поле никого
function check_win(field, enemy_list) {
    if (enemy_list.length != 0) return

    for (let i = 0; i < field.length; i++) {
        if (field[i]) return            
    }
    
    alert('ВЫ ВЫИГРАЛИ!!!')
    router.push('/')
}

// функция проверки жизней, проигрыша
function check_lose(health) {
    if (health <= 0) {
        alert('Вы проиграли!:(')
        router.push('/')
        return true
    }
    return false
}

// можем ли вытянуть карту, если ход игрока, рука меньше 6 и колода не 0
function calc_can_draw(player_cards_active, hand, deck) {
    if (player_cards_active && hand.length < 6 && deck.length != 0 ) {
        return true
        }
    return false
  }


export {check_win, check_lose, calc_can_draw }
