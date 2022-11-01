import store from "@/store"

const easy = {
  Bronzes: [5, 6, 7],
  Silvers: [2, 3],
  Golds: [1, 2],
  diff: "easy",
}
const normal = {
  Bronzes: [6, 7, 8, 9],
  Silvers: [2, 3, 4],
  Golds: [2, 3, 4],
  diff: "normal",
}
const hard = {
  Bronzes: [9, 10, 11, 12, 13, 14],
  Silvers: [3, 4, 5, 6],
  Golds: [3, 4, 5, 6],
  diff: "hard",
}
const diff = [easy, normal, hard]

function random_pick_enemies(dict) {
  let enemies = []

  let random_bronzes =
    dict.Bronzes[Math.floor(Math.random() * dict.Bronzes.length)]
  let random_silvers =
    dict.Silvers[Math.floor(Math.random() * dict.Silvers.length)]
  let random_golds = dict.Golds[Math.floor(Math.random() * dict.Golds.length)]
  // console.log(random_bronzes, random_silvers, random_golds)

  const bronzes = store.getters["bronze_enemies"]
  const silvers = store.getters["silver_enemies"]
  const golds = store.getters["gold_enemies"]

  for (let i = 0; i < random_bronzes; i++) {
    let random = Math.floor(Math.random() * bronzes.length)
    enemies.push(bronzes[random])
  }
  for (let i = 0; i < random_silvers; i++) {
    let random = Math.floor(Math.random() * silvers.length)
    enemies.push(silvers[random])
  }
  for (let i = 0; i < random_golds; i++) {
    let random = Math.floor(Math.random() * golds.length)
    enemies.push(golds[random])
  }

  // console.log(enemies)
  return enemies
}

function random_level_generator() {
  let random_levels = []
  const e_leaders = store.getters["all_enemy_leaders"]

  diff.forEach(d => {
    let e = random_pick_enemies(d)
    let enemy_leader = e_leaders[Math.floor(Math.random() * e_leaders.length)]

    random_levels.push({
      id: -1,
      level: {
        name: "random",
        difficulty: d.diff,
        starting_enemies_number: 3,
        enemies: e,
        enemy_leader: enemy_leader,
      },
    })
  })

  // console.log(random_levels[0])
  return random_levels
}

export { random_level_generator }
