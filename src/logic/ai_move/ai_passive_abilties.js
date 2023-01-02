import store from "@/store"
import { enemy_leader_heal_self } from "@/logic/ai_move/passive_abilities/passives_in_field/heal"
import { damage_player_by_enemy_leader } from "@/logic/ai_move/moves/damage"
import { field_passives } from "@/logic/ai_move/passive_abilities/passives_field"
import { deck_passives } from "@/logic/ai_move/passive_abilities/passives_deck"
import { grave_passives } from "@/logic/ai_move/passive_abilities/passives_grave"

function enemy_passive_abilities_end_turn(gameObj, timeOut = 1000) {
  store.commit("set_epa_end_turn", true)

  const { field, enemies_grave, enemies } = gameObj

  let pool = field.filter(e => e && e.has_passive_in_field)
  // if (enemy_leader.has_passive) pool.push(enemy_leader)
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
      if (pool[i].has_passive_in_field) field_passives(pool[i], gameObj)
      else if (pool[i].has_passive_in_deck) deck_passives(pool[i], gameObj)
      else if (pool[i].has_passive_in_grave) grave_passives(pool[i], gameObj)
      i += 1
    }
  }, timeOut)
}

// эта функция срабатывает для лидера врагов каждый ход врага
function passive_leader_ai_move(enemy_leader) {
  if (enemy_leader.hp <= 0) return
  if (enemy_leader.locked || !enemy_leader.has_passive) return

  // дальше идём, если у врага жизней не ноль И он не locked
  store.commit("set_leader_ai_move", true)

  // ДИСПЕТЧЕР пассивных абилок лидера врага
  if (enemy_leader.ability.name === "heal-self-per-turn") {
    enemy_leader_heal_self(enemy_leader)
  } else if (enemy_leader.ability.name === "damage-per-turn") {
    damage_player_by_enemy_leader(enemy_leader)
  }

  store.commit("set_leader_ai_move", false)
}

export { enemy_passive_abilities_end_turn, passive_leader_ai_move }
