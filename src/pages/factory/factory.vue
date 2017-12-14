<template>
  <div >
    <HeaderBox></HeaderBox>
    <div class="factory">
      factory
    </div>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
  import HeaderBox from '../../components/header/header.vue'
  import FooterBar from '../../components/footer/footer.vue'
  export default {
    components: {
      HeaderBox,
      FooterBar
    },
    computed: {

    },
    mounted () {

    },
    methods:{

    }
  }
</script>

<style lang="less">
  .main-body{
    height: 500px;
  }
</style>
