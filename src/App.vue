<template>
  <div id="app" class="wrap">
    <Scrollbar ref="scrollbar" class="scroll-area" :settings="settings"></Scrollbar>
    <Header></Header>
    <Nav></Nav>
    <Main></Main>
    <Modal v-show="GET_MODAL"></Modal>
  </div>
</template>

<script>
import Scrollbar from 'vue-custom-scrollbar';
import Header         from './component/Header';
import Main           from './component/Main';
import Modal          from './component/Modal';
import Nav            from './component/Nav';
import { mapGetters }   from 'vuex';

export default {
  name: 'app',

  components: {
    Scrollbar,
    Header,
    Main,
    Modal,
    Nav,
  },

  data(){
    return {
      settings: {
        maxScrollbarLength: 10,
        wheelSpeed : 3,
      }
    }
  },

  computed: {
    ...mapGetters(['GET_MODAL']),
  },

  methods: {
    getWindowInfo(){
      const scrollbar = document.querySelector('.scroll-area')
      console.log(scrollbar);
      let size = {
        width : window.innerWidth,
        height: window.innerHeight
      }
      console.dir(scrollbar.style);
      scrollbar.style.width = size.width;
      scrollbar.style.height = size.height;
    }
  },
  
  created(){
    window.addEventListener('resize', this.getWindowInfo);
  },
  
  mounted(){
    this.getWindowInfo();
  },

  destroyed(){
    window.removeEventListener('resize', this.getWindowInfo);
  }
}
</script>

// 공통으로 뺄 것
<style lang="scss">
@import './scss/reset.scss';
@import './scss/common.scss';
</style>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 0;
  @media screen and (min-width: 768px) {
    padding-left: 95px;
  }
}
.scroll-area {
  position: relative;
  width: auto;
  height: auto;
  margin: auto;
}
</style>