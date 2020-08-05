<template>
  <section class="home">
    <header class="home__header">
      <h1 class="home__header-title">The Movie DB App</h1>
      <strong class="home__header-subtitle">Made with Vue.js</strong>
      <a class="home__header-link" href="#none">View Code</a>
    </header>
    <div class="home__body">
      
    </div>
  </section>
</template>

<script>
export default {

  beforeRouteLeave(to, from, next){
  next();
  }
}
</script>

<style lang="scss" scoped>
  .home {}
  .home__header {}
  .home__body {}
</style>