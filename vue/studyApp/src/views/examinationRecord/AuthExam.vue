<template>
    <div class="bigBox"> <!--  认证考试 -->
        <div id="app-header-content" class="title-content ub ub-ac">
            <div id="go-back" @click="goBack">
                <div class="back-btn"></div>
            </div>
            <div class="header-title">考试成绩</div>
            <div class="head-right"></div>
        </div>
        <div class="box">
            <div class="boxHeader ub ub-ac ub-ver">
                <div class="num-content">
                    <div class="Grade-box ub">
                        <div class="fraction"  v-for="(item,index) in numArr" :key="index">{{item}}</div>
                        <!-- <div><span>{{obj.examScore}}</span></div> -->
                    </div>
                    <div class="fraction-num">分</div>
               </div>
                <div>
                     <!-- 专业认证考试 -->
                     <div v-if="examType == 1">
                        <div v-if="obj.examResult == 0" class="notice">
                            <span v-show="examCount == 1">您本次考试未通过，还有一次补考机会哟...</span>
                            <span v-show="examCount == 2">很遗憾，您本次考试未通过...</span>
                        </div>
                        <div v-else class="notice"><span>{{obj.authSuccessCount != 6?"恭喜您，本次考试合格！":"恭喜您，本次考试成绩合格"}}</span></div>
                        <div v-show="obj.authSuccessCount == 6" class="notice-text-content"><span>{{"获得《初级"+obj.paperName +"经理证书》"}}</span></div>
                    </div>
                </div>
               <!-- 专业认证考试 -->
                <div v-if="examType == 1 && examStatus != 2 && obj.examStartTime">
                      <div v-if="obj.authSuccessCount < 6" class="recording"><span>已通过{{obj.authSuccessCount}}次考试，还差{{6-obj.authSuccessCount}}次即可获得初级{{obj.paperName}}经理认证！</span></div>
                      <div v-else class="recording"><span>已通过专业认证次考试，保级考试已开启，记得准时来参加哦！</span></div>
                </div>
            </div>
            <div class="time">
                <div>
                    <h5 v-if="examType == 1">{{"这是您第"+obj.examCount+"次认证考试"}}</h5>
                </div>

                <div class="timer">
                    <div v-if="examType == 1">
                        <template v-if="obj.authSuccessCount < 6">
                        <p>
                            <span>{{"认证考试时间:"+authStartTime+"--"+authEndTime}}</span>
                            <!-- <span>{{authEndTime}}</span> -->
                        </p>
                        <!-- <p>认证考试时间: 2018年05月02日--2018年07月22日</p> -->
                        <p class="p" v-if="obj.examStartTime && examStatus!=2">
                            <span>{{"下次考试时间:"+examStartTime +"--"+xamEndTime}}</span>
                            <!-- <span>{{xamEndTime}}</span> -->
                        </p>
                        </template>
                        <template v-else> <!-- 连续6次认证通过，获得证书 -->
                            <p class="p next-p" v-if="obj.examStartTime">
                                <span>{{"下次保级考试时间:"+examStartTime +"--"+xamEndTime}}</span>
                                <!-- <span>{{xamEndTime}}</span> -->
                            </p>
                        </template>
                   </div>
                </div>
            </div>
            <div class="look" @click="getWrongQuestionView"     >
                <div class=" ub ub-ac">
                    <div class="ub ub-ver ub-f1">
                        <p><img src="./imges/wrong.png" alt=""><span class="tmLook">错题查看</span></p>
                        <p class="lookP">{{"做错"+ obj.topicErrCount+"题"}}</p>
                    </div>

                    <div class=""><img src="../../assets/images/BackArrow.png" alt="" class="lookimg"></div>
                </div>
            </div>

        </div>
        <div class="foot ub ub-pc" @click="getExaminationRules()"><p>参与考试代表您已同意 <span>《考试规则》</span></p></div>
    </div>
