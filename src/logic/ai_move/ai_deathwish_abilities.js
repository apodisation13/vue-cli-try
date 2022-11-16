import { spawn_self } from "@/logic/ai_move/deathwish_abilities/spawn_self"
import { spawn_tokens } from "@/logic/ai_move/deathwish_abilities/spawn_tokens"

// ДИСПЕТЧЕР абилок deathwish у врага
function deathwish(deathwish_enemies, field) {
  if (!deathwish_enemies.length) return

  deathwish_enemies.forEach(enemy => {
    if (enemy.deathwish.name === "spawn-self") spawn_self(enemy, field)
    else if (enemy.deathwish.name === "spawn-tokens") spawn_tokens(enemy, field)
  })
}

export { deathwish }
