import { copyObj } from "@/lib/utils"

export function place_self_in_field(card, enemy, gameObj) {
  if (!enemy.color) return // это для лидера врага, туда нельзя поставить себя
  const { enemies_grave, field } = gameObj
  card.hp = card.damage
  card.base_hp = card.damage
  card.move = enemy.move
  field[field.indexOf(enemy)] = copyObj(card)
  enemy.hp = enemy.base_hp
  enemies_grave.push(enemy)
}
