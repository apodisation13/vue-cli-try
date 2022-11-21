function border_for_card(card) {
  if (card.color === "Bronze") {
    return {
      // padding: "1px",
      "background-image":
        "linear-gradient( -45deg, rgb(74, 66, 55) 0%, rgb(197, 168, 126) 50%, rgb(74, 66, 55) 100% )",
    }
  } else if (card.color === "Silver") {
    return {
      // padding: "2px",
      "background-image":
        "linear-gradient( -45deg, rgb(29, 37, 45) 0%, rgb(255, 255, 255) 50%, rgb(29, 37, 45) 100% )",
    }
  } else if (card.color === "Gold") {
    return {
      // padding: "3px",
      "background-image":
        "linear-gradient( -45deg, rgb(176, 123, 21) 0%, rgb(245, 202, 90) 50%, rgb(176, 123, 21) 100% )",
    }
  }
  return {}
}

function card_margin(card) {
  if (card.damages_player) return { border: "outset 4px red" }
  else {
    if (card.color === "Bronze") {
      return {
        margin: "1px",
      }
    } else if (card.color === "Silver") {
      return {
        margin: "2px",
      }
    } else if (card.color === "Gold") {
      return {
        margin: "3px",
      }
    }
    return {}
  }
}

function border_leader(leader) {
  if (leader.faction === "Soldiers") return { border: "solid 3px blue" }
  else if (leader.faction === "Monsters") return { border: "solid 3px red" }
  else if (leader.faction === "Animals") return { border: "solid 3px green" }
  else return {}
}

// задний фон значка урона для всех карт и значка пассивок
function background_color(card) {
  if (card.faction === "Soldiers") {
    if (card.color === "Bronze") return { backgroundColor: "blue" }
    else if (card.color === "Silver") {
      return { backgroundColor: "blue", border: "solid 2px silver" }
    } else if (card.color === "Gold") {
      return { backgroundColor: "blue", border: "solid 2px gold" }
    } else return { backgroundColor: "blue" }
  } else if (card.faction === "Monsters") {
    if (card.color === "Bronze") return { backgroundColor: "red" }
    else if (card.color === "Silver") {
      return { backgroundColor: "red", border: "solid 2px silver" }
    } else if (card.color === "Gold") {
      return { backgroundColor: "red", border: "solid 2px gold" }
    } else return { backgroundColor: "red" }
  } else if (card.faction === "Animals") {
    if (card.color === "Bronze") return { backgroundColor: "green" }
    else if (card.color === "Silver") {
      return { backgroundColor: "green", border: "solid 2px silver" }
    } else if (card.color === "Gold") {
      return { backgroundColor: "green", border: "solid 2px gold" }
    } else return { backgroundColor: "green" }
  } else if (card.faction === "Neutral") {
    if (card.color === "Bronze") return { backgroundColor: "brown" }
    else if (card.color === "Silver") {
      return { backgroundColor: "brown", border: "solid 2px silver" }
    } else if (card.color === "Gold") {
      return { backgroundColor: "brown", border: "solid 2px gold" }
    } else return { backgroundColor: "brown" }
  } else return {}
}

function background_color_hp(color) {
  switch (color) {
    case "Bronze":
      return "#a9916e"
    case "Silver":
      return "#d3d4d5"
    case "Gold":
      return "rgb(245, 202, 90)"
    default:
      return "#fd69b5"
  }
}

function background_color_charges(color) {
  switch (color) {
    case "Bronze":
      return "#857359"
    case "Silver":
      return "#95999d"
    case "Gold":
      return "rgb(176, 123, 21)"
    default:
      return "#fd69b5"
  }
}

function background_color_deck(deck) {
  if (deck.leader.faction === "Soldiers") return { backgroundColor: "blue" }
  else if (deck.leader.faction === "Monsters") return { backgroundColor: "red" }
  else if (deck.leader.faction === "Animals")
    return { backgroundColor: "green" }
  else return {}
}

export {
  border_for_card,
  card_margin,
  border_leader,
  background_color,
  background_color_deck,
  background_color_hp,
  background_color_charges,
}
