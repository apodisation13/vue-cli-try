import { get_random_enemy } from "@/logic/player_move/service/service_for_player_move"
import { sound_damage_one, sound_hit_shield } from "@/logic/play_sounds"
// import {hit_one_enemy} from "@/logic/player_move/abilities/hit_one_enemy"
import { check_win } from "@/logic/player_move/service/check_win"

function passive_end_turn_damage_random_enemy(
  field,
  card,
  leader,
  enemy_leader,
  enemies
) {
  let target = get_random_enemy(field, enemy_leader) // взяли всех врагов, из них взяли одного

  if (!target) return // если щас нет врагов на поле и нет живого лидера врагов, выходим

  // hit_one_enemy(target, {"damage": 1}, field, enemy_leader, enemies, 500)

  // ПРИШЛОСЬ ПОВТОРИТЬ ЭТОТ КОД, потому что никак damage:1 туда не передать, чтобы карта зелёным подсветилась
  card.damages_enemy = true

  if (target.shield) {
    target.shield = false
    sound_hit_shield()
    card.damages_enemy = false
    return
  }

  let temp = target.hp // сложили жизни в темп
  target.hp = `${target.hp}-1` // отрисовали 5-3 (жизни-урон)

  // через timeout, default=1сек
  setTimeout(() => {
    target.hp = temp // вернули ему жизни
    target.hp -= 1 // вот теперь отняли урон

    if (target.hp <= 0) {
      if (field.indexOf(target) === -1) {
        enemy_leader.hp = 0
        console.log("умер лидер врагов")
      } else {
        field[field.indexOf(target)] = ""
        console.log("враг умер")
      }
    }

    card.damages_enemy = false
    check_win(field, enemies, enemy_leader)
  }, 500)

  sound_damage_one()
}

export { passive_end_turn_damage_random_enemy }
