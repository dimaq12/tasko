<template>
  <div class="center task-list-holder">
      <div class="task-row" v-for="task in filterData()">
           <span class="poject">{{task.project || 'empty'}}</span>
           <span class="title">{{task.title}}</span> 
           <div class="duration">
              <span>{{format(task.start)}}</span>
              <span>{{format(task.end)}}</span>
           </div>
           <button class="new-one-btn">New One</button>
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
         return array.filter(item => moment(item['start']).format("YYYY-MM-DD") == this.date).reverse();
      },
      format(date){
        return moment(date).format("YYYY-MM-DD, HH:mm:ss");
      }
    }
}

</script>
<style lang="scss">
.task-list-holder{
  padding: 3px 20px;
  background: #eee;
  float: left;
  margin: 5px 0;
  border: 1px solid #42b983;
  border-radius: 5px;
  box-sizing:border-box;
  .task-row{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    justify-content: space-between;
    border-bottom: 1px solid #42b983;
    .poject{
      width: 100%;
      max-width: 25%;
    }
    .title{
      width: 100%;
      max-width: 25%;
    }
    .duration{
      span{
        display: block;
        min-width: 160px;
      }
    }
    .new-one-btn{
      background: #62b7f3;
      border-radius:5px;
      color:#fff;
      width: 100px;
      height: 30px;
      outline: none;
      border: none;
      transition: 0.3s;
      &:hover{
        background: #61ade2;
      }
    }
    &:last-child{
      border: none;
    }
  }
}
</style>