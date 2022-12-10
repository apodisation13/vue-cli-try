import { sound_passive_increase_damage } from "@/logic/play_sounds"

function incr_self_dmg(enemy) {
  let temp = enemy.damage

  enemy.damage = `${enemy.damage}+${enemy.value}`

  setTimeout(() => {
    enemy.damage = temp
    enemy.damage += enemy.value
  }, 750)

  sound_passive_increase_damage()
}

export { incr_self_dmg }
