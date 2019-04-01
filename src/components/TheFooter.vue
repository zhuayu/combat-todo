<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{todosCount}}</strong> todo
    </span>
    <ul class="filters">
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
    <button class="clear-completed" v-show="hasCompleted" @click="removeCompleted" >Clear completed</button>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data () {
    return {

    }
  },
  props: {
    todos: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  computed: {
    filter() {
      return this.$store.state.filter
    },
    todosCount() {
      return this.$store.getters.todosCount
    },

    hasCompleted() {
      return this.$store.getters.hasCompleted
    },
  },
  methods: {
    removeCompleted: function() {
      this.$store.commit('removeCompleted')
    }
  },

}
</script>
