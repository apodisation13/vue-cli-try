import {Enemy, } from "./constants";


let enemy1 = new Enemy(8, 20)
let enemy2 = new Enemy(3, 7)
let enemy3 = new Enemy(6, 8)
let enemy4 = new Enemy(16, 2)
let enemy5 = new Enemy(4, 28)
let enemy6 = new Enemy(12, 9)
let enemy7 = new Enemy(7, 11)
let enemy8 = new Enemy(42, 5)
let enemy_list = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8]


function place_enemies(field) {

    for (let i = 0; i < enemy_list.length; i++) {
        let random = Math.floor(Math.random() * 12)
        field[random] = enemy_list[i]
    }
    // return field
}

export { place_enemies, }
