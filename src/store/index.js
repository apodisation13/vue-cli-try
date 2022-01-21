import { createStore } from "vuex"
import { get } from '@/logic/requests'


// ИНСТРУКЦИЯ:
// в шаблонах $store. state, getters['name'], commit('name', чё) для мутаций
// в .vue - this.$store. и то же самое
// в .js - ИМПОРТ store отсюда, и тогда store.  а дальше то же


// let factions = 'http://127.0.0.1:8000/api/v1/factions/'
// get(factions, 'get_factions')
// let leaders = 'http://127.0.0.1:8000/api/v1/leaders/'
// get(leaders, 'get_leaders')
// let cards = 'http://127.0.0.1:8000/api/v1/cards/'
// get(cards, 'get_cards')
// let decks = 'http://127.0.0.1:8000/api/v1/decks/'
// get(decks, 'get_decks')


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

    actions: {  // вызывает мутацию, выполняясь через store.dispatch('название')
        get_data() {
            let factions = 'http://127.0.0.1:8000/api/v1/factions/'
            get(factions, 'get_factions')
            let leaders = 'http://127.0.0.1:8000/api/v1/leaders/'
            get(leaders, 'get_leaders')
            let cards = 'http://127.0.0.1:8000/api/v1/cards/'
            get(cards, 'get_cards')
            let decks = 'http://127.0.0.1:8000/api/v1/decks/'
            get(decks, 'get_decks')   
            
        
            // commit('set_try', 10)
        }
    }
})

export default store
