import {get_random_enemy} from "@/logic/player_move/service/service_for_player_move"
import {sound_damage_one} from "@/logic/play_sounds"
import {hit_one_enemy} from "@/logic/player_move/abilities/hit_one_enemy"


function passive_end_turn_damage_random_enemy(field, card, leader, enemy_leader, enemies) {
  let target = get_random_enemy(field, enemy_leader)  // взяли всех врагов, из них взяли одного

  if (!target) return  // если щас нет врагов на поле и нет живого лидера врагов, выходим

  hit_one_enemy(target, {"damage": 1}, field, enemy_leader, enemies, 500)
  sound_damage_one()
}


export {passive_end_turn_damage_random_enemy}