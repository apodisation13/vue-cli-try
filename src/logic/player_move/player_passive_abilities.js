import store from "@/store"
import { hand_passives } from "@/logic/player_move/passive_abilities/passives_hand"
import { deck_passives } from "@/logic/player_move/passive_abilities/passives_deck"
import { grave_passives } from "@/logic/player_move/passive_abilities/passives_graves"

function player_passive_abilities_end_turn(gameObj, timeOut = 1000) {
  store.commit("set_ppa_end_turn", true) // установили флаг начала пассивок

  const { hand, deck, grave, leader } = gameObj

  // здесь мы создаем пул карт, для которых нужны пассивки!
  let pool = hand.filter(c => c.has_passive_in_hand) // собрали пассивные карты из руки
  if (leader.has_passive) pool.push(leader) // добавили туда ещё и лидера если у него есть пассивка
  pool = pool.concat(deck.filter(c => c.has_passive_in_deck)) // собрали пассивные карты из колоды
  pool = pool.concat(grave.filter(c => c.has_passive_in_grave)) // собрали пассивные карты из сброса

  let i = 0
  // вот именно в такой последовательности они и будут работать: рука, лидер, колода, сброс
  let passive_time = setInterval(() => {
    if (i === pool.length) {
      // если мы дошли до конца, сбрасываем интервал и выходим
      clearInterval(passive_time)
      store.commit("set_ppa_end_turn", false)
    } else {
      // МЕНЕДЖЕР пассивных абилок карт: рука, лидер, колода, сброс
      console.log("Выполняем пассивку номер", i)
      if (pool[i].has_passive_in_hand || !pool[i].color)
        hand_passives(pool[i], gameObj)
      else if (pool[i].has_passive_in_deck) deck_passives(pool[i], gameObj)
      else if (pool[i].has_passive_in_grave) grave_passives(pool[i], gameObj)
      i += 1
    }
  }, timeOut)
}

export { player_passive_abilities_end_turn }
