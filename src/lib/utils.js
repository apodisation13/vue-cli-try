// берет рандомный элемент из списка, возвращает его индекс
export function choice(list) {
  return Math.floor(Math.random() * list.length)
}

// достает рандомный элемент из списка, удаляет его из этого списка, возвращает его
export function choice_pop(list) {
  let random = choice(list)
  let elem = list[random]
  list.splice(random, 1) // убираем выбранный элемент из списка
  return elem
}

// рандомное число от min до max включительно оба
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// полное копирование объекта
export function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj))
}
