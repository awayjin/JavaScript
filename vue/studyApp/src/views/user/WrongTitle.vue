<template>
    <div>
        <app-header :title='title' :rightObj="rightObj" v-on:listFinish="finish"></app-header>
        <div class="WrongTitle-header" v-if="detail.oldContent">
            <div class="WrongTitle-center nopadding">
                <b>原题目</b>
                <p>{{detail.oldContent && detail.oldContent.title}}</p>
                <!--题干中显示图片-->
                <div class="img-content" @click="clickImg" v-if="imgUrl">
                  <img style="width:100%;height:3rem;" :src="imgUrl" alt="">
                </div>
                <!-- <ul class="q-choice-list" v-if="false">
                    <li :class="'q-choice' + (detail.answer.indexOf(item.id)>=0 ? ' q-choice-ok' : '')" v-for="(item,key) in detail.oldContent.choiceList">
                        {{item.id}}. {{item.value}}
                    </li>
                </ul> -->
                <ul class="q-choice-list">
                    <template v-if="detail.questionType <= 2"> <!-- 单选题、多选题 -->
                        <li :class="'q-choice' + (detail.answer.indexOf(item.id)>=0 ? ' q-choice-ok' : '')" v-for="(item,key) in detail.oldContent.choiceList">
                            {{item.id}}: {{item.value}}
                        </li>
                        <div style="margin-top:0.3rem;">
                            <span>答案：{{detail.answer}}</span>
                        </div>

                    </template>
                    <template v-else-if="detail.questionType == 3">
                        <li :class="'q-choice' + (detail.answer == item.id ? ' q-choice-ok' : '')" v-for="(item,key) in detail.oldContent.choiceList" >
                          <!--{{key == 0 ? 'A' : 'B'}}-->
                          <div :class="detail.answer == item.id ? 'iconCoverBlue' : 'iconCoverRed'"><span :class="'iconClass ' + (detail.answer.indexOf(item.id)>=0 ? 'option-select-trued' : 'select-falsed')"></span></div>
                          <p style="font-size: 0.33rem;margin-left: 0.8rem;font-family: PingFangSC-Regular;color: #444444;font-weight: 400;word-break: break-all;">{{item.value}}</p>
                        </li>

                        <!--<div :class="'option-select ub ub-ac ub-pc true-btn' + (detail.answer.indexOf(item.id)>=0 ? '' : ' uhide') + (' right-selected' + item.value)">-->
                          <!--<p class="option-select-true"></p>-->
                        <!--</div>-->
                        <!--<div class="option-select-false-content ub ub-ac ub-pc uhide false-btn" :class="'falsel-selected'+item.value">-->
                          <!--<p class="select-false"></p>-->
                        <!--</div>-->

                        <span style="display:inline-block;margin-top:0.3rem;">答案：{{detail.answer}}</span>
                    </template>
                    <template v-else>
                        <li class="q-choice" v-for="(item,key) in answer">
                            <span>填空项{{key+1}}: </span>{{item}}
                        </li>
                        <span>答案：{{detail.answer}}</span>
                    </template>
                </ul>
                <!-- <hr> -->
            </div>
            <div class="WrongTitle-foter">
                <b>报错内容</b>
                <p>{{detail.description && detail.description}}</p>
                <ul class="WrongTitle-foter-ul">
                    <li class="error-aswer"><img src="../../assets/images/WrongTitle/icon-errortitle.png" alt=""><span>{{detail.errType && errTypeMap[detail.errType]}}</span></li>
                    <li class="error-man"><img src="../../assets/images/cheat/icon-errer.png" alt=""><span>{{detail.userName && detail.userName}}</span></li>
                    <li><span>{{detail.createTime | formatTime}}</span></li>
                </ul>
            </div>
            <div class="WrongTitle-btn" v-if="userRole == 2 && detail.reportType < 6">
                <mt-button type="default" style="border-radius: 0.5rem;background-color: #fff;font-size:0.34rem;
                    font-weight:400;
                    color:#444444;
                    ;padding:0rem 0.2rem;" @click="noEdit">题目不需要修改</mt-button>
                <mt-button type="primary" @click="toExpertEdit" style="border-radius: 0.5rem;font-size:0.34rem;
                    font-weight:400;
                    color:#fff;
                    ;padding:0rem 0.4rem;margin-left:0.8rem;background:rgba(84,128,254,1);">题目需要修改</mt-button>
            </div>
        </div>

        <div v-if="showReasonBox">
            <div class="mint-msgbox-wrapper " style="position: absolute; z-index: 999;">
                <div class="mint-msgbox mint-wrong-box" style="">
                    <div class="mint-msgbox-content mint-content">
                        <div class="mint-msgbox-message mint-text ">
                            <textarea id="no-edit-msg" placeholder="请填写题目不需要修改的原因" rows="4" cols="38" style="padding:0.3rem;outline: none;border:none"></textarea>
                        </div>
                        <div class="mint-msgbox-input" style="display: none;">
                            <input placeholder="" type="text">
                            <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                        </div>
                    </div>
                    <div class="mint-msgbox-btns">
                        <button class="mint-msgbox-btn mint-msgbox-cancel mint-btns-box" @click="hideReasonBox">取消</button>
                        <button class="mint-msgbox-btn mint-msgbox-confirm" @click="confirmNoEdit">确认</button>
                    </div>
                </div>
            </div>
            <div class="v-modal" style="z-index: 998;"></div>
        </div>
        <!-- 图片遮罩层 -->
        <div class="maskIsShow" v-if="maskIsShow">
          <div class="mask" @click="maskIsShow = false">
            <img style="width:100%;margin-top:30%;max-height:7rem;" :src="imgUrl" alt="">
          </div>
        </div>
    </div>
