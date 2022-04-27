import {heal} from "@/logic/player_move/abilities/ability_heal"


function passive_end_turn_heal_leader_by_2() {
  heal({heal: 2})
}

function passive_end_turn_heal_leader_by_3() {
  heal({heal: 3})
}


export {passive_end_turn_heal_leader_by_2, passive_end_turn_heal_leader_by_3}