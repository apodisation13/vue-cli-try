// берет рандомный элемент из списка, возвращает его индекс
export function choice(list) {
  return Math.floor(Math.random() * list.length)
}

export function choice_pop(list) {
  let random = Math.floor(Math.random() * list.length)
  let elem = list[random]
  list.splice(random, 1) // убираем из деки эту карту по её индексу random
  return elem
}

// рандомное число от min до max включительно оба
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
