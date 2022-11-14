function remove_dead_card(card, grave, hand, deck) {
  if (card.charges === 0) {
    grave.push(card) // поместили карту в кладбище

    // если такая карта есть в руке, удаляем её из руки, если есть в колоде - удаляем из колоды
    if (hand.indexOf(card) !== -1) {
      hand.splice(hand.indexOf(card), 1)
      // alert('удалили карту из руки')
    } else if (deck.indexOf(card) !== -1) {
      deck.splice(deck.indexOf(card), 1)
      // alert('удалили карту из колоды')
    }
  }
}

// собирает всех врагов на поле в один список + лидера врагов
function get_all_enemies(field, enemy_leader) {
  let enemy_list = []
  field.forEach(enemy => {
    if (enemy) {
      enemy_list.push(enemy)
    }
  })
  if (enemy_leader.hp > 0) enemy_list.push(enemy_leader)
  return enemy_list
}

// взять рандомного врага из всех врагов
function get_random_enemy(field, enemy_leader) {
  let enemies_list = get_all_enemies(field, enemy_leader)
  let random = Math.floor(Math.random() * enemies_list.length)
  return enemies_list[random]
}

// для врага ставит ему dead и deathwish_triggered
function set_dead_and_deathwish(enemy, card) {
  if (enemy.hp - card.damage <= 0) {
    console.log("ВРАГ УМЕР из вспомогательной функции")
    enemy.dead = true // враг умер, если у него жизней меньше или равно 0
    if (enemy.has_deathwish) {
      console.log("У ВРАГА ТРИГГЕРНУЛО ДЕФВИШ из вспомогательной функции")
      enemy.deathwish_triggered = true // для deathwish
    }
  }
}

// собирает пустые клетки на поле (для deathwish появления, например)
function get_empty_field_indexes(field) {
  let emptyIndexesArray = []
  for (let i = 0; i < field.length; i++) {
    if (!field[i] || field[i].hp <= 0) emptyIndexesArray.push(i)
  }
  return emptyIndexesArray
}

// если хотя бы у одного врага есть deathwish И при этом он умер, то возвращаем ТРУ
function get_enemies(field, enemy_leader) {
  const enemies = get_all_enemies(field, enemy_leader)
  let deathwish_enemies = []
  let dead_enemies = []
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].deathwish_triggered) {
      deathwish_enemies.push(enemies[i])
    }
    if (enemies[i].dead) {
      dead_enemies.push(enemies[i])
    }
  }
  return { deathwish_enemies, dead_enemies }
}

// складывает мертвых врагов в кладбище
function place_dead_enemies_in_grave(dead_enemies, enemies_grave) {
  dead_enemies.forEach(enemy => enemies_grave.push(enemy))
}

export {
  remove_dead_card,
  get_all_enemies,
  get_random_enemy,
  set_dead_and_deathwish,
  get_empty_field_indexes,
  get_enemies,
  place_dead_enemies_in_grave,
}
