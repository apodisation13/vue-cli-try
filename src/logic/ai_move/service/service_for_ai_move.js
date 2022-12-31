import { copyObj } from "@/lib/utils"

// в начале хода компа установит всем врагам, кто должен прыгать, false
function set_already_jumped(field) {
  for (let i = 11; i >= 0; i--) {
    if (field[i] && field[i].already_jumped) {
      field[i].already_jumped = false
    }
  }
}

// создает токен врага и снимает у него пассивную способность
function create_token(enemy) {
  const token = copyObj(enemy)
  token.passive_ability = null
  token.has_passive = null
  token.has_passive_in_field = null
  token.hp = 1
  token.base_hp = 1
  token.damage = 1
  return token
}

// создает токен врага и НЕ снимает у него пассивную способность
function create_token_with_passive(enemy) {
  const token = copyObj(enemy)
  token.hp = 1
  token.base_hp = 1
  token.damage = 1
  return token
}

export { set_already_jumped, create_token, create_token_with_passive }
