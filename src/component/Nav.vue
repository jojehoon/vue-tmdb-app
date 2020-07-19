<template>
  <nav class="nav">
    <router-link  class="logo__link" to="/" title="The Movie DB"><img class="logo__image" src="../assets/logo.svg"></router-link>
    <ul class="nav__list">
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

  computed: {
    ...mapState(['categories'])
  },
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 95px;
  height: 100%;
  background: #fff;
  @media screen and (min-width: 768px){
    z-index: 1;
  }

  &__list {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    background: #fff;
    @media screen and (min-width: 768px){
      position: static;
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
    width: 95px;
    height: 95px;
    font-weight: 300;
    font-size: 9px;
    color: #869094;
    cursor: pointer;
    text-decoration: none;
  }
}

.logo {
  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95px;
    height: 75px;
    border-bottom: 1px solid #2d2d2d;
    background: #081c24;
  }
  &__image {
    width: 60%;
  }
}
</style>