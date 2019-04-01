<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo()">
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  props : {
    todos: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    addTodo: function() {
      this.todos.push({ 
        title: this.newTodo,
        completed: false
      })
      this.$emit('update:todos', this.todos)
      this.newTodo = '';
    }
  }
}
</script>
