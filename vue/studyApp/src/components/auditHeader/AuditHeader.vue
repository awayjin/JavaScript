<template>
    <div>
        <div class="wrong-head">
            <mt-navbar v-model="selected" style="background-color:rgba(242,244,245,1);height:0.88rem;" class="wrong-head">
                <mt-tab-item id="1" class="n-verify inspection">待审核</mt-tab-item>
                <mt-tab-item id="2" class="verify inspection">已审核</mt-tab-item>
            </mt-navbar>
        </div>
        <div class="main-content">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1" class="q-items-wrap" ref="toAuditLM"
                        v-infinite-scroll="toAuditLoadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="10">
                    <div class="box-center" @click="WrongTitle(key)" v-for="(item,key) in toAuditList">
                        <div class="box-hader-one two-line">
                            <span class="box-hader-title">{{item.fieldName || ''}}</span><span class="box-qtitle">{{item.title}}</span>
                        </div>
                        <ul>
                            <li class="man-img"><img src="../../assets/images/icon-expert-errortitle.png" class="frist-imges"></img><span>{{errTypeMap[item.errType]}}</span></li>
                            <li class="man-img"><img src="../../assets/images/icon-expert-errorman.png" class="two-imges"><span>{{item.identityName || ''}}</span></li>
                            <li class="box-time man-img">{{item.createTime | formatTime}}</li>
                        </ul>
                    </div>
                    <!-- 暂无数据图标展示 -->
                    <div v-if="toAuditNoData">
                        <default-page :img="''"></default-page>
                    </div>
                    <p class="no-data-hint" v-if="toAuditNoMoreData">没有更多数据了</p>
                    <!-- <p class="no-data-hint" v-if="toAuditNoData">暂无数据</p> -->
                </mt-tab-container-item>
                <mt-tab-container-item id="2"  class="q-items-wrap" ref="auditedLM"
                        v-infinite-scroll="auditedLoadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="10">
                    <div class="q-items-wrap">
                        <div class="box-center" @click="toWrongTitledetails(key)" v-for="(item,key) in auditedList">
                            <div class="box-hader-one two-line">
                                <span class="box-hader-title">{{item.fieldName || ''}}</span>
                                <span class="box-qtitle">{{item.title}}</span>
                            </div>
                            <ul>
                                <li class="man-img"><img src="../../assets/images/icon-expert-errortitle.png" class="frist-imges"></img><span style="color:rgba(68,68,68,1);">{{errTypeMap[item.errType]}}</span></li>
                                <li class="man-img"><img src="../../assets/images/icon-expert-errorman.png" class="two-imges"><span>{{item.identityName || ''}}</span></li>
                                <li class="box-time man-img">{{item.createTime | formatTime}}</li>
                            </ul>
                        </div>
                    </div>
                    <!-- 暂无数据图标展示 -->
                    <div v-if="auditedNoData">
                        <default-page :img="''"></default-page>
                    </div>

                    <p class="no-data-hint" v-if="auditedNoMoreData">没有更多数据了</p>
                    <!-- <p class="no-data-hint" v-if="auditedNoData">暂无数据</p> -->
                </mt-tab-container-item>
            </mt-tab-container>
       </div>
    </div>
</template>
<script>
import { Tabbar, TabItem } from 'mint-ui';//mint-ui组件引入

import defaultPage from "@/components/defaultPage/DefaultPage";//错题审核里面的待审核和已审核里面暂无数据的图片添加。
export default {
    data(){
        return{
            selected:'1',//默认导航条id标签
            loading:false,

            errTypeMap: [
                '', '题干有误', '选项有误', '答案有误', '题目过时'
            ],
        }
    },
    components : {
      defaultPage
    },
    props: ['toAuditList', 'auditedList', 'toAuditNoData', 'auditedNoData', 'toAuditNoMoreData', 'auditedNoMoreData'],
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
    mounted() {
    },
    beforeDestroy() {
    },
    created () {
       this.init();
    },
    activated() {
        if (!this.$route.meta.isUseCache) {
            this.$route.meta.isUseCache = false;
        }
    },
    methods:{
        init() {
           let thisTitleSelected = sessionStorage.getItem("thisTitleSelected");
           if(thisTitleSelected) {
               this.selected = thisTitleSelected;
           }
        },
        toAuditLoadMore() {
            // console.log("toaudit more...");
            this.$emit('toaudit:more');
        },
        auditedLoadMore() {
            // console.log("audited more...");
            this.$emit('audited:more');
        },

       WrongTitle(index){
           let item = this.toAuditList[index];
           //item.nextFlag = 1; // for test
        //    debugger
           let query = {
                id: item.id,
                qid: item.questionId,
                qType: item.questionType,
                code: item.questionCode,
                nextFlag: item.nextFlag
            };
           sessionStorage.setItem("thisTitleSelected",this.selected);
           if (item.nextFlag != 2) { // 初审
                this.$router.push({
                    path: "/user/WrongTitle",
                    query: query
                });
           } else { // 复审
                this.$router.push({
                    path: "/user/ExpertRecheck",
                    query: query
                });
           }

       },

       toWrongTitledetails(index){
           let item = this.auditedList[index];
           sessionStorage.setItem("thisTitleSelected",this.selected);
           this.$router.push({
             path : "/user/WrongTitledetails",
             query : {
               id : item.id,
               qid: item.questionId,
               qType: item.questionType,
               code: item.questionCode,
               nextFlag: item.nextFlag
             }
          });
       }
    }
}
</script>
<style scoped>
    .q-items-wrap {
        /* padding-bottom: 0.5rem; */
    }
    .main-content{
        padding-top: .88rem;
    }
    /* .is-selected::before{
        content: '';
        font-size: 0.24rem; */
        /* text-align: center; */
        /* line-height: 42px; */
        /* color: red;
        background: red; */
        /* float: left; */
       /* width: 1rem;
       height: 1rem;
    } */
    .inspection{
        font-size:0.28rem !important;
        font-family:PingFangSC-Regular;
        font-weight:400;
        /* color:rgba(84,128,254,1); */
        line-height:0.2rem !important;
    }
    /* .mint-tab-item-label{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(84,128,254,1);
        line-height:0.28rem;
    } */

    verify{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        line-height:0.28rem;
    }
    .box-center{
        padding: 0.24rem 0.24rem 0rem 0.24rem;
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
    /* .box-time{
        position: relative;
        top: 0.08rem;
    } */
    /* .wrong-head{
        position: relative;
        top: 0.93rem;
    } */
    .wrong-head{
        position: fixed;
        width: 100%;
        top: .88rem;
        left: 0;
        z-index: 200;
    }
</style>
<style>
.wrong-head .mint-navbar .mint-tab-item-label{
    font-size: .28rem;
    color: #444444;
    font-weight:600;
}
.wrong-head .mint-navbar .mint-tab-item.is-selected.is-selected .mint-tab-item-label{
    font-size: .28rem;
    color: #26a2ff;
    font-weight:600;
}
.wrong-head .mint-navbar .mint-tab-item.is-selected {
   border-bottom: none;
   position: relative;
}
.wrong-head .mint-navbar .is-selected :after{
   content: '';
   display: block;
   height: .04rem;
   width: .72rem;
   background: #26a2ff;
   position: absolute;
   z-index: 300;
   margin: 0 auto;
   bottom: 0.09rem;
   left: 0;
   right: 0;
}
</style>

