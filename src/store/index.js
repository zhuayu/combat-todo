import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: [{
        title: '代办一',
        completed: true,
      },{
        title: '代办二',
        completed: false,
      }],
    filter: 'all',
  },
  getters: {
    todosCount: (state) => {
      return state.todos.length
    },
    hasCompleted: (state) => {
      return state.todos.some(data => data.completed)
    },
    allCompleted: (state) => {
      return state.todos.every(data => data.completed)
    }
  },
  mutations: {
    changeFilter (state, filter) {
      state.filter = filter
    },
    addTodo (state, todo) {
      state.todos.push(todo)
    },
    removeCompleted (state) {
      state.todos = state.todos.filter(data => !data.completed)
    },
    setAllCompleted (state, status) {
      state.todos.forEach(data => data.completed = status)
    }
  }
})

export default store