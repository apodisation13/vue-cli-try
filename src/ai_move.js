function ai_move(field, health) {
  alert('ход компа')
  
  for (let i = 11; i >= 0; i--) {
    if (field[i]) {

      // ДЛЯ ВРАГОВ КОТОРЫЕ СТОЯТ ВНИЗУ
      if (i >= 9) {
        health -= field[i].dmg
        alert('враг внизу нанёс урон')
      }

      // ДЛЯ ОСТАЛЬНЫХ ВРАГОВ
      else {

        // ЕСЛИ У ВРАГА ЕСТЬ ВРАГ ПОД НИМ ВНИЗУ
        if (field[i+3]) {
          health -= field[i].dmg
          alert('враг нанёс урон, потому что ему некуда ходить')
        }

        // ДЛЯ ОСТАЛЬНЫХ, КОМУ ЕСТЬ КУДА ПОХОДИТЬ
        else {
          field[i+3] = field[i]  // типа враг прыгнул на клеточку ниже
          field[i] = ''
          alert('враг походил')
        }

      }

    }
  }
  return [field, health]
}

export { ai_move }
