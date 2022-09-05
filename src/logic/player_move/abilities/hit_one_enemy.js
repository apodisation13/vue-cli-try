import { sound_hit_shield } from "@/logic/play_sounds"
import { check_win } from "@/logic/player_move/service/check_win"

function hit_one_enemy(
  enemy,
  card,
  field,
  enemy_leader,
  enemies,
  timeout = 1000
) {
  card.damages_enemy = true

  if (enemy.shield) {
    enemy.shield = false
    sound_hit_shield()
    card.damages_enemy = false
    return
  }

  let temp = enemy.hp // сложили жизни в темп
  enemy.hp = `${enemy.hp}-${card.damage}` // отрисовали 5-3 (жизни-урон)

  // через timeout, default=1сек
  setTimeout(() => {
    enemy.hp = temp // вернули ему жизни
    enemy.hp -= card.damage // вот теперь отняли урон

    if (enemy.hp <= 0) {
      if (field.indexOf(enemy) === -1) {
        enemy_leader.hp = 0
        console.log("умер лидер врагов")
      } else {
        field[field.indexOf(enemy)] = ""
        console.log("враг умер")
      }
    }

    card.damages_enemy = false
    check_win(field, enemies, enemy_leader)
  }, timeout)
}

export { hit_one_enemy }
