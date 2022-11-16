function lock_enemy(enemy) {
  enemy.has_passive = false
  enemy.has_deathwish = false
  enemy.locked = true
}

export { lock_enemy }
