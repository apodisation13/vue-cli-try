import { timer } from "@/logic/game_logic/timers"

export function add_charges_if_playing_d_all(card, leader, upon_playing_card) {
  // сюда заходим по пассивке самого лидера каждый ход (тогда upon = false)
  // ИЛИ если играем карту damage-all (кроме самого лидера!) (тогда upon = true и смотрим саму карту)
  if (
    !upon_playing_card ||
    (upon_playing_card && card.ability.name === "damage-all" && card.color)
  ) {
    if (!timer(leader)) return

    leader.charges += 1
  }
}
