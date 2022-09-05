import { useToast } from "vue-toastification"

const toast = useToast()

function add_charges_to_leader_if_play_special(card, leader) {
  if (card.type === "Special") {
    leader.charges += 1
    toast.info("Лидеру добавили 1 заряд")
  }
}

export { add_charges_to_leader_if_play_special }
