import store from "@/store"

function sound(src) {
  if (store.state.play_sound) new Audio(src).play()
}

export function sound_hit_shield() {
  sound("./../../audio/sounds/hit_shield.wav")
}

export function sound_damage_all() {
  sound("./../../audio/sounds/damage_all.wav")
}

export function sound_damage_one() {
  sound("./../../audio/sounds/damage_one.wav")
}

export function sound_spread_damage() {
  sound("./../../audio/sounds/spread_damage.wav")
}

export function sound_damage_row() {
  sound("./../../audio/sounds/damage_row.wav")
}

export function sound_damage_column() {
  sound("./../../audio/sounds/damage_column.wav")
}

export function sound_heal() {
  sound("./../../audio/sounds/heal.wav")
}

export function sound_destroy_enemy() {
  sound("./../../audio/sounds/destroy_enemy.wav")
}

export function sound_passive_increase_damage() {
  sound("./../../audio/sounds/passive_increase_damage.wav")
}

export function sound_enemy_damage_player() {
  sound("./../../audio/sounds/enemy_damage_player.wav")
}

export function sound_enemy_move_down() {
  sound("./../../audio/sounds/enemy_move_down.wav")
}

export function sound_enemy_regain_shield() {
  sound("./../../audio/sounds/regain_shield.wav")
}

export function sound_enemy_decrease_player_damage() {
  sound("./../../audio/sounds/enemy_decrease_player_damage.wav")
}

export function sound_appear_new_enemy() {
  sound("./../../audio/sounds/appear_new_enemy.wav")
}

export function sound_lose_game() {
  sound("./../../audio/sounds/lose_game.wav")
}

export function sound_deathwish() {
  sound("./../../audio/sounds/deathwish.wav")
}
