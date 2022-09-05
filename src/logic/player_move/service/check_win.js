import router from "@/router/router"
import store from "@/store"

// проверка выигрыша - если осталось 0 врагов и на поле никого
function check_win(field, enemy_list, enemy_leader) {
  if (enemy_list.length !== 0) return
  if (enemy_leader.hp > 0 || isNaN(enemy_leader.hp)) return

  for (let i = 0; i < field.length; i++) {
    if (field[i]) return
  }

  alert("ВЫ ВЫИГРАЛИ!!!")
  store.commit("set_win_redirect", true)
  router.push("win")
}

export { check_win }
