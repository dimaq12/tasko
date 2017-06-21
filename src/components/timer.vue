<template>
  <div id="timer">
    <div class="spce-btwn center timer-controls row">
      <input v-model="title" class="inputs-group" type="text">
      <select v-model="currentProject" class="inputs-group" >
        <option :value="p" v-for="p in projects">{{ p }}</option>
      </select>
      <span class="output">{{ timeFromStart }}</span>
      <button @click="runTimer(isTimerWork)" :class="{'start-btn-active': isTimerWork == true}" class="start-btn">{{ buttonText }}</button>
    </div>
  </div>
</template>
<script>
import { eventBus } from '../main.js';

export default{
  data: function(){
    return {
      title: 'some title',
      currentProject: '',
      btnStatus: 'Sart',
      isTimerWork: false,
      start: '',
      now: '',
      projects: ['Timer', 'Atomic Bomb', 'Tesla Coil', 'Death Beam', 'Secret Mega Project'],
      timer: ''
    }
  },
  computed:{
    timeFromStart: function () {
      if (this.start != ''){
        return moment(this.now - this.start).format("mm:ss");
      }
      return '00:00'
    },
    buttonText: function(){
      return this.isTimerWork ?  'Stop' :  'Start';
    }
  },
  methods:{
    runTimer(status){
      var self = this;
      function timer(){
        self.start = moment(Date.now());
        self.now =  moment(Date.now());
        let timer  = setInterval( function(){
          self.now =  moment(Date.now());
        }, 1000);
        return timer;
      }
      if(status){
        this.post({
            title: self.title, 
            project: this.currentProject, 
            start: this.start, 
            end: moment(Date.now())
          });
        this.btnStatus = 'Start';
        this.isTimerWork = false;
        clearInterval(this.timer);
      } else {
        this.btnStatus = 'Stop';
        this.isTimerWork = true;
        this.timer = timer();
        
      }
      eventBus.$emit('refresh');
    },
    post: function(data){
      this.$http.post('', data)
        .then(response => console.log(response.body), response => console.log('error', response))
    }
  },
  mounted: function() {
    eventBus.$on('i-got-clicked', data => {
      console.log(`Oh, that's nice. It's gotten ${data} clicks! :)`)
    });
  }
}
  
</script>

<style lang="scss">
.spce-btwn{
  justify-content: space-between;
}
.start-btn{
  width: 100px;
  height: 40px;
  border-radius: 3px;
  color:#fff;
  font-size: 22px;
  background: green;
  outline: none;
  border:none;
  border-radius: 5px;
}
.start-btn-active{
    background:red;
}
.inputs-group{
  padding: 10px;
  box-sizing: border-box;
  font-size: 1.4em;
  margin-right: 10px;
  flex: 1;
}
.output{
  display: block;
  padding: 10px;
  box-sizing: border-box;
  font-size: 1.4em;
  margin: 10px 10px;
}
</style>