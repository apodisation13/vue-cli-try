import { spawn_self } from "@/logic/ai_move/deathwish_abilities/spawn_self"
import { spawn_tokens } from "@/logic/ai_move/deathwish_abilities/spawn_tokens"
import { incr_dmg_to_value_cards_by_1 } from "@/logic/ai_move/deathwish_abilities/incr_dmg_to_value_cards_by_1"

// ДИСПЕТЧЕР абилок deathwish у врага
function deathwish(deathwish_enemies, gameObj) {
  if (!deathwish_enemies.length) return

  const { field } = gameObj

  deathwish_enemies.forEach(enemy => {
    if (enemy.deathwish.name === "spawn-self") spawn_self(enemy, field)
    else if (enemy.deathwish.name === "spawn-tokens") spawn_tokens(enemy, field)
    else if (enemy.deathwish.name === "incr-dmg-to-value-cards-by-1") {
      incr_dmg_to_value_cards_by_1(enemy, gameObj)
    }
  })
}

export { deathwish }
