<template>
  <div class="task-list">
    <div v-for="date in uniqDates">
      {{ date }}
      <one-day-task :date="date" :taskList="taskList"></one-day-task>
    </div>
    <!-- <div v-for="task in taskList">
      {{ task.title}}
    </div> -->
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
      return uniqDatesArray;
    },
    getTasks: function(){
      this.$http.get('')
          .then(response => this.taskList = response.body, err => console.log('error', err))
          .then(response => this.uniqDates = this.getUniqDates(this.taskList), err => console.log('error', err));
    }
  },
  mounted: function() {
      this.getTasks();
      console.log('ready')
  },
  computed: {
    //
  }
}
</script>
<style lang="scss">
</style>