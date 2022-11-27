import { sound_enemy_move_down } from "@/logic/play_sounds"
import { damage_player } from "@/logic/ai_move/moves/damage"

function right_move(field, i) {
  // враг, который стоит снизу справа, ячейка номер 11
  if (i === 11) {
    damage_player(field, i)
    return
  }

  // ДЛЯ ОСТАЛЬНЫХ ВРАГОВ

  // ЕСЛИ У ВРАГА ЕСТЬ ВРАГ СПРАВА ОТ НЕГО (то есть индекс + 1)
  if (field[i + 1]) {
    damage_player(field, i)
    return
  }

  // ДЛЯ ОСТАЛЬНЫХ, КОМУ ЕСТЬ КУДА ПОХОДИТЬ
  field[i + 1] = field[i] // враг сдвинулся правее, или на следующую строку слева если он был в правом столбце
  field[i] = ""
  sound_enemy_move_down()
}

export { right_move }
