<template>
    <div>
        <app-header :title='title' :rightObj="rightObj" v-on:listFinish="finish"></app-header>
        <div class="audit-hader" :style="'position:' + (maskIsShow ? 'fixed' : '')">
            <audit-header ref="auditHeader"
                :toAuditList="toAuditList"
                :auditedList="auditedList"
                :toAuditNoData="toAuditNoData"
                :auditedNoData="auditedNoData"
                :toAuditNoMoreData="toAuditNoMoreData"
                :auditedNoMoreData="auditedNoMoreData"
                :toAuditLoading="toAuditLoading"
                @toaudit:more="getToAuditList"
                @audited:more="getAuditedList"
                :isDaiShow="isDaiShow">
            </audit-header>
        </div>
        <!--显示加载中-->
        <div class="loading-box tc" v-if="showLoading">
          <span class="loading-more-txt">加载中...</span>
        </div>

        <!-- 遮罩层 -->
        <div class="maskIsShow" v-if="maskIsShow">
            <div class="mask" @click="maskIsShow = false"></div>
            <div class="ub mask-content">
                <!-- <mt-search v-model="value" placeholder="请输入你想搜索的内容"></mt-search> -->
                <div class="searchHeader">
                    <div class="line">
                        <input class="iptField" type="text" placeholder="请输入你想要搜索的内容" v-model="iptKeyWords">
                        <mt-button :style="'background:' + (iptKeyWords ? '#26a2ff' : '')" class="btnClick" size="small" @click="searchResult">搜索</mt-button>
                    </div>
                </div>
                <mt-tab-container class="containerFields">
                    <mt-tab-container-item class="q-items-wrap"
                        infinite-scroll-disabled="ZZLoading"
                        infinite-scroll-distance="10">
                        <div class="box-center" @click="WrongTitle(item,key)" v-for="(item,key) in requestList">
                            <div class="box-hader-one two-line">
                                <span class="box-hader-title">{{item.fieldName || ''}}</span><span class="box-qtitle">{{item.title}}</span>
                            </div>
                            <ul>
                                <li class="man-img"><img src="../../assets/images/icon-expert-errortitle.png" class="frist-imges"></img><span>{{errTypeMap[item.errType]}}</span></li>
                                <li class="man-img"><img src="../../assets/images/icon-expert-errorman.png" class="two-imges"><span>{{item.identityName || ''}}</span></li>
                                <li class="box-time man-img">{{item.createTime | formatTime}}</li>
                            </ul>
                        </div>
                        <!--显示加载中-->
                        <div class="loading-box tc" v-if="isShowLoading">
                          <span class="loading-more-txt">加载中...</span>
                        </div>
                        <!-- 暂无数据图标展示 -->
                        <div v-if="toAuditNoData">
                            <default-page :img="''"></default-page>
                        </div>
                        <p class="no-data-hint" v-if="toAuditNoMoreData">没有更多数据了</p>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <!--<p class="no-data-hint" style="font-size:0.26rem;" v-if="noThings">数据加载完毕</p>-->
        <!--显示加载中-->
        <div class="loading-box tc" v-if="isShowLoad">
          <span class="loading-more-txt">加载中...</span>
        </div>
    </div>

</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引用
import AuditHeader from "@/components/auditHeader/AuditHeader";//2级头部组件引用
import request from "@/api/request";//请求链接
import {Toast} from 'mint-ui';//Toast弹窗引用

