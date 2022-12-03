import { choice } from "@/lib/utils"
import { sound_destroy_enemy, sound_enemy_move_down } from "@/logic/play_sounds"

export function move_enemy(enemy, gameObj) {
  // это если мы ткнули на лидера врагов! то здесь ничего не выполним
  const c = enemy.hp.split("-")
  if (!enemy.color || c[0] - c[1] <= 0) {
    console.log("ЫЫЫЫЫЫЫЫЫЫ")
    return
  }

  const { field, enemies_grave } = gameObj

  const target_index = choice(field)
  const prev_index = field.indexOf(enemy)

  // если на рандомной клетке никого нет, двигаем туда ЭТОГО врага
  if (!field[target_index]) {
    sound_enemy_move_down()
    field[target_index] = enemy
    field[prev_index] = ""
  } else {
    // если же там кто-то есть, мы убираем того в кладбище, а этого врага ставим сюда
    sound_destroy_enemy()
    const prev_enemy = field[target_index]
    field[target_index] = enemy
    field[prev_index] = ""
    // таймаут тут потому, что у врага ещё 3-1 жизней, и только через 1сек станет 2, тогда мы и положим его в сброс
    setTimeout(() => {
      prev_enemy.hp = prev_enemy.base_hp
      enemies_grave.push(prev_enemy)
    }, 1200)
  }
}
