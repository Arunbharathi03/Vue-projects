<template>
  <div id="app">
    <navigation></navigation>
    <div class="p-16">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Navigation from './components/Navigation.vue'

export default {
  name: 'App',

  components: {
    Navigation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
  height: 100vh;

}
</style>
