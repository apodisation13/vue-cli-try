import { createStore } from "vuex"
import { get } from '@/logic/requests'


// ИНСТРУКЦИЯ:
// в шаблонах $store. state, getters['name'], commit('name', чё) для мутаций
// в .vue - this.$store. и то же самое
// в .js - ИМПОРТ store отсюда, и тогда store.  а дальше то же


const store = createStore({
    state: {
        cards_in_deck: 12,  // СКОЛЬКО В ДЕКЕ ДОЛЖНО БЫТЬ КАРТ
        
        current_deck: [],  // дека выбранная для игры, deck.cards
        health: 0,  // жизни деки, из деки, deck.health
        leader: null,  // текущий лидер для игры из деки, deck.leader
        
        levels: [],  // все уровни, из запроса
        level: null,  // объект уровня из БД, выбирается на странице LevelPage
        enemy_leader: null,  // объект лидера врагов из уровней
        
        factions: [],
        leaders: [],
        cards: [],
        decks: [],
    },

    getters: {  
        all_cards: state => {
            return state.cards
        },
        all_leaders: state => {
            return state.leaders
        },
        filtered_cards: (state) => (fac) => {
            return state.cards.filter(f => f.faction===fac.name)
        },
        filtered_leaders: (state) => (fac) => {
            return state.leaders.filter(f => f.faction===fac.name)
        },
    
    },

    mutations: { 
        set_current_deck(state, deck) {  // сохранить в деку массив
            state.current_deck = deck
        },
        set_leader(state, leader) {  // установить лидера деки, deck.leader
            state.leader = leader
        },
        set_health(state, param) {  // установить здоровье из deck.health
            state.health = param
        },

        set_level(state, level) {  // установить уровень, объект
            state.level = level
        },
        set_enemy_leader(state, enemy_leader) {  // установить лидера врагов
            state.enemy_leader = enemy_leader
        },

        change_health(state, param) {  // в процессе игры, dmg/heal
            state.health += param
        },
        
        get_factions(state, result) {  // гет запрос на фракции
            state.factions = result
        },
        get_leaders(state, result) {  // гет запрос на лидеров
            state.leaders = result
        },
        get_cards(state, result) {  // гет запрос на базу карт
            state.cards = result
        },
        get_decks(state, result) {  // гет запрос на сохранённые колоды
            state.decks = result
        },
        get_levels(state, result) {  // гет запрос уровни (а в них враги)
            state.levels = result
        }

    },

    // вызывает мутацию, выполняясь через store.dispatch('название')
    actions: {  
        async get_data({commit}) {
            // let factions = 'http://127.0.0.1:8000/api/v1/factions/'
            // let leaders = 'http://127.0.0.1:8000/api/v1/leaders/'
            // let cards = 'http://127.0.0.1:8000/api/v1/cards/'
            // let decks = 'http://127.0.0.1:8000/api/v1/decks/' 
            // let levels = 'http://127.0.0.1:8000/api/v1/levels/'          
            
            let factions = 'http://194.67.109.190:82/api/v1/factions/'
            let leaders = 'http://194.67.109.190:82/api/v1/leaders/'
            let cards = 'http://194.67.109.190:82/api/v1/cards/'
            let decks = 'http://194.67.109.190:82/api/v1/decks/' 
            let levels = 'http://194.67.109.190:82/api/v1/levels/' 
            
            get(factions).then((result) => commit('get_factions', result))
            get(leaders).then((result) => commit('get_leaders', result))
            get(cards).then((result) => commit('get_cards', result))
            get(decks).then(
                (result) => { 
                    commit('get_decks', result)
                    console.log(result[0])
                    this.dispatch('set_deck_in_play', {deck: result[0]})
                })
            get(levels).then(
                (result) => {
                    commit('get_levels', result)
                    console.log(result[0])
                    commit('set_level', result[0])
                    console.log(result[0].enemy_leader)
                    commit('set_enemy_leader', result[0].enemy_leader)
                })

            // commit('set_try', 10)
        },

        set_deck_in_play({commit}, {deck}) {
            commit('set_current_deck', deck.cards)
            commit('set_health', deck.health)
            commit('set_leader', deck.leader)
            console.log(deck.health)
        }
    }
})

export default store
