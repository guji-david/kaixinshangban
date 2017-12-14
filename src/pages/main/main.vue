<template>
  <div >
    <HeaderBox></HeaderBox>
    <div class="main-body">
      <div class="main-carousel">
        <el-carousel indicator-position="none" height=400px :interval="2000" arrow="never">
          <el-carousel-item v-for="item in carouselList" :key="item.id">
            <img :src="item.picUrl" alt="">
          </el-carousel-item>
        </el-carousel>
        <div class="home-search">
          <div class="home-center">
            <div class="home-input">
              <div class="home-search-input-bg">
                <img src="../../assets/images/search.png" alt="开心上班">
                <input type="text" placeholder="公司/ 投资方向/ 产品名称" id="home-query"

                /> <!-- @click="refreshSug()"
              @keyup="refreshSug()"
              @keypress.enter="search()"
              v-model="query"-->
                <button >搜索</button><!--@click="search()"-->
                <!--  <div class="select-group" v-show="showSearchSug()">
                    <div id="selectModel" class="selectModel">
                      <div class="item-hot" v-show="!hasQuery">热门推荐</div>
                      <router-link @hover="searchFocus()" class="item" value="1" v-for="el in engines" :to='"/detail/" + el.platform+"-"+el.productId' v-html="el.sug">
                      </router-link>
                    </div>
                  </div>-->
              </div>

              <div class="home-seatch-hot">
                <ul>
                  <!--  <li v-for="el in hotSearchList" v-text="el" @click="goSearch(el)"></li>-->
                </ul>
              </div>

            </div>
          </div>
         >
        </div>
      </div>

    </div>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
  import HeaderBox from '../../components/header/header.vue'
  import FooterBar from '../../components/footer/footer.vue'

  import Axios from 'axios'

  export default {
    data () {
      return {
        carouselList:[]
      }
    },
    components: {
      HeaderBox,
      FooterBar
    },
    computed: {

    },
    mounted () {
        this.getCarousel();
    },
    methods:{
      getCarousel(){
         Axios.get('/static/main-carousel.json').then(res => {
           this.carouselList=JSON.parse(res.request.response);
         })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./main.less";
</style>