</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引入

import { Button } from 'mint-ui';//mint-ui组件 Button引入
import { MessageBox, Toast } from 'mint-ui';//mint-ui组件 MessageBox,Toast弹窗组件引入

import request from "@/api/request";//请求链接封装引入
import dateUtil from "@/utils/dataTime.js";//时间日期方法引入
import storage from "@/utils/storage";//本地存储方法引入

export default {
    data(){
        return{
            maskIsShow:false,
            title:'错题详情',
            answer:{},
            errId: '',
            qid: '',
            detail: {
                reportType: 1
            },
            errTypeMap: [
                '', '题干有误', '选项有误', '答案有误', '题目过时'
            ],

            userRole: 1,
            questionType: 0, //错误类型
            showReasonBox: false,
            rightObj: {
                isMore: false,
                icon:'',
                title:''
            },
            imgUrl:'',//图片路径
        }
    },
    filters: {
        formatTime(t) {
            let date = new Date(t);
            let year  = date.getFullYear();
            let month = date.getMonth() + 1;
            let day   = date.getDate();
            let hour  = date.getHours();
            let minute = date.getMinutes();
            return year + '-' + month + '-' + day + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
        }
    },
    components : {
        AppHeader
    },
    created() {
        let query = this.$route.query;
        // console.log(query);
        let id = query.id;
        this.errId = id;
        this.qid = query.qid;
        this.qType = query.qType;

        this.getErrorHistoryDetail(id);

        this.userRole = storage.getRole();
    },
    updated() {
        // console.log("updated");
    },
    mounted() {
        // console.log("mounted");
        this.checkReview(this.detail);
    },
    // beforeRouteLeave (to, from, next) {
      // if (to.name == 'ExpertReview') {
      //   this.$route.meta.isUseCache = true
      // }
      // next();
    // },
    methods:{
        clickImg(){
            this.maskIsShow = !this.maskIsShow;
        },
        checkReview(detail) {
            return;
            if (detail.reportType >= 6) { // 该题目已审核，回到审核列表
                // console.log("checkReview: WrongTitle");
                this.$router.go(-1);return;
                this.$router.push({
                    path: '/user/ExpertReview'
                });
            }
        },
        getErrorHistoryDetail(id) {
            let self = this;
            request.getErrorHistoryDetail(id).then((data) => {
                // console.log('res',data);
                if (data.length == 0) {
                    // console.log("Not found");
                    return;
                }
                // console.log('details',data)
                let detail = data[0];
                self.imgUrl = JSON.parse(detail.oldContent).titleImg;//图片重置复制
                detail.answer = detail.answer.split('#').join('、')
                detail.oldContent = JSON.parse(detail.oldContent.replace(/\t+/g, ''));
                self.detail = detail;
                // console.log('details',self.detail)
                self.checkReview(detail); // 如果已审核，回到审核列表
            });
        },
        toExpertEdit() {
            // this.NeedModified=true;
            this.detail.qid = this.qid;
            this.detail.questionType = this.detail.qType = this.qType;
            this.detail.content = this.detail.oldContent;
            this.detail.imgUrl = this.detail.oldContent.titleImg;
            localStorage.setItem('err-detail', JSON.stringify(this.detail));
            localStorage.setItem('currentRoute',this.$route.path)//当前路由
            this.$router.push({
                path: '/user/ExpertEdit'
            });
        },
        computeLength(s, maxLen) {
            // console.log("computeLength");
            let len = 0, maxLenPos = 0;
            let newStr = '';
            for(let i=0; i<s.length; i++) {
                let isCn = s.charCodeAt(i)>128 ? true : false;
                if (isCn) {
                    len += 2;
                } else {
                    len += 1;
                }

                if (len <= maxLen) {
                    newStr += s[i];
                }
            }
            return len;
        },
        hideReasonBox() {
            this.showReasonBox = false;
        },
        confirmNoEdit() {
            let ele = document.getElementById('no-edit-msg');
            let msg = ele.value;
            // console.log(msg);

            msg = msg.replace(/^\s+/, '').replace(/\s+$/, '');
            let len = this.computeLength(msg, 20);
            // console.log("len=", len);
            if (len < 10) {
                Toast({
                    message: '至少输入5个字',
                    duration: 1500
                });
                return false;
            } else if (len > 200) {
                Toast({
                    message: '最多输入100个字',
                    duration: 1500
                });
                return false;
            }

            let self = this;
            let params = {
                errTabId: self.detail.errTabId,
                specialOpinion: '4', // 3 同意, 4 不同意
                specialExplain: msg,
                updateContent: '',
                auditStart: '3', // 3 初审, 4 复审
                questionId: self.qid, // 很重要
                errType: self.detail.errType
            };

            this.hideReasonBox();
            request.submitExpertEdit(params).then((data) => {
                // console.log("提交编辑返回:", data);
                if (data.code == 200) {
                    self.hideReasonBox();
                    Toast('提交成功');

                    self.$router.go(-1);
                }
            });
        },
        noEdit() {
            this.showReasonBox = true;
            return;

            const textarea =  `<textarea id="no-edit-msg" placeholder="请填写题目不需要修改的原因" rows="4" cols="38" style="padding:0.3rem;outline: none;border:none"></textarea> `
            let self = this;
            MessageBox({
                title:'',
                message: textarea,
                confirmButtonText:"确认",
                showCancelButton: true
            }).then((action) => {
                // console.log(action);
                if (action == 'confirm') {
                    let ele = document.getElementById('no-edit-msg');
                    let msg = ele.value;
                    // console.log(msg);

                    msg = msg.replace(/^\s+/, '').replace(/\s+$/, '');
                    let len = this.computeLength(msg, 20);
                    // console.log("len=", len);
                    if (len < 20) {
                        Toast({
                            message: '至少输入10个字',
                            duration: 1500
                        });
                        return false;
                    } else if (len > 200) {
                        Toast({
                            message: '最多输入100个字',
                            duration: 1500
                        });
                        return false;
                    }

                    let params = {
                        errTabId: self.detail.errTabId,
                        specialOpinion: '4', // 3 同意, 4 不同意
                        specialExplain: msg,
                        updateContent: '',
                        auditStart: '3', // 3 初审, 4 复审
                        questionId: self.qid, // 很重要
                        errType: self.detail.errType
                    };

                    request.submitExpertEdit(params).then((data) => {
                        // console.log("提交编辑返回:", data);
                        if (data.code == 200) {
                            Toast('提交成功');

                            self.$router.go(-1);
                        }
                    });
                }
            });
        },
        SubjectModification(){
            MessageBox({
                title:'提交成功',
                confirmButtonText:'2名专家复核后，将更新题库',
                showCancelButton: false,
                cancelButtonHighlight:true,
            });
            let router = this.$router
           setTimeout(function(){
                router.push({
                    path : "/user/WrongQuestion",
                    //  query : {
                    //    id : fieldId
                    //  }
                });
           },1000)
        },
        finish(){},
    }
}
</script>
<style>
    .mint-wrong-box > .mint-msgbox-content.mint-content{
        border-bottom: 0.01rem solid #f2f2f2 !important;
        padding: 0 0 0 0 !important;
    }
    .mint-msgbox-cancel {
        border-right: 0.01rem solid #f2f2f2  !important;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#979799;
        line-height:0.44rem;
    }
    .mint-btns-box.mint-msgbox-cancel {
        border-right: 0.01rem solid #f2f2f2  !important;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#979799;
        line-height:0.44rem;
    }
    .mint-msgbox-btn.mint-msgbox-confirm{
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#5480FE;
        line-height:0.44rem;
    }
    textarea[id='no-edit-msg']::-webkit-input-placeholder {
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#979797;
        line-height:0.28rem;
       /* padding: ; */
    }
    #no-edit-msg{
       position: relative;
       /* left: -0.3rem; */
        width: 93%;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#979797;
        line-height:0.28rem;
    }
    .mint-msgbox-message.mint-text{
        text-align: left !important;
        line-height: 36px;
    }
