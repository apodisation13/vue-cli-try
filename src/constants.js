class Enemy {
    constructor(hp, dmg) {
      this.hp = hp;
      this.dmg = dmg;
    }
  }
  
  
class Player {
constructor(dmg, charges, category) {
    this.dmg = dmg;
    this.charges = charges;
    this.category = category
}
}


let HEALTH = 100;

let FIELD = ['', '', '', '', '', '', '', '', '', '', '', '']
// [11,10,9]
// [8,7,6]
// [5,4,3]
// [2,1,0]


export { Enemy, Player, HEALTH, FIELD, }
