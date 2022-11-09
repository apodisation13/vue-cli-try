import { choice, randInt } from "@/lib/utils"

function getValue(resource) {
  if (resource === "kegs" || resource === "big_kegs" || resource === "chests")
    return 1
  else if (resource === "scraps") return randInt(100, 200)
  else if (resource === "wood") return randInt(150, 250)
}

export function getRandomReward() {
  const random_reward = [
    "scraps",
    "scraps",
    "scraps",
    "wood",
    "wood",
    "wood",
    "wood",
    "wood",
    "kegs",
    "kegs",
    "kegs",
    "big_kegs",
    "big_kegs",
    "chests",
  ]
  const random_choice = choice(random_reward)
  const resource = random_reward[random_choice]
  const value = getValue(resource)
  return { resource: resource, value: value }
}

export function getRewardForLevel(win_price) {
  let pay_data = {}

  pay_data.wood = win_price
  pay_data.scraps = win_price

  let kegs = [0, 0, 0, 1] // 25%!!!
  let chance = kegs[choice(kegs)]
  if (chance === 1) pay_data.kegs = 1
  else pay_data.kegs = 0

  let big_kegs = [0, 0, 0, 0, 0, 0, 0, 1] // 18%!!!
  let chance2 = big_kegs[choice(big_kegs)]
  if (chance2 === 1) pay_data.big_kegs = 1
  else pay_data.big_kegs = 0

  pay_data.keys = 1

  return pay_data
}
