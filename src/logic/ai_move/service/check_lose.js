import store from "@/store"
import router from "@/router/router"
import { sound_lose_game } from "@/logic/play_sounds"

// функция проверки жизней, проигрыша
function check_lose() {
  if (store.state.game.health <= 0) {
    sound_lose_game()
    router.push("/lose")
  }
}

export { check_lose }
