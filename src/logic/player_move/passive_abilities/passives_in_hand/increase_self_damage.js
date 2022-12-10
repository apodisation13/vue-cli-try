import { sound_passive_increase_damage } from "@/logic/play_sounds"

function increase_self_damage(card) {
  let temp = card.damage

  card.damage = `${card.damage}+${card.value}`
  card.incr_dmg = true

  setTimeout(() => {
    card.damage = temp
    card.damage += card.value
    card.incr_dmg = false
  }, 750)

  sound_passive_increase_damage()
}

export { increase_self_damage }
