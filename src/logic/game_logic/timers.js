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

// Поставит выбранному key в объекте тру, а через таймут фолс, и звук воспроизведет
export function timeoutAnimationFlag(
  obj,
  key,
  soundFunction = null,
  timeout = 750
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
  timeout = 750
) {
  if (soundFunction) soundFunction()
  const prevValue = obj[key]
  obj[key] = diffString
  setTimeout(() => {
    obj[key] = prevValue + value
  }, timeout)
}
