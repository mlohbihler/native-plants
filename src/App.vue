<template>
  <div id="background">
    <img alt="Vue logo" src="./assets/bg.jpg" />
  </div>
  <div id="content-container">
    <div id="nav">
      <router-link to="/">Search</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #fef;
}

#background {
  position: absolute;
  z-index: -1;
  font-size: 0;
  width: 100%;
  height: 100vh;
  min-height: 100%;

  &:before {
    z-index: 1;
    content: '';
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 70%,
      /**
        These three 'smooth' out the fade.
      */ rgba(0, 0, 0, 0.2) 80%,
      rgba(0, 0, 0, 0.7) 90%,
      rgba(0, 0, 0, 0.9) 95%,
      /* Solid to match the background. */ rgba(0, 0, 0, 1) 100%
    );
  }

  img {
    opacity: 0.4;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

#content-container {
  max-width: 700px;
  margin: auto;
  z-index: 2;
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
