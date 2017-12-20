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
                <div class="home-search-select-bg" @click.stop="carouselSelectShow()">
                  <input class="home-search-select"type="text" placeholder="请选择" readonly="readonly" v-model="activeCity">

                  <i class="el-input-icon el-icon-arrow-down"
                     :class="{'el-input-icon-animation':selectVisable}"></i>
                  <div class="select-group" v-show="selectVisable">
                    <div class="select-model">
                      <div @click="cityFocus(el)" class="item" v-for="el in cityOptions"  v-text="el.label">
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
      <div class="container main-item main-job">
        <div class="job-select">
          <div class="select-item select-item-age" @click="jobSelectAgeShow()">
            <input class="select-item-input"type="text" placeholder="年龄" readonly="readonly"v-model="jobSelectObj.ageSelect">

            <i class="el-input-icon el-icon-arrow-down"
               :class="{'el-input-icon-animation':jobSelectAgeVisable}"></i>
            <div class="select-group" v-show="jobSelectAgeVisable">
              <div class="select-model">
                <div @click="ageFocus(el)" class="item" v-for="el in ageOptions"  v-text="el.label">
                </div>
              </div>
            </div>
          </div>
          <div class="select-item select-item-salary" @click="jobSelectSalaryShow()">
            <input class="select-item-input"type="text" placeholder="薪资范围" readonly="readonly"v-model="jobSelectObj.salarySelect">

            <i class="el-input-icon el-icon-arrow-down"
               :class="{'el-input-icon-animation':jobSelectSalaryVisable}"></i>
            <div class="select-group" v-show="jobSelectSalaryVisable">
              <div class="select-model">
                <div @click="salaryFocus(el)" class="item" v-for="el in salaryOptions"  v-text="el.label">
                </div>
              </div>
            </div>
          </div>
          <div class="select-item select-item-evaluating">
            <div class="item-evaluating-title">免费评测</div>
            <div class="item-evaluating-num">已有{{evaluatingNum}}人评测</div>
          </div>
        </div>
        <div class="item-head">
          <span class="item-title">最新职位</span>
          <span class="item-subTitle">为你而选</span>
          <div class="item-getMore" v-if="jobList.length>6">
            <div v-if="jobListMaxLength==6" @click="getMoreJob(0)">
              <span>更多职位</span>
              <i class="el-input-icon el-icon-arrow-right"></i>
            </div>
            <div v-else @click="getMoreJob(1)">
              <span>收起</span>
              <i class="el-input-icon el-icon-arrow-left"></i>
              <i class="el-input-icon el-icon-arrow-left"></i>
            </div>

          </div>
        </div>
        <div class="job-list">
          <div class="job-list-item" v-for="(item,index) in jobList" v-if="index<jobListMaxLength">
                <div class="list-item-main">
                    <div class="item-up">
                      <div class="up-first">
                        <div class="first-item">
                          <span v-text="item.recruitCompany"></span>
                          <span > {{item.recruitIsNormal}}&nbsp;</span>
                       </div>
                        <div class="item-salary"v-text="item.salary"></div>
                        <div style="clear: both"></div>



                      </div>
                      <div class="up-second" >
                       <span class="second-item" v-text="item.age"></span>
                        <span class="second-item"v-text="item.eduction"></span>
                        <span class="second-item">{{item.date}} 发布</span>
                      </div>
                      <div class="up-third">
                        <span class="third-item"  v-for="el in item.list"v-text="el"></span>

                      </div>
                    </div>
                  <div class="item-down">
                    <div class="item-down-img">
                      <img :src="item.companyLogo" width="50" height="50"alt="开心上班"/>
                    </div>

                    <div class="item-down-dec">
                      <div v-text="item.companyName"></div>
                      <div class="down-dec-com">制造商 / {{item.companyAdr}}</div>
                    </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
      <div class="container main-item main-company">
        <div class="item-head">
          <span class="item-title">知名企业</span>
          <span class="item-subTitle">为你推荐</span>
          <div class="item-getMore"  v-if="companyList.length>4">
            <div v-if="companyListMaxLength==4" @click="getMoreCompany(0)">
              <span>更多名企</span>
              <i class="el-input-icon el-icon-arrow-right"></i>
            </div>
            <div v-else @click="getMoreCompany(1)">
              <span>收起</span>
              <i class="el-input-icon el-icon-arrow-left"></i>
              <i class="el-input-icon el-icon-arrow-left"></i>
            </div>

          </div>
        </div>
        <div class="company-list">
          <div class="company-list-item" v-for="(item,index) in companyList" v-if="index<companyListMaxLength">
            <div class="list-item-main">
              <img :src="item.companyLogo" alt="">
              <div class="item-companyDec" v-text="item.companyDec"></div>
              <div class="item-comment">
                <span class="item-comment-fiveStar" v-text=" '★★★★★☆☆☆☆☆'.slice(5-item.commentFiveStarNum,10-item.commentFiveStarNum)">

                </span>
                <span >&nbsp;来自{{item.commentNum}}条评论</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container main-item main-successDemo">
        <div class="item-head">
          <span class="item-title">成功就业</span>
          <span class="item-subTitle">新起点</span>
          <div class="item-getMore" >
            <div >
              <span>更多老乡就业</span>
              <i class="el-input-icon el-icon-arrow-right"></i>
            </div>
         <!--   <div>
              <span>收起</span>
              <i class="el-input-icon el-icon-arrow-left"></i>
              <i class="el-input-icon el-icon-arrow-left"></i>
            </div>-->

          </div>
        </div>
        <div class="successDemo-list">
         <!-- <el-carousel indicator-position="none" height=200px :interval="2000" type="card">
            <el-carousel-item v-for="item in successDemoList" :key="item.id">
              <img :src="item.picUrl" alt="">
            </el-carousel-item>
          </el-carousel>-->
          <carousel-3d :display="7":controlsVisible="true">
            <slide :index="index" v-for="(item,index) in successDemoList">
              <img :src="item.picUrl" alt="">
            </slide>

          </carousel-3d>
        </div>
      </div>
    </div>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
    import HeaderBox from '../../components/header/header.vue'
    import FooterBar from '../../components/footer/footer.vue'

    import { Carousel3d, Slide } from 'vue-carousel-3d';

    import Axios from 'axios'

    export default {
        data () {
            return {
                cityOptions: [
                    {value: 'Beijing', label: '北京'},
                    {value: 'Shanghai', label: '上海'},
                    {value: 'Nanjing', label: '南京'},
                    {value: 'Chengdu', label: '成都'},
                    {value: 'Shenzhen', label: '深圳'},
                    {value: 'Guangzhou', label: '广州'}
                    ],
                activeCity: '广州',
                carouselList:[],
                hasQuery: false, // 是否存在搜索词
                query: "",
                engines:[],
                selectVisable:false,
                inputVisable:false,
                totalCount:0,
                jobSelectObj:{
                    ageSelect:"",
                    salarySelect:""

                },
                jobSelectAgeVisable:false,
                ageOptions:[
                    {value: '', label: '全选'},
                    {value: '20-25', label: '20--25岁'},
                    {value: '25-30', label: '25--30岁'},
                    {value: '30-35', label: '30--35岁'},
                    {value: '40-45', label: '40--45岁'},
                    {value: '45-50', label: '50--55岁'},
                    {value: '55-60', label: '55--60岁'},
                ],
                jobSelectSalaryVisable:false,
                salaryOptions:[
                    {value: '', label: '全选'},
                    {value: '2k以下', label: '2k以下'},
                    {value: '2k-3k', label: '2k--3k'},
                    {value: '3k-4k', label: '3k--4k'},
                    {value: '4k-5k', label: '4k--5k'},
                    {value: '5k-6k', label: '5k--6k'},
                ],
              evaluatingNum:234324,//评测人数,
              jobList:[],//职位列表
              jobListMaxLength:6,
              companyList:[],//名企列表
              companyListMaxLength:4,
              successDemoList:[
                {id:1,picUrl:"http://odqn23waz.bkt.clouddn.com/%E6%A4%8D%E7%91%9E%E6%8A%95%E8%B5%84.jpg"},
                {id:2,picUrl:"http://odqn23waz.bkt.clouddn.com/%E5%92%8C%E5%90%88%E8%B5%84%E7%AE%A1.jpg"},
                {id:3,picUrl:"http://odqn23waz.bkt.clouddn.com/%E8%B4%A2%E9%80%9A.jpg"},
                {id:4,picUrl:"http://odqn23waz.bkt.clouddn.com/%E4%B8%AD%E7%94%B5%E6%8A%95%E5%85%88%E8%9E%8D.jpg"},
                {id:5,picUrl:"http://odqn23waz.bkt.clouddn.com/%E5%9B%BD%E6%B3%B0%E5%85%83%E9%91%AB"},
                {id:6,picUrl:"http://odqn23waz.bkt.clouddn.com/%E5%92%8C%E5%90%88%E8%B5%84%E7%AE%A1.jpg"},
              ]
            }
        },
        components: {
          HeaderBox,
          FooterBar,
          Carousel3d,
          Slide
        },
        computed: {

        },
        mounted () {
            this.getCarousel();
            this.getJobList();
            this.getCompanyList();
        },
        methods:{
            /*-------------------------1.轮播图所在区域调用方法begin--------------------------------------------------*/
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

            /**
            *input下拉框点击
            */
            searchFocus: function () {
                this.inputVisable = true;
            },

            /**
            *隐蔽下拉框
            **/
            selectHide: function () {
                if (this.inputVisable) {
                    this.inputVisable = false;
                }
                /*if (this.selectVisable) {
                    this.selectVisable = false;
                }*/
            },
            inputShow: function () {
                this.inputVisable = true;
            },
            carouselSelectShow: function () {
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
            /*-------------------------1.轮播图所在区域调用方法--end------------------------------------------------*/
            jobSelectAgeShow(){
                this.jobSelectAgeVisable=!this.jobSelectAgeVisable;
            },
            /*
            *年龄区域点击
            */
            ageFocus: function (el) {
                this.jobSelectObj.ageSelect=el.label;
                this.getJobList(el.value,'');
            },
            jobSelectSalaryShow(){
                this.jobSelectSalaryVisable=!this.jobSelectSalaryVisable;

            },
            /**
            *薪资区域点击
            */
            salaryFocus: function (el) {
                this.jobSelectObj.salarySelect=el.label;
              this.getJobList('',el.value);
            },
            /**
             * 获取工作列表
             */
            getJobList(ageSelect,salarySelect){
              this.jobList=[];
                Axios.get('/static/json/main-jobList.json').then(res => {
                    let list=JSON.parse(res.request.response);
                    if(ageSelect||salarySelect){
                        console.log(this.jobSelectObj.salarySelect);
                        console.log(salarySelect);
                      for(let i=0,len=list.length;i<len;i++){
                        if((list[i].age==ageSelect)||(list[i].salary==salarySelect)){
                          this.jobList.push(list[i]);
                        }
                      }
                    }else{
                      this.jobList=list;
                    }


                })
            },
            /**
             *更多职位
             */
            getMoreJob(type){
              this.jobListMaxLength=type?6:this.jobList.length;
            },
            /**
             *更多名企
             */
            getMoreCompany(type){
              this.companyListMaxLength=type?4:this.companyList.length;
            },
          /**
           * 获取企业列表
           */
          getCompanyList(){
            Axios.get('/static/json/main-companyList.json').then(res => {
              this.companyList=JSON.parse(res.request.response);
            })
          },
        }
    }
</script>

<style lang="less" scoped>
  @import "./main.less";
</style>
