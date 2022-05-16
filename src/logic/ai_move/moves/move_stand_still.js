import {damage_player} from "@/logic/ai_move/moves/damage"


function stand_still(field, i) {
  damage_player(field, i)
}


export { stand_still }