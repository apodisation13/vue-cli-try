import { sound_enemy_decrease_player_damage } from "@/logic/play_sounds"

function decrease_player_damage(enemy, hand) {
  let random = Math.floor(Math.random() * hand.length)

  let temp = hand[random].damage

  hand[random].damage = `${hand[random].damage}-${enemy.value}`

  setTimeout(() => {
    hand[random].damage = temp
    hand[random].damage -= enemy.value
  }, 750)

  sound_enemy_decrease_player_damage()
}

export { decrease_player_damage }
