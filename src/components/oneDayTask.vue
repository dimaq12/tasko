<template>
  <div class="task-list-holder">
      <div class="task-row" v-for="task in filterData()">
           <span>{{task.project}},</span>
           <span>{{task.title}}</span> 
           <div class="duration">
              <span>{{moment(task.start)}}</span>
              <span>{{moment(task.end)}}</span>
           </div>
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
         return array.filter(item => moment(item['start']).format("YYYY-MM-DD") == this.date).reverse();
      },
      moment(date){
        return moment(date).format("MMMM Do YYYY, H:MM")
      }
    }
}

</script>
<style lang="scss">
.task-list-holder{
  .task-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .duration{
      span{
        display: block;
        min-width: 100%;
      }
    }
    &:nth-child(odd){
      background: fff;
    }
    &:nth-child(even){
      background: grey;
    }
  }
}

</style>