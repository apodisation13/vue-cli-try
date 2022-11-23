const state = {
  cards_in_deck: undefined, // СКОЛЬКО В ДЕКЕ ДОЛЖНО БЫТЬ КАРТ
  hand_size: undefined, // СКОЛЬКО КАРТ В РУКЕ

  current_deck: [], // дека выбранная для игры, deck.cards
  current_deck_index: undefined, // индекс деки в списке дек
  health: 0, // жизни деки, из деки, deck.health
  leader: null, // текущий лидер для игры из деки, deck.leader

  level: null, // объект уровня из БД, выбирается на странице LevelPage
  season: null, // объект сезона
  enemy_leader: null, // объект лидера врагов из уровней

  ppa_end_turn: false, // true - значит они сейчас в процессе
  ai_move: false, // true - значит они сейчас ходят
  leader_ai_move: false,
  epa_end_turn: false,
  player_turn: true,

  start_game_redirect: false,
}

const getters = {
  get_season: state => state.season,
  currentLevel: state => state.level,
}

const mutations = {
  set_game_const(state, payload) {
    state.hand_size = payload.hand_size
    state.cards_in_deck = payload.number_of_cards_in_deck
  },

  set_current_deck(state, deck) {
    // записать деку для игры
    state.current_deck = deck
  },
  // запомнить индекс деки из общего списка колод
  set_current_deck_index(state, index) {
    state.current_deck_index = index
  },
  set_health(state, param) {
    // установить здоровье из deck.health
    state.health = param
  },
  set_leader(state, leader) {
    // установить лидера деки, deck.leader
    state.leader = leader
  },

  set_season(state, season) {
    // установить объект сезона
    state.season = season
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

  set_start_game_redirect(state, payload) {
    state.start_game_redirect = payload
  },
}

const actions = {
  set_deck_in_play({ commit, getters }, deck) {
    const index = getters["all_decks"].findIndex(d => d.id === deck.id)
    commit("set_current_deck", deck.deck.cards)
    commit("set_current_deck_index", index)
    commit("set_health", deck.deck.health)
    commit("set_leader", deck.deck.leader)
  },
  set_level_in_play({ commit }, level) {
    commit("set_level", level.level)
    commit("set_enemy_leader", level.level.enemy_leader)
  },
  // после выигрыша, проигрыша или ухода со страницы игры, вызываем этот экшен и повторяем выбор деки
  re_set_deck({ state, getters, dispatch }) {
    const deck = getters["all_decks"][state.current_deck_index]
    if (!deck) return
    setTimeout(() => {
      dispatch("set_deck_in_play", deck)
      console.log("переустановка колоды!")
    }, 3000)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
