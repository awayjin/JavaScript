<template>
    <div>
        <div class="main-content"  :style="'display:' + (showMe ? 'block' : 'none')">
            <app-header :title="title" from="tk" :rightObj="rightObj" v-on:listFinish="finish">
                <div class="header-right" slot="headerRight" @click="getToProclamation"></div>
            </app-header>
            <div class="content">
                <div class="content-text">
                    <div class="tx-fs32 tx-cl444">错误类型</div>
                    <div class="ub ub-wrap type-content">
                        <p class="false-type" :class="{'is-active':activeIndex==index,'dsn':index == 1 && (questionType == 3 || questionType == 4)}" v-for="(item,index) in quetionTypeArr" :key="index" @click="swichBtn(index)">{{item}}</p>
                    </div>

                    <div class="out-text-area small" style="background:#eee">
                        <textarea id="q-desc" readonly v-model="specialExplain" class="text-area small" style="background:#eee" placeholder="请根据【试题来源】核实后，说明报错具体原因，并列出出处！"></textarea>
                    </div>
                </div>
            </div>

            <div class="commit-btn" @click="submit">
                <div class="commit-btn-tx">提交</div>
            </div>
        </div>

        <!-- 审核专家公示 -->
        <div class="mask-page" v-if="showProclamation">
            <proclamation from="the-test-question" :fieldId="fieldId"></proclamation>
        </div>

        <!-- 提交成功 -->
        <div class="mask-page" v-if="showSuccess">
            <successfully from="the-test-question" :fieldId="fieldId"></successfully>
        </div>
    </div>
</template>

<script type="text/babel">
import AppHeader from "@/components/appHeader/AppHeader";
import Proclamation  from "./Proclamation";
import Successfully  from "./Successfully";

import requestMethods from "@/api/request";
import { Toast, MessageBox } from 'mint-ui';

import request from "@/api/request";
import storage from "@/utils/storage";
import passContent from "@/utils/passContent";

