<template>
  <footer class="footer" v-show="todosCount">
    <span class="todo-count">
      <strong>{{todosCount}}</strong> 项目
    </span>
    <ul class="filters">
      <li>
        <a @click="handleChangeFilter('all')" href="#all" 
        :class="{selected: filter === 'all'}">All</a>
      </li>
      <li>
        <a @click="handleChangeFilter('active')" href="#active" 
          :class="{selected: filter === 'active'}">Active</a>
      </li>
      <li>
        <a @click="handleChangeFilter('completed')" href="#completed" 
          :class="{selected: filter === 'completed'}">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" 
      v-show="hasCompleted" 
      @click="handleRemoveAllCompletedTodo" >删除已完成</button>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
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
  computed: {
    hasCompleted() {
      return this.todos.some(data => data.completed);
    },
    todosCount() {
      return this.todos.length
    }
  },
  methods: {
    handleChangeFilter: function(filter) {
      this.$emit('update:filter', filter);
    },
    handleRemoveAllCompletedTodo: function() {
      let todos = [...this.todos];
      todos = todos.filter(data => !data.completed);
      this.$emit('update:todos', todos);
    }
  }
}
</script>
