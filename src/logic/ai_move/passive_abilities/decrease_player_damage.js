import { sound_enemy_decrease_player_damage } from "@/logic/play_sounds"

function passive_end_turn_decrease_player_damage(enemy, hand) {
  let random = Math.floor(Math.random() * hand.length)

  let temp = hand[random].damage

  hand[random].damage = `${hand[random].damage}-1`

  setTimeout(() => {
    hand[random].damage = temp
    hand[random].damage -= 1
  }, 750)

  sound_enemy_decrease_player_damage()
}

export { passive_end_turn_decrease_player_damage }
