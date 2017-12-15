<template>
  <div class="user-info">
      <div class="noLogin">
        <span class="icon-sprites icon-weixin icon-box"></span>
        <span class="icon-sprites icon-qq icon-box"></span>
        <span class="icon-box">登陆</span>
        <span class="icon-box">注册</span>
      </div>
  </div>
</template>

<script>
  import * as API from '../../store/api'
  export default{
    data () {
      return {
      }
    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>
  @import "./user-info.less";
</style>
