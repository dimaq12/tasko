<template>
  <div>
      <div v-for="task in filterData()">
           {{task.project}} , {{task.title}} <div>{{moment(task.start)}} , {{moment(task.end)}}</div>
      </div>
  </div>
</template>
<script>
export default{
	props: {
		date: {
			type: String,
			required:false
		},
		taskList: {
			type: Object,
			required:false
		}
	},
    data: function(){
    	return{
    		tasks: this.taskList
    	}
    },
    methods:{
      filterData() {
         let array = Object.keys(this.taskList).map(key => this.taskList[key]);
         console.log(array.filter(item => moment(item['start']).format("YYYY-MM-DD") == this.date));
         return array.filter(item => moment(item['start']).format("YYYY-MM-DD") == this.date);
      },
      moment(date){
        return moment(date).format("MMMM Do YYYY, H:MM")
      }
    }
}

</script>
<style lang="scss">
</style>