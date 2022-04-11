import store from "@/store"


function sound_hit_shield() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/hit_shield.wav')).play()
}

function sound_damage_all() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/damage_all.wav')).play()
}

function sound_damage_one() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/damage_one.wav')).play()
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


function sound_enemy_damage_player() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/enemy_damage_player.wav')).play()
}

function sound_enemy_move_down() {
  if (store.state.play_sound) new Audio(require('@/assets/audio/sounds/enemy_move_down.wav')).play()
}





export {
    sound_hit_shield,
    sound_damage_all,
    sound_damage_one,
    sound_spread_damage,
    sound_damage_row,
    sound_damage_column,
    sound_heal,

    sound_enemy_damage_player,
    sound_enemy_move_down,
}