<template>
  <header class="header">
    <input class="header__search" type="text" placeholder="search for a movie..." v-model="keyword" @keyup.enter="FETCH_SEARCH">
  </header>
</template>

<script>
import { mapState ,mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  data(){
    return {
    }
  },

  methods: {
    ...mapMutations(['SET_KEYWORD']),
    ...mapActions(['FETCH_SEARCH']),
  },

  computed: {
    keyword: {
      get(){
        return this.$store.state.keyword;
      },
      set(value){
        this.$store.commit('SET_KEYWORD', value);
      }
    }
  },
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