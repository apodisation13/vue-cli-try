
// проверка выигрыша - если есть хотя бы 1 враг return false
function check_win(field) {
    field.forEach(element => {
        if (element) {return false}
    });
    alert('')
    return true;
}

// функция проверки жизней
function check_health(health) {
    if (health <= 0) {return true}
    return false
}

export {check_win, check_health}
