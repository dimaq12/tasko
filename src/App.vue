<template>
  <div id="app">
      <app-header></app-header>
      <app-main>
      </app-main>
      <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/header.vue'
import Main from './components/main.vue'
import Footer from './components/footer.vue'


export default {
  data: function(){
    return {

    }
  },
  components: {
    'app-header': Header,
    'app-main': Main,
    'app-footer': Footer
  }
}
</script>

<style lang="scss">

html,body{
  margin: 0;
  padding: 0;
  background-color: #eceff1;
  min-height: 100%;
}
.center{
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.row{
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items: center;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
