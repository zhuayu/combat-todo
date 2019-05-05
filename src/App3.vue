<template>
  <section class="todoapp" v-cloak>
    <the-header :todos.sync="todos"/>
    <the-list :filter="filter" :todos.sync="todos"/>
    <the-footer :filter.sync="filter" :todos.sync="todos"/>
  </section>
</template>

<script>
import TheHeader from '@/components/TheHeader2';
import TheList from '@/components/TheList2';
import TheFooter from '@/components/TheFooter2';

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
  components: {
    'the-header': TheHeader,
    'the-list': TheList,
    'the-footer': TheFooter
  }
}
</script>