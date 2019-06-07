<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">Abofasut</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
	width: 300px;
	height: 300px;
}
</style>