</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//顶部组件
import requestMethods from "@/api/request";//请求的路径
import methodSet from "@/common/js/public";//获取url的参数和日期转换
import { Toast } from 'mint-ui';//mint-ui组件
export default {
     data(){
        return {
            title:'考试成绩',
            obj : "",
            numArr : [], //分数
            authStartTime : "",//认证考试时间
            authEndTime : "",//认证考试结束时间
            examStartTime : "",//下次认证考试时间
            xamEndTime : "",//下次认证考试结束时间
            examType : "",//考试类型：1：认证考试 2：保级考试
            examCount : "",//是否第一次考试 1--是  2--否

            examStatus: -1 // 认证状态 0 认证中 1 认证成功 2 认证失败  3 保级中 4 保级失败
        }
     },
     components : {
      AppHeader
    },
    created () {
      this.init();
    },
    methods : {
        goBack () {
            if(this.$route.query.recordPage == 1) {
                this.$router.go(-1);
            } else{
                this.$router.replace({path:"/Home"})
            }
        },
        init () {
           let submitSuccessfulInformation = localStorage.getItem("submitSuccessfulInformation");
           let thisRouter = this.$route.query;
           this.obj = JSON.parse(submitSuccessfulInformation);
           this.authStartTime = methodSet.getDate(this.obj.authStartTime);//认证考试时间
           this.authEndTime = methodSet.getDate(this.obj.authEndTime);//认证考结束时间
           this.examStartTime = methodSet.getDate(this.obj.examStartTime);//下次认证考时间
           this.xamEndTime = methodSet.getDate(this.obj.examEndTime);//下次认证考结束时间
           let num = this.obj.examScore+"";
           this.numArr = num.split("");
           this.examType = thisRouter.examType;//用户类型
           this.examCount = thisRouter.examCount;//是否第一次考试

           this.examStatus = this.obj.examStatus; // 认证状态 0 认证中 1 认证成功 2 认证失败  3 保级中 4 保级失败
        },
        getWrongQuestionView () {
            if(this.obj.topicErrCount == 0) {
                Toast("暂无错题！");
                return;
            }
            this.$router.push({
                path: "/WrongQuestionView",
                query: {
                    userPaperId : this.$route.query.userPaperId,
                    quetionLength : this.obj.topicErrCount
                }
            })
        },
        getExaminationRules () {
            this.$router.push({
                path: "/user/ExaminationRules"
            })
        }
    },
    beforeRouteLeave (to, from, next) {
         if(to.name == "EmployeeExamination") {
            next(false);
            return
         }
         //返回键 控制
        next();
    }
}
</script>

<style lang="less" scoped>
    //外部样式引入，flex布局
     @import "../../common/css/public";
    #app-header-content{
        justify-content: space-between;
        height: .88rem;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background: #fff;
        border-bottom: .01rem solid #E8E8E8;
    }
    .header-title{
            font-size: .34rem;
            color: #444444;
            font-size:0.34rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(68,68,68,1);
            line-height:0.34rem;
            margin-left: -.4rem;
        }
        #go-back{
            padding: .24rem;
        }
        .back-btn{
            width: .18rem;
            height: .3rem;
            background:url("../../assets/img/icon_back_arrow.png") center no-repeat;
            background-size: 100% 100%;
        }
        .head-right{
            margin-right: .34rem;
        }
    #app-header-content.rank-header .header-title{
      color: #fff!important;
    }
