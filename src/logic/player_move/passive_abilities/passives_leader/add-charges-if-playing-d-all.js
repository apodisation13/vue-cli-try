import { sound_timer_down } from "@/logic/play_sounds"

export function add_charges_if_playing_d_all(card, leader, upon_playing_card) {
  // если не играем карту, то есть каждый ход ИЛИ если играли карту и это был дамаг-всем (кроме самого лидера!)
  if (
    !upon_playing_card ||
    (upon_playing_card && card.ability.name === "damage-all" && card.color)
  ) {
    leader.timer -= 1
    sound_timer_down()
  }

  if (leader.timer === 0) {
    leader.charges += 1
    leader.timer = leader.default_timer
  }
}
