const state = {
  cards_in_deck: 12, // СКОЛЬКО В ДЕКЕ ДОЛЖНО БЫТЬ КАРТ
  hand_size: 6, // СКОЛЬКО КАРТ В РУКЕ

  current_deck: [], // дека выбранная для игры, deck.cards
  health: 0, // жизни деки, из деки, deck.health
  leader: null, // текущий лидер для игры из деки, deck.leader

  level: null, // объект уровня из БД, выбирается на странице LevelPage
  enemy_leader: null, // объект лидера врагов из уровней

  ppa_end_turn: false, // true - значит они сейчас в процессе
  ai_move: false, // true - значит они сейчас ходят
  leader_ai_move: false,
  epa_end_turn: false,
  player_turn: true,
}

const getters = {}

const mutations = {
  set_current_deck(state, deck) {
    // записать деку для игры
    state.current_deck = deck
  },
  set_health(state, param) {
    // установить здоровье из deck.health
    state.health = param
  },
  set_leader(state, leader) {
    // установить лидера деки, deck.leader
    state.leader = leader
  },

  set_level(state, level) {
    // установить уровень, объект
    state.level = level
  },
  set_enemy_leader(state, enemy_leader) {
    // установить лидера врагов
    state.enemy_leader = enemy_leader
  },

  change_health(state, param) {
    // в процессе игры, dmg/heal
    state.health += param
  },

  set_ppa_end_turn(state, payload) {
    state.ppa_end_turn = payload
  },
  set_ai_move(state, payload) {
    state.ai_move = payload
  },
  set_leader_ai_move(state, payload) {
    state.leader_ai_move = payload
  },
  set_epa_end_turn(state, payload) {
    state.epa_end_turn = payload
  },
  set_player_turn(state, payload) {
    state.player_turn = payload
  },
}

const actions = {
  set_deck_in_play({ commit }, deck) {
    commit("set_current_deck", deck.deck.cards)
    commit("set_health", deck.deck.health)
    commit("set_leader", deck.deck.leader)
  },
  set_level_in_play({ commit }, level) {
    commit("set_level", level.level)
    commit("set_enemy_leader", level.level.enemy_leader)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
