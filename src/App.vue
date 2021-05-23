<template>
  <div id="background">
    <img alt="Vue logo" src="./assets/bg.jpg" />
  </div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
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

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fef;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
