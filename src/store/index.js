import { createStore } from "vuex"
import { dict_base_deck } from '@/logic/constants'

// ИНСТРУКЦИЯ:
// в шаблонах $store. state, getters['name'], commit('name', чё) для мутаций
// в .vue - this.$store. и то же самое
// в .js - ИМПОРТ store отсюда, и тогда store.  а дальше то же



const store = createStore({
    state: {
        current_deck: [],  // дека выбранная для игры
        health: 0,
        
        // список словарей dict = {'deck_name': ..., 'deck': ...,  'deck_health': ...}
        decks: [dict_base_deck, ],  // базовая дека всегда доступна 

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
        append_into_decks(state, deck) {  // добавить деку в память сохранённых дек
            state.decks.push(deck)
        }
    },

    actions: {  // тоже хз чё это
    }
})

export default store
