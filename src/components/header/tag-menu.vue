<template>
  <div id="z-nav-tag-box">
    <ul class="z-nav-tag-ul">
      <li class="z-nav-tag-ul-li" v-for="(item,index) in menuList":class="{active:activeIndex==index}" >
        <div @click="goRouter(item,index)">
          {{item.label}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script >

  export default {
    name: 'tag-menu',
    data () {
      return {
        menuList:[
          {id:0,name:"Main",label:"首页"},
          {id:1,name:"Factory",label:"工厂对比"},
          {id:2,name:"Job",label:"就业岗位"},
          {id:3,name:"AboutUs",label:"关于我们"},
        ]
      }
    },
    components: {
    },
    computed: {
      activeIndex () {
        return  this.$store.state.activeIndex
      },
    },
    mounted () {

    },
    updated () {
    },
    methods: {
        //跳转路由
      goRouter(item,index){
        this.$store.commit('updateActiveIndex',index);
        this.$router.push({ name: item.name})
      },

    }
  }
</script>

<style lang="less" scoped>
  #z-nav-tag-box{
    width:100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .z-nav-tag-ul{
    width:100%;
  }
  .z-nav-tag-ul li{
    width: 25%;
    line-height: 58px;
    display: inline-block;
    font-size: 1.3em;
    cursor: pointer;
  }

  .z-nav-tag-ul li:hover,.z-nav-tag-ul .active {
    color: #f00; ;
    border-color:#edf7ff;
    background-color: #edf7ff;
    border-bottom:1px solid rgba(0,0,0,0);
    -moz-transition: border 0.3s ease-in-out;
    -webkit-transition: border 0.3s ease-in-out;
    -o-transition: border 0.3s ease-in-out;
    transition: border 0.3s ease-in-out;
  }



</style>
