import { sound_enemy_move_down } from "@/logic/play_sounds"
import { damage_player } from "@/logic/ai_move/moves/damage"

function random_move(field, i) {
  let random = Math.floor(Math.random() * field.length)
  if (field[random]) {
    console.log(`враг c ${i}, хотел на ${random}, а там враг`)
    damage_player(field, i)
  } else {
    console.log(`враг c ${i}, хотел на ${random}, и прыгнул`)
    field[i]["already_jumped"] = true // он уже прыгнул, чтобы потом не прыгать ещё раз
    field[random] = field[i] // враг прыгнул рандом клетку
    field[i] = ""
    sound_enemy_move_down()
  }
}

export { random_move }