.bigBox{
    background:#f2f4f5;
    height: 100%;
}
    #app-header-content .header-title[data-v-3f9d7aad]{
        width:1.36rem;
        height:0.34rem;
        font-size:0.34rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.34rem;

    }
    .box{
        padding: .88rem 0.24rem 0 0.24rem;
        padding-bottom: .72rem;
    }
    .boxHeader{
        margin-top: 0.32rem;
        padding-bottom: .32rem;
        background: linear-gradient(left, #7ED1FF,#5480FE);
        background: -webkit-linear-gradient(left, #7ED1FF , #5480FE);
        border-radius:8px 8px 0px 0px;
    }
    .num-content{
        position: relative;
    }
    .Grade-box{
          padding-top: 0.8rem;
    }
    .Grade div:nth-child(1),.Grade div:nth-child(2){
        width: 1.2rem;
        height: 1.6rem;
        background:rgba(255,255,255,0.3);
        float: left;
        border-radius:0.08rem;
        box-shadow:2px 6px 4px 0px rgba(85,139,255,1);
    }
    .fraction{
        font-family:"黑体";
        margin-right: .16rem;
        width: 1.2rem;
        height: 1.6rem;
        line-height: 1.6rem;
        text-align: center;
        color: #fff;
        background:rgba(255,255,255,0.3);
        border-radius:0.08rem;
        box-shadow:2px 6px 4px 0px rgba(85,139,255,1);
        font-size: 1.16rem;
        font-weight: 500;
    }
    .fraction-num{
        position: absolute;
        bottom: 0;
        right: -.55rem;
        width: .52rem;
        height: .52rem;
        text-align: center;
        line-height: .52rem;
        color:rgba(215,234,255,1);
        border: solid .02rem rgba(203, 217, 255, 0.4) ;
        /* background: #CBD9FF; */
        font-size: .32rem;
        /* opacity: 0.3; */
        border-radius: .08rem;
    }
    .Grade div:nth-child(1) span,.Grade div:nth-child(2) span{
        width:0.7rem;
        height:1.16rem;
        font-size:1.16rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        padding-left: 0.26rem;
    }
    .Grade div:nth-child(2){
        margin-left: 0.16rem;

    }
    .Grade div:nth-child(3){
        float: left;
        margin-left: 0.16rem;
        width:0.52rem;
        height:0.52rem;
        border: 1px solid black;
        border-radius:0.08rem;
        margin-top: 1rem;
        border:0.02rem solid rgba(203,217,255,1);
        /* opacity:0.3;
        border:0.02rem solid rgba(203,217,255,1); */
    }
    .Grade div:nth-child(3) span{
        width:0.32rem;
        height:0.4rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(215,234,255,1);
        float: left;
        margin-left: 0.1rem;
        margin-top: 0.05rem;
    }
    .notice{
        text-align: center;
    }
    .notice-tx{
        font-size:0.28rem;
        color:rgba(255,255,255,1);
        text-align: center;
    }
    .notice-tx-mar{
        margin-top: .32rem;
        margin-bottom: .16rem;
    }
    .notice-text-content{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .notice span{
        font-size:0.28rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:0.28rem;
    }
    .recording{
        margin-top: -0.2rem;
    }
    .recording span{
        /* width:5.26rem;
        height:0.28rem; */
        font-size:0.2rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(215,234,255,1);
        line-height:0.28rem;
    }
    .time{
        padding-top: 0.4rem;
        background:rgba(255,255,255,1);
        border-radius:0px 0px 8px 8px;
        padding-bottom: .4rem;
    }
    .time h5{
        text-align: center;
        font-size:0.28rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(84,128,254,1);
        line-height:0.28rem;

    }
    .timer {
        margin-top: 0.24rem;
        margin-left: 0.76rem;
    }
    .timer p {
        width:5.92rem;
        height:0.24rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height: 0.24rem;
    }
    .p{
        margin-top: 0.16rem;
    }
    .p.next-p{
        width: 100%;
        margin-left: -0.2rem;
    }
    .look{
        margin-top: 0.32rem;
        background:rgba(255,255,255,1);
        border-radius:8px;
        padding-bottom: .32rem;
    }
    .look div p img{
        width: 0.32rem;
        height: 0.32rem;
        margin-top: 0.3rem;
        margin-left: 0.34rem;
        position: relative;
        top: .05rem;
    }
    .tmLook{
        margin-top: 0.34rem;
        margin-left: 0.16rem;
        /* width:1.28rem;
        height:0.32rem; */
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
    }
    .lookP{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#979797;
        line-height:0.28rem;
        margin-left: 0.83rem;
        font-family: "黑体";
    }

    .lookimg {
        width: 0.18rem;
        height: 0.3rem;
        margin-right: .32rem;
        margin-top: 0.45rem;
    }
    .foot{
        position: absolute;
        width: 100%;
        bottom: .6rem;
    }
    .foot p{

        font-size:0.2rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.2rem;

    }
    .foot p span{
        color:#5a85fe;
    }
</style>
