<template>
  <div id="app">
    <div class="navbar">
      <p>disini navbar</p>
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
  font-family: "font-family you want to use";
}
#app {
  font-family: "font-family you want to use";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
