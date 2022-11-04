function lock_enemy(enemy) {
  enemy.has_passive = false
  enemy.locked = true
}

export { lock_enemy }
