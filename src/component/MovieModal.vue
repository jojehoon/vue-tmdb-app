<template>
  <section class="modal" v-modal @click.stop="SET_MODAL_CLOSE">
    <div class="modal__inner" @click.stop> 
      <div class="movie">
        <div class="movie__header" :style="moviePathBackdrop">
          <h2 class="movie__title">{{ GET_MOVIE.title }}
            <span v-if="GET_MOVIE.tagline" class="movie__tagline">{{ GET_MOVIE.tagline }}</span>
          </h2>
          <figure class="movie__poster">
            <img class="movie__image" :src="moviePathPoster">
          </figure>
        </div>
        <div class="movie__body">
          <dl class="movie-info">
            <dt class="a11y">Overview</dt>
            <dd class="movie-info__text">{{ GET_MOVIE.overview }}</dd>
            <dt class="movie-info__title">Genres</dt>
            <dd class="movie-info__text">{{ GET_MOVIE.genres | toString }}</dd>
            <dt class="movie-info__title">Release Date</dt>
            <dd class="movie-info__text">{{ GET_MOVIE.release_date | toDate }}</dd>
          </dl>
        </div>
      </div>
      <button class="modal__button--close" type="button" @click="SET_MODAL_CLOSE"><span class="a11y">close</span></button>
    </div>
  </section>
</template>

<script>
  import { toDate, toString }         from '../filter/index';
  import { mapGetters, mapMutations } from 'vuex';
  import { modal }                    from '../directive/index';

  export default {
    filters: {
      toDate,
      toString,
    },

    directives: {
      modal
    },

    methods: {
      ...mapMutations([
        'SET_MODAL_CLOSE',
      ])
    },

    computed: {
      ...mapGetters([
        'GET_MODAL',
        'GET_MOVIE',
      ]),
      
      // FIXME null 일때 예외 처리할 것
      moviePathBackdrop(){
        if(this.GET_MOVIE.poster_path) return`background-image:url('https://image.tmdb.org/t/p/w500${this.GET_MOVIE.backdrop_path}')`;
        return 
      },

      moviePathPoster(){
        // console.log(this.GET_MOVIE.poster_path);
        if(this.GET_MOVIE.poster_path) return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.GET_MOVIE.poster_path}`
        return '../../src/assets/no-image.png';
      },
    },

    watch: {
      GET_MODAL: function(newVal) {
        if(newVal){
          setTimeout(() => {
            document.body.classList.add = 'is-scroll-blocking';
          }, 1000)
        } else {
          setTimeout(() => {
            document.body.classList.remove = 'is-scroll-blocking';
          }, 500)
        }
      }
    },

    mounted: function(){
      document.addEventListener('keydown', (e) => {
        if(e.keyCode !== 27) return;
        this.SET_MODAL_CLOSE();
      });
    },

  }
</script>

<style lang="scss" scoped>
  .modal {
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background: rgba(8, 28, 36, 0.98);
    font-size: 0;
    text-align: center;
    white-space: nowrap;
    &:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
    &__inner {
      display: inline-block;
      position: relative;
      width: 100%;
      height: auto;
      max-width: 768px;
      min-height: 700px;
      margin: 20px;
      background: #fff;
      font-size: 12px;
      color: #444;
      text-align: left;
      vertical-align: middle;
    }

    &__button--close {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      cursor: pointer;

      &:before,
      &:after {
        content: '';
        position: absolute;
        width: 20px;
        height: 2px;
        margin-left: -10px;
        background: #fff;
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }

  .movie {
    white-space: normal;
    word-break: break-word;

    &__header {
      display: flex;
      align-items: center;
      position: relative;
      height: 350px;
      padding: 40px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      &:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        background: rgba(8, 28, 36, 0.85);
      }
    }
    &__title {
      position: relative;
      z-index: 1;
      padding-left: 40px;
      font-weight: 500;
      font-size: 30px;
      color: #01d277;
    }
    &__tagline {
      display: block;
      margin-top: 10px;
      font-weight: 300;
      font-size: 14px;
      color:rgba(255, 255, 255, 0.7);
      line-height: 1.5;
    }
    &__poster {
      flex: 0 0 300px;
      order: -1;
      position: relative;
      z-index: 1;
      margin-bottom: auto;
    }
    &__image {
      width: 100%;
    }
    &__body {}
    &-info {
      margin-left: 380px;
      padding: 33px 40px 33px 0;
      &__title {
        margin-top: 28px;
        font-weight: 400;
        font-size: 16px;
        color: #01d277;
        text-transform: uppercase;
      }
      &__text {
        margin-top: 5px;
        font-weight: 300;
        font-size: 14px;
        line-height: 1.8;
      }
    }
  }

  .modal-enter-active, .modal-leave-active {
    transition: opacity .5s
  }
  .modal-enter, .modal-leave-to {
    opacity: 0
  }
</style>