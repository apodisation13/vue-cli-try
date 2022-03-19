import router from '@/router/router';

// проверка выигрыша - если осталось 0 врагов и на поле никого
function check_win(field, enemy_list, enemy_leader) {
    if (enemy_list.length !== 0) return
    if (enemy_leader.hp > 0) return

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
    }
}

export {check_win, check_lose }
