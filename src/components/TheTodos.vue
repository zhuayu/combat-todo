<template>
  <section class="todoapp" v-cloak>
    <the-header />
    <todo-list />
    <the-footer />
  </section>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TodoList from '@/components/TodoList'
import TheFooter from '@/components/TheFooter'

import '@/assets/base.css'
import '@/assets/index.css'
export default {
  created() {
    this.fetchFilter();
  },
  watch: {
    '$route': 'fetchFilter'
  },
  methods: {
    fetchFilter: function() {
      let filter = this.$route.params.id || 'all';
      this.$store.commit('changeFilter', filter)
    }
  },
  components: {
    'the-header': TheHeader,
    'todo-list': TodoList,
    'the-footer': TheFooter
  }
}
</script>
