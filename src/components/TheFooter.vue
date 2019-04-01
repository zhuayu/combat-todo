<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{todos.length}}</strong> todo
    </span>
    <ul class="filters">
      <!-- <li><a href="#/all" :class="{selected: filter === 'all'}" @click="changeFilter('all')">All</a></li> -->
      <!-- <li><a href="#/active" :class="{selected: filter === 'active'}" @click="changeFilter('active')">Active</a></li> -->
      <!-- <li><a href="#/completed" :class="{selected: filter === 'completed'}" @click="changeFilter('completed')">Completed</a></li> -->
      <li>
        <router-link to="/all" :class="{selected: filter === 'all'}" >ALL</router-link>
      </li>
      <li>
        <router-link to="/active" :class="{selected: filter === 'active'}">Active</router-link>
      </li>
      <li>
        <router-link to="/completed" :class="{selected: filter === 'completed'}">Completed</router-link>
      </li>
    </ul>
    <button class="clear-completed" v-show="showClearCompleted" @click="removeCompleted" >Clear completed</button>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  props: {
    todos: {
      type: Array,
      default: () => {
        return []
      }
    },
    filter: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    showClearCompleted() {
      return this.todos.some(data => data.completed)
    }
  },
  methods: {
    changeFilter: function(filter){
      this.$emit('update:filter', filter)
    },
    removeCompleted: function() {
      this.todos = this.todos.filter(data => !data.completed);
      this.$emit('update:filter', this.todos)

    }
  },

}
</script>
