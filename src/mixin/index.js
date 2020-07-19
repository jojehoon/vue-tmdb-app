export const getMovieImageUrl = {
  methods: {
    getMovieImageUrl: function(movie) {
      if(movie.poster_path){
        return `https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie.poster_path}`;
      } else {
        return '../../src/assets/no-image.png';
      }
    }
  }
}