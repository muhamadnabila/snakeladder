<template>
  <div id="app">
    <div class="nav">
      <br><br><br><br><br><br>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {};
</script>

<style>
html,
body,
pre,
code,
kbd,
samp {
  font-family: 'Press Start 2P', cursive;
}
#app {
  /* font-family: "font-family you want to use"; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 700px;
  background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(https://data.whicdn.com/images/192837034/original.gif)
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
