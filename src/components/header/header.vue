<template>
  <div class="z-header-box">
    <Logo></Logo>
    <TagMenu></TagMenu>
    <UserInfo></UserInfo>

  </div>
</template>
<script>
  import Logo from './logo.vue'
  import TagMenu from './tag-menu.vue'
  import UserInfo from './user-info.vue'


export default {
  data () {
    return {

    }
  },
  components: {
    Logo,
    TagMenu,
    UserInfo
  },
  computed: {

  },
  mounted(){

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
  .z-header-box {
    display: flex;
    flex-flow:row nowrap;
    justify-content: space-evenly;
    align-items:center;
    margin:0 auto;
    width:100%;
    height: 60px;
    /*background:#eee;*/
  }

</style>
