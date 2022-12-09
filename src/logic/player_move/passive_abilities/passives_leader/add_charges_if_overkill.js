export function add_charges_if_overkill(enemy, leader) {
  if (typeof enemy.hp !== "string") return // если там был щит, то у врага не убавятся жизни
  const c = enemy.hp.split("-")
  if (c[0] - c[1] < 0) {
    leader.charges += 1
  }
}
