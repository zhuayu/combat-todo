<template>
  <section class="todoapp" v-cloak>
    <the-header 
      :todos.sync="todos"/>
    <todo-list 
      :filter="filter"
      :todos.sync="todos" />
    <the-footer 
      :filter.sync="filter"
      :todos.sync="todos"/>
  </section>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TodoList from '@/components/TodoList'
import TheFooter from '@/components/TheFooter'

import '@/assets/base.css'
import '@/assets/index.css'
export default {
  data() {
    return {
      filter: 'all',
      todos:[{
        title: '代办一',
        completed: true,
      },{
        title: '代办二',
        completed: false,
      }]
    }
  },
  created() {
    this.fetchFilter();
  },
  watch: {
    '$route': 'fetchFilter'
  },
  methods: {
    fetchFilter: function() {
      let filter = this.$route.params.id || 'all';
      this.filter = filter;
    }
  },
  components: {
    'the-header': TheHeader,
    'todo-list': TodoList,
    'the-footer': TheFooter
  }
}
</script>
