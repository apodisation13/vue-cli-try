import { createStore } from "vuex"


const store = createStore({
    state: {
        likes: 1,
        dislikes: 7,
        current_deck: [],  // дека выбранная для игры
        health: 0    
    },
    getters: {  // вот пока непонятно зачем это  this.$store.getters['название']
        incr_likes: state => {
            return state.likes += 5
        }
    },
    mutations: {  // this.$store.commit('название'), а в шаблоне без this
        incr_like(state) {
            state.likes += 10
            state.dislikes -= 1
        },
        set_current_deck(state, deck) {  // сохранить в деку массив
            state.current_deck = deck
        },
        change_health(state, param) {
            state.health += param
        }
    },
    actions: {  // тоже хз чё это

    }
})

export default store