export default {
    data(){
        return{
            // noThings:false,//数据加载完提示
            isShowLoad:false,//加载中
            oneTime:true,
            title:'错题审核',

            toAuditList: [],
            toAuditPage: 1,
            toAuditLimit: 10,
            toAuditTotal: 0,
            toAuditPages: 1,
            toAuditLoading: false,
            toAuditNoData: false,
            toAuditNoMoreData: false,

            auditedList: [],
            auditedPage: 1,
            auditedLimit: 10,
            auditedTotal: 0,
            auditedPages: 1,
            auditedLoading: false,
            auditedNoData: false,
            auditedNoMoreData: false,
            rightObj: {
            	isMore: true,//右上角结构是否显示
                // title: "",
                icon: "&#xe64d;"
            },
            maskIsShow:false,
            value:'',
            requestList:[],//获取总数据
            iptKeyWords:'',//输入框搜索值
            params: {
                page: 1,
                limit: 10,
                keyword:''
            },
            errTypeMap: [
                '', '题干有误', '选项有误', '答案有误', '题目过时'
            ],
            ZZLoading:false,
            showLoading: false,//加载中
            isShowLoading:false,
            isDaiShow: false
        }
    },
     components : {
      AppHeader,
      AuditHeader
    },
    filters: {
        formatTime(t) {
            let date = new Date(t);
            let year  = date.getFullYear();
            let month = date.getMonth() + 1;
            let day   = date.getDate();
            let hour  = date.getHours();
            let minute = date.getMinutes();
            return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
        }
    },
    created() {
        // console.log('go created methods')
        this.getToAuditList();
        this.getAuditedList();
        this.params.keyword = '';
        this.toAuditNoMoreData = false;
        this.maskIsShow = false;
        this.toAuditPage = 1;
        this.auditedPage = 1;
        // if (sessionStorage.getItem('expert-review-enter')) {
        //     this.resetStatus();
        // }
      // this.showLoading = true;
    },
    mounted() {
        //window.addEventListener('pageshow', this.resetStatus)
    },
    beforeDestroy() {
        //window.removeEventListener('pageshow', this.resetStatus);
    },
    activated(){
      console.log('go activated methods')
      if(!this.oneTime){//为true重新刷新获取数据
        console.log('clear',this.oneTime)
        this.toAuditPage = 1;
        this.getToAuditList();
        this.toAuditList = [];
        this.auditedPage = 1;
        this.getAuditedList(); // 获取数据的函数
        this.auditedList = [];
        this.maskIsShow = false;
        this.rightObj.icon = '&#xe64d;';
        document.body.scrollTop = 0;
      }
      this.oneTime = false;
    },
    // beforeRouteLeave(to, from, next){
    //     if(to.path.indexOf('WrongTitledetails') >= 0 || to.path.indexOf('ExpertRecheck') >= 0 || to.path.indexOf('WrongTitle') >= 0){
    //         console.log('go details')
    //         this.oneTime = true;
    //     }
    //     if (to.name.indexOf('WrongTitle') >= 0){
    //         this.oneTime = true
    //     }else if (to.name.indexOf('ExpertRecheck') >= 0){
    //         this.oneTime = true;
    //     }
    //     next();
    // },
    methods: {
        finish(data){
            let self = this;
            self.$route.meta.keepAlive = true;//切换题库时保存位置
            self.toAuditNoMoreData = false;
            let isFixed;
            self.maskIsShow = !self.maskIsShow;
            if(self.maskIsShow == true){
                self.requestList = [];
                self.iptKeyWords = '';
                self.rightObj.icon = '&#xe664;'
                // self.stopBodyScroll();
            }else {
                self.rightObj.icon = '&#xe64d;';
                self.rightObj.title = '';
            }
            // console.log('go finish methods',data)
        },
        // stopBodyScroll(){//禁止页面滚动
        //     let bodyEl = document.body;
        //     let top1 = 0;
        //     if(this.maskIsShow == true){
        //         top1 = window.scrollY;
        //         bodyEl.style.position = 'fixed';
        //         bodyEl.style.top = -top1 + 'px';
        //     }else {
        //         bodyEl.style.position = '';
        //         bodyEl.style.top = '';
        //         window.scroll(0,top1);
        //     }
        // },
        searchResult(){
            this.params.keyword = this.iptKeyWords;
            this.isShowLoading = true;
            setTimeout(()=>{
                this.getSearchResult();
            },300)
        },
        getSearchResult(){
            let self = this;
            self.isShowLoading = false;
            let getParams = this.params;
            self.requestList = [];
            request.queryReportAllPage(getParams).then((res)=>{
                // console.log(res)
                if(!res) return;
                if (res.pages == 0) {
                  self.toAuditNoMoreData = false;
                  self.toAuditNoData = true;
                }
                let resData = res.records;
                self.requestList = resData;
                if(self.params.page >= res.pages){
                    self.toAuditNoMoreData = true;
                    self.toAuditNoData = false;
                }
                // console.log(self.requestList)
            })
        },
        WrongTitle(item,index){
            // console.log(item,index)
            let query = {
                id: item.id,
                qid: item.questionId,
                qType: item.questionType,
                code: item.questionCode,
                nextFlag: item.nextFlag
            }
            // console.log('query=',query)
            if (item.nextFlag == 1) { // 初审
                this.$router.push({
                    path: "/user/WrongTitle",
                    query: query
                });
           } else if(item.nextFlag == 2){ // 复审
                this.$router.push({
                    path: "/user/ExpertRecheck",
                    query: query
                });
           } else {
               this.$router.push({//已审核
                    path : "/user/WrongTitledetails",
                    query : query
                });
           }
        },
        beforeRouteUpdate (to, from, next) { // 恢复状态
            // console.log("router enter");
            // console.log("resetStatus:", e);
            // if (!e.persisted) {
            //     console.log("rerender");
            //     return;
            // } else if(location.href.indexOf('/user/ExpertReview') > 0){
            //     console.log("reset");
            // }
            sessionStorage.setItem('expert-review-enter', 1);
        },
        resetStatus() {
            this.toAuditList = [];
            this.toAuditPage = 1;
            this.auditedList = [];
            this.auditedPage = 1;

            this.getToAuditList();
            this.getAuditedList();
        },
        showNomoreMsg() {
            // console.log({
            //     message: "没有更多了",
            //     duration: 1500
            // });
        },
        getToAuditList() { //待审核列表获取数据
            // let timer = setTimeout(()=>{
            //   this.loading = false;
            //   this.showLoading = false;//加载中
            // },1000);
            // this.showLoading = true;
            if (this.toAuditLoading) {
                return;
            }
            let self = this;
            let page = this.toAuditPage;
            let limit = this.toAuditLimit;
            if (page > this.toAuditPages) {
                // this.showLoading = false;
                this.showNomoreMsg();
                return;
            }
            this.toAuditLoading = true;
            request.getToAuditList(page, limit).then((data) => {
              // console.log('----',data,page)
                this.toAuditLoading = false;
                if (!data.records || data.records.length == 0 ) {
                    // this.noThings = false;//数据加载完毕
                    // this.showNomoreMsg();
                    if (page == 1) {
                        self.toAuditNoData = true;//无数据图片展示
                        // self.toAuditNoMoreData = true;
                    }
                    return;
                }

                if (page >= data.pages) {
                  // console.log(page,data.pages)
                  // this.noThings = true;//数据加载完毕

                    // this.showLoading = false;
                    // this.toAuditNoMoreData = true;
                    //console.log("no more data");
                }
                if(page == 0 && data.records.length == 0){
                  // this.showLoading = false;
                  // this.toAuditNoMoreData = false;
                }

                self.toAuditList = self.toAuditList.concat(data.records);
                self.toAuditTotal = data.total;
                self.toAuditPages = data.pages;

                self.toAuditPage += 1;
                // self.isShowLoad = true;
                self.$nextTick(()=>{
                  if (data.records.length == 0) {
                    // self.showLoading = false;
                    // self.isDaiShow = false
                    // self.isShowLoad = false;
                    if(page >= data.pages){
                      self.isDaiShow = true
                    }
                  }
                })
            });
        },
        getAuditedList() {//获取已审核数据
            // setTimeout(()=>{
            //   // this.showLoading = true;//加载中
            // },1000);
            if (this.auditedLoading) {
                return;
            }
            let self = this;
            let page = this.auditedPage;
            let limit = this.auditedLimit;
            if (page > this.auditedPages) {
                // this.showLoading = false;
                // this.showNomoreMsg();
                return;
            }
            this.auditedLoading = true;
            request.getAuditedList(page, limit).then((data) => {
                this.auditedLoading = false;

                if (!data.records || data.records.length == 0) {
                    // this.showNomoreMsg();
                    // this.noThings = false;
                    if (page == 1) {
                        self.auditedNoData = true;
                    }
                    return;
                }

                if (page >= data.pages) {
                    // this.showLoading = false;
                    // this.noThings = true;//暂无数据
                    // this.auditedNoMoreData = true;
                }

                self.auditedList = self.auditedList.concat(data.records);
                self.autitedTotal = data.total;
                self.auditedPages = data.pages;

                self.auditedPage += 1;
            });
        }
    },
    beforeRouteLeave (to, from, next) {
         if(to.name == "Home") {
            sessionStorage.removeItem("thisTitleSelected");
         }
        next();
    }
}
</script>
<style scoped>
    .audit-hader{
        /* position:fixed; */
        padding-top: 1rem;
        /* overflow-y: scroll; */
    }
    .searchHeader {
        height: 1.1rem;
        line-height: 0.6rem;
        position: fixed;
        background: #fff;
        z-index: 100;
        width: 100%;
        top: 0.6rem;
        border-bottom: 1px solid #f0f0f0;
    }
    .containerFields {
        margin-top: 1.1rem;
        /* overflow-y: scroll;
        overflow: auto;
        -webkit-overflow-scrolling : touch;
        min-height: 101%; */
        -webkit-overflow-scrolling: unset !important;
        -webkit-overflow-scrolling : touch;
    }
    .line {
        margin-top: 0.2rem;
        border-top: 1px solid #f0f0f0;
    }
    #app-header-content{
        border-bottom: none !important;
    }
    .q-items-wrap {
        -webkit-overflow-scrolling: unset !important;
        margin-bottom: 2rem;
        /* overflow-y: scroll; */
        /* -webkit-overflow-scrolling: touch; */
        overflow-x: hidden;
        -webkit-overflow-scrolling : touch;
        min-height: 101%;
    }
    .uhide{
        position: relative;
        top: -0.06rem;
        padding: 0.1rem 0.1rem;
        line-height: 0.2rem;
        margin-top:0.1rem
    }
    .loading-box{
         padding:.1rem 0;
         height: 0.6rem;
    }
    .loading-more{
      display:inline-block;
      vertical-align: middle;
      margin-right:.2rem;
    }
    .loading-more-txt{
      vertical-align: middle;
      font-size:.22rem;
      text-align: center;
      display: inherit;
    }
    /* 遮罩层样式 */
    .mask{
        -webkit-overflow-scrolling: unset !important;
        -webkit-overflow-scrolling: touch;

        height: 100%;
        width: 100%;
        /* background: #000000; */
        opacity: 0.3;
        position: fixed;
        top: .88rem;
        left: 0;
        z-index: 100;
        overflow-y: auto;
    }
    .mask-content{
        height: 100%;
        width: 100%;
        position: fixed;
        top: .6rem;
        left: 0;
        z-index: 10000;
        background: #fff;
        /* padding: .1rem 0 .2rem 0; */
        flex-flow: wrap;
        overflow-y: scroll;
        -webkit-overflow-scrolling: unset !important;
    }
    .mask-content .iptField {
        padding: 0.1rem 0.2rem;
        outline: none;
        border-radius: 0.1rem;
        border: 1px solid #ccc;
        display: inline-block;
        margin-left: 0.52rem;
        height: 0.34rem;
        line-height: 0.34rem;
        width: 70%;
        font-size: 0.26rem;
        -webkit-appearance: none;
    }
    .btnClick {
        display: inline-block;
        float: right;
        font-size: 0.26rem;
        padding: 0 0.2rem;
        height: 0.54rem;
        line-height: 0.54rem;
        margin: 0.145rem 0.14rem;
        /* position: fixed; */
        /* top: 0.95rem; */
        vertical-align: middle;
        /* right: 0.2rem; */
    }
    .box-center{
        padding: 0.24rem 0.24rem 0rem 0.24rem;
        -webkit-overflow-scrolling: touch;
    }
    .box-center::after {
        min-height: calc(100% + 1px);
    }
    .box-center div{
        /* line-height:0.35rem; */
    }
    .box-center ul {
        line-height: 0.2rem;
        display: flex;
        align-items:center;
        justify-content:space-between;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid #f2f2f2;
        margin-top: 0.16rem;
    }
    .box-center .box-hader-title{
        border-radius: 1rem;
        border: 1px solid rgba(232,232,232,1);
        font-size: 0.2rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(151,151,151,1);
        line-height: 0.3rem;
        padding: 0.03rem 0.14rem;
        text-align: center;
        /* position: absolute; */
    }
    .box-center .two-line {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        /*! autoprefixer: off */
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        overflow: hidden;
        font-family: PingFangSC-Regular;
        font-size: 0.32rem;
        color: #000;
        text-overflow: ellipsis;
    }
    .box-center .box-qtitle{
        font-size: 0.32rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(68,68,68,1);
        /* line-height: 0.3rem; */
        margin-left: .2rem;
        /* text-indent: 2.0rem; */
    }
    .box-center ul li:nth-child(1) span{
        /* width:0.96rem;
        height:0.24rem; */
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(252,67,67,1);
        line-height:0.24rem;
        margin-left: .08rem;
    }
    .box-center ul li:nth-child(2) {
         margin-left: -2.5rem;
    }
    /* .box-center ul li:nth-child(2) img{
        width: 0.24rem;
        height: 0.24rem;
    } */

    .box-center ul li:nth-child(2) span{
        /* width:0.48rem;
        height:0.24rem; */
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.24rem;
        margin-left: .08rem;
    }
    .box-center ul li:nth-child(3){
        height:0.24rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.24rem;
        margin-left: -0.5rem;
    }
    .box-hader-one{
        position: relative;
    }
    .box-hader-title{
        position: relative;
        top: -0.06rem;
        line-height: 0.3rem;
    }
    .man-img{
        display: flex;
        align-items: center;
    }
    .frist-imges{
        display: flex;
        /* background: url(./imges/errortitle.png) no-repeat center; */
        width: 12px;
        height: auto;
        background-size:100% 100%;
        -webkit-background-size: 100% 100%;
        -moz-background-size:100% 100%;
        -o-background-size: 100% 100%;
        flex-shrink: 0;
        /* background-size: 100% 100%; */
    }
    .two-imges{
        display: flex;
        /* background: url(./imges/errorman.png) no-repeat center; */
        width: 12px;
        height: auto;
        background-size:100% 100%;
        -webkit-background-size: 100% 100%;
        -moz-background-size:100% 100%;
        -o-background-size: 100% 100%;
        flex-shrink: 0;

        /* height: 0.24rem; */
        /* position: relative;
        top: 0.03rem;
        background-size: 100% 100%; */
    }
</style>
