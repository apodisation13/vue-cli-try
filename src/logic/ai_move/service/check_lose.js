import router from '@/router/router'


// функция проверки жизней, проигрыша
function check_lose(health) {
  if (health <= 0) {
    alert('Вы проиграли!:(')
    router.push('/')
  }
}

export { check_lose }