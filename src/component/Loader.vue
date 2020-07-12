<template>
  <div class="loader">
    <span class="hidden">Loading...</span>
  </div>  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @keyframes spinner-border {
    to { transform: rotate(360deg); }
  }

  .loader{
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: text-bottom;
    border: .25em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spinner-border .75s linear infinite;
  }
</style>