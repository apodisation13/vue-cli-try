import {get_all_enemies, remove_dead_card} from "@/logic/player_move/service/service_for_player_move"
import {check_win} from "@/logic/player_move/service/check_win"
import {sound_destroy_enemy} from "@/logic/play_sounds"


function passive_end_turn_destroy_2_enemies_after_3_turns(card, field, enemy_leader, enemies, grave, hand) {

  card.timer -= 1
  if (card.timer !== 0) {
    return
  }


  let all_enemies = get_all_enemies(field, enemy_leader)

  let random = Math.floor(Math.random() * all_enemies.length)
  let target_1 = all_enemies[random]
  all_enemies.splice(random, 1)
  let random_2 = Math.floor(Math.random() * all_enemies.length)
  let target_2 = all_enemies[random_2]

  target_1.hp = `${target_1.hp}-${target_1.hp}`
  target_2.hp = `${target_2.hp}-${target_2.hp}`
  sound_destroy_enemy()

  setTimeout(() => {
    target_1.hp = 0
    target_2.hp = 0

    let index_1 = field.indexOf(target_1)
    let index_2 = field.indexOf(target_2)
    if (index_1 !== -1) field[index_1] = ''
    if (index_2 !== -1) field[index_2] = ''

    check_win(field, enemies, enemy_leader)

    card.charges = 0
    remove_dead_card(card, grave, hand, undefined)

  }, 750)
}


export { passive_end_turn_destroy_2_enemies_after_3_turns }