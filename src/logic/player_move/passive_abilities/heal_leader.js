import {heal} from "@/logic/player_move/abilities/ability_heal"


function passive_end_turn_heal_leader() {
  heal({heal: 1})
}


export {passive_end_turn_heal_leader}