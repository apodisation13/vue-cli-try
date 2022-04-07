import {hit_one_enemy} from "@/logic/player_move/service/service_for_player_move";

function damage_one(enemy, card) {
  // нанесли урон и-тому элементу от конкретной карты
  hit_one_enemy(enemy, card)
}

export { damage_one }