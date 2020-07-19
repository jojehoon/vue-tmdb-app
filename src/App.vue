<template>
  <div id="app" class="wrap">
    <Header></Header>
    <Nav></Nav>
    <Main></Main>
    <Modal v-show="GET_MODAL"></Modal>
  </div>
</template>

<script>
import Header         from './component/Header';
import Main           from './component/Main';
import Modal          from './component/Modal';
import Nav            from './component/Nav';
import { mapGetters }   from 'vuex';

export default {
  name: 'app',

  components: {
    Header,
    Main,
    Modal,
    Nav,
  },

  computed: {
    ...mapGetters(['GET_MODAL']),
  },
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
  padding-left: 95px;
}
</style>