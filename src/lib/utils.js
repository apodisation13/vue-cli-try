// берет рандомный элемент из списка
export function choice(list) {
  return Math.floor(Math.random() * list.length)
}

export function choice_pop(list) {
  let random = Math.floor(Math.random() * list.length)
  let elem = list[random]
  list.splice(random, 1) // убираем из деки эту карту по её индексу random
  return elem
}
