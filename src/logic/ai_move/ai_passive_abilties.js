import {passive_end_turn_increase_damage} from "@/logic/ai_move/passive_abilities/increase_damage"


function enemy_passive_abilities_end_turn(field) {
  console.log(field.filter(e => e && e.passive))
  field.filter(e => e && e.passive).forEach(enemy => {

    if (enemy.passive_ability.name === 'increase-damage') {
      passive_end_turn_increase_damage(enemy)
    }

  })
}


export {enemy_passive_abilities_end_turn}