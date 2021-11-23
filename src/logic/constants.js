class Enemy {
  constructor(hp, dmg) {
    this.hp = hp;
    this.dmg = dmg;
  }
}
  
  
class Player {
  constructor(dmg, charges, category, hp, ability = {'damage-one': dmg}) {  // {type: value} {one: 43}
    this.dmg = dmg;
    this.charges = charges;
    this.category = category;
    this.hp = hp;

    this.ability = ability;
  }
}


let HEALTH = 100;

let FIELD = ['', '', '', '', '', '', '', '', '', '', '', '']
// [0,1,2]
// [3,4,5]
// [6,7,8]
// [9,10,11]


export { Enemy, Player, HEALTH, FIELD, }
