import { createStore } from "vuex"


// ИНСТРУКЦИЯ:
// в шаблонах $store. state, getters['name'], commit('name', чё) для мутаций
// в .vue - this.$store. и то же самое
// в .js - ИМПОРТ store отсюда, и тогда store.  а дальше то же



const store = createStore({
    state: {
        current_deck: [],  // дека выбранная для игры
        health: 0,
        level: 0,  // номер уровня игры
        leader: null
    },

    getters: {  // вот пока непонятно зачем это
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
        }
    },

    actions: {  // тоже хз чё это
    }
})

export default store
