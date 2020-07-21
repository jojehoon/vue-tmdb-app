export const getMovieImageUrl = {
  methods: {
    getMovieImageUrl: function(movie, width, height) {
      if(movie.poster_path){
        return `https://image.tmdb.org/t/p/w${width}_and_h${height}_bestv2${movie.poster_path}`;
      } else {
        return '../../src/assets/no-image.png';
      }
    }
  }
}