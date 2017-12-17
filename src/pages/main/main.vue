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
          <div class="item-getMore" @click="getMoreJob()">
            <span>更多职位</span>
            <i class="el-input-icon el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="job-list">
          <div class="job-list-item" v-for="item in jobList">
                <div class="list-item-main">
                    <div class="item-up">
                      <div class="up-first">
                        <div class="first-item"v-text="item.recruitCompany"></div>
                        <div class="first-item"> {{item.recruitIsNormal}}&nbsp;</div>
                        <div class="first-item item-salary"v-text="item.salary"></div>
                        <div style="clear: both"></div>



                      </div>
                      <div class="up-second" >
                       <span class="second-item" v-text="item.age"></span>
                        <span class="second-item"v-text="item.eduction"></span>
                        <span class="second-item">{{item.date}}发布</span>
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
                      <div >制造商/{{item.companyAdr}}</div>
                    </div>
                  </div>
              </div>
           </div>
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
                    {value: '20-25', label: '20--25岁'},
                    {value: '25-30', label: '25--30岁'},
                    {value: '30-35', label: '30--35岁'},
                    {value: '40-45', label: '40--45岁'},
                    {value: '45-50', label: '50--55岁'},
                    {value: '55-60', label: '55--60岁'},
                ],
                jobSelectSalaryVisable:false,
                salaryOptions:[
                    {value: '2000以下', label: '2k以下'},
                    {value: '2000-3000', label: '2k--3k'},
                    {value: '3000-4000', label: '3k--4k'},
                    {value: '4000-5000', label: '4k--5k'},
                    {value: '5000-6000', label: '5k--6k'},
                ],
                evaluatingNum:234324,//评测人数,
                jobList:[]
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
            this.getJobList();
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
                this.jobSelectAgeVisable=!this.jobSelectAgeVisable
            },
            /*
            *年龄区域点击
            */
            ageFocus: function (el) {
                this.jobSelectObj.ageSelect=el.label;
            },
            jobSelectSalaryShow(){
                this.jobSelectSalaryVisable=!this.jobSelectSalaryVisable
            },
            /**
            *薪资区域点击
            */
            salaryFocus: function (el) {
                this.jobSelectObj.salarySelect=el.label;
            },
            /**
             * 获取工作列表
             */
            getJobList(){
                Axios.get('/static/json/main-jobList.json').then(res => {
                    this.jobList=JSON.parse(res.request.response);
                })
            },
            /**
             *更多职位
             */
            getMoreJob(){

            }
        }
    }
</script>

<style lang="less" scoped>
  @import "./main.less";
</style>
