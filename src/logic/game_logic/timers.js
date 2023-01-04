import { sound_timer_down } from "@/logic/play_sounds"

// Или обнуляем таймер, или нет
function resetTimer(card) {
  if (!card.reset_timer) return
  card.timer = card.default_timer
}

export function timer(card) {
  // если таймер УЖЕ равен 0, то мы не даем юзаться абилке в любом случае
  if (card.timer === 0) return false

  // так как таймер не был равен 0, можно уменьшить его на 1
  card.timer -= 1
  console.log("таймер -1", card.name)
  sound_timer_down()

  // если таймер не 0 после уменьшения, то смотрим each_tick
  // или говорим ТРУ (значит исполняем абилку каждый ход),
  // или фолс (если его нет, значит только по таймеру 0 исполним абилку)
  if (card.timer !== 0) return !!card.each_tick

  // если же таймер стал 0, то проверяем, нужно ли его восстановить, а потом в любом случае используем абилку
  resetTimer(card)
  return true
}

// Поставит выбранному key в объекте тру, а через таймут фолс, и звук воспроизведет
export function timeoutAnimationFlag(
  obj,
  key,
  soundFunction = null,
  timeout = 500
) {
  if (soundFunction) soundFunction()
  obj[key] = true
  setTimeout(() => {
    obj[key] = false
  }, timeout)
}

// напишет на время таймаута строку diffString, а потом изменит значение на value
export function timeoutAnimationValue(
  obj,
  key,
  diffString,
  value,
  soundFunction = null,
  timeout = 500
) {
  if (soundFunction) soundFunction()
  const prevValue = obj[key]
  obj[key] = diffString
  setTimeout(() => {
    obj[key] = prevValue + value
  }, timeout)
}

export function allowActionTimer(card) {
  // ретерн ТРУ значит что абилку мы выполним на ЭТОМ ШАГУ
  if (!card.default_timer) return true

  // здесь мы должны сделать абилку (ретерн тру) только когда таймер стал равен 0
  if (!card.each_tick) {
    console.log("У карты нет ИЧ ТИК, просто таймер -1", card.name)
    return timer(card) // вернет оттуда тру только если таймер стал 0
  }

  if (card.each_tick || card["each_tick"] === undefined) {
    console.log(
      "У карты есть ИЧ ТИК, выполняем абилку пока таймер не 0, ИЛИ ЛИДЕР!",
      card.name
    )
    return timer(card)
  }
}
