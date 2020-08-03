<template>
  <transition name="loader" @scroll.prevent>
    <div class="loader-mask">
      <div class="loader-spinner">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../scss/mixin.scss';

.loader {

  &-mask {
    position: fixed;
    z-index: 100000;
    background-color: hsla(0,0%,100%,.9);
    // margin: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    // bottom: 0;
    // left: 0;
    transition: opacity .3s;

      font-size: 0;
  text-align: center;
  white-space: nowrap;
    &:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }

  &-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
    & .circular {
      height: 42px;
      width: 42px;
      animation: loading-rotate 2s linear infinite
    }
    & .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90,150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #409eff;
      stroke-linecap: round;
    }
  }

}

@keyframes loading-rotate {
  to {
      transform: rotate(1turn)
  }
}

@keyframes loading-dash {
  0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0
  }

  50% {
      stroke-dasharray: 90,150;
      stroke-dashoffset: -40px
  }

  to {
      stroke-dasharray: 90,150;
      stroke-dashoffset: -120px
  }
}

.loader {
  @include routerTransitionFade(0.1s)
}
</style>