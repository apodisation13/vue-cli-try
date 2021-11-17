import {Enemy, } from "./constants";


let enemy1 = new Enemy(8, 20)
let enemy2 = new Enemy(3, 7)
let enemy3 = new Enemy(6, 8)
let enemy4 = new Enemy(16, 2)
let enemy5 = new Enemy(4, 28)
let enemy6 = new Enemy(12, 9)
let enemy_list = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6]

let r1 = Math.floor(Math.random() * 12)
let r2 = Math.floor(Math.random() * 12)
let r3 = Math.floor(Math.random() * 12)
let r4 = Math.floor(Math.random() * 12)
let r5 = Math.floor(Math.random() * 12)
let r6 = Math.floor(Math.random() * 12)
let random_positions = [r1, r2, r3, r4, r5, r6]


function place_enemies(field) {

    for (let i = 0; i < enemy_list.length; i++) {
        field[random_positions[i]] = enemy_list[i]
    }
    return field
}


function enemy_id(id) {
    alert(id)
}


export { place_enemies, enemy_id }
