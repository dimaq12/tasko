<template>
  <div class="task-list center">
    <div v-sticky class="task-list-header">
      <div class="task-list-header-center">
        <span class="poject">Title</span>
        <span class="title">Project</span>
        <span class="time">Time</span>
        <span class="duration">Duration</span>
        <span class="new-task">New One Task</span>
      </div>
    </div>
    <div class="day-group" v-for="date in uniqDates">
      <h3>{{ ifToday(date) }}</h3>
      <one-day-task :date="date" :taskList="taskList"></one-day-task>
    </div>
  </div>
  
</template>
<script>
import OneDayTask from './oneDayTask.vue'
import { eventBus } from '../main.js';

export default{
  components: {
    'one-day-task': OneDayTask
  },
  data: function(){
    return {
      stateStatus: true,
      taskList: [],
      uniqDates: []
    }
  },
  methods: {
    getUniqDates: function(list){
      let uniqDatesArray = [];
      for (let el in list){
        if (uniqDatesArray.indexOf(moment(list[el].start).format("YYYY-MM-DD")) == -1){
          uniqDatesArray.push(moment(list[el].start).format("YYYY-MM-DD"));
        }
      }
      return uniqDatesArray.reverse();
    },
    getTasks: function(){
      this.$http.get('')
          .then(response => this.taskList = response.body, err => console.log('error', err))
          .then(response => this.uniqDates = this.getUniqDates(this.taskList), err => console.log('error', err))
    },
    ifToday(date){
      if (moment(date).isSame(Date.now(), 'd')) {
        return 'Today ' + date
      } else {
        return date
      }
    }
  },
  mounted: function() {
    this.getTasks();
    eventBus.$on('refresh', () => {
      this.getTasks();
      setTimeout(() => {
          this.$forceUpdate();
      }, 1000)
    });
  },
  directives:{
    sticky:{
      bind(el, binding, vnode) {
        window.onscroll = function() {
          if (window.pageYOffset > 80){
            el.classList.add("fixed");
          } else {
            el.classList.remove("fixed");
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.task-list{
  .task-list-header{
    background: #42b983;
    color: #fff;
    padding: 5px 25px;
    box-sizing: border-box;
    .task-list-header-center{
      display: flex;
      justify-content: space-between;
      span{
        display: block;
        text-align: left;
        width: 100%;
        max-width: 25%;
      }
      .poject{
        width: 100%;
        min-width: 25%;
      }
      .title{
        width: 100%;
        min-width: 25%;
      }
      .time{
        min-width: 20%
      }
      .duration{
        min-width: 15%
      }
      .new-task{
        text-align: center;
        min-width: 15%
      }
    }
    &.fixed{
      width: 100%;
      position: fixed;
      left: 0;
      top: 80px;
      z-index: 10;
      .task-list-header-center{
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }
    }
  }
  .day-group{
    overflow: hidden;
    .task-list-header{
      background: #42b983;
    }
    h3{
        text-align: left;
        background: orange;
        color: #fff;
        padding: 5px;
        float: left;
        border-radius: 5px;
        margin: 15px 0 3px 0;
    }
    &:last-child{
      .task-list-holder{
          margin-bottom: 30px;
      }
    }
  }
}
</style>