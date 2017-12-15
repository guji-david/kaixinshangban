<template>
  <div class="z-header-box">
    <div class="container">
      <el-row style="height: 100%">
        <el-col :span="8"> <Logo></Logo></el-col>
        <el-col :span="8">  <TagMenu></TagMenu></el-col>
        <el-col :span="8"> <UserInfo></UserInfo></el-col>
      </el-row>



    </div>


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
    width:100%;
    height: 60px;
    /*background:#eee;*/
    .container{
      height: 100%;
    }
  }

</style>
