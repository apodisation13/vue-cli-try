import { get_all_enemies } from "@/logic/player_move/service/service_for_player_move"
import { sound_spread_damage } from "@/logic/play_sounds"
import { hit_one_enemy } from "@/logic/player_move/abilities/hit_one_enemy"

function spread_damage(card, field, enemy_leader, grave, hand, deck, enemies) {
  let enemy_list = get_all_enemies(field, enemy_leader) // собрать всех врагов в один список

  let j = 0
  let id = setInterval(() => {
    if (j === card.damage || enemy_list.length === 0) {
      // до урона карты или пока врагов не осталось
      clearInterval(id)
      return
    }

    j++
    let random_enemy = Math.floor(Math.random() * enemy_list.length)
    console.log(`попали во врага ${enemy_list[random_enemy].id}`)

    let temp = enemy_list[random_enemy].hp
    hit_one_enemy(
      enemy_list[random_enemy],
      { damage: 1 },
      field,
      enemy_leader,
      enemies,
      200
    )

    if (temp - 1 === 0) {
      // убрали врага из списка врагов
      enemy_list.splice(random_enemy, 1) // если убили лидера вдруг, то у него просто 0 и всё
      console.log(enemy_list)
    }

    sound_spread_damage()
  }, 400)
}

export { spread_damage }
