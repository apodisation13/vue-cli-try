import { createStore } from "vuex"


const store = createStore({
    state: {
        likes: 1,
        dislikes: 7

    },
    getters: {  // вот пока непонятно зачем это  this.$store.getters['название']
        incr_likes: state => {
            return state.likes += 5
        }
    },
    mutations: {  // $store.commit('название')
        incr_like(state) {
            state.likes += 10
            state.dislikes -= 1
        }
    },
    actions: {  // тоже хз чё это

    }
})

export default store
