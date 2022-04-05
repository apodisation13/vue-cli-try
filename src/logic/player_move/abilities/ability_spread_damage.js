import { useToast } from 'vue-toastification'
import {get_all_enemies} from "@/logic/player_move/service/service_for_player_move"

const toast = useToast()


function spread_damage(card, field, enemy_leader) {

  let enemy_list = get_all_enemies(field, enemy_leader)  // собрать всех врагов в один список

  for (let i = 0; i < card.damage; i++) {
    let random_enemy = Math.floor(Math.random() * enemy_list.length)
    alert(`попали во врага ${enemy_list[random_enemy].id}`)

    enemy_list[random_enemy].hp -= 1
    if (enemy_list[random_enemy].hp === 0) {
      enemy_list.splice(random_enemy, 1)
      if (!enemy_list) return
    }

  }
  card.charges -= 1
}

export { spread_damage }