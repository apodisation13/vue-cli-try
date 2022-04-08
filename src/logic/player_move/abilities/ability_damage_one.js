import {hit_one_enemy} from "@/logic/player_move/service/service_for_player_move";
import store from "@/store"


function damage_one(enemy, card) {
  // нанесли урон и-тому элементу от конкретной карты
  hit_one_enemy(enemy, card)
  // var audio = new Audio(require())
  // audio.play()
  if (store.state.play_sound) {
    const audio = new Audio(require('@/assets/audio/sounds/damage_one.wav'))
    audio.play()
  }
}

export { damage_one }