export default {
    components : {
      AppHeader, Proclamation, Successfully
    },
    data() {
        return {
            rightObj: {
              isMore: true,
              title:''
            },
            title : "试题报错",
            activeIndex: -1,
            errTypeMap: [
                '', '题干有误', '选项有误', '答案有误', '题目过时'
            ],

            quetionTypeArr : ["题干错误","选项有误","答案有误","题目过时"],

            detail: null, // 题目详情

            specialExplain : "", // 专家审核说明
            newTitle: '', // 新的试题题干
            newChoiceList: [], // 新的试题选项
            choiceTxt: '',
            newAnswer: '',  // 新的试题答案
            optionList: [], // 选项列表
            checkChanged: false, // 是否修改了选项列表
            content: {},
            errType : -1,      // 错误类型
            questionType: -1,  // 题目类型

            //用户角色 -- 默认 1 普通用户 或 非该题库的专家，2 该题库的专家
            userRole: 1,
            readyShow: false, // 是否准备好显示界面

            question: null,
            fieldId: '',
            showProclamation: false, // 是否显示专家列表页面
            showSuccess: false,      // 是否显示提交成功页面

            thisErrIndex: 0, // 报错的试题id
            tounOff:true
        };
    },
    watch: {
        activeIndex: function(val) { // 用户选择了错误类型时，文本框改为可以输入
            let ele = document.getElementById('q-desc');
            if (ele.hasAttribute('readonly')) {
                ele.removeAttribute('readonly');
                ele.parentElement.style.background = '#fff';
                ele.style.background = '#fff';
            }
        }
    },
    computed: {
        showMe() {
            return !(this.showProclamation || this.showSuccess);
        }
    },
    created () {
        //this.userRole = storage.getRole();

        this.init();
    },
    mounted () {
    },
    destroyed () {
        //localStorage.removeItem('errQuestion');
    },
    methods: {
        finish(){},
        hideMe() {
            this.$parent.showUserReport = false;
            //this.$parent.$forceUpdate();
            // this.$parent.$nextTick(() => {
            //     alert(document.querySelector(".page-2").innerHTML);
            // });
        },
        hideSuccess() {
            this.showSuccess = false;
        },
        init () {
            this.thisErrIndex = localStorage.getItem('thisErrIndex');
            let question = localStorage.getItem('errQuestion');
            let detail = JSON.parse(question)

            if (typeof detail.answer == 'string') {
                detail.answer = detail.answer.replace(/^\s+/, '').replace(/\s+$/,'');
            } else {
                if (detail.questionType == 4) {
                    detail.answer = detail.answer.join('#');
                }
            }
            let content
            if (typeof detail.content === 'string') {
                content =  JSON.parse(detail.content.replace(/\s/g, ''))
            } else {
                content = detail.content
            }
            this.content = content
            this.newTitle = content.title;
            this.questionType = detail.questionType;
            this.fieldId = detail.fieldId;
            this.detail = detail;
        },
        // 错误类型按钮点击切换
        swichBtn (index) {
            let questionType = this.questionType;
            if ((questionType == 3 || questionType == 4) && index == 1) { // 判断题、填空题没有选项错误
                return;
            }

            let detail   = this.detail;
            let content  = this.content
            let errType  = index + 1;
            this.errType = errType;
            this.activeIndex = index;

            if (errType == 1) { // 题干有误
                this.newTitle = content.title;
            } else if (errType == 2) { // 选项错误
                if (questionType == 4) { // 填空题
                    this.newAnswer = detail.answer.split('#');
                }
                this.newChoiceList = content.choiceList;
                let choiceTxt = '';
                for(let i=0; i<content.choiceList.length; i++) {
                    let choice = content.choiceList[i];
                    choiceTxt += (choice.id + ': ' +   choice.value + "\n");
                }
                this.choiceTxt = choiceTxt;
            } else if (errType == 3) { // 答案错误
                if (questionType <= 3) {
                    // 处理选项
                    let optionList = [];
                    for(let i=0; i<content.choiceList.length; i++) {
                        let choice = content.choiceList[i];
                        let label = '';
                        if (questionType == 3) {
                            label = i == 0 ? 'A' : 'B';
                        } else {
                            label = choice.id;
                        }

                        let option = {
                            label: label + ': ' + choice.value,
                            value: choice.id,
                        };
                        if ((questionType == 1 || questionType == 3) && choice.id == detail.answer) {
                            option.disabled = true;
                        }
                        optionList.push(option);
                    }
                    this.optionList = optionList;
                    //console.log(optionList);

                    // 处理答案
                    if (questionType == 1) {
                        this.newAnswer = '';
                    } else if (questionType == 2) {
                        if (typeof detail.answer == 'string') {
                            this.detail.answer = detail.answer.split('');
                        }

                        //console.log(this.detail.answer);
                        this.newAnswer = this.detail.answer;
                    } else {
                        this.newAnswer = '';
                    }
                } else if (questionType == 4) { // 填空题
                    //console.log("questionType == 4");
                    let ans = [];
                    if (typeof detail.answer == 'string') {
                        ans = detail.answer.split('#');
                    } else {
                        ans = detail.answer;
                    }
                    this.answer = ans;
                    this.newAnswer = [];
                    for(let i=0; i<ans.length; i++) {
                        this.newAnswer.push('');
                    }
                }
            } else {
                this.newChoiceList = content.choiceList;
            }

            if (errType == 3) { // 答案错误
            } else {
                if (questionType != 4) {
                    this.newAnswer = detail.answer;
                }
            }
        },
        goBack () {
            this.$router.go(-1);
        },
        // 复制一个数组，并排序
        formatArr (arr) {
            let newArr = [];
            for(let i=0; i<arr.length; i++) {
                newArr.push(arr[i]);
            }
            newArr.sort();
            // console.log(newArr);
            return newArr.join('');
        },
        handleCheckListChange () {
            this.checkChanged = true;
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
        // 提交后台
        submit () {
            //console.log("submit");
            if(!this.tounOff){
                return;
            }
             this.tounOff=false
            let detail = this.detail;
            let errType = this.errType;
            let questionType = this.questionType;
            let newContent = '';

            if (this.activeIndex == -1) {
                Toast({
                    message: '请选择问题类型',
                    duration: 1500
                });
                this.tounOff=true
                return;
            }

            let desc = this.specialExplain.replace(/^\s+/, '').replace(/\s+$/, '');
            let len = this.computeLength(desc, 10);
            if (len < 10) {
                Toast({
                    message: '至少输入5个字',
                    duration: 1500
                });
                this.tounOff=true
                return;
            } else if (len > 200) {
                Toast({
                    message: '最多输入100个字',
                    duration: 1500
                });
                this.tounOff=true
                return;
            }

            let self = this;
            let params = {
                description: desc,
                fieldId: detail.fieldId,
                questionId: detail.id,
                questionCode: detail.questionCode,
                errType: errType,
                reportType: 1, // 考生报错
                updateContent: newContent,
            };
            request.chooseTtheAnswer(params).then((data) => {
                //console.log("提交报错返回:", data);
                if (data&&data.code == 200) {
                    self.$parent.setReported(localStorage.getItem('thisErrIndex'));
                    this.showSuccess = true;
                    this.tounOff=true
                    return;
                }else{
                    this.tounOff=true;
                    MessageBox('提示', '提交错误');
                    return;
                }
            });



        },

        //审核专家公示
        getToProclamation () {
            // console.log("goto proclamation");
            this.showProclamation = true;
            return;

            this.$router.push({
                path : "/Proclamation",
                query : {
                    fieldId : this.$route.query.fieldId
                }
            })
        },
        showMsg (){
            MessageBox({
                title: '提交成功',
                message: '2名专家复核通过后，将更新题库',
                showCancelButton: false,
                showConfirmButton: true
            });
            let router = this.$router;
            let self = this;
            setTimeout(function(){
                self.$router.go(-2);return;
                /*
                router.push({
                    path : "/user/ExpertReview",
                });*/
           }, 3000);
        },
        computeLength (s) {
            // console.log("computeLength");
            let len = 0, maxLenPos = 0;
            for(let i=0; i<s.length; i++) {
                if (s.charCodeAt(i)>128) {
                    len += 2;
                } else {
                    len += 1;
                }
            }
            return len;
        },
        resizeInput (e) {
            // console.log(e);
            let s = e.target.value;
            let len   = this.computeLength(s);
            e.target.style.width = Math.min(6.0, len * 0.18) + 'rem';
        },
    }
};
</script>

<style lang="less" scoped>
    //外部引入样式，flex布局
     @import "../../common/css/public";
    // .mask-page{
    //     background: #f2f4f5;
    // }
   body{
       background: #F2F4F5;
       .header-right{
           background:url("../../assets/images/icon-public-expert.png") center no-repeat;
           width: .44rem;
           height: .44rem;
           background-size: 100% 100%;
       }
       .content {
           background: #Fff;
           .content-text{
               padding: .48rem 0 .48rem .24rem;
               .tx-cl444{
                   font-size:0.32rem;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(68,68,68,1);
                    line-height:0.32rem;
               }
           }
          .type-content{
            padding-left: .16rem;
            margin-top: .32rem;
            .false-type{
               color: #444444;
               font-size: .32rem;
               background: #E7EDFF;
               border-radius: 2rem;
               padding: .22rem .32rem;
               margin-right: .4rem;
               margin-bottom: .4rem;
           }
           .is-active{
               color: #fff;
               background: #5480FE;
           }

         }
         .test-content{
             margin-right: .24rem;
             border: solid .01rem #E8E8E8;
             border-radius: .08rem;
             padding: .24rem;
             .text-area-sty{
                 width: 100%;
                 height: 2rem;
                 border: none;
                 outline:none;
                 resize: none;
             }
             .select{
                 margin-top: .16rem;
                 .content-left{
                     height: .36rem;
                     width: .36rem;
                     border: .02rem solid #e8e8e8;
                     border-radius: 100%;
                     margin-right: .2rem;
                 }
                 .selected{
                     width: .24rem;
                     height: .24rem;
                     background: #5480FE;
                     border-radius: 100%;
                 }
                 .selected-false{
                     width: .24rem;
                     height: .24rem;
                     border-radius: 100%;
                     background: #CCCCCC;
                 }
                 .select-content{
                     margin-bottom: .2rem;
                    color: #000;
                 }
             }
             .mar-t24{
                 margin-top: .24rem;
             }
             .tx-answer{
                 color: #979797;
             }
             .right-answer{
                 color: #5480FE;
             }
         }
         .q-title {
            font-size: 0.28rem;
            margin-right: 0.2rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(68,68,68,1);
            line-height:0.4rem;
         }
         .out-text-area1{
            margin-top: 0.2rem !important;
         }
         .out-text-area{
            margin-top: .32rem;
            margin-right: .24rem;
            border: solid .02rem #e8e8e8;
            padding: 0.24rem 0.24rem 0rem 0.32rem;
            border-radius: 0.2rem;
            .q-choice-list {
                // margin-top: -0.4rem;
                margin-bottom: 0.2rem;
                font-size: 0.30rem;
            }
            .option-list {
                margin-top: 0;
            }
            .q-choice {
                // height: 0.7rem;
                margin-top: 0.15rem;
                span {
                    font-size: 0.3rem;
                    padding-right: 0.1rem;
                }
                .old-ans{
                    font-size:0.28rem;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:black;
                    line-height:0.28rem;
                }
                .new-ans{
                    font-size:0.28rem;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:#5581f1;
                    line-height:0.28rem;
                }
                .q-choice-value {
                    font-size: 0.3rem;
                    padding: 0.1rem 0.1rem 0 0.1rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    min-width: 2.0rem;
                    border: none;
                    border-bottom: solid 1px #ddd;
                }
            }
            textarea::-webkit-input-placeholder {
                font-size:0.28rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(151,151,151,1);
                line-height:0.35rem;
            }

         }

        .text-area{
            width: 100%;
            height: 2.0rem;
            font-size: .28rem;
            color: #979797;
            border: none;
            outline: none;
            resize: none;

        }
         .small {
            height: 1.5rem;

         }
       }
       .commit-btn{
            padding: 0.48rem 0.24rem 0.96rem 0.24rem;
            // background: #f2f4f5;
            .commit-btn-tx{
                width: 100%;
                text-align: center;
                padding: .28rem 0;
                background: linear-gradient(90deg, #7ED1FF , #5480FE);
                background: -webkit-linear-gradient(90deg, #7ED1FF , #5480FE);
                background: -o-linear-gradient(90deg, #7ED1FF , #5480FE);
                border-radius: 4rem;
                font-weight:400;
                font-size: .34rem;
                color: #fff;
                box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
                -webkit-box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
            }
        }
        .border-top {
            padding: 0.1rem 0.3rem 0 0.3rem;
            border-top: 0.02rem solid #E8E8E8;
            padding-top: 0.24rem;
            padding-bottom: 0.24rem;
            margin-top: 0.3rem;
        }
        .grey {
            color: #999;
        }
        .new-ans {
            color: #5480FE;
        }
   }


</style>
<style >
  .dsn{
      display: none;
  }
    .mint-header .is-left .mint-button .mint-button-icon .mintui-back::before{
           color: #fff !important;
   }
    .mint-cell:last-child {
        background: none !important;
    }
    .mint-checklist {
        margin-left: -0.3rem;
    }
    .mint-radiolist {
        margin-left: -0.3rem;
    }

    .WrongTitle-center{
        padding: 0.2rem 0.32rem 0 0.32rem;
        /* border-top: solid 1px #ccc; */
        font-size:0.32rem;
        line-height: 0.5rem;
    }
    .wrong-concont{
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.44rem;
        margin-top: 0.24rem;
        margin-bottom: 0.2rem;
    }

     .mint-radio-input:checked + .mint-radio-core::after {
        background-color:#26a2ff !important;
        -webkit-transform: scale(1) !important;
        transform: scale(1) !important;
    }
     .mint-radio-input:disabled + .mint-radio-core::after {
        background-color:#ccc !important;
        -webkit-transform: scale(1) !important;
        transform: scale(1) !important;
    }
    .mint-radio-core::after {
        content: " " !important;
        border-radius: 100% !important;
        top: 3px !important;
        left: 3px !important;
        position: absolute !important;
        width: 12px !important;
        height: 12px !important;
        -webkit-transition: -webkit-transform .2s !important;
        transition: -webkit-transform .2s !important;
        transition: transform .2s !important;
        transition: transform .2s, -webkit-transform .2s !important;
        -webkit-transform: scale(0) !important;
        transform: scale(0) !important;
        background-color: #26a2ff !important;
        background: #26a2ff !important;
    }

   .mint-radio-input[disabled] + .mint-radio-core {
        background-color: #FFF !important;
        border-color: #ccc !important;
    }
    .mint-radio-core {
        -webkit-box-sizing: border-box !important;
        box-sizing: border-box !important;
        display: inline-block !important;
        background-color: #fff;
        border-radius: 100% !important;
        border: 1px solid #ccc !important;
        position: relative !important;
        width: 20px !important;
        height: 20px !important;
        vertical-align: middle !important;
    }
    .mint-radio-input:checked + .mint-radio-core {
        background-color: #fff !important;
        border-color: #ccc !important;
    }

    .mint-radio-label {
        vertical-align: middle;
        margin-left: 0.6rem !important;
        display: block !important;
        margin-top: -0.42rem !important;
        line-height: 0.4rem !important;
    }
    .mint-cell{
        /* min-height: 20px; */
        min-height: 0.6rem !important;
    }
    .mint-checkbox-label {
        vertical-align: middle !important;
        margin-left: 6px !important;
        vertical-align: middle !important;
        margin-left: 0.6rem !important;
        display: block !important;
        margin-top: -0.42rem !important;
        line-height: 0.4rem !important;
         /* min-height: 44px; */
    }

    /* 多选题的样式修改 */
    /* .mint-checkbox-core::after {
        border: 2px solid transparent !important;
        border-left: 0 !important;
        border-top: 0 !important;
        content: " " !important;
        top: 4px !important;
        left: 7px !important;
        position: absolute !important;
        width: 4px !important;
        height: 8px !important;
        -webkit-transform: rotate(45deg) scale(0) !important;
        transform: rotate(45deg) scale(0) !important;
        -webkit-transition: -webkit-transform .2s !important;
        transition: -webkit-transform .2s !important;
        transition: transform .2s !important;
        transition: transform .2s, -webkit-transform .2s !important;
    } */


</style>
