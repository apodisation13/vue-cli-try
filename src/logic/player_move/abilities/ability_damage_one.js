import { useToast } from 'vue-toastification'

const toast = useToast()


function damage_one(enemy, card) {
  // нанесли урон и-тому элементу от конкретной карты
  if (enemy.shield) {
    enemy.shield = false
    toast.warning('Попали в щит!')
  }
  else enemy.hp -= card.damage

  card.charges -= 1  // вычитаем 1 заряд у карты игрока
}

export { damage_one }