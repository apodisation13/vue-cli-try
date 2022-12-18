import { sound_timer_down } from "@/logic/play_sounds"

function resetTimer(card) {
  if (!card.reset_timer) return

  card.timer = card.default_timer
}

export function timer(card) {
  card.timer -= 1
  sound_timer_down()

  if (card.timer !== 0) return false

  resetTimer(card)
  return true
}

// obj, key - что менять в объекте
// diffValue - что написать на время timeout, value - какое значение прибавить потом
// soundFaction - какую функцию звука вызвать
// isBool - менять ли флаг булев или уже какое-то значение
export function timeoutAnimation(
  obj,
  key,
  soundFunction = null,
  diffString = null,
  value = null,
  isBool = false,
  timeout = 500
) {
  if (soundFunction) soundFunction()
  if (isBool) {
    obj[key] = true
    setTimeout(() => {
      obj[key] = false
    }, timeout)
  } else {
    const prevValue = obj[key]
    obj[key] = diffString
    setTimeout(() => {
      obj[key] = prevValue + value
    }, timeout)
  }
}
