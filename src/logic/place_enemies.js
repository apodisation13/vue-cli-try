function place_enemies(field, enemy_list) {
    
    for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * 9)  // 9, чтобы внизу не появлялись
        let randon_enemy = Math.floor(Math.random() * enemy_list.length)
        field[random] = enemy_list[randon_enemy]
        
        enemy_list.splice(randon_enemy, 1)  // удалить врага из списка врагов
    }
    // return field
}


function appear_new_enemy(field, enemy_list) {
    // враги появляются только наверху
    let random = Math.floor(Math.random() * 3)  
   
    if (enemy_list.length && !field[random]) {
        let random2 = Math.floor(Math.random() * enemy_list.length)  

        field[random] = enemy_list[random2]  // появляется враг
        enemy_list.splice(random2, 1)  // удаляется из списка врагов
        // alert('Враг появился')
    }  
}

export { place_enemies, appear_new_enemy }
