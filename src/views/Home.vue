<template>
  <section class="home">
    <header class="home__header">
      <div class="home__header-wrap">
        <h1 class="home__header-title">The Movie DB App</h1>
        <strong class="home__header-subtitle">Made with Vue.js</strong>
        <a class="home__header-link" href="#none">View Code</a>
      </div>
    </header>
    <div class="home__body">
      <ul></ul>
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
  .home__header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    right: 0;
    left: -30px;
    width: calc(100% + 60px);
    height: 384px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-image: url('../assets/pulp-fiction.jpg');
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(248, 248, 248, 0.7);
    }
    &-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    &-title {
      font-weight: 500;
      font-size: 28px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #081c24;
    }
    &-subtitle {
      margin: 15px 0;
      font-weight: 300;
      font-size: 16px;
      color: #081c24;
    }
    &-link {
      font-weight: 300;
      font-size: 13px;
      text-decoration: none;
      color: #081c24;
      opacity: 0.7;
      transition: opacity 0.5s ease;
    }
  }
  .home__body {}
</style>