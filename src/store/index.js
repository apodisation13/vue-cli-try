import { createStore } from "vuex"
import { get, post, axios_delete } from '@/logic/requests'


// ИНСТРУКЦИЯ:
// в шаблонах $store. state, getters['name'], commit('name', чё) для мутаций
// в .vue - this.$store. и то же самое
// в .js - ИМПОРТ store отсюда, и тогда store.  а дальше то же


// const FACTIONS = 'http://127.0.0.1:8000/api/v1/factions/'
// const LEADERS = 'http://127.0.0.1:8000/api/v1/leaders/'
// const CARDS = 'http://127.0.0.1:8000/api/v1/cards/'
// const DECKS = 'http://127.0.0.1:8000/api/v1/decks/'
// const LEVELS = 'http://127.0.0.1:8000/api/v1/levels/'

let FACTIONS = 'http://194.67.109.190:82/api/v1/factions/'
let LEADERS = 'http://194.67.109.190:82/api/v1/leaders/'
let CARDS = 'http://194.67.109.190:82/api/v1/cards/'
let DECKS = 'http://194.67.109.190:82/api/v1/decks/'
let LEVELS = 'http://194.67.109.190:82/api/v1/levels/'


const store = createStore({
    state: {
        isLoaded: false,  // загружены ли данные
        error: "",  // сообщение об ошибке загрузки данных

        cards_in_deck: 12,  // СКОЛЬКО В ДЕКЕ ДОЛЖНО БЫТЬ КАРТ
        hand_size: 6,  // СКОЛЬКО КАРТ В РУКЕ
        
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
            return state.cards.filter(f => f.faction===fac.name || f.faction==='Neutral')
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
        },

        set_isLoaded(state, payload) {
            state.isLoaded = payload
        },
        set_error(state, payload) {
            state.error = payload
        },

    },

    // вызывает мутацию, выполняясь через store.dispatch('название')
    actions: {  
        async get_data({commit}) {

            const factions = get(FACTIONS)
            const leaders = get(LEADERS)
            const cards = get(CARDS)
            const levels = get(LEVELS)
            const decks = this.dispatch("get_decks")  // вот так можно, хотя там нет ретерна

            try {
                const responses = await Promise.all([
                    factions, leaders, cards, levels, decks,
                ])
                commit('get_factions', responses[0])
                commit('get_leaders', responses[1])
                commit('get_cards', responses[2])

                commit('get_levels', responses[3])
                commit('set_level', responses[3]?.[0])
                commit('set_enemy_leader', responses[3]?.[0]?.enemy_leader)

                commit('set_isLoaded', true)

            } catch (err) {
                this.dispatch("error_action", err)
                throw new Error("Произошла ошибка в загрузке данных")
            }

        },

        async get_decks({commit}) {
            try {
                const decks = await get(DECKS)
                commit('get_decks', decks)
                await this.dispatch('set_deck_in_play', decks?.[0])
            } catch (err) {
                this.dispatch("error_action", err)
                throw new Error("Какая-то ошибка с загрузкой деки")
            }
        },

        set_deck_in_play({commit}, deck) {
            commit('set_current_deck', deck.cards)
            commit('set_health', deck.health)
            commit('set_leader', deck.leader)
        },

        // выполняется по добавлении новой деки со страницы DeckBuilder
        async post_deck_get_decks({commit}, body) {
            try {
                await post(DECKS, body)
                await this.dispatch('get_decks')
            } catch (err) {
                this.dispatch("error_action", err)
                throw new Error("Какая-то ошибка при добавлении деки")
            }
        },

        // выполняется по удалению деки id со страницы DeckBuilder
        async delete_deck({commit}, id) {
            let url = `${DECKS}13123213${id}/`
            try {
                await axios_delete(url)
                await this.dispatch('get_decks')
            } catch (err) {
                this.dispatch("error_action", err)
                throw new Error("Какая-то ошибка с удалением деки")
            }
        },

        error_action({commit}, err) {
            console.log(err)
            commit("set_error", err.message)
            commit('set_isLoaded', false)
        },
    }
})

export default store
