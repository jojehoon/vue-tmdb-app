<template>
  <div id="app" class="wrap">
    <!-- <Loader></Loader> -->
    <vue-custom-scrollbar :settings="settings" @ps-scroll-y="scrollHandle">
      <Header></Header>
      <Nav></Nav>
      <Main></Main>
      <Modal v-show="GET_MODAL"></Modal>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar';
import Header from "./component/Header";
import Main from "./component/Main";
import Modal from "./component/Modal";
import Nav from "./component/Nav";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "app",

  components: {
    VueCustomScrollbar,
    Header,
    Main,
    Modal,
    Nav
  },

  data() {
    return {
      // isActiveScrollY : this.scrollY,
      settings: {
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 200,
        suppressScrollY: false,
      }
    };
  },

  computed: {
    ...mapState(['scrollY']),
    ...mapGetters(['GET_MODAL', 'GET_SCROLLY'])
  },

  methods: {
    ...mapMutations(['SET_SCROLLY']),
    scrollHandle(evt) {
      // console.log(evt);
    },

  },

  created() {
  },

  mounted() {
    console.dir(VueCustomScrollbar);
    this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'SET_LOADER' && state.loader === true){
        this.settings.suppressScrollY = true;
      }
      else if (mutation.type === 'SET_LOADER' && state.loader === false){
        this.settings.suppressScrollY = false;
      }
      
    })
  },

  destroyed() {
  }
};
</script>

// 공통으로 뺄 것
<style lang="scss">
@import "./scss/reset.scss";
@import "./scss/common.scss";
</style>

<style lang="scss">
.wrap {
  position: relative;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 0;
  @media screen and (min-width: 768px) {
    padding-left: 95px;
  }
}
</style>
