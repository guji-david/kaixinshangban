<template>
  <div  @click="selectHide()">
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
            <div class="home-input"  >

              <div class="home-search-bg">
                <div class="home-search-select-bg" @click.stop="selectShow()">
                  <input class="home-search-select"type="text" placeholder="请选择" readonly="readonly" v-model="activeCity">

                  <i class="el-input-icon el-icon-arrow-down"
                     :class="{'el-input-icon-animation':selectVisable}"></i>
                  <!--<i v-else="selectVisable"class="el-icon-arrow-up el-input-icon"></i>-->
                  <div class="select-group" v-show="selectVisable">
                    <div class="select-model">
                      <div @click="cityFocus(el)" class="item" v-for="el in cities"  v-text="el.label">
                      </div>
                    </div>
                  </div>
                </div>
                <img src="../../assets/images/search.png" alt="开心上班">
                <div @click.stop="inputShow()">
                  <input class="home-query-input"
                         type="text"
                         placeholder="公司/ 投资方向/ 产品名称"
                         id="home-query"
                         @click="refreshSug()"
                         @keyup="refreshSug()"
                         @keypress.enter="search()"
                         v-model="query"
                  />
                  <button @click="search()">搜索</button>
                </div>
                  <div class="input-group" v-show="showSearchSug()">
                    <div id="selectModel" class="selectModel">
                      <div class="item-hot" v-show="!hasQuery">热门推荐</div>
                      <div @hover="searchFocus()" class="item" value="1" v-for="el in engines"  v-html="el.sug">
                      </div>
                    </div>
                  </div>
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
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        activeCity: '广州',
        carouselList:[],
        hasQuery: false, // 是否存在搜索词
        query: "",
        engines:[],
        selectVisable:false,
        inputVisable:false,
        totalCount:0
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
      /**
       * 获取轮播图
       */
      getCarousel(){
         Axios.get('/static/json/main-carousel.json').then(res => {
           this.carouselList=JSON.parse(res.request.response);
         })
      },
      /**
       * 获取搜索词
       */
      getQuery() {
        return this.query.trim();
      },

      /**
       *  获取搜索建议词
       */
      refreshSug() {
        var query = this.getQuery();
        this.hasQuery = !!query;
        this.inputVisable = true;
        Axios.get('/static/json/main-search-input.json').then(res => {
          let obj=JSON.parse(res.request.response);
         let list=obj.list;
          if(this.hasQuery && !!list) {
            for(var i = 0,len=list.length; i < len; i++) {
              list[i].sug = res.body.list[i].sug.replace(query, '<b style="color:#333;font-size: 16px;">' + query + '</b>');
            }
          }
          this.engines =list;
          this.totalCount = obj.totalCount;
        })

      },
      /*
      *input下拉框点击
      */
      searchFocus: function () {
        this.inputVisable = true;
      },
      /*
      *隐蔽下拉框
      **/
      selectHide: function () {
        if (this.inputVisable) {
          this.inputVisable = false;
        }
        if (this.selectVisable) {
          this.selectVisable = false;
        }
      },
      inputShow: function () {
        this.inputVisable = true;
      },
      selectShow: function () {
        this.selectVisable =!this.selectVisable;
      },
      /**
       * 搜索
       */
      search: function () {
        var query = this.getQuery();
        if (!query) {
          return;
        }

      },
      goSearch: function (serach) {
        this.query = serach;
        this.search();
      },
      showSearchSug: function () {
        return (this.inputVisable && (this.engines.length > 0));
      },
      /*
      *城市点击
      */
      cityFocus: function (el) {
          this.activeCity=el.label;
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "./main.less";
</style>
