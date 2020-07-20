<template>
  <main class="main">
    <transition name="fade">
        <router-view :key="this.$route.fullPath"></router-view>
    </transition>
  </main>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import '../scss/mixin.scss';

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 0 30px;
  margin-top: 50px;
  background: #f8f8f8;
  @media screen and (min-width: 768px){
    margin-top: 0;
  }
}

.fade {
  @include routerTransitionFade();
}
</style>