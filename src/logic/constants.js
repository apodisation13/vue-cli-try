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


let card1 = new Player(5, 1, 'bronze', 5)
let card2 = new Player(15, 1, 'gold', 4)
let card3 = new Player(4, 2, 'bronze', 8)
let card4 = new Player(2, 1, 'bronze', 5, {'heal': 20})
let card5 = new Player(5, 1, 'silver', 6, {'damage_all': true})
let card6 = new Player(7, 2, 'silver', 8)
let card7 = new Player(10, 2, 'gold', 7)
let card8 = new Player(6, 3, 'silver', 6)
let card9 = new Player(2, 2, 'bronze', 14)
let card10 = new Player(6, 1, 'bronze', 4)
let card11 = new Player(9, 1, 'silver', 5, {'heal': 10} )
let card12 = new Player(6, 1, 'gold', 17, {'heal': 50})
let card13 = new Player(5, 2, 'silver', 20, {'heal': 5} )
let card14 = new Player(23, 1, 'gold', 2)
let card15 = new Player(6, 5, 'silver', 2)
let card16 = new Player(2, 4, 'bronze', 7, {'damage_all': true})
let card17 = new Player(6, 1, 'bronze', 4)
let card18 = new Player(6, 5, 'silver', 6, {'heal': 30} )
let card19 = new Player(8, 1, 'gold', 17, {'heal': 30})
let card20 = new Player(4, 4, 'bronze', 12, {'heal': 12})
let POOL = [
    card1, card2, card3, card4, card5, card6, card7, card8, card9, card10,
    card11, card12, card13, card14, card15, card16, card17, card18,
    card19, card20,
]

let base_deck = [
  card12, card13, card3, card4, card5, card6, card7, card8, card9, card10
]

// считаем жизни колоды по сумме жизней всех карт в ней
function calc_deck_health() {
  let summ = 0
  base_deck.forEach(card => {
      summ += card.hp
  }); 
  return summ
}

let base_deck_health = calc_deck_health()

let dict_base_deck = {
  'deck_name': 'base_deck', 
  'deck': base_deck, 
  'deck_health': base_deck_health
}


export { Enemy, Player, POOL, dict_base_deck }
