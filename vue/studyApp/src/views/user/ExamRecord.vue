<template>
    <div style="">
        <app-header :title='title' :rightObj="rightObj" v-on:listFinish="finish"></app-header>
        <div class="main-content">
            <div class=" ub ub-ac content-list border-bottom" v-for="(item,index) in examList" :key="index"  @click="getTestScore(item)">
                <div style="display: inline-block;margin-right: 0.2rem;">
                    <p style="font-size:0.2rem;color:#3fbced;border: 1px solid #ccc;display:inline-block;vertical-align:text-top;">{{item.paperType}}</p>
                </div>
                <div class="ub-f1">
                    <p class="title-tx">{{item.newPaperName}}</p>
                    <p class="creat-time">{{item.endTime | formatTime}}</p>
                </div>
                <div class="wid-fixed" >
                    <span :class="'exam-' + item.examResult">{{item.examScore}}</span>
                    <span class="tx-unit">分</span>
                </div>
            </div>
            <div v-if="noData">
                <default-page :img="''"></default-page>
            </div>

        </div>

    </div>

</template>
<script>
//import {serverUrl} from "@/api/serverConfig";//搜索到serverUrl没有在本文件引用，后面需要引用的时候再使用
import request from "@/api/request";//请求链接封装引入
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引用
import defaultPage from "@/components/defaultPage/DefaultPage";//暂无数据图片组件引入
//import { Toast } from "mint-ui";//搜索到Toast提示弹窗没有在本文件引用，后面需要引用的时候再使用

export default {
    data(){
        return {
            title:'考试记录',
            examList: [],
            noData: false,
            rightObj: {
                isMore: true,
                icon: '&#xe64e;',
            }
        }
    },
    components : {
      AppHeader,defaultPage
    },
    filters: {
        formatTime(t) {
            let date = new Date(t);
            let year  = date.getFullYear();
            let month = date.getMonth() + 1;
            let day   = date.getDate();
            let hour  = date.getHours();
            let minute = date.getMinutes();
            return year + '-' + (month < 10 ? '0' + month : month)  + '-' +(day < 10 ? '0' + day : day)  + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
        }
    },
    beforeRouteLeave (to, from, next) {
      if (to.name == 'Home') {
        to.meta.isUseCache = true;
      }
      next();
    },
    methods:{
        getHistoryExamList() {
          request.getHistoryExamList({}).then((data) => {
            if (!data || data.length == 0) {
                this.noData = true;
                return;
            }
            // console.log('考试历史res',data)
            this.examList = data;
            this.examList.forEach((item,index) => {
                
               let thisPaperName = item.paperName;
               let thisIndex = thisPaperName.indexOf("考试");
               let newPaperName;
               //认证考试
               if(item.paperType <2) {
                   if(item.examType == 1) {
                        // newPaperName = (thisPaperName.indexOf("考试") > -1 ? thisPaperName.substr(0,thisIndex) : thisPaperName) + "认证考试";
                        newPaperName = (thisPaperName.indexOf("考试") > -1 ? thisPaperName.substr(0,thisIndex) : thisPaperName) + "考试";
                    } else {
                        // newPaperName = (thisPaperName.indexOf("考试") > -1 ? thisPaperName.substr(0,thisIndex) : thisPaperName) + "保级考试";
                        newPaperName = (thisPaperName.indexOf("考试") > -1 ? thisPaperName.substr(0,thisIndex) : thisPaperName) + "考试";
                    }
               }else {
                   let thatIndex = thisPaperName.indexOf('培训')
                    newPaperName = (thisPaperName.indexOf("培训") > -1 ? thisPaperName.substr(0,thatIndex) : thisPaperName) + "培训考试";
               }
               if(item.paperType == 0){
                    item.paperType = '资格赛'
                }else if(item.paperType == 1){
                    item.paperType = '专家赛'
                }else {
                    item.paperType = '培训赛'
                }
               this.$set(item,"newPaperName",newPaperName);
            });
          });
        },
        getTestScore (item) {
            let params = item.id; //考试记录ID
            if(item.repeatFlag == 1){
                return
            }
            let repeatFlag = Number(item.repeatFlag) + 1;//1是 2否   是否第一次考试
            request.getExamHistoryDetails(params).then((res) => {
                    let resData = res;
                    // console.log('试卷错题res',res)
                    // 认证考试: 12周 补考 失败  => 认证失败
                    // 保级考试：后面没有保级考试记录，补考，最新状态为4，考试结果为失败0 => 认证失败
                    //console.log("exam:", resData);
                    if (res.examType == 1) { // 认证考试
                        if (res.examResult == 0 &&
                            res.repeatFlag == 1 &&
                            res.examWeek == 12) {
                            resData.showRzNextTime = false;
                        } else {
                            resData.showRzNextTime = true;
                        }
                    } else {
                        if (res.examResult == 0 &&
                            res.repeatFlag == 1 &&
                            res.nextRelegationCount == 0) {
                            resData.showBjNextTime = false;
                        } else {
                            resData.showBjNextTime = true;
                        }
                    }
                    resData.examStatus = res.newestStatus;
                    localStorage.setItem("submitSuccessfulInformation",JSON.stringify(resData));

                    this.$router.push({
                        path: "/testScore",
                        query : {
                            userPaperId : item.paperId,//用户试卷ID
                            examType : item.examType,//考试类型
                            // examCount : repeatFlag,//是否第一次考试
                            recordPage : 1
                        }
                    })

            });
        },
        finish(){
          this.$router.push('/user/ExaminationRules')
        },
    },
    created() {
        this.getHistoryExamList();
    },
    mounted() {

    }
}
</script>
<style lang='less'  scoped>

    .main-content{
        padding: 0 .32rem;
        padding-top: .88rem;
        .content-list{
           padding: .28rem 0 .2rem 0;
           .title-tx{
               font-size:0.32rem;
               font-family:PingFangSC-Regular;
               font-weight:400;
               color:#444444;
           }
           .creat-time{
               font-size:0.28rem;
               font-family:PingFangSC-Regular;
               font-weight:400;
               color:#979797;
               margin-top: 0.05rem;
           }
           .exam-1 {
              font-weight:550;
              font-family: "黑体";
              font-size:0.32rem;
              color:#4FBF6B;
              margin-right: .1rem;
           }
          .exam-0 {
             font-family: "黑体";
             font-weight:550;
             font-size:0.32rem;
             color:#EBAE41;
             margin-right: .1rem;
          }
          .tx-unit{
              font-size:0.32rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:#444444;
          }
        }
        .border-bottom::before{
            border-bottom-color: #E8E8E8;
        }

    }
   .ub{
       display: flex;
       display: -webkit-flex;
    }
    .ub-ac{
      align-items:center;
    }
    .ub-pc{
      justify-content:center;
    }
    .ub-f1{
       flex-grow:1;
       flex-basis:0;
    }
    .wid-fixed{
        flex-shrink:0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
