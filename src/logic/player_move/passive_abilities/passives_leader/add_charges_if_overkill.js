export function add_charges_if_overkill(enemy, leader) {
  const c = enemy.hp.split("-")
  if (c[0] - c[1] < 0) {
    leader.charges += 1
  }
}