</style>

<style scoped>
    /*.selectOk {*/
      /*background: url(../../assets/images/true.png) no-repeat center;*/
      /*width: .32rem;*/
      /*height: .24rem;*/
      /*background-size: 100% 100%;*/
    /*}*/
    .option-select-trued {
      background: url(../../assets/images/true.png) no-repeat center;
      width: .32rem;
      height: .24rem;
      background-size: 100% 100%;
    }
    .select-falsed{
      background: url(../../assets/images/err.png) no-repeat center;
      width: .32rem;
      height: .24rem;
      background-size: 100% 100%;
    }
    .iconCoverBlue {
      float: left;
      display: inline-block;
      background: linear-gradient(180deg, #7ED1FF, #5480FE);
      width: 0.56rem;
      height: 0.56rem;
      line-height: 0.56rem;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .iconCoverRed {
      float: left;
      display: inline-block;
      background: linear-gradient(180deg, #FB9A9A, #F46060);
      width: 0.56rem;
      height: 0.56rem;
      line-height: 0.56rem;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .WrongTitle-header{
        /* padding: 0.88rem 0.32rem 0  0.32rem; */
        /* overflow: scroll; */
        /* overflow: hidden; */
        /* margin-bottom: 1rem; */
        padding-bottom: 4rem;
        height: 100%;
    }
    .WrongTitle-center.nopadding{
        /* padding: .2rem .0rem 0rem !important; */
        padding: 0rem 0.32rem 0 0.32rem;
        margin-top: 0.88rem;
    }
    .WrongTitle-center b{
        /* width:0.96rem;
        height:0.32rem; */
        font-size:0.35rem;
        font-family:PingFangSC-Regular;
        font-weight:700;
        color:#444444;
        line-height:0.32rem;
         margin-bottom: 0.24rem;
    }
    .WrongTitle-center p{
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#000000;
        line-height:0.44rem;
        padding-bottom: 0.3rem;
        padding-top: 0.1rem;
    }
    .WrongTitle-center hr{
        padding: 0rem;
        margin: 0rem;
        border: 0.01rem solid #f2f2f2;
    }
    .WrongTitle-foter{
        border-top:.01rem solid #f2f2f2;
        /* margin-bottom: 5rem; */
        padding: 0.2rem 0.32rem 0.1rem 0.32rem;
    }
    .WrongTitle-foter b{
        /* width:1.28rem;
        height:0.32rem; */
        font-size:0.35rem;
        font-family:PingFangSC-Regular;
        font-weight:700;
        color:#444444;
        line-height:0.32rem;
    }
    .WrongTitle-foter p{
        /* width:6.68rem; */
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#000000;
        line-height:0.44rem;
        padding-top: 0.1rem;
        word-wrap:break-word ;
    }
    .WrongTitle-foter-ul{
        line-height: 0.2rem;
        display: flex;
        align-items:center;
        justify-content:space-between;
        margin-top: 0.1rem;
    }
    .WrongTitle-foter-ul li:nth-child(1) img{
        width:0.24rem;
        height:0.24rem;
        border-radius: 50%;
         vertical-align:middle
    }
    .WrongTitle-foter-ul li:nth-child(1) span{
        /* width:0.96rem;
        height:0.24rem; */
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(252,67,67,1);
        line-height:0.24rem;
        margin-left: .08rem;
        vertical-align:middle
    }
    .error-man{
        margin-right: 1.8rem;
    }
    .WrongTitle-foter-ul li:nth-child(2) img{
        width:0.24rem;
        height:0.24rem;
        border-radius: 50%;
         vertical-align:middle
    }
    .WrongTitle-foter-ul li:nth-child(2) span{
        /* width:0.48rem;
        height:0.24rem; */
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.24rem;
        margin-left: .08rem;
        vertical-align:middle;
    }
    .WrongTitle-foter-ul li:nth-child(3) span{
        /* width:2.02rem;
        height:0.24rem; */
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.24rem;
    }
    .WrongTitle-btn{
        display: flex;
        align-items:center;
        /* justify-content:space-between; */
        width: 100%;
        position: fixed;
        left: 0.32rem;
        bottom: 0rem;
        /* margin-top: 0.2rem; */
        padding: 0.3rem 0.2rem;
        background: #fff;
    }

    .q-choice-list {
        margin: 0;
        padding: 5px;
        padding-left: 0;
        font-size: 0.35rem;
    }
    .q-choice {
        margin: 0;
        padding: 5px;
    }
    .q-choice-ok {
        color: #26a2ff;
    }
    .q-err-desc {
        margin-top: 0.3rem;
        padding: 0.15rem 0.15rem 0.20rem 0.15rem;
        border: solid 1px #eee;
        border-radius: 0.1rem;
        background-color: #eee;
        color: #777;
        font-size: 0.3rem;
    }
    .WrongTitle-btn .v-modal{
        top: 0 !important;
    }
    .v-modal{
        display: flex;
        top: 0 !important;
    }
    .error-aswer{
        display:flex;
        align-items:center;
        flex-shrink:0;
    }
    .error-man{
        display:flex;
        align-items:center;
        flex-shrink:0;
    }
    .uhide {
      display: none!important;
    }
    .mask {
      background: #000;
      width: 100%;
      height: 100%;
      position: fixed;
      top: .88rem;
      left: 0;
      z-index: 100;
    }
</style>

<style>
    .v-modal{
        top: 0 !important;
    }
    .WrongTitle-btn .mint-button{
       height: .88rem;
       line-height: .88rem;
   }
   .body-router.body-view {
       height: 100%;
       /* overflow: hidden; */
   }
</style>

