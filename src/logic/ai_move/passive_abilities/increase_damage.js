import {sound_passive_increase_damage} from "@/logic/play_sounds"


function passive_end_turn_increase_damage(enemy) {
  let temp = enemy.damage

  enemy.damage = `${enemy.damage}+${enemy.passive_increase_damage}`

  setTimeout(() => {
    enemy.damage = temp
    enemy.damage += enemy.passive_increase_damage
  }, 750)

  sound_passive_increase_damage()

}


export {passive_end_turn_increase_damage}