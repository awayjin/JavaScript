<template>
	<div class="home">
		<app-header title='考试列表' :rightObj="rightObj" :lishFinish="finish"></app-header>
		<section class="exam-list question">
      <div class="question_ks"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div>
          <span style="font-size:0.28rem;vertical-align:middle;">资格赛</span>      
          <!-- 资格考试 -->
          <div v-if="zigeExam.length == 0">
            <p class="noPaperStyle">暂无资格考试试卷</p>
          </div>
          <div v-else class="ub ub-ac ks" style="position:relative;" v-for="(item,key) in zigeExam" :key="key" @click="handlerExamClick(item,key)">
              <img :src="item.paperIcon || defaultPaperIcon" />
              <dl>
                <dt class="paper-name">{{item.newPaperName}}</dt>
                <dd class="mar-t10">{{item.memo}}</dd>
              </dl>
              <!-- <div class="examIcon">
                <span class="examIconText">试用</span>
              </div> -->
          </div>
        </div>

        <div>
          <span style="font-size:0.28rem;vertical-align:middle;">小专家赛</span>      
          <!-- 小专家考试 -->
          <div v-if="samllExpertExam.length == 0">
            <p class="noPaperStyle">暂无小专家考试试卷</p>
          </div>
          <div v-else class="ub ub-ac ks" style="position:relative;" v-for="(item,key) in samllExpertExam" :key="key" @click="handlerExamClick(item,key)">
              <img :src="item.paperIcon || defaultPaperIcon" />
              <dl>
                <dt>{{item.newPaperName}}</dt>
                <dd class="mar-t10">{{item.memo}}</dd>
              </dl>
              <!-- <div class="examIcon">
                <span class="examIconText">试用</span>
              </div> -->
          </div>
        </div>

        <div>
          <span style="font-size:0.28rem;vertical-align:middle;">培训考试</span>      
          <div v-if="onceExam.length == 0">
            <p class="noPaperStyle">暂无培训考试试卷</p>
          </div>
          <div v-else class="ub ub-ac ks" style="position:relative;" v-for="(item,key) in onceExam" :key="key" @click="handlerExamClick(item,key)">
              <img :src="item.paperIcon || defaultPaperIcon" />
              <dl>
                <dt>{{item.newPaperName}}</dt>
                <dd class="mar-t10">{{item.memo}}</dd>
              </dl>
              <!-- <div class="examIcon">
                <span class="examIconText">试用</span>
              </div> -->
          </div>
        </div>
      </div>

      <div v-if="noData">
          <default-page></default-page>
      </div>

      <p class="no-data-hint" v-if="noMoreData">没有更多数据了</p>
  </section>

  <div v-if="showMsgbox" class="homebox">
      <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2009;">
        <div class="mint-msgbox home-box-msgbox" style="">
          <div class="mint-msgbox-header home-box-header">
            <!-- examApplyId有值说明第二次参加考试，没值初次考试 -->
            <div v-if="examApplyId" class="mint-msgbox-title">您确定再次参加考试吗？</div>
            <!-- TrainExamType为2 只针对培训考试显示 -->
            <div v-if="TrainExamType == 2" class="mint-msgbox-title marginTop">{{trainReminder}}</div>
          </div> <!---->
          <div class="mint-msgbox-btns">
              <button class="mint-msgbox-btn mint-msgbox-cancel home-box-flase" style="" @click="flaseMsgbox">取消</button>
              <button class="mint-msgbox-btn mint-msgbox-confirm  home-box-true" @click="ShowMsgbox">确定</button>
          </div>
        </div>
      </div>
      <div class="v-modal" style="z-index: 2008;"></div>
    </div>
	</div>
