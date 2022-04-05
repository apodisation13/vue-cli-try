import { useToast } from 'vue-toastification'

const toast = useToast()


function damage_all(field, card) {
  field.forEach(enemy => {
    if (enemy) {
      if (enemy.shield) {
        enemy.shield = false
        toast.warning('Попали в щит!')
      }
      else enemy.hp -= card.damage
    }
  })
  card.charges -= 1
  toast.warning('УРОН ВСЕМ!')
}

export { damage_all }