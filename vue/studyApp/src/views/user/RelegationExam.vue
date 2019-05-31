<template>
    <div>
        <app-header :title="title" :rightObj="rightObj" v-on:listFinish="finish"></app-header>
        <div class="relegation-box">
            <h4>考试规则</h4>
            <div class="text-box">
              <div class="num-box ub ub-ac ub-pc">
                <p>1</p>
              </div>
               <span class="rule-text">开放对象为BU1所有员工；</span>
            </div>
            <div class="text-box">
              <div class="num-box ub ub-ac ub-pc">
                <p>2</p>
               </div>
              <span class="rule-text">报名后4周之内每周考试通过，则获得小专家荣誉称号并奖励200积分；</span>
            </div>
            <div class="text-box">
              <div class="num-box ub ub-ac ub-pc">
                <p>3</p>
               </div>
              <span class="rule-text">认证阶段，没有考过本周之内补考次数不限制，直到通过，假如本周没考过，则需重新报名认证；</span>
            </div>
            <div class="text-box">
              <div class="num-box ub ub-ac ub-pc">
                 <p>4</p>
               </div>
              <span class="rule-text">保级阶段，连续三周通过考试，则奖励50积分，获得一枚三连击奖章；</span>
            </div>
            <div class="text-box">
              <div class="num-box ub ub-ac ub-pc">
                 <p>5</p>
               </div>
              <span class="rule-text">一周没保级成功，则减去50积分，直到积分减为0，则失去小专家称号；</span>
            </div>
            <div class="text-box">
              <div class="num-box ub ub-ac ub-pc">
                 <p>6</p>
               </div>
              <span class="rule-text">奖章规则：</span>
            </div>
            <div class="text-box-last">
                <span class="text-box-last-text">连续三周通过考试 = 1枚三连击奖章，</span>
                <span class="text-box-last-text">3个三连击奖章 = 1个九连击奖章，</span>
                <span class="text-box-last-text">3个九连击奖章 = 学习之星奖章（半年奖章），</span>
                <span class="text-box-last-text">2个半年奖章 = 学习之神奖章（1个一年奖章）。</span>
            </div>
            <div class="important-reminder">
                <h4><span style="color:red;">*</span>重要提醒</h4>
            <div class="important-reminder-text">
                <span>所有考试学员均可自主选择时间、地点参加完成考试过程请本着奋斗者精神，诚实守信原则独立完成考试。</span></div>
            </div>
            <div class="behavior-text">
            <div class="behavior-conter">
                <span>若您发现作弊行为，首页底部的“作弊举报”模块可为您提供举报入口。</span></div>
            </div>
            <!-- <div class="behavior-text">
                <div class="behavior-conter"><span>考试所有解释权归专业能力中心所有。祝您好运！</span></div>
            </div> -->

        </div>
        <div class="bc-cl"></div>
        <div class="Important-check">
            <!-- <div><input type="radio"> <span class="check" @click="check">我已阅读并知晓考试规则，并承诺诚信考试</span></div>  -->
            <div class="ub important-rule pad-b-tx">
                <div class="uncompressed">
                    <div class="radiu" @click="rulesOfConsent">
                        <div :class="{'is-active':ischeck}" ></div>
                    </div>
                </div>
                <p class="ub-f1 tx-fs24 tx-cl444" style="text-decoration:underline" @click="torules"><span>我已阅读并知晓考试规则，并承诺诚信考试</span><img src="../../assets/images/texterror.png" alt="" class="tx-fs24-img"></p>
            </div>
            <div class="submit-btn" :class="{'submit-active':ischeck}" @click="submit">
                开始考试
                <!-- <mt-button type="primary" size="large" style="border-radius: 0.44rem;background:rgba(232,232,232,1)">开始考试</mt-button> -->
            </div>
        </div>
    </div>
