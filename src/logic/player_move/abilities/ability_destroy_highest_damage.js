import {get_all_enemies} from "@/logic/player_move/service/service_for_player_move"
import { useToast } from 'vue-toastification'
import {sound_destroy_enemy} from "@/logic/play_sounds"

const toast = useToast()


function destroy_highest_damage(field, enemy_leader) {

  let all_enemies
  if (enemy_leader.damage_per_turn && enemy_leader.hp > 0) {
    all_enemies = get_all_enemies(field, {hp: enemy_leader.hp, damage: enemy_leader.damage_per_turn})
  }
  else all_enemies = get_all_enemies(field, {hp: 0})

  all_enemies.sort((a, b) => b.damage - a.damage)

  if (!all_enemies.length) return

  let target = all_enemies[0]

  toast.warning(`Уничтожили врага с самым большим уроном, ${target.damage}!`)
  sound_destroy_enemy()

  target.hp = 0
}


export {destroy_highest_damage}