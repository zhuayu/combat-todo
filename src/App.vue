<template>
  <div id="app">
    <section class="todoapp" v-cloak>
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo()">
      </header>
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
      <footer class="footer">
        <span class="todo-count">
          <strong>{{todos.length}}</strong> todo
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{selected: filter === 'all'}" @click="changeFilter('all')">All</a></li>
          <li><a href="#/active" :class="{selected: filter === 'active'}" @click="changeFilter('active')">Active</a></li>
          <li><a href="#/completed" :class="{selected: filter === 'completed'}" @click="changeFilter('completed')">Completed</a></li>
        </ul>
        <button class="clear-completed" v-show="todos.some(data => data.completed)" @click="removeCompleted" >Clear completed</button>
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
      filter: 'all',
      newTodo: '',
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
    changeFilter: function(filter) {
      this.filter = filter
    },
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({ id: this.todos.length + 1, title: value, completed: false });
      this.newTodo = '';
    },
    removeTodo: function (todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    removeCompleted: function () {
      this.todos = this.todos.filter(data => !data.completed);
    },
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
  computed: {
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
          return this.todos.every(data => data.completed);
        },
        set: function (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value;
          });
        }
      }
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
