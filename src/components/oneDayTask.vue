<template>
  <div class="center task-list-holder">
      <div class="task-row" v-for="task in filterData()">
           <span class="title">{{task.title}}</span> 
           <span class="poject">{{task.project || 'empty'}}</span>
           <div class="duration">
              <span class="marked-from">{{format(task.start)}}</span>
              <span class="marked-to">{{format(task.end)}}</span>
           </div>
           <button @click="runTimer(task.title, task.project)" class="new-one-btn">New One</button>
      </div>
  </div>
</template>
<script>
import { eventBus } from '../main.js';

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
  methods:{
    filterData() {
        let array = Object.keys(this.taskList).map(key => this.taskList[key]);
        return array.filter(item => moment(item['start']).format("YYYY-MM-DD") == this.date).reverse();
    },
    format(date){
      return moment(date).format("YYYY-MM-DD, HH:mm:ss");
    },
    runTimer(title, project) {
      eventBus.$emit('new-one-task', {title, project});
    }
  }
}

</script>
<style lang="scss">
@mixin marked{
  display: block;
  position: relative;
  min-width: 160px;
}
@mixin markedWord{
  position: absolute;
  display: block;
  min-width: 33px;
  text-align: center;
  left: -40px;
  top: 0px;
  padding: 1px 3px;
  color: #fff;
  background: grey;
  border-radius: 3px;
}
.task-list-holder{
  padding: 0px 20px;
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
      height: 45px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 5px 0;
      .marked-from{
        @include marked;
        &:before{
          content: 'from';
          @include markedWord;
        }
      }
      .marked-to{
        @include marked;
        &:before{
          content: 'to';
          @include markedWord;
        }
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