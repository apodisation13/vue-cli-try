import router from '@/router/router'
import {sound_lose_game} from "@/logic/play_sounds"


// функция проверки жизней, проигрыша
function check_lose(health) {
  if (health <= 0) {
    alert('Вы проиграли!:(')
    router.push('/')
    sound_lose_game()
  }
}

export { check_lose }