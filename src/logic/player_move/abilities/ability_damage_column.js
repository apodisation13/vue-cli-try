function damage_column(enemy, card, field) {
  let index = field.indexOf(enemy) % 3
  let indexes = [index, index + 3, index + 6, index + 9]

  indexes.forEach(i => {
    if (field[i]) {
      field[i].hp -= card.damage
      alert('попали в врага в стоблце')
    }
  })

  card.charges -= 1
}

export { damage_column }