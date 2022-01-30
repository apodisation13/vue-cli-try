import router from '@/router/router';

// проверка выигрыша - если есть хотя бы 1 враг, return false
function check_win(field) {
    
    for (let i = 0; i < field.length; i++) {
        if (field[i]) {return false}            
    }
    
    alert('ВЫ ВЫИГРАЛИ!!!')
    router.push('/')
    return true;
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


export {check_win, check_lose, }
