<template>
  <div class="z-logo-box" @click="goIndex()">
    <div class="z-logo"><img src="../../assets/images/logo.jpg" width="40" height="40"/></div>
    <div class="z-title">开心上班</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
      data(){
          return{

          }
      },
      methods:{
          goIndex(){
            this.$router.push({ name: "Main"})
          }
      }
  }
</script>

<style lang="less" scoped>
  .z-logo-box{
    height: 60px;
    cursor: pointer;
    display: flex;
    align-items: center;
    .z-logo{
      height: 100%;
      display: flex;
      align-items: center;
    }
    .z-title{
      padding-left: 10px;
      font-size: 1.2em;
    }
  }

</style>
