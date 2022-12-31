function lock_enemy(enemy) {
  enemy.shield = false
  enemy.has_passive = false
  enemy.has_passive_in_field = null
  enemy.has_passive_in_deck = null
  enemy.has_passive_in_grave = null
  enemy.passive_ability = null
  enemy.has_deathwish = false
  enemy.deathwish = null
  enemy.locked = true
}

export { lock_enemy }
