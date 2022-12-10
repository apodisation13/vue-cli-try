import { trigger_passive_grave } from "@/logic/player_move/passive_abilities/passives_graves"

export function incr_dmg_to_all_grave(card, gameObj) {
  const { grave } = gameObj
  if (!grave.length) return

  grave.forEach(c => {
    c.damage += card.value
  })
  trigger_passive_grave(grave[0])
}
