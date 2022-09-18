import store from "@/store"

function sound(src) {
  if (store.state.play_sound) new Audio(src).play()
}

function sound_hit_shield() {
  sound("./../../audio/sounds/hit_shield.wav")
}

function sound_damage_all() {
  sound("./../../audio/sounds/damage_all.wav")
}

function sound_damage_one() {
  sound("./../../audio/sounds/damage_one.wav")
}

function sound_spread_damage() {
  sound("./../../audio/sounds/spread_damage.wav")
}

function sound_damage_row() {
  sound("./../../audio/sounds/damage_row.wav")
}

function sound_damage_column() {
  sound("./../../audio/sounds/damage_column.wav")
}

function sound_heal() {
  sound("./../../audio/sounds/heal.wav")
}

function sound_destroy_enemy() {
  sound("./../../audio/sounds/destroy_enemy.wav")
}

function sound_passive_increase_damage() {
  sound("./../../audio/sounds/passive_increase_damage.wav")
}

function sound_enemy_damage_player() {
  sound("./../../audio/sounds/enemy_damage_player.wav")
}

function sound_enemy_move_down() {
  sound("./../../audio/sounds/enemy_move_down.wav")
}

function sound_enemy_regain_shield() {
  sound("./../../audio/sounds/regain_shield.wav")
}

function sound_enemy_decrease_player_damage() {
  sound("./../../audio/sounds/enemy_decrease_player_damage.wav")
}

function sound_appear_new_enemy() {
  sound("./../../audio/sounds/appear_new_enemy.wav")
}

function sound_lose_game() {
  sound("./../../audio/sounds/lose_game.wav")
}

export {
  sound_hit_shield,
  sound_damage_all,
  sound_damage_one,
  sound_spread_damage,
  sound_damage_row,
  sound_damage_column,
  sound_heal,
  sound_destroy_enemy,
  sound_passive_increase_damage,
  sound_enemy_damage_player,
  sound_enemy_move_down,
  sound_enemy_regain_shield,
  sound_enemy_decrease_player_damage,
  sound_appear_new_enemy,
  sound_lose_game,
}
