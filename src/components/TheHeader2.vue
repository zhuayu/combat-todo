<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" 
      autofocus 
      autocomplete="off" 
      placeholder="需要做什么呢 ？" 
      v-model="newTodo" 
      @keyup.enter="addTodo">
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    addTodo: function() {
      let todos = [...this.todos];
      todos.push({
        title: this.newTodo,
        completed: false
      })
      this.$emit('update:todos', todos);
    }
  }
}
</script>