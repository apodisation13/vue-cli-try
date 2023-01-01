import { check_win } from "@/logic/player_move/service/check_win"
import { deathwish } from "@/logic/ai_move/ai_deathwish_abilities"

export function enemy_takes_damage(enemy, card, gameObj, timeout) {
  const { field, enemy_leader, enemies, enemies_grave } = gameObj

  let temp = enemy.hp // сложили жизни в темп
  enemy.hp = `${enemy.hp}-${card.damage}` // отрисовали 5-3 (жизни-урон)

  // через timeout, default=1сек
  setTimeout(() => {
    enemy.hp = temp // вернули ему жизни
    enemy.hp -= card.damage // вот теперь отняли урон

    if (enemy.hp <= 0) {
      // это поле признак именно лидера врагов
      if (enemy?.damage_once >= 0) {
        enemy_leader.hp = 0
        console.log("умер лидер врагов")
        if (enemy_leader.has_deathwish) deathwish(enemy_leader, gameObj)
      } else {
        field[field.indexOf(enemy)] = ""
        console.log("враг умер")
        enemy.hp = enemy.base_hp
        enemies_grave.push(enemy)
        if (enemy.has_deathwish) deathwish(enemy, gameObj)
      }
    }

    check_win(field, enemies, enemy_leader)
  }, timeout)
}
