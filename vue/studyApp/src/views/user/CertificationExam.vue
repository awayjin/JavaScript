<template>
    <div class="box">
        <div>
            <app-header :title='title' :rightObj="rightObj" :listFinish="finish"></app-header>
        </div>
        <div class="Certification-center">
            <div class="CertificationCenter">
                <!-- <ul class="header">
                    <li >认证考试规则</li>
                    <li><img src="./imges/u298.png" alt=""><span>每人每门考试初始送200积分</span></li>
                    <li><img src="./imges/u298.png" alt=""><span>一次报名认证考试需要消耗200积分，通过认证奖励200积分，没有考过积分变为0；</span></li>
                    <li><img src="./imges/u298.png" alt=""><span>每周开放1次考试，可有1次补考机会，12周之内考过6次即可获得初级专业经理认证，否则需要重新交200元兑换200积分报名。</span></li>
                </ul> -->
                <h4 style="font-weight:600;">考试规则</h4>
                <div class="Centifica-man">
                    <div class="centifica-man-one ub ub-ac ub-pc">
                       <p>1</p>
                    </div>
                    <div>资格考试没有考过，可重复考试直到通过，通过考试即获得任命资格；</div>
                </div>
                <div class="Centifica-center">
                    <div class="centifica-man-one ub ub-ac ub-pc">
                        <p>2</p>
                    </div>
                    <div>每月上中下分三旬，每旬有效期为10天：</div>
                </div>
                <div class="text-box-last">
                    <span class="text-box-last-text">上旬考试时间:26日-05日;对应有效期:01日-10日;</span>
                    <span class="text-box-last-text"> 中旬考试时间:06日-15日;对应有效期:11日-20日;</span>
                    <span class="text-box-last-text" style="margin-bottom:0.16rem;"> 下旬考试时间:16日-25日;对应有效期:21日-月底;</span>
                </div>
                <div class="Centifica-center">
                    <div class="centifica-man-one ub ub-ac ub-pc">
                        <p>3</p>
                    </div>
                    <div>对应有效期前通过考试的，按日发放激励；通过考试时已进入有效期的，考试通过前的激励不补发;</div>
                </div>
                <div class="Centifica-foot">
                    <div class="centifica-man-one ub ub-ac ub-pc">
                        <p>4</p>
                    </div>
                    <div>在有效保级期限之内通过保级考试的，自动续保下一周期资格；</div>
                </div>
                <!-- <div class="text-box-last">
                    <span class="text-box-last-text">假如超过有效保级期限，且在下一期有效保级之前通过保级考试的，需按天扣钱；</span>
                    <span class="text-box-last-text"> 假如至少下一期有效保级考试都未通过保级考试，则需扣取未被保级的周期10天的钱；</span>
                </div> -->
                <div class="Centifica-foot">
                    <div class="centifica-man-one ub ub-ac ub-pc">
                        <p>5</p>
                    </div>
                    <div>考试没通过，补考无次数限制；</div>
                </div>
                <div class="Centifica-foot">
                    <div class="centifica-man-one ub ub-ac ub-pc">
                        <p>6</p>
                    </div>
                    <div>老的专家需要保级，老的专家需要重新走资格考试流程；</div>
                </div>

                <h5>认证考试阶段：</h5>
                <table border="1" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <th align="center">认证考试<br/>通过时间</th>
                    <th align="center">认证资格<br/>对应有效期</th>
                    <th align="center">下次保级考试<br/>开放时间</th>
                    </tr>
                    <tr>
                    <td align="center">上旬(01日—10日)</td>
                    <td align="center">通过认证后—20日</td>
                    <td align="center">16日—25日</td>
                    </tr>
                    <tr>
                    <td align="center">中旬(11日—20日)</td>
                    <td align="center">通过认证后—月底</td>
                    <td align="center">26日—次月5日</td>
                    </tr>
                    <tr>
                    <td align="center">下旬(21日—月底)</td>
                    <td align="center">通过认证后—次月10日</td>
                    <td align="center">次月6日—15日</td>
                    </tr>
                </table>
                
                <h5 style="margin-top:0.2rem;">保级考试阶段：</h5>
                <table border="1" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                    <th align="center">保级考试<br/>通过时间</th>
                    <th align="center">认证资格<br/>对应有效期</th>
                    <th align="center">下次保级考试<br/>开放时间</th>
                    </tr>
                    <tr>
                    <td align="center">16日—25日</td>
                    <td align="center">下旬(21日—月底)</td>
                    <td align="center">26日—次月5日</td>
                    </tr>
                    <tr>
                    <td align="center">26日—次月5日</td>
                    <td align="center">上旬(01日—10日)</td>
                    <td align="center">次月6日—15日</td>
                    </tr>
                    <tr>
                    <td align="center">06日—15日</td>
                    <td align="center">中旬(11日—20日)</td>
                    <td align="center">16日—25日</td>
                    </tr>
                </table>
                <!-- <div class="Centifica-foot">
                    <div class="centifica-man-one ub ub-ac ub-pc">
                        <p>6</p>
                    </div>
                    <div>专家任免资格试卷：公共题库、专业题库、突发题库。</div>
                </div> -->
                <div class="important-reminder">
                    <h4><span style="color:red;font-weight:600;">*</span><span style="font-weight:600;">重要提醒</span></h4>
                    <div class="important-reminder-text"><span>所有考试学员均可自主选择时间、地点参加完成，考试过程请本着奋斗者精神，诚实守信原则独立完成考试。</span></div>
                </div>
                <div class="behavior-text behavior-foot">
                    <div class="behavior-conter"><span>若您发现作弊行为，首页底部的“作弊举报”模块可为您提供举报入口。</span></div>
                </div>
                <!-- <div class="behavior-text behavior-foot">
                    <div class="behavior-conter"><span>考试所有解释权归专业能力中心所有。祝您好运！</span></div>
                </div> -->
            </div>
        </div>
        <div class="bc-cl"></div>
        <!-- <div class="ceder"></div> -->
        <div class="Important-check">
            <!-- <div><input type="radio"> <span class="check" @click="check">我已阅读并知晓考试规则，并承诺诚信考试</span></div>  -->
            <div class="ub pad-b-tx" >
                <div class="uncompressed"  @click="rulesOfConsent">
                    <div class="radiu">
                        <div :class="{'is-active' : ischeck}"></div>
                    </div>
                </div>

                <!-- <input type="radio"> -->
                <p class="ub-f1 tx-fs24 tx-cl444" style="text-decoration:underline" @click="torules"> <span>我已阅读并知晓考试规则，并承诺诚信考试</span> <img src="../../assets/images/texterror.png" alt="" class="tx-fs24-img" ></p>
            </div>
            <div class="submit-btn" :class="{'submit-active':ischeck}" @click="submit">
               开始考试
                <!-- <mt-button type="primary" size="large" style="border-radius: 0.44rem;background:rgba(232,232,232,1)">开始考试</mt-button> -->
            </div>
        </div>
        <div v-if="isShowCover">
            <mark-cover @isAgree="toBeAgree"></mark-cover>
        </div>

    </div>
