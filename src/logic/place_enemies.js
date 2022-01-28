class Enemy {
    constructor(hp, dmg, color="Bronze") {
      this.hp = hp;
      this.dmg = dmg;
      this.color = color;
    }
}


let enemy1 = new Enemy(8, 20)
let enemy2 = new Enemy(3, 7)
let enemy3 = new Enemy(6, 8)
let enemy4 = new Enemy(16, 2)
let enemy5 = new Enemy(4, 28)
let enemy6 = new Enemy(12, 9, "Silver")
let enemy7 = new Enemy(7, 11)
let enemy8 = new Enemy(42, 5, "Gold")
let enemy9 = new Enemy(9, 9, "Silver")
let enemy10 = new Enemy(24, 6, "Silver")
let enemy11 = new Enemy(18, 16, "Gold")

let level0 = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7]
let level1 = [enemy1, enemy2, enemy3, enemy7, enemy8, enemy9]
let level2 = [enemy8, enemy9, enemy10, enemy11, enemy6, enemy7]
let level3 = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8,
enemy9, enemy10, enemy11]

let levels = [
    ['Уровень1', level0], 
    ['Уровень2', level1], 
    ['Уровень3', level2],
    ['Уровень4', level3],
]


function place_enemies(field, enemy_list) {
    // срез - максимальное количество стартовых врагов
    // let max_starting_enemies = 5  
    // alert(enemy_list.length)
    // let aa = enemy_list.length
    
    for (let i = 0; i < enemy_list.length; i++) {
        let random = Math.floor(Math.random() * 9)  
        // 9, чтобы внизу не появлялись
        field[random] = enemy_list[i]
        
        enemy_list.splice(i, 1)  // удалить врага из списка врагов
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
        alert('Враг появился')
    }  
}

export { place_enemies, levels, appear_new_enemy }
