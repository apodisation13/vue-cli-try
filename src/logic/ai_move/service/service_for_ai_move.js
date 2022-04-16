// в начале хода компа установит всем врагам, кто должен прыгать, false
function set_already_jumped(field) {
  for (let i = 11; i >= 0; i--) {
    if (field[i] && field[i].already_jumped) {
      field[i].already_jumped = false
    }
  }
}


export { set_already_jumped }