</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引入
import { Button, Toast } from "mint-ui";//mint-ui组件引用  按钮样式    弹窗样式
export default {
  data() {
    return {
      title: "小专家赛考试规则",
      ischeck: false,
      rightObj:{
        isMore: false,
      }
    };
  },
  components: {
    AppHeader
  },
  created () {
    this.init();
  },
  methods: {
    init() {
      //名称
       let titleText = this.$route.query.paperName;
      //  let index = titleText.indexOf("考试");
       //考试类型 1：认证考试  2：保级考试
       let examType = this.$route.query.examType;
       let isgetToPage = sessionStorage.getItem("getToPage1");
      //  if(index > 0) {
      //     titleText = titleText.slice(0,index);
      //  }
      //  this.title = "初级" + titleText + "经理保级考试";
       this.title = "小专家赛考试规则";
       this.ischeck = JSON.parse(isgetToPage);
    },
    rulesOfConsent() {
      this.ischeck = !this.ischeck;
    },
    submit() {
      if (!this.ischeck) {
        Toast({
          message: "请先阅读考试规则，并点击同意",
          position: "middle",
          duration: 3000
        });
        return;
      }
      this.$router.replace({
        path: "/EmployeeExamination",
        query: {
          paperBankId: this.$route.query.paperBankId, //考试试卷类型ID
          examType: this.$route.query.examType, //1认证考试-2保级考试
          examCount: this.$route.query.examCount //是否第一次考试1：是；2：否
        }
      });
    },
    torules(){
      sessionStorage.setItem("getToPage1",this.ischeck);
      this.$router.push({//认证考试-考试规则
        path : "/user/ExaminationRules",
      //  query : {
      //    id : fieldId
      //  }
      })
    },
    finish(){},
  },
  beforeRouteLeave (to, from, next) {
         if(to.name != "ExaminationRules") {
            sessionStorage.removeItem("getToPage1");
         }
        next();
    },
}
</script>

<style  lang="less" scoped>
//引入外部样式  felx布局
@import "../../common/css/public";
.relegation-box {
  background-color: #f2f4f5;
  padding: 1.2rem 0.32rem 0.2rem 0.32rem;
}
.bc-cl{
  height: 1.62rem;
  padding-bottom: 2.4rem;
  background-color: #fff;
}
.relegation-box h4 {
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 0.32rem;
}
.text-box {
  display: flex;
  flex-flow: nowrap;
  padding-top: 0.16rem;
}
.num-box {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  font-size: 0.24rem;
  border: 1px solid rgba(68, 68, 68, 1);
  flex-shrink: 0;
  margin-top: .06rem;
}
.rule-text {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  line-height: 0.4rem;
  margin-left: 0.1rem;
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
.important-reminder {
  margin-top: 0.48rem;
}
.important-reminder h4 {
  font-size: 0.32rem;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 0.32rem;
}
.important-reminder-text {
  display: flex;
  flex-wrap: wrap;
}
.important-reminder-text span {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  margin-top: 0.16rem;
}

.behavior-text {
  margin-top: 0.24rem;
}
.behavior-conter {
  display: flex;
  flex-wrap: wrap;
}
.behavior-conter span {
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  line-height: 0.34rem;
}
/* .pad-b-tx{
    padding-bottom: 1.68rem;
} */
.submit-btn {
  width: 93%;
  margin-top: 0.32rem;
  margin-bottom: 0.48rem; 
  height: 0.88rem;
  line-height: 0.88rem;
  border-radius: 0.44rem;
  background: #e8e8e8;
  text-align: center;
  font-size: 0.34rem;
  color: #fff;
}
.submit-active {
  background: linear-gradient(90deg, #7ed1ff, #5480fe);
  background: -webkit-linear-gradient(90deg, #7ed1ff, #5480fe);
  background: -o-linear-gradient(90deg, #7ed1ff, #5480fe);
  box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
  -webkit-box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
}

.tx-cl444 {
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  line-height: 0.24rem;
}
.Important-check {
  width: 98%;
  position: fixed;
  background: #fff;
  bottom: 0;
  padding-top: 0.48rem;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  margin-top: 0.18rem;
  -webkit-box-shadow: 0rem -0.1rem 0.1rem rgba(146,146,146,0.26);
  box-shadow: 0rem -0.1rem 0.1rem rgba(146,146,146,0.26);
}
/* .important-rule {
  display: flex;
  flex-wrap: wrap;
} */

.radiu {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  border: solid 1px rgba(232,232,232,1);
  margin-right: .12rem;
  /* flex-shrink: 0; */
  display: flex;
  /* position: relative; */
  justify-content: center;
  align-items: center;
}
.is-active {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #5480fe;
  /* flex-shrink: 0;
  line-height: .16rem;
  text-align: center; */
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
</style>
