function add_charges_to_leader_if_play_special(card, leader) {
  if (card.type === "Special") {
    leader.charges += 1
    console.log('пассивка лиlера')
  }
}


export {add_charges_to_leader_if_play_special}