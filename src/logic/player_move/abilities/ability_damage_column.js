import {hit_one_enemy} from "@/logic/player_move/service/service_for_player_move";

function damage_column(enemy, card, field) {
  let index = field.indexOf(enemy) % 3
  let indexes = [index, index + 3, index + 6, index + 9]

  indexes.forEach(i => {
    if (field[i]) {
      // field[i].hp -= card.damage
      hit_one_enemy(field[i], card)
    }
  })
}

export { damage_column }