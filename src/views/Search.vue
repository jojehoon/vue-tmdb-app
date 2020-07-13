<template>
  <div>
    <transition name="fade">
      <!-- <router-view ></router-view> -->
      <MovieList :category-title="categoryTitle"></MovieList>
    </transition>
  </div>
</template>

<script>
import MovieList from '../component/MovieList';

export default {
  components: {
    MovieList,
  },

  data: function(){
    return {
      categoryTitle: 'Search',
    }
  },

}
</script>

<style lang="scss" scoped>

</style>