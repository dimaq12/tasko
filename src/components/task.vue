<template>
  <div class="task-list center">
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
  }
}
</script>
<style lang="scss">
.task-list{
padding: 20px;
position: relative;
border: 1px solid #42b983;
box-sizing: border-box;
  .day-group{
    overflow: hidden;
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
  &:before{
    content: 'Days';
    position: fixed;
    background: #42b983;
    transform: rotate(90deg) ;
    left: -1px;
    top: 50%;
    color: #fff;
    text-transform: uppercase;
    font-size: 1.5em;
    padding: 5px 25px;
  }
}
</style>