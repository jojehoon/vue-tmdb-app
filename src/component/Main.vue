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
  width: calc(100% + 95px);
  padding: 0 30px;
  background: #f8f8f8;
  transform: translateX(-95px);
  @media screen and (min-width: 768px){
    width: 100%;
    transform: translateX(0);
  }
}

.fade {
  @include routerTransitionFade();
}
</style>