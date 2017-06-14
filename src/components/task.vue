<template>
  <div class="task-list">
    <div class="day-group center" v-for="date in uniqDates">
      <h3>{{ date }}</h3>
      <one-day-task :date="date" :taskList="taskList"></one-day-task>
    </div>
  </div>
  
</template>
<script>
import OneDayTask from './oneDayTask.vue'

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
          .then(response => this.uniqDates = this.getUniqDates(this.taskList), err => console.log('error', err));
      this.$on('hello', function(data){
        console.log(data)
      })
    }
  },
  mounted: function() {
      this.getTasks();
      console.log('ready', this.taskList)
  },
  computed: {
    //
  }
}
</script>
<style lang="scss">
  .day-group{
      h3{
          text-align: left;
          background: orange;
          color: #fff;
          padding: 5px;
          float: left;
          border-radius: 5px;
          margin: 0;
      }
  }
</style>