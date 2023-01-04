import store from "@/store"
import { field_passives } from "@/logic/ai_move/passive_abilities/passives_field"
import { deck_passives } from "@/logic/ai_move/passive_abilities/passives_deck"
import { grave_passives } from "@/logic/ai_move/passive_abilities/passives_grave"

export function enemy_passive_abilities_end_turn(gameObj, timeOut = 1000) {
  store.commit("set_epa_end_turn", true)

  const { field, enemies_grave, enemies, enemy_leader } = gameObj

  let pool = field.filter(e => e && e.has_passive_in_field)
  // если у лидера врагов есть пассивка и он жив, его добавляем тоже
  if (enemy_leader.has_passive && enemy_leader.hp > 0) pool.push(enemy_leader)
  pool = pool.concat(enemies.filter(e => e.has_passive_in_deck)) // собрали пассивные карты из колоды
  pool = pool.concat(enemies_grave.filter(e => e.has_passive_in_grave)) // собрали пассивные карты из сброса

  let i = 0
  let passive_time = setInterval(() => {
    if (i === pool.length) {
      clearInterval(passive_time)
      store.commit("set_epa_end_turn", false)
    } else {
      // ДИСПЕТЧЕР пассивных абилок врагов
      console.log("Выполняем пассивку номер", i)
      // пассивка врагов на поле или пассивка лидера врагов (у него нет поля color)
      if (pool[i].has_passive_in_field || !pool[i].color)
        field_passives(pool[i], gameObj)
      else if (pool[i].has_passive_in_deck) deck_passives(pool[i], gameObj)
      else if (pool[i].has_passive_in_grave) grave_passives(pool[i], gameObj)
      i += 1
    }
  }, timeOut)
}
