class Enemy {
    constructor({
        hp, 
        dmg, 
        color="Bronze",
        move="Down",
    }) {
        this.hp = hp;
        this.dmg = dmg;
        this.color = color;
        this.move = move;
    }
}


let e1 = new Enemy({hp: 8, dmg: 20})
let e2 = new Enemy({hp: 3, dmg: 7, move: "Random"})
let e3 = new Enemy({hp: 6, dmg: 8, move: "Stand-still"})
let e4 = new Enemy({hp: 16, dmg: 2})
let e5 = new Enemy({hp: 4, dmg: 28})
let e6 = new Enemy({hp: 12, dmg: 9, color: "Silver"})
let e7 = new Enemy({hp: 7, dmg: 11})
let e8 = new Enemy({hp: 42, dmg: 5, color: "Gold"})
let e9 = new Enemy({hp: 9, dmg: 9, color: "Silver"})
let e10 = new Enemy({hp: 24, dmg: 6, color: "Silver"})
let e11 = new Enemy({hp: 18, dmg: 16, color: "Gold"})
let e12 = new Enemy({hp: 7, dmg: 7, move: "Random", color: "Silver"})
let e13 = new Enemy({hp: 11, dmg: 8, move: "Stand-still", color: "Gold"})

let level1 = [e1, e2, e3, e4, e5, e6, e7]
let level2 = [e1, e2, e3, e7, e8, e9]
let level3 = [e8, e9, e10, e11, e6, e7, e12, e13]
let level4 = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13]


let levels = [
    ['Уровень1', level1], 
    ['Уровень2', level2], 
    ['Уровень3', level3],
    ['Уровень4', level4],
]

export { levels }