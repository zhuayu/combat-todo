<template>
  <div id="app">
    <section class="todoapp" v-cloak>
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?">
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li :class="['todo',{completed: todo.completed === true}, {editing: editTodo === todo}]" v-for="(todo,index) in todos" :key="index">
            <div class="view">
              <input class="toggle" type="checkbox">
              <label @dblclick="editingMode(todo)">{{todo.title}}</label>
              <button class="destroy"></button>
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
      <footer class="footer">
        <span class="todo-count">
          <strong>{{todos.length}}</strong> todo
        </span>
        <ul class="filters">
          <li><a href="#/all" class="selected">All</a></li>
          <li><a href="#/active">Active</a></li>
          <li><a href="#/completed">Completed</a></li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="http://evanyou.me">Evan You</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
</template>

<script>
import '@/assets/base.css'
import '@/assets/index.css'
export default {
  data() {
    return {
      beforeEditCache:null,
      editTodo:null,
      todos:[{
        title: '代办一',
        completed: true,
      },{
        title: '代办二',
        completed: false,
      }]
    }
  },
  methods: {
    editingMode(todo) {
      this.beforeEditCache = todo.title;
      this.editTodo = todo;
    },
    doneEdit: function (todo) {
      if (!this.editTodo) {
        return;
      }
      this.editTodo = null;
      this.beforeEditCache = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit: function (todo) {
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
  }
}
</script>

<style>

</style>
