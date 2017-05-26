<template>
  <div class="task-list">
    <div v-for="task in getTasks">
      {{ task.title }}, {{task.project}}
    </div>
  </div>
</template>
<script>
export default{
  data: function(){
    return {
      taskList: '',
      uniqDates: []
    }
  },
  computed: {
    getTasks: function(data){
      this.$http.get('')
        .then(response => this.taskList = response.body, response => console.log('error', response));
        return this.taskList
    }
  }
}
</script>
<style lang="scss">
</style>