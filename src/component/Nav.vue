<template>
  <nav class="nav">
    <router-link class="logo__link" to="/" title="The Movie DB"><img class="logo__image" src="../assets/logo.svg"></router-link>
    <button class="nav__hamburger" :class="{ 'is-active' : isActive }" type="button" @click="toggleNavHamburger"><i class="nav__icon"><span class="a11y">Navigation Only Mobile</span></i></button>
    <ul class="nav__list" :class="{ 'is-active' : isActive }">
      <li class="nav__item" v-for="(category, index) in categories" v-bind:key="index">
        <router-link class="nav__link" :to="{name: 'Movie', params: {category}}">{{ category | toUpperCase }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { toUpperCase } from '../filter/index.js';
import { mapState } from 'vuex';

export default {
  filters: {
    toUpperCase,
  },

  data(){
    return {
      isActive: false,
    }
  },

  computed: {
    ...mapState(['categories'])
  },

  methods: {
    toggleNavHamburger(){
      this.isActive = !this.isActive;
    },
  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 55px;
  height: 50px;
  background: #fff;
  @media screen and (min-width: 768px){
    z-index: 1;
    width: 95px;
    height: 100%;
  }

  &__hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    width: 55px;
    height: 50px;
    border-left: 1px solid #f8f8f8;
    cursor: pointer;
    @media screen and (min-width: 768px){
      display: none;
    }
    @at-root .nav__icon {
      position: relative;
      transform: translateY(-1px);
      &, &:before, &:after{
        width: 23px;
        height: 1px;
        background-color: rgba(8, 28, 36, 0.5);
        transition: all .3s ease;
      }
      &:before, &:after{
        content: '';
        position: absolute;
        bottom: 27px;
        left: 0;
        transform: translate3d(0,0,0) rotate(0) scale(1,1);
      }
      &:before {
        top:-7px;
      }
      &:after {
        top:7px;
      }
    } 
  }

  &__hamburger.is-active {
    .nav__icon {
      background: transparent;
      &:before, &:after {
        top: 0;
      }
      &:before {
        transform: rotate(225deg);
      }
      &:after {
        transform: rotate(135deg);
      }
    }
  }

  &__list.is-active {
    visibility: visible;
    background: rgba(255, 255, 255, 0.95);
    opacity: 1;
  }

  &__list {
    visibility: hidden;
    display: flex;
    position: fixed;
    top: 51px;
    right: 0;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 0;
    transition: all 0.5s ease;
    @media screen and (min-width: 768px){
      visibility: visible;
      position: static;
      opacity: 1;
    }
  }

  &__item {
    display: flex;
    justify-content: center;
    width: 50%;
    border-bottom: 1px solid #f8f8f8;
    &:nth-of-type(even){
      border-left: 1px solid #f8f8f8;
    }
    @media screen and (min-width: 768px){
      width: auto;
      &:nth-of-type(even){
        border-left: none;
      }
    }
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 95px;
    font-weight: 300;
    font-size: 9px;
    color: #869094;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.5s ease7;
    @media screen and (min-width: 768px){
      width: 95px;
    }
    &.router-link-active {
      background: #f8f8f8;
      color: #081c24;    
    }
  }
}

.logo {
  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 50px;
    border-bottom: 1px solid #2d2d2d;
    background: #081c24;
    @media screen and (min-width: 768px){
      width: 95px;
      height: 75px;
    }
  }
  &__image {
    width: 70%;
  }
}
</style>