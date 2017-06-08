<template>
<div class="content">
	<timer></timer>
    <task-list></task-list>
</div>
</template>
<script>

import Timer from './timer.vue'
import Task from './task.vue'

export default{
	data: function(){
		return {

		}
	},
	components: {
    	'timer': Timer,
    	'task-list': Task
  	}
}
  
</script>
<style lang="scss">
.content{
	padding-top: 80px;
	box-sizing: border-box;
	min-height: calc(100vh - 80px);
}
</style>