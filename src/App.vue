<template>
  <div id="app" class="wrap">
    <vue-custom-scrollbar :settings="settings">
      <Header></Header>
      <Nav></Nav>
      <Main></Main>
    </vue-custom-scrollbar>
    <Loader v-show="GET_LOADER"></Loader>
    <Modal v-show="GET_MODAL"></Modal>
  </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar';
import Header from "./component/Header";
import Loader from "./component/Loader";
import Main from "./component/Main";
import Modal from "./component/Modal";
import Nav from "./component/Nav";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "app",

  components: {
    VueCustomScrollbar,
    Header,
    Loader,
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
      },
    };
  },

  computed: {
    ...mapState(['loader', 'scrollSetting']),
    ...mapGetters(['GET_LOADER', 'GET_MODAL', 'GET_SCROLLY'])
  },

  methods: {
    ...mapMutations(['SET_SCROLLY']),
  },

  watch: {
    // '$route' (to, from){
    //   console.log('app watch');
    //   console.log(this.settings.suppressScrollY);

    //   this.settings.suppressScrollY = true;
    //   console.log(this.settings.suppressScrollY);
    //   setTimeout(() => {
    //     this.settings.suppressScrollY = false;
    //   }, 0);
    //   console.log(this.settings.suppressScrollY);
    // }
  },

  // updated(){
  //   console.log('app updated');
  // },

  // beforeRouteLeave(to, from, next){
  //   console.log('app beforeRouteLeave');
  // },

  // beforeRouteEnter(to, from, next){
  //   console.log('app beforeRouteUpdate');
  // },

  // beforeRouteUpdate(to, from, next){
  //   console.log('app beforeRouteUpdate');
  // }

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
