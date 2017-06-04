import Vue from 'vue'
import VueResource from 'vue-resource'
import VueFilter from 'vue-filter'
import App from './App.vue'

Vue.use(VueResource);
Vue.use(VueFilter);

// global configuration of Vue Resouse
Vue.http.options.root = 'https://tasko-37a7c.firebaseio.com/data.json';

// you can set interceptors to do something before of after each request 
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Tasko AIzaSyBxV6CPUbFxjJVZrC0Ol_DDE4IOnHXIaqs');
  request.headers.set('Accept', 'application/json');
  next();
})

new Vue({
  el: '#app',
  render: h => h(App)
})
