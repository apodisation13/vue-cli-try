import store from "@/store"


function sound_hit_shield() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/hit_shield.wav')).play()
}

function sound_damage_all() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/damage_all.wav')).play()
}

function sound_damage_one() {
  if (store.state.play_sound) new Audio(require('./../../public/audio/damage_one.wav')).play()
}

function sound_spread_damage() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/spread_damage.wav')).play()
}

function sound_damage_row() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/damage_row.wav')).play()
}

function sound_damage_column() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/damage_column.wav')).play()
}

function sound_heal() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/heal.wav')).play()
}

function sound_destroy_enemy() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/destroy_enemy.wav')).play()
}

function sound_passive_increase_damage() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/passive_increase_damage.wav')).play()
}


function sound_enemy_damage_player() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/enemy_damage_player.wav')).play()
}

function sound_enemy_move_down() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/enemy_move_down.wav')).play()
}

function sound_enemy_regain_shield() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/regain_shield.wav')).play()
}

function sound_enemy_decrease_player_damage() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/enemy_decrease_player_damage.wav')).play()
}

function sound_appear_new_enemy() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/appear_new_enemy.wav')).play()
}


function sound_lose_game() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/lose_game.wav')).play()
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