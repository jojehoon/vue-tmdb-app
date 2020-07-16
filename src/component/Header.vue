<template>
  <header class="header">
    <input class="header__search" type="text" placeholder="search for a movie..." value="keyword" v-model.lazy="keyword" @keyup.enter="FETCH_SEARCH({keyword})">
  </header>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data(){
    return {
      keyword: '',
    }
  },
  methods: {
    ...mapActions(['FETCH_SEARCH']),
  }
}
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 75px;
    padding: 0 60px;
    &__search {
      display: flex;
      width: 100%;
      height: 100%;
      border: none;
      font-weight: 400;
      font-size: 16px;
      color: #081c24;
      outline: none;
      &::placeholder {
        font-weight: 400;
      }
    }
  }
  
</style>