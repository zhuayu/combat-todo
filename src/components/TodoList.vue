<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <li :class="['todo',{completed: todo.completed === true}, {editing: editTodo === todo}]" v-for="(todo,index) in showTodo" :key="index">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label @dblclick="editingMode(todo)">{{todo.title}}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input class="edit" type="text" 
          v-todo-focus="editTodo === todo" 
          v-model="todo.title"
          @blur="doneEdit(todo)" 
          @keyup.enter="doneEdit(todo)" 
          @keyup.esc="cancelEdit(todo)"
          >
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      beforeEditCache: '',
      editTodo: ''
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    },
    filter() {
      return this.$store.state.filter
    },
    showTodo: function() {
      let filter = this.filter;
      let showTodo = this.todos.filter( data => {
        if(filter === 'all'){
          return data
        }else if( filter === 'active'){
          return !data.completed
        }else if( filter === 'completed'){
          return data.completed
        }
      })
      return showTodo
    },
    allDone: {
      get: function () {
        return this.$store.getters.allCompleted
      },
      set: function (value) {
        this.$store.commit('setAllCompleted',value)
      }
    }
  },
  methods: {
    editingMode: function(todo) {
      this.beforeEditCache = todo.title;
      this.editTodo = todo;
    },
    removeTodo: function(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    doneEdit: function(todo) {
      if (!this.editTodo) {
        return;
      }
      this.editTodo = null;
      this.beforeEditCache = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },
    cancelEdit: function(todo) {
      this.editTodo = null;
      todo.title = this.beforeEditCache;
      this.beforeEditCache = null;
    },
  },
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
}
</script>