</template>

 <script>
  import AppHeader from "@/components/appHeader/AppHeader";//头部组件引用
  import { Toast } from 'mint-ui';//mint-ui组件引用
  // import {serverUrl} from "@/api/serverConfig"; 搜索到serverUrl没有在本文件引用
  //import request from "@/api/request";这是之前就注释了的代码
  import defaultPaperIcon from '../../assets/images/ks1.png';//默认考试列表图标
  import defaultPage from "@/components/defaultPage/DefaultPage";//考试列表无数据的时候显示默认图片
  //业务逻辑
    export default {
      components : {
        AppHeader, defaultPage
      },
      data () {
        return {
          page: 1,//初始化页面
          pageSize: 10000,//分页大小
          totalPage: 1,//总页数

          examList: [],//是否第一次考试1：是；2：否
          zigeExam:[],//资格考试
          samllExpertExam:[],//小专家考试
          onceExam:[],//单次考试

          defaultPaperIcon: defaultPaperIcon,
          loading: false,
          noData: false,
          noMoreData: false,
          showMsgbox:false,
          rightObj: {
            isMore: false,
            icon:''
          },
          TrainExamType: '',
          examApplyId: '',
          trainReminder: '',
        }
      },
      created () {
        this.getExamList(1, this.pageSize);
      },
      methods:{
        loadMore() {
          if (this.loading) {
            return false;
          }

          if (this.page > this.totalPage) {
            return;
          }

          this.getExamList(this.page, this.pageSize);
        },
        getExamList(page, limit) {
          this.loading = true;
  			  this.$request.getExamList(page, limit).then((data) => {
            //console.log("examList:", data);
            this.totalPage = data.pages;
            let records = data.records;
            if (!records || records.length == 0) {
              if (page == 1) {
                // this.noData = true;
              } else {
                // this.noMoreData = true;
              }
            } else if (page >= data.pages) {
              // this.noMoreData = true;
            } else {
              // this.noMoreData = false;
            }

            //this.examList = this.examList.concat(data.records);
            records.forEach((item,index) => {
                let thisPaperName = item.paperName;
                let thisIndex = thisPaperName.indexOf("考试");
                let newPaperName;
                
                if(item.paperType < 2) {
                  if(item.examType == 1) {//认证考试
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
                this.$set(item,"newPaperName",newPaperName);
                this.examList.push(item);

            });
            this.zigeExam = this.examList.filter(item => item.paperType == 0);//资格考试列表
            this.samllExpertExam = this.examList.filter(item => item.paperType == 1);//小专家考试列表
            this.onceExam = this.examList.filter(item => item.paperType == 2);//单次考试列表

            this.page++;
            this.loading = false;
  			  });
        },

        handlerExamClick(item,key) {
          // if(item.isAvaliable == 1) {
          //   Toast({
          //     message: item.reminder,
          //     duration: 2000
          //   });
          //   return;
          // }
          // if(item.isAvaliable == 2) {
          //   Toast({
          //     message: item.reminder,
          //     duration: 2000
          //   });
          //   return;
          // }
          this.TrainExamType = item.paperType;
          this.examApplyId = item.applyId;
          let params = {};
          params.paperBankId = item.paperId;
          params.paperType = item.paperType;
          this.$request.getExamApply(params).then(res=>{
            // console.log('examApply res',res)
            if(res.code == 500) {
              Toast({
                message: res.msg,
                duration: 2000
              })
              return;
            }else if(res.code == 200) {
              this.examApplyId = res.data.applyId;
              // if(res.data !== null) {
              //   Toast({
              //     message: res.data,
              //     duration: 4000
              //   })
              // }
              //第一次考试
              if(item.applyId == null || item.applyId == '') {
                  //paperType：0资格考试-1小专家考试-2单次考试
                if(item.paperType == 0) {
                  sessionStorage.setItem('exam-from-home', 1);
                  this.$router.push({
                      path : "/user/CertificationExam",//资格考试协议页面
                      query : {
                        paperBankId : item.paperId,//考试试卷类型ID
                        examType : res.data.examType,//1认证考试-2保级考试
                        // examCount : item.examCount, //是否第一次考试1：是；2：否
                        // paperName : item.paperName
                        paperType : item.paperType
                      }
                  });
                }else if(item.paperType == 1) {
                  sessionStorage.setItem('exam-from-home', 1);
                  this.$router.push({
                    path : "/user/RelegationExam",//小专家考试协议页面
                      query : {
                        paperBankId : item.paperId,//考试试卷类型ID
                        examType : res.data.examType,//1认证考试-2保级考试
                        // examCount : item.examCount, //是否第一次考试1：是；2：否
                        // paperName : item.paperName
                        paperType : item.paperType
                      }
                  });
                } else {//培训考试
                  sessionStorage.setItem('exam-from-home', 1);
                  this.showMsgbox = true;
                  this.trainReminder = res.data.msg;
                  this.query={
                    paperBankId : item.paperId,//考试试卷类型ID
                    examType : '1',//1认证考试-2保级考试
                  }
                  // this.$router.push({
                  //   path : "/EmployeeExamination",//直接进入考试界面
                  //     query : {
                  //       paperBankId : item.paperId,//考试试卷类型ID
                  //       examType : '1',//1认证考试-2保级考试
                  //     }
                  // });
                }
              } else {//第二次考试
                sessionStorage.setItem('exam-from-home', 1);
                this.showMsgbox =true;
                if(item.paperType < 2) {//资格&小专家考试
                  this.query = {
                    paperBankId : item.paperId,//考试试卷类型ID
                    examType : res.data.examType,//1认证考试-2保级考试
                    // examCount : item.examCount //是否第一次考试1：是；2：否
                    paperType : item.paperType
                  };
                }else {//培训考试paperType: 2
                  this.trainReminder = res.data.msg;
                  this.query = {
                    paperBankId : item.paperId,//考试试卷类型ID
                    examType : '1',//1认证考试-2保级考试
                  }
                }
              }
            }
          })
        },
        flaseMsgbox(){
          this.showMsgbox =false
        },
        ShowMsgbox(){
          sessionStorage.setItem('exam-from-home', 1);
          this.$router.push({
            path : "/EmployeeExamination",//考试页面
            query : this.query
          })
        },
        finish(){},
      }
    }
  </script>

 <style scoped>
  .homebox>.mint-msgbox-wrapper>.mint-msgbox>.mint-msgbox-btns>.home-box-flase.mint-msgbox-cancel{
    border-right: none;
  }
  .homebox>.mint-msgbox-wrapper>.mint-msgbox>.mint-msgbox-btns>.mint-msgbox-confirm.home-box-true{
    border-left: 1px solid rgb(232, 232, 232);
  }
  .homebox>.mint-msgbox-wrapper>.mint-msgbox>.mint-msgbox-header.home-box-header{
    padding: 0.5rem 1rem;
    border-bottom: 1px solid rgb(232, 232, 232)
  }
  .homebox>.mint-msgbox-wrapper>.mint-msgbox.home-box-msgbox{
    border-radius: 0.2rem
  }
 	.exam-list.question {
 		padding-top: 0.88rem;
 	}
    .home{
      background:#f8f9fb;
    }
    .mint-header{
      height:0.88rem;
      background:#fff;
    }
    .mint-header{
      color:#666;
    }
    .mint-header-title{
      line-height:0.4rem;
    }
    .apply_inner{padding:0.24rem 0.24rem;color:#fff;}
    .apply{
      padding:0rem 0.24rem;
      box-sizing:border-box;
      display:flex;justify-content:space-between;align-items:center;box-shadow: rgb(230, 230, 230) 1px 1px 30px 5px;;
      box-shadow: rgb(221, 221, 221) 1px 1px 30px 5px ;
      width:100%;height:2.82rem;border-radius:0.08rem;background:#33B7FB;
      background:-webkit-linear-gradient(left,#33B7FB 30%,#5480FE);
    }
    .apply_l h3{
      font-size:0.36rem;
      font-weight:600;
    }
    .apply_l p{
      font-size:0.24rem;
    }
    .apply_l span{
      font-size:0.14rem;
    }
    .apply_r{
      width:1.28rem;
      height:1.38rem;
      background:url(../../assets/images/rzwtg.png);
      background-size:cover;
      text-align:center;
    }
    .apply_r span{
      color:#979799;
      font-size:0.12rem;
      display:block;
    }
    .apply_r .point {
      color: #5480FE;
      font-size: 0.32rem;
      font-weight: 600;
      margin-top: 0.3rem;
    }
    .tx_img{
      width:0.4rem;
      height:0.4rem;
      border-radius:50%;
      overflow:hidden;
      float:left;
    }
    .tx_img img{
      width:100%;
    }
    .question{
      box-sizing:border-box;
      background:#fff;
      width:100%;
      padding:0.2rem 0.32rem 0rem;
      margin-bottom:0.24rem;
    }
    .question span{
      font-weight:bold;
      font-size:0.36rem;
    }
    .question_m{
      height:3rem;
      width:100%;
      box-sizing:border-box;
      padding:0 0.15rem;
    }
    .tk{
      box-sizing:border-box;
      float:left;
      width:50%;
      height:1.3rem;
      border-bottom:1px solid #F4F4F4;
      border-right:1px solid #F4F4F4;
      overflow:hidden;
      display:flex;
      align-items:center;
      padding-left:0.2rem;
    }
    .tk:nth-child(even){
      border-right:none;
    }
    .tk img{
      width:0.88rem;
      height:0.88rem;
      border:1px dashed #000;
    }
    .tk dl{
      padding-left:10px;
    }
    .tk dl dt{
      font-size:16px;
      color:#000;
    }
    .tk dl dd{
      color:#979799;
      font-size:12px;
    }
    .question_t .more{
      float:right;
      position: relative;
      top:2px;
    }
    .question_t .more i{
      right:0px;
    }
    .question_t .more em{
      font-style: normal;
      color:#979799;
      font-size:0.24rem;
      font-weight: normal;
      margin-left:-25px;
      margin-top:0.05rem;
    }
    .mint-cell-allow-right::after{
      top:15px;
    }
    .question_ks{
      padding:0.2rem 0;
    }
    .question_ks .ks{
      display:flex;
      background:#FAFAFA;
      border-radius:0.05rem;
      margin-top:0.16rem;
      padding:0.22rem 0.32rem;
    }
    .question_ks .ks img{
      width:0.64rem;
      height:0.64rem;
      margin-top:0.04rem;
    }
    .question_ks .ks dl{
      margin-left:0.15rem;
    }
    .question_ks .ks dl dt{
      font-size:0.32rem;
      color:#000;
    }
    .question_ks .ks dl dd{
      font-size:0.24rem;
      color:#979799;
    }
    .footer{
      background:#fff;
      padding:0.2rem 0;
      display: flex;
      justify-content:space-around;
      align-items:center;
    }
    .footer dl{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .footer dl dt{
      width:0.52rem;
      height:0.52rem;
    }
    .footer dl dd{
      font-size:0.24rem;
      color:#444;
    }
    .footer dl dt img{width:100%;}
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
    .paper-name {
      max-width: 4.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .mar-t10{
      margin-top: .1rem;
      max-width: 4.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .examIcon {
      position: absolute;
      right: 0.3rem;
      -webkit-transform: translate(0, -50%);
      padding: 1px 0.15rem;
      -webkit-transform: rotate(-15deg);
      border: 0.02rem solid #e4e4e4;
      color: #e4e4e4;
      border-radius: 0.02rem;
      display: flex;
      align-items: center;
    }
    .examIconText {
      font-size: 0.24rem !important;
      font-weight: 200 !important;
      font-family: PingFangSC-Regular;
      display: inline-block;
      color: #e4e4e4;
      line-height: 0.28rem;
      vertical-align: middle;
    }
    .noPaperStyle {
      display: flex;
      background: #FAFAFA;
      border-radius: 0.05rem;
      margin-top: 0.16rem;
      padding: 0.32rem;
      font-size: 0.32rem;
    }
    .marginTop {
      margin-top: 6px;
    }
</style>
