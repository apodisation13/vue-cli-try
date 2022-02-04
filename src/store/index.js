import { createStore } from "vuex"
import { get } from '@/logic/requests'


// ИНСТРУКЦИЯ:
// в шаблонах $store. state, getters['name'], commit('name', чё) для мутаций
// в .vue - this.$store. и то же самое
// в .js - ИМПОРТ store отсюда, и тогда store.  а дальше то же


const store = createStore({
    state: {
        current_deck: [],  // дека выбранная для игры
        health: 0,
        leader: null,
        
        level: 0,  // номер уровня игры
        
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
            return state.cards.filter(f => f.faction==fac.name)
        },
        filtered_leaders: (state) => (fac) => {
            return state.leaders.filter(f => f.faction==fac.name)
        },
    
    },

    mutations: { 
        set_current_deck(state, deck) {  // сохранить в деку массив
            state.current_deck = deck
        },
        change_health(state, param) {  // изменяем здоровье
            state.health += param
        },
        set_health(state, param) {  // устанавливаем здоровье
            state.health = param
        },
        set_level(state, level) {  // установить номер уровня
            state.level = level
        },
        set_leader(state, leader) {  // установить лидера деки
            state.leader = leader
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

    },

    // вызывает мутацию, выполняясь через store.dispatch('название')
    actions: {  
        get_data() {
            // let factions = 'http://127.0.0.1:8000/api/v1/factions/'
            // let leaders = 'http://127.0.0.1:8000/api/v1/leaders/'
            // let cards = 'http://127.0.0.1:8000/api/v1/cards/'
            // let decks = 'http://127.0.0.1:8000/api/v1/decks/'           
            
            let factions = 'http://194.67.109.190:82/api/v1/factions/'
            let leaders = 'http://194.67.109.190:82/api/v1/leaders/'
            let cards = 'http://194.67.109.190:82/api/v1/cards/'
            let decks = 'http://194.67.109.190:82/api/v1/decks/'  
            
            get(factions, 'get_factions')
            get(leaders, 'get_leaders')
            get(cards, 'get_cards')
            get(decks, 'get_decks')   
            
            // commit('set_try', 10)
        },

        set_deck_in_play({commit}, {decks, i}) {
            commit('set_current_deck', decks[i].cards)
            commit('set_health', decks[i].health)
            commit('set_leader', decks[i].leader)
        }
    }
})

export default store
