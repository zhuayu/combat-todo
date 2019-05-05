<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allCompleted" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <li :class="['todo',
        {completed: todo.completed === true}, 
        {editing: editTodo === todo}]" 
        v-for="(todo,index) in showTodo" 
        :key="index">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed" />
          <label @dblclick="handleEdit(todo)">{{todo.title}}</label>
          <button class="destroy" @click="handleRemoveTodo(todo)"></button>
        </div>
        <input class="edit" type="text" 
          v-todo-focus="editTodo === todo" 
          v-model="todo.title"
          @blur="handleEditDone(todo)" 
          @keyup.enter="handleEditDone(todo)" 
          @keyup.esc="handleEditCancel(todo)" 
          />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      default: () => []
    },
    filter: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      beforeEditCache: '',
      editTodo: ''
    }
  },
  computed: {
    showTodo: function() {
      let filter = this.filter;
      return this.todos.filter( data => {
        if(filter === 'all'){
          return true
        }else if( filter === 'active'){
          return !data.completed
        }else if( filter === 'completed'){
          return data.completed
        }
      })
    },
    allCompleted: {
      get: function () {
        return this.todos.every(data => data.completed);  
      },
      set: function (value) {
        let todos = [...this.todos];
        todos.forEach(data => data.completed = value);
        this.$emit('update:todos', todos);
      }
    }
  },
  methods: {
    handleEdit: function(todo) {
      this.beforeEditCache = todo.title;
      this.editTodo = todo;
    },
    handleRemoveTodo: function(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    handleEditDone: function(todo) {
      if(todo.title.trim()){
        this.editTodo = null;
        this.beforeEditCache = null;
      }
    },
    handleEditCancel: function(todo) {
      todo.title = this.beforeEditCache;
      this.editTodo = null;
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