</template>
<style lang="less" scoped>
    //外部样式引入flex布局
    @import "../../common/css/public";
    .uncompressed{
        /* padding: 0.01rem 0rem; */
    }
     .radiu{
        width: 0.24rem;
        height: 0.24rem;
        border-radius: 50%;
        border: solid 1px rgba(232,232,232,1);
        margin-right: .16rem;
        display: flex;
        /* position: relative; */
        justify-content: center;
        align-items: center;
         flex-shrink: 0;
     }
     .is-active{
         width: 7px;
         height: 7px;
         border-radius: 100%;
         background: #5480FE;
         /* flex-shrink: 0; */
         /* line-height: .16rem; */
         /* margin: auto; */
         /* position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%,-50%) */
         /* position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -4px;
        margin-left: -4px; */

     }
     .pad-b-tx{
         padding-bottom: 1.68rem;
     }
     .submit-btn{
         width: 93%;
         /* margin-top: .32rem;
         margin-bottom: .48rem; */
         height: .88rem;
         line-height: .88rem;
         border-radius: .44rem;
         background: #E8E8E8;
         text-align: center;
         font-size: .34rem;
         color: #fff;
         position: fixed;
         bottom: .48rem;
     }
     .submit-active{
        background: linear-gradient(90deg, #7ED1FF , #5480FE);
        background: -webkit-linear-gradient(90deg, #7ED1FF , #5480FE);
        background: -o-linear-gradient(90deg, #7ED1FF , #5480FE);
        background: -moz-linear-gradient(90deg, #7ED1FF , #5480FE);
        box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
        -webkit-box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
     }
    *{
      list-style: none;
      border: none;
      margin: 0;
      padding: 0;
    }
    .box{
        background-color: #f2f4f5;
        height: 100%;
    }
    .Certification-center{
        background-color: white;
    }
    .bc-cl{
        height: 1.62rem;
        padding-bottom: 2.4rem;
        background-color: #fff;
    }
    /* .ceder{
        padding-bottom: 1.4rem;
        background-color: #f2f4f5;
    } */
    .CertificationCenter{
        padding: 1.2rem 0.32rem 0rem 0.32rem;
        background-color: #f2f4f5;
    }
    .CertificationCenter h4{
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.32rem;
        margin-bottom: 0.16rem;
    }
    .CertificationCenter h5 {
        font-size:0.29rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.32rem;
    }
     table {
        border-width: 1px;
        border-style: solid;
        border-bottom-color: rgb(211, 202, 221);
        border: 1px solid #ccc!important;
        margin-top: 0.2rem;
    }
    table td {
        padding: 5px 10px;
        font-size: 12px;
        font-family: Verdana;
        color: rgb(95, 74, 121);
        background: #fff;
    }
    // table tr:nth-child(2n) {
    //     background: rgb(223, 216, 232)
    // }
    // table tr:nth-child(2n+1) {
    //     background: #fff;
    // }
    table tr{
        border-top-width: 1px;
        border-top-style: solid;
        // border-top-color: rgb(211, 202, 221);
        font-size: 0.28rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #444444;
        line-height: 0.4rem;
    }

    th {
        height: 0.6rem;
        background: #D6D8D6;
        border: 1px solid #ccc;
    }
    td {
        height: 0.8rem;
        border: 1px solid #ccc;
    }
    .Centifica-man{
        display: flex;
        flex-wrap: nowrap;
        // align-items: center;
        margin-bottom: 0.16rem;

    }
    .centifica-man-one{
        width:12px;
        height:12px;
        border-radius: 100%;
        font-size: 0.24rem;
        border:1px solid rgba(68,68,68,1);
        flex-shrink: 0;
        margin-top: .05rem;
        text-align: center;
    }
    .Centifica-man div:nth-child(2){
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        /* line-height:0.4rem;; */
        /* vertical-align: middle; */
        margin-left: 0.1rem;
    }
    .Centifica-center{
        display: flex;
        flex-wrap: nowrap;
        /* align-items: center; */
        margin-bottom: 0.16rem;
    }
    .centifica-man-two{
        width:0.24rem;
        height:0.24rem;
        border-radius: 50%;
        /* padding: 0 0.1rem; */
        font-size: 0.24rem;
        line-height: 0.24rem;
        text-align: center;
        /* flex-shrink: 0; */
        border:0.02rem solid rgba(68,68,68,1);
        flex-shrink: 0;
        margin-top: 0.08rem;
    }

    .Centifica-center div:nth-child(2){
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        /* line-height:0.4rem;; */
        /* vertical-align: middle; */
        margin-left: 0.1rem;
    }
    .Centifica-foot{
        display: flex;
        flex-wrap: nowrap;
        /* align-items: center; */
        margin-bottom: 0.16rem;

    }
    .centifica-man-three{
        width:0.24rem;
        height:0.24rem;
        border-radius: 50%;
        /* padding: 0 0.1rem; */
        font-size: 0.24rem;
        line-height: 0.24rem;
        text-align: center;
        /* flex-shrink: 0; */
        border:0.02rem solid rgba(68,68,68,1);
        flex-shrink: 0;
        margin-top: -0.75rem;
    }
    .Centifica-foot div:nth-child(1) span{
        font-size:0.2rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.2rem;
    }

    .Centifica-foot div:nth-child(2){
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        /* line-height:0.4rem;; */
        /* vertical-align: middle; */
        margin-left: 0.1rem;
    }
    .important-reminder {
        margin-top: 0.48rem;
    }
    .important-reminder h4{
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.32rem;
    }
    .important-reminder-text{
        display: flex;
        flex-wrap: wrap;
    }
    .important-reminder-text span{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        margin-top: 0.16rem;
    }

    .behavior-text{
        margin-top: 0.24rem;
    }
    .behavior-conter{
        display: flex;
        flex-wrap: wrap;
    }
    .behavior-foot{
        padding-bottom: 0.35rem;
    }
    .behavior-conter span{
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.34rem;
    }

    .tx-fs24-img{
        /* width: 0.06rem; */
        height: 0.1rem;
        transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        /* line-height: 0.2rem; */
        padding-top: 0.1rem;
    }
    .Important-reminder{
        margin-top: 0.48rem;
        padding: 0rem 0.32rem 0rem 0.32rem;
    }
    .Important-center li:nth-child(1){
        margin-bottom:0.16rem;
    }
    .Important-center li:nth-child(1) span:nth-child(1){
        /* width:1.46rem;
        height:0.32rem; */
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(252,67,67,1);
        line-height:0.32rem;
    }
    .Important-center li:nth-child(1) span:nth-child(2){
        width:1.46rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:900;
        line-height:0.32rem;
    }
    .Important-center li:nth-child(2){
        margin-top: -0.5rem;
    }
    .Important-center li:nth-child(2) span{
        width:6.68rem;
        height:1.6rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.4rem;
        display: inline-table;
    }
    .Important-center li:nth-child(3){
         margin-top: -0.2rem;
    }
    .Important-center li:nth-child(3) span{
        width:6.68rem;
        height:0.68rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.34rem;
        display: inline-table;

    }
    .Important-center li:nth-child(4){
         margin-top: -0.2rem;
    }
    .Important-center li:nth-child(4) span{
        width:6.68rem;
        height:0.68rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.34rem;
    }
    .check{
         /* padding-left: 0.9rem; */
         margin-top: -0.5rem;
    }
    .Important-check{
        width: 100%;
        position: fixed;
        bottom: 0;
        font-size: 0.1rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(68,68,68,1);
        line-height: 0.24rem;
        padding: 0.48rem 0rem 0rem 0.24rem;
        /* padding-bottom: .5rem; */
        background-color: white;
        box-shadow:0rem -0.1rem 0.1rem rgba(146,146,146,0.26);
    }
    .submit{
        margin-top: 0.3rem;
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
    .ub-end{
       justify-content: flex-end;
    }
    .text-box-last {
        display: flex;
        flex-flow: wrap;
    }
    .text-box-last-text {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(68, 68, 68, 1);
        line-height: 0.4rem;
        padding-left: 0.32rem;
    }
</style>
<script>
import AppHeader from "@/components/appHeader/AppHeader";
import MarkCover from "@/views/user/PointDeduction"
import { Checklist } from 'mint-ui';
import { Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            // title : '初级安全专业经理认证考试',
            title : '资格认证考试规则',
            ischeck : false,
            isShowCover : false,
            rightObj: {
                isMore: false,
                icon:'',
                title:''
            }
        }
    },
    components : {
      AppHeader,MarkCover
    },

    created () {
       this.init();
    },
    methods:{
        init() {
            //名称
            let titleText = this.$route.query.paperName;
            // let index = titleText.indexOf("考试");
            //考试类型 1：认证考试  2：保级考试
            let examType = this.$route.query.examType;
            let isgetToPage = sessionStorage.getItem("getToPage");
            // if(index > 0) {
            //     titleText = titleText.slice(0,index);
            // }
            // this.title = titleText + "认证考试";
            this.title = "资格认证考试规则";
            this.ischeck =  JSON.parse(isgetToPage);
        },

        submit(){
            if(!this.ischeck) {
                Toast({
                    message: '请先阅读考试规则，并点击同意',
                    position: 'middle',
                    duration: 3000
                });
                return;
            }
            // this.isShowCover = true;
            this.$router.push({
                path : "/EmployeeExamination",
                    query : {
                        paperBankId : this.$route.query.paperBankId,//考试试卷类型ID
                        examType : this.$route.query.examType,//1认证考试-2保级考试
                        examCount : this.$route.query.examCount //是否第一次考试1：是；2：否
                    }
            })

        },
        // toBeAgree (index) {
        //     this.isShowCover = false;
        //     if(index == 0) {

        //     } else {

        //         this.$router.push({
        //             path : "/EmployeeExamination",
        //                 query : {
        //                     paperBankId : this.$route.query.paperBankId,//考试试卷类型ID
        //                     examType : this.$route.query.examType,//1认证考试-2保级考试
        //                     examCount : this.$route.query.examCount //是否第一次考试1：是；2：否
        //                 }
        //         })
        //     }
        // },
        torules(){
            sessionStorage.setItem("getToPage",this.ischeck);
            this.$router.push({//认证考试-考试规则
             path : "/user/ExaminationRules",
            //  query : {
            //    id : fieldId
            //  }
            })
        },
        rulesOfConsent () {
            this.ischeck = !this.ischeck;
        },
        finish(){},
    },
     beforeRouteLeave (to, from, next) {
        sessionStorage.setItem('exam-from-home', 1);
         if(to.name != "ExaminationRules") {
            sessionStorage.removeItem("getToPage");
         }
         //返回键 控制
         if(this.isShowCover) {
              next(false);
              return
         }
        next();
    },
}
</script>

