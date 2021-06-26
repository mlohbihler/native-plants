<template>
  <div id="background">
    <img alt="Vue logo" src="./assets/bg.jpg" />
  </div>
  <div id="nav">
    <router-link to="/">Search</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <div id="content">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  height: 100%;
}

#background {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
  min-height: 100%;
  background-color: #000;

  img {
    opacity: 0.4;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #fef;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #888;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
