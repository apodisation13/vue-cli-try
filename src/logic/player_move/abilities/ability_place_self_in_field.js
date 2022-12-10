export function place_self_in_field(card, enemy, gameObj) {
  if (!enemy.color) return // это для лидера врага, туда нельзя поставить себя
  const { enemies_grave, field } = gameObj
  card.hp = card.damage
  card.base_hp = card.damage
  card.move = {
    name: "down",
    description:
      "Каждый свой ход враг перемещается на одну клетку ниже, и если ему некуда ходить (он уже внизу, или под ним есть другой враг), он наносит лидеру игрока {damage} урона",
  }
  field[field.indexOf(enemy)] = card
  enemy.hp = enemy.base_hp
  enemies_grave.push(enemy)
}
