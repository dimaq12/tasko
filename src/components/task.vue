<template>
  <div class="task-list">
    <div v-for="date in uniqDates">
      {{ date }}
    </div>
    <div v-for="task in getTasks">
        {{ task.title }}, {{task.project}}
    </div>
  </div>
</template>
<script>
export default{
  data: function(){
    return {
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
    }
  },
  computed: {
    getTasks: function(data){
      this.$http.get('')
        .then(response => this.taskList = response.body, response => console.log('error', response));
        this.uniqDates = this.getUniqDates(this.taskList);
        return this.taskList;
    }
  }
}
</script>
<style lang="scss">
</style>