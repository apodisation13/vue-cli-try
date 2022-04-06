function damage_row(enemy, card, field) {
  let index = field.indexOf(enemy)
  let min = Math.floor(index / 3) * 3
  let max = min + 3

  field.slice(min, max).forEach(enemy => {
    if (enemy) {
      enemy.hp -= card.damage
    }
  })

  card.charges -= 1
}


export { damage_row }