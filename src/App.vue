<template>
  <div id="app" class="wrap">
    <Header :keyword="keyword"></Header>
    <Nav></Nav>
    <main class="main" @scroll="infiniteScroll">
      <router-view v-bind:keyword="keyword"></router-view>
    </main>
  </div>
</template>

<script>
import Header         from './component/Header';
import Nav            from './component/Nav';
import { mapActions } from 'vuex';

export default {
  name: 'app',

  components: {
    Header,
    Nav,
  },

  data(){
    return {
      listName: '',
      keyword: '',
      test:'reewoo',
    }
  },

  created(){
    this.FETCH_MOVIES();
  },

  methods: {
    ...mapActions([
      'FETCH_MOVIES',
      'FETCH_MOVIES_MORE',
    ]),

    // TODO 수정 필요
    infiniteScroll(){
      if((window.innerHeight + window.scrollX) >= document.body.offsetHeight){
        this.loading = true;
        this.FETCH_MOVIES_MORE();
      }else {
        this.loading = false;
      }
    },
  },

}
</script>

// 공통으로 뺄 것
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

*, *:before, *:after {
  box-sizing: border-box;
}

body, button, figcaption, h1, h2, h3, input, li {
  font-family: 'Roboto', 'sans-serf';
}

button {
  border: none;
  background: none;
  &:focus {
    outline: none;
  }
}

fieldset {
  border: none;
}

html {
  overflow-y: scroll
}

hr {
  display: none;
}

ol, ul, li {
  list-style: none;
}

.a11y {
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}

.wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 95px;
}

.main {
  background: #f8f8f8;
  padding: 0 30px;
}
.category {

}
.category__title {
  margin-left: 50px;
  font-weight: 300;
  font-size: 18px;
  color: rgb(222, 219, 214);
}


.loading {
  width: 100%;
  height: 1000px;
  background-color: hotpink;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
