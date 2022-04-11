import {get_all_enemies, hit_one_enemy, remove_dead_card} from "@/logic/player_move/service/service_for_player_move"
import {check_win} from "@/logic/player_move/service/check_win"
import {sound_spread_damage} from "@/logic/play_sounds"


function spread_damage(card, field, enemy_leader, grave, hand, deck, isCard, enemies) {

  let enemy_list = get_all_enemies(field, enemy_leader)  // собрать всех врагов в один список

  card.charges -= 1
  if (isCard) remove_dead_card(card, grave, hand, deck)  // сразу убрали карту из руки или из колоды

  let j = 0
  let id = setInterval( () => {
    if (j === card.damage || enemy_list.length === 0) {  // до урона карты или пока врагов не осталось
      clearInterval(id)
      check_win(field, enemies, enemy_leader)
    }
    else {
      j++
      let random_enemy = Math.floor(Math.random() * enemy_list.length)
      console.log(`попали во врага ${enemy_list[random_enemy].id}`)

      hit_one_enemy(enemy_list[random_enemy], {'damage': 1} )

      if (enemy_list[random_enemy].hp === 0) {  // убрали врага из списка врагов и из поля тоже
        field[field.indexOf(enemy_list[random_enemy])] = ''
        enemy_list.splice(random_enemy, 1)  // если убили лидера вдруг, то у него просто 0 и всё
      }

      sound_spread_damage()
    }
  }, 200)
}

export { spread_damage }

// КАК БЫЛО БЕЗ sleep
// for (let i = 0; i < card.damage; i++) {
//   let random_enemy = Math.floor(Math.random() * enemy_list.length)
//   alert(`попали во врага ${enemy_list[random_enemy].id}`)
//
//   enemy_list[random_enemy].hp -= 1
//   if (enemy_list[random_enemy].hp === 0) {
//     enemy_list.splice(random_enemy, 1)
//     if (!enemy_list) return
//   }
//
// }