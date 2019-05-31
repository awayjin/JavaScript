<template>
<div class="tk-div" style="-webkit-overflow-scrolling: unset !important;">
    <div class="ub ub-ac head">
        <div class="head-left" @click="goBack">
        </div>
        <!-- 顶部圆角样式需要绑定v-bind:class来实现。样式已经写好，需要在元素上面动态传如页面的值。class-r 右边圆角样式，class-l 左边样式    -->
        <div class="head-mid">
            <p v-for="(item,index) in titleArr" :key="index" @click="switchBtn(index,$event)" :class="'fn-se bor-rad-l titleIs-active ' + (index == 0 ? 'class-l' : 'class-r') + (titleIsActive==index ? ' active' : '')">{{item}}</p>
        </div>
        <div class="ub ub-ac head-rigth" @click="swichMark">
            <div class="head-rigth-tx">{{questionTypeAr[questionTypeNum]}}</div>
            <div class="rigth-arrow"></div>
        </div>
    </div>
    <div class="content swipe-content" :style="'visibility:' + (showMe ? 'visible' : 'hidden')">
        <div class="main-content">
            <!-- 答题模式 -->
            <div class="subject-content" v-if="quetionModel">
                <yd-slider ref="dtSwipe" :loop="false" :callback="handleChange" :show-pagination="false" :continuous="false" :index="thisPageIndex" :total-pages="listArr.length">
                    <yd-slider-item v-for="(item,index) in listArr" :key="index" :class="'page-' + index">
                        <template v-if="item && Math.abs(realPageIndex-index)<20">
                            <!-- <p>{{item.id}}</p> -->
                        <div class="subject-wrap"><!--题干-->
                            <span class="type-of-question uncompressed">{{questionTypeAr[item.questionType]}}</span>
                            <span class="subject"  v-if="item.questionType <= 2"><!--单选、多选题-->
                              <span v-for="(it,k) in item.subjectParts">{{it}}
                                <b style="display:inline-block" v-if="k<item.subjectParts.length-1">（ ）</b>
                              </span>
                            </span>
                            <span class="subject"  v-else-if="item.questionType < 4">{{item.subject}}</span><!--单选、多选、判断-->
                            <span class="subject"  v-else><!--填空-->
                                <template v-if="item.userAnswer">
                                    <span v-for="(it,k) in item.subject" :key="k">{{it}}
                                        <p v-if="k<item.subject.length-1" :class="'fill-ans fill-ans-' + index + ' '  + (item.userAnswerArr[k] == item.answer[k] ? ' fill-ok' : ' fill-ng')">&nbsp;&nbsp;{{item.userAnswerArr[k]}}&nbsp;&nbsp;</p>
                                    </span>
                                </template>
                                <template v-else>
                                    <span v-for="(it,k) in item.subject" :key="k">{{it}}<minput v-if="k<item.subject.length-1" :ref="'fill-' + index + '-' + k" :index="index" :ak="k" @getStatus="iptGetStatus" @mchange="minputChange"></minput></span>
                                </template>
                            </span>
                            <!--题干中显示图片-->
                            <div class="img-content" @click="imgClick" v-if="item.imgUrl">
                              <img style="width:100%;height:3rem;" :src="item.imgUrl" alt="">
                            </div>
                        </div>
                        <div class="option option-content pad-b24">
                            <div class="ub option-div" v-for="(item1,index1) in item.choiceList" :key="index1" @click="handleOptionClick(index,index1)">
                                <div v-if="item1.showType == 'normal'" class="option-p1 key-answer" :data-ans="item.questionType==3 ? item1.id : ''">{{item.questionType != 3 ? item1.id : ''}}
                                </div>
                                <div v-else-if="item1.showType == 'ok'" class="option-select ub ub-ac ub-pc true-btn">
                                    <p class="option-select-true"></p>
                                </div>
                                <div v-else class="option-select-false-content ub ub-ac ub-pc false-btn">
                                    <p class="select-false"></p>
                                </div>

                                <p :class="'option-p2 option-p2-' + item1.showType">{{item1.value}}</p>
                            </div>
                            <div class="ub ub-ver answer">
                                <p :class="'answer-tx is-show-answer' + (item.hasError ? '' : ' v-hide')">答案:
                                    <span class="answer-tx-val"  v-if="item.questionType==1 || item.questionType==3">{{item.answer}}</span>
                                    <span class="answer-tx-val" v-else-if="item.questionType==2">{{item.answer.split('').join('、')}}</span>
                                    <template v-else><span class="answer-tx-val" style="margin-right:0.2rem" v-for="(ans,kx) in item.answer" :key="kx">{{ans}}</span></template>
                                </p>
                                <p class="tx-fs24 ub ub-ac" v-if="item.errorFlag == 1"  @click="maintenanceRecord(index)"><span>维护记录</span><img src="../../assets/images/texterror.png" alt="" class="tx-fs24-img"></p>
                                <!-- <p class="tx-fs24 marg-to ub ub-ac"  @click="ownerList(index)"><span>责任人列表</span><img src="../../assets/images/texterror.png" alt="" class="tx-fs24-img"></p> -->
                            </div>

                            <div :class="'nextAnswer' + index + ' uhide'" style="display:none">
                                <p class="answer-tx">答案:
                                    <span class="answer-tx-val">{{item.answer}}</span>
                                </p>
                            </div>
                        </div>
                        <div id="" class="ub ub-ac ub-pc pad-b24" >
                            <div class="confirm-the-answer" :class="{'uhide': canHideConfirmBtn(index)}" @click="handleConfirmClick(index)">
                                确认答案
                            </div>
                            <div class="confirm-the-answer" :class="{'uhide': !(thisConfirmed && thisError && index < totalQuestionsByType)}" @click="handleToNextClick(index)">
                                下一题
                            </div>
                        </div>
                        <div :class="'questionSource' + (item.hasError ? '' : ' v-hide')">
                            <span class="qSource">试题来源：</span>
                            <span class="sourceText">{{item.questionSource}}</span>
                        </div>
                        </template>

                    </yd-slider-item>
                    <yd-slider-item v-show="showLastPage" :key="listArr.length">
                        <final-question :batchNo="currentBatchNo" :finalOK="finalOK" :finalNG="finalNG" :finalUN="finalUN" :fieldId="fieldId"></final-question>
                    </yd-slider-item>
                </yd-slider>
            </div>

            <!-- 背题模式 -->
            <div class="subject-content" v-else>
                <yd-slider ref="btSwipe" :loop="false" :callback="handleChange" :show-pagination="false" :continuous="false" :index="thisPageIndex">
                    <yd-slider-item v-for="(item,index) in listArr" :key="index">
                        <div v-if="item" :class="'thiscontent'+index">
                            <div class="subject-wrap">
                                <span class="type-of-question uncompressed">{{questionTypeAr[item.questionType]}}</span>
                                <span class="subject"  v-if="item.questionType <= 2">
                                  <span v-for="(it,k) in item.subjectParts">{{it}}
                                    <b style="display:inline-block" v-if="k<item.subjectParts.length-1">（ ）</b>
                                  </span>
                                </span>
                                <span class="subject"  v-else-if="item.questionType < 4">{{item.subject}}</span>
                                <div class="subject" style="display: initial;" v-else>
                                    <span v-for="(it,k) in item.subject" :key="k">{{it}}
                                        <p v-if="k<item.subject.length-1" :class="'fill-ok fill-ans fill-ans-' + index">&nbsp;&nbsp;{{item.answer[k]}}&nbsp;&nbsp;</p>
                                    </span>
                                </div>
                                <!--题干中显示图片-->
                                <div class="img-content" @click="imgClick" v-if="item.imgUrl">
                                  <img style="width:100%;height:3rem;" :src="item.imgUrl" alt="">
                                </div>
                            </div>
                            <div class="option option-content pad-b24">
                                <div class="ub option-div" v-for="(item1,index1) in item.choiceList" :key="index1">
                                    <!-- :class="{'uhide' : selected==index1}" -->
                                    <div :class="'option-p1 key-answer' + (item.answer.indexOf(item1.id)>=0 ? ' uhide' : '')" :data-ans="item.questionType==3 ? item1.id : ''">{{item.questionType != 3 ? item1.id : ''}}</div>
                                        <div v-if="item.questionType <= 3" :class="'option-select ub ub-ac ub-pc true-btn' + (item.answer.indexOf(item1.id)>=0 ? '' : ' uhide') + (' right-selected' + item.answer)">
                                            <p class="option-select-true"></p>
                                        </div>
                                        <div v-else class="option-select-false-content ub ub-ac ub-pc uhide false-btn" :class="'falsel-selected'+item.answer">
                                            <p class="select-false"></p>
                                        </div>

                                    <p :class="'option-p2 option-p2-' + (item.answer.indexOf(item1.id)>=0 ? 'ok' : '')">{{item1.value}}</p>
                                </div>
                                <div class="ub ub-ver answer">
                                    <p class="answer-tx is-show-answer">答案:
                                        <span  class="answer-tx-val" v-if="item.questionType==1 || item.questionType==3">{{item.answer}}</span>
                                        <span  class="answer-tx-val" v-else-if="item.questionType==2">{{item.answer.split('').join('、')}}</span>
                                        <template v-else><span  class="answer-tx-val" style="margin-right:0.2rem" v-for="(ans,kx) in item.answer" :key="kx">{{ans}}</span></template>
                                    </p>
                                    <p class="ub tx-fs24 ub-ac" v-if="item.errorFlag == 1" @click="maintenanceRecord(index)"><span>维护记录</span><img src="../../assets/images/texterror.png"  class="tx-fs24-img" alt=""></p>
                                    <!-- <p class="tx-fs24 marg-to ub ub-ac"  @click="ownerList(index)"><span>责任人列表</span><img src="../../assets/images/texterror.png" alt="" class="tx-fs24-img"></p> -->
                                </div>

                                <div class="ub answer uhide" :class="'nextAnswer'+index">
                                    <p class="answer-tx">答案:
                                        <span class="answer-tx-val">{{item.answer}}</span>
                                    </p>
                                </div>
                                <div class="questionSource">
                                    <span class="qSource">试题来源：</span>
                                    <span class="sourceText">{{item.questionSource}}</span>
                                </div>
                            </div>
                        </div>
                    </yd-slider-item>
                </yd-slider>
            </div>
        </div>
    </div>

    <div class="footer-total ub" >
        <div class="fs-tx32 mar-l32 bor-sty" >
            <span style="width: 30px;display: inline-block;">{{totalQuestionsByType > 0 ? Math.min(totalQuestionsByType, realPageIndex+1) : 0}}</span> <!-- {{ listArr.length > 0 ? Math.min(thisPageIndex+1, this.listArr.length) : 0}} -->
            <span class="bor-sty-color">/</span>
            <span class="bor-sty-color" style="width: 30px;display: inline-block;">{{totalQuestionsByType}}</span> <!-- totalObj.currentBatchQusertionCount -->
        </div>
        <div class="footer-middle ub ub-f1 mar-r32">
            <div class="ub ub-ac footer-img footer-mar-r pad-tb24">
                <img src="../../assets/images/green.png" alt="" style="width:0.34rem;height:0.34rem">
                <span class="true-tx">{{rightTotal}}</span>
            </div>
            <div class="ub ub-ac footer-img footer-mar-r">
                <img src="../../assets/images/aswrong.png" alt="" style="width:0.34rem;height:0.34rem">
                <span class="false-tx">{{wrongTotal}}</span>
            </div>
            <div class="ub ub-ac footer-img" @click="getErroPage">
                <img src="../../assets/images/wrong.png" alt="" style="width:0.34rem;height:0.34rem;margin-right:0.13rem">
                <span style="color:rgba(102,102,102,1);font-family:PingFangSC-Regular;">报错</span>
            </div>
        </div>
    </div>


    <!-- 图片遮罩层 -->
    <div class="maskShow" v-if="maskShow">
      <div class="maskPic" @click="maskShow = false">
        <img style="width:100%;margin-top:30%;" :src="maskShowImg" alt="">
      </div>
    </div>
    <!-- 遮罩层 -->
    <div :class="{uhide:maskIsShow}">
        <div class="mask" @click="maskIsShow = true"></div>
        <div class="ub mask-content">
        <div v-for="(item,index) in questionTypeAr" :key="index" @click="typeSelection(index)"  class="question-select">{{item}}</div>
        </div>
    </div>

    <!-- 试题维护记录 -->
    <div class="mask-page" v-if="showMaintenance">
        <maintenance-record :questionCode="errQuestionCode" :questionId="errQuestionId" from="tk"></maintenance-record>
    </div>

    <!-- 试题责任人页面 -->
    <div class="mask-page" v-if="showOwnerList">
        <owner-list :questionId="errorQuestionId" from="tk"></owner-list>
    </div>

    <!-- 试题报错 普通用户 -->
    <div class="mask-page" v-if="showUserReport" style="position:absolute">
        <user-report-error from="tk"></user-report-error>
    </div>

    <!-- 试题报错 专家-->
    <div class="mask-page" v-if="showExpertReport" style="position:absolute">
        <expert-report-error from="tk"></expert-report-error>
    </div>


    <!-- 手势提示 -->
    <div class="mask-page" v-if="showPrompt">
        <prompt-window></prompt-window>
    </div>
</div>
</template>

<script type="text/babel">
import Vue from 'vue';
import { Slider, SliderItem } from './myydui/dist/lib.rem/slider'; //滑动组件
import { Toast } from 'mint-ui';//mint-ui组件引入

import AppHeader from "@/components/appHeader/AppHeader";//头部组件引入
import Minput from "./Minput";//填空题输入框组件引入
import requestMethods from "@/api/request"//请求链接的封装

import storage from "@/utils/storage";//本地缓存方法封装
import passContent from "@/utils/passContent";
const FinalQuestion = () => import('@/views/user/FinalQuestion'); // 最后一个做题统计页面
const MaintenanceRecord = () => import('@/views/questionBanks/MaintenanceRecord'); // 维护记录页面
const OwnerList = () => import('@/views/questionBanks/ownerList'); // 维护记录页面
const UserReportError = () => import('@/views/questionBanks/UserReportError'); // 普通用户提交报错答案
const ExpertReportError = () => import('@/views/questionBanks/ExpertReportError'); // 专家提交报错答案

const PromptWindow = () => import('@/views/user/PromptWindow'); // 首次进入时的滑动提示页面


export default {
    components : {
       AppHeader, FinalQuestion, MaintenanceRecord,
       UserReportError,ExpertReportError, PromptWindow, Minput,OwnerList,
       'yd-slider': Slider,
       'yd-slider-item': SliderItem
    },
    data() {
        return {
            maskShow:false,//图片遮罩
            maskShowImg:'',//遮罩图片
            footerShow:true,
            fieldId: '', // 当前题库id
            titleArr: ["答题模式","背题模式"],
            titleIsActive: 0,  // 当前模式: 0 答题模式，1 背题模式
            maskIsShow: true,  // 是否显示遮罩层
            totalQuestions: 0,       // 当前题库题目总数，没多大用了，用 totalQuestionsByType替代之
            totalQuestionsByType: 0, // 当前题型题目总数，当题型为 全部题型时，也用这个变量
            listArr: [],        // 题目列表
            thisPageIndex: 0,   // 控制滑动页面要首次显示的页面
            lastPageIndex: -1,  // 上次的页面位置
            realPageIndex: 0,   // 当前页面实际位置
            rightObj: {
              isMore:false,
              title:''
            },
            totalObj: { // 统计
                currentBatchCorrectCount: 0,
                currentBatchErrCount: 0
            },

            questionTypeAr: [  // 题型列表
                "全部题型","单选题","多选题","判断题","填空题"
            ],
            questionTypeNum: 0, //当前题型 0 1 2 3 4

            thisPage: 1,
            pageSize: 10,
            quetionModel: true, // 是否为答题模式 true 是 false 否

            isLast: false,
            readyToLast: false,
            currentBatchNo: '', // 当前批次号
            lastBatchNo: '', // 上次批次号
            rightTotal: 0,
            wrongTotal: 0,
            finalOK: 0,
            finalNG: 0,
            finalUN: 0,

           // nowId:'',

            showMaintenance: false,   // 是否显示维护记录页面
            showOwnerList: false,     //责任人页面
            errQuestionCode: '',      // 报错问题的questionCode
            errQuestionId: '',        // 报错问题的questionId
            errorQuestionId: '',
            //showTestQuestion: false,  // 是否显示报错页面
            showUserReport: false,
            showExpertReport: false,

            showPrompt: false,        // 是否显示手势提示
            lastQType: 0,             // 上次的题目类型
            fetchingData: false,      //
            previousSubmit: false,
            typeChanged: false,

            // 这三个变量仅用于暂时存储数据，获取题目时带上
            currentBatchUpdateTime: 0,
            newQuestionByTypeCount: 0,
            userQuestionByTypeCount: 0,
            flag: '',

            thisConfirmed: false, // 是否确认过答案
            thisError: false, // 当前题是否答错

            useMyStatistics: false, // 是否使用自己的统计，默认为 false
            islastqustion: 0,
            currentPageNum:'',//当前页码
            mainHei:'',//内容高度
            waterMarkId: '',
            userName: '',
            number: '',
        };
    },
    computed : {
        alreadyAnsweredNum () { //答题总数
            return Number(this.totalObj.currentBatchErrCount) + Number(this.totalObj.currentBatchCorrectCount);
        },
        showMe () { // 是否显示本页面
            return !(this.showMaintenance || this.showUserReport || this.showExpertReport);
        },
        showLastPage () { // 是否显示答题统计页面
            //console.log("showLastPage: realPageIndex=" + this.realPageIndex + ",tq:" + this.totalQuestionsByType);
            let len = this.totalQuestionsByType;
            let showLast = this.questionTypeNum == 0 && this.listArr.length > 0 && len > 0 && this.realPageIndex > 0 && this.realPageIndex + 1 >= len;
            //console.log("showLast=",showLast);
            return showLast;
        }
    },
    beforeDestroy () {
        document.body.style.overFlow = 'auto';
        this.saveStatus(); // 保存页面位置信息
        this.resetHeight();
    },
    created () {
        let win_h = $(window).height();
        window.addEventListener('resize', function () {
            if($(window).height() < win_h){
              document.getElementsByClassName('footer-total')[0].style = "display:none !important;"
            }else{
              document.getElementsByClassName('footer-total')[0].style = "display:block;"
            }
        });
        this.fieldId = this.$route.query.id; // 获取题库id
         // 恢复上次退出的页面位置
        //console.log("tk-cache:" + this.questionTypeNum + "," + this.realPageIndex);

        this.initBatchStatistics(true); // 获取批次号、做题统计

        document.body.style.webkitOverflowScrolling = 'unset';
    },
    mounted () {
        // 显示手势提示页面
        let key = 'see-prompt'; //this.$route.query.id + '-see-prompt'; // 只提示一次
        if (!localStorage.getItem(key)) {
            this.showPrompt = true;
            localStorage.setItem(key, 1);
        }

        this.$nextTick(() => {
            this.calcMainHeight();
        });
        // this.userName = localStorage.getItem('name');
        // this.number = localStorage.getItem('num')
        // let lay = document.getElementsByClassName('fixed-water-mark')[0];
        // if (!lay) {//如果水印结构不存在，重绘 否则直接展示水印结构
        //     this.paintFixedWaterMark(this.userName,this.number)
        // }
        // document.getElementsByClassName('fixed-water-mark')[0].style = 'display:block;'
    },
    // 用户离开题库时提交当前题目的答案
    beforeRouteLeave(to, from, next) {
        // if(to.name == 'Home') {
        //     document.getElementsByClassName('fixed-water-mark')[0].style = 'display:none;'
        // }
        try {
            let item = this.listArr[this.realPageIndex];
            // console.log("index:", this.realPageIndex);
            if (!this.previousSubmit && item) {
                // console.log('submit the last question');
                this.submitResult(item.id, item.questionType, item.userAnswer, item.answer);
            }
            next();
        } catch (e) {
            next();
        }
    },
    methods: {
        // paintFixedWaterMark(userName,number) {//添加水印方法
        //     var wrap = document.createElement("div");//创建一个div
        //     wrap.className = "fixed-water-mark";//给div添加类名
        //     // wrap.style.top = '50px;'
        //     var wm = document.createElement("canvas");//单个水印画布
        //     wm.id = "watermark";//给canvas标签添加id
        //     // wm.style.top = '50px;'
        //     wm.width = 160;//设置canvas宽
        //     wm.height = 120;//设置canvas高
        //     wm.style.display = "none";//设置画布隐藏属性
        //     wrap.appendChild(wm);//在div中添加画布
        //     var rwm = document.createElement("canvas");//重复绘制水印画布，用于整个页面
        //     // rwn.style.top = '30px'
        //     rwm.id = "repeat-watermark";
        //     wrap.appendChild(rwm);
        //     document.body.appendChild(wrap);
        //     //绘制单个水印
        //     var cw = document.getElementById('watermark');
        //     var ctx = cw.getContext("2d");
        //     ctx.clearRect(0, 0, 100, 80);//清空矩形
        //     ctx.font = "13px 黑体";//设置字体
        //     ctx.rotate(-20 * Math.PI / 180);//逆时针旋转20度
        //     ctx.fillStyle = "rgba(100,100,100,0.2)";//填充透明度为0.4的灰色
        //     ctx.fillText(userName+ - + number, -10, 60);//填充内容
        //     //在另一个画布上重复绘制单个水印
        //     var crw = document.getElementById('repeat-watermark');
        //     crw.width = window.innerWidth;//设置画布宽度等于窗口显示宽度
        //     crw.height = window.innerHeight;//设置画布高度等于窗口显示高度
        //     var ctxr = crw.getContext("2d");
        //     ctxr.clearRect(0, 0, crw.width, crw.height);
        //     var pat = ctxr.createPattern(cw, "repeat");//在水平和垂直方向重复绘制单个水印
        //     ctxr.fillStyle = pat;
        //     ctxr.fillRect(0, 0, crw.width, crw.height);
        // },
        imgClick(){//图片点击
            // this.maskShow = !this.maskShow;
        },
        finish () {},
        iptGetStatus(status){
            // let ua = navigator.userAgent.toLowerCase();
            // let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
            // let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            // if (/iphone|ipad|ipod/.test(ua)){
                // if(status == 'focus'){
                    // this.footerShow = false;
            //     }else
                // if(status == 'blur'){
                    // setTimeout(()=>{
                        // this.footerShow = true;
                    // },500)
                // }
            // }
            // if(/android/.test(ua)){
                if(status == 'focus'){
                    this.footerShow = false;
                }else if(status == 'blur'){
                    setTimeout(()=>{
                        this.footerShow = true;
                    },536)
                }
            // }
        },
        minputChange ($event, index, k) { // 填空题输入框事件处理
            // console.log("minputchanged");
            // console.log($event,index,k,status);
            let item = this.listArr[$event.index];
            if (item) {
                item.userAnswerArr.splice($event.ak, 1, $event.value);
            }
            // console.log(item);
        },
        calcMainHeight () { // 调整页面高度
            let bodyHeight = document.body.clientHeight;
            let tkDiv = document.querySelector(".tk-div");
            let header = tkDiv.querySelector(".head");
            let footer = tkDiv.querySelector(".footer-total");

            let headerHeight = header.offsetHeight;
            let footerHeight = footer.offsetHeight;
            let mainHeight = bodyHeight - headerHeight - footerHeight;
            this.mainHei = mainHeight;
            // console.log("headerH:" + headerHeight);
            // console.log("footerH:", footerHeight);
            // console.log("bodyH:", bodyHeight);

            let swiper = tkDiv.querySelector(".yd-slider");
            let swiperContent = tkDiv.querySelector(".swipe-content");
            let mainContent = tkDiv.querySelector(".main-content");
            let subjectContent = tkDiv.querySelector(".subject-content");
            //let mintSwipe = tkDiv.querySelector(".mint-swipe");

            swiper.style.height = mainHeight + 'px';
            swiperContent.style.height = mainHeight + 'px';
            mainContent.style.height = mainHeight + 'px';
            subjectContent.style.height = mainHeight + 'px';
            //mintSwipe.style.height = mainHeight + 'px';
            let tkDivWrap = tkDiv.parentElement;
            tkDivWrap.style.height = "100%";
        },
        resetHeight () { // 恢复高度
            let tkDiv = document.querySelector(".tk-div");
            if (tkDiv) {
                let tkDivWrap = tkDiv.parentElement;
                tkDivWrap.style.height = '';
            }
        },
        restoreStatus () { // 首次进入题库时，恢复上次页面位置信息
            let tkCache = localStorage.getItem('tk-cache');
            if (tkCache) {
                try {
                    tkCache = JSON.parse(tkCache);
                    let tkF = tkCache[this.fieldId];
                    if (tkF) {
                        let qType = parseInt(tkF.lastQType);
                        this.questionTypeNum = qType;
                        this.lastQType = qType;
                        this.realPageIndex   = tkF['lastIndex'][qType] || 0;
                        if (this.realPageIndex < 0) {
                            this.realPageIndex = 0;
                        }
                        this.lastBatchNo = tkF.lastBatchNo;

                        if (this.useMyStatistics) {
                            this.rightTotal = tkF.rightTotal || 0;
                            this.wrongTotal = tkF.wrongTotal || 0;
                        }
                    }
                } catch (e) {
                    // console.log("tkcache error:", e);
                }
            }
        },
        restoreStatusByQType (qType) { // 切换题型时，恢复该题型上次的页面位置信息
            let tkCache = localStorage.getItem('tk-cache');
            if (tkCache) {
                try {
                    tkCache = JSON.parse(tkCache);
                    let tkF = tkCache[this.fieldId];
                    if (tkF) {
                        this.realPageIndex   = tkF['lastIndex'][qType] || 0;
                        if (this.realPageIndex < 0) {
                            this.realPageIndex = 0;
                        }
                    }
                } catch (e) {
                    // console.log("tkcache error:", e);
                }
            }
        },
        clearStatus (fieldId) { // 如果批次号有更新，清除原批次号的缓存信息
            let tkCache = localStorage.getItem('tk-cache');
            if (tkCache) {
                tkCache = JSON.parse(tkCache);
                if (tkCache[fieldId]) {
                    delete tkCache[fieldId];
                    localStorage.setItem('tk-cache', JSON.stringify(tkCache));
                }
            }
        },
        saveStatus () { // 缓存页面位置信息
            let tkCache = localStorage.getItem('tk-cache');
            // console.log(tkCache)
            let fieldId = this.fieldId;
            let qType   = this.questionTypeNum;
            if (tkCache) {
                tkCache = JSON.parse(tkCache);
                if (tkCache[fieldId]) {
                    tkCache[fieldId]['lastIndex'][qType] = this.realPageIndex > 0 ? this.realPageIndex : 0;
                    tkCache[fieldId]['lastQType'] = qType;
                    tkCache[fieldId]['lastBatchNo'] = this.currentBatchNo; // 记住当前批次号，后面再次进入时比对
                    tkCache[fieldId]['rightTotal'] = this.rightTotal;
                    tkCache[fieldId]['wrongTotal'] = this.wrongTotal;
                } else {
                    let lastIndex = [];
                    lastIndex[qType] = this.realPageIndex > 0 ? this.realPageIndex : 0;
                    tkCache[fieldId] = {
                        'lastQType': qType,
                        'lastIndex': lastIndex,
                        'lastBatchNo': this.currentBatchNo,
                        'rightTotal': this.rightTotal,
                        'wrongTotal': this.wrongTotal
                    };
                }
            } else {
                tkCache = {
                };
                let lastIndex = [];
                lastIndex[qType] = this.realPageIndex;
                tkCache[fieldId] = {
                    'lastQType': qType,
                    'lastIndex': lastIndex,
                    'lastBatchNo': this.currentBatchNo,
                    'rightTotal': this.rightTotal,
                    'wrongTotal': this.wrongTotal
                };
            }
            localStorage.setItem('tk-cache', JSON.stringify(tkCache));
        },
        setReported (index) { // 设置该题目为已报错
            this.listArr[index].errorFlag = 1;
            this.$forceUpdate();
        },
        goBack () {
            requestMethods.getBatchStat(this.currentBatchNo, this.fieldId).then(() => {
            });
            this.$router.go(-1);
        },
        swichMark () { // 切换题型显示遮罩层
            this.maskIsShow = !this.maskIsShow;
        },
        checkSingleQuestion(item) { // 检查单选题答案
            let choiceList = item.choiceList;
            let hasError = item.userAnswer == item.answer ? false : true;
            if (!hasError) { // 答对了
                for(let i=0; i<choiceList.length; i++) {
                    if (item.userAnswer == choiceList[i].id) {
                        choiceList[i].showType = 'ok'; // 答对标记
                    } else {
                        choiceList[i].showType = 'normal'; // 非答案标记
                    }
                }
            } else { // 答错了
                for(let i=0; i<choiceList.length; i++) {
                    if (item.userAnswer == choiceList[i].id) {
                        choiceList[i].showType = 'error'; // 答错标记
                    } else if (item.answer == choiceList[i].id) {
                        choiceList[i].showType = 'ok'; // 正确答案标记
                    } else {
                        choiceList[i].showType = 'normal'; // 非答案标记
                    }
                }
            }

            item.choiceList = choiceList;
            return hasError;
        },
        checkMultiQustion(item) { // 检查多选题答案
            let choiceList = item.choiceList;
            let fanswer = item.answer; // 标准答案
            let fuserAnswer = item.userAnswer.split('').sort().join(''); // 用户答案
            let hasError = fanswer == fuserAnswer ? false : true;

            if (!hasError) { // 答对了
                for(let i=0; i<choiceList.length; i++) {
                    let code = choiceList[i].id;
                    //let userChose = item.userAnswer.indexOf(code) >= 0 ? true : false;
                    //let inAnswer  = item.answer.indexOf(code) >= 0 ? true : false;
                    if (fanswer.indexOf(code) >= 0) { // 既然都答对了，选项与标准答案比对即可
                        choiceList[i].showType = 'ok'; // 正确答案标记
                    } else {
                        choiceList[i].showType = 'normal'; // 非答案标记
                    }
                }
            } else { // 答错了
                for(let i=0; i<choiceList.length; i++) {
                    let code = choiceList[i].id;
                    if (fuserAnswer.indexOf(code) >= 0) { // 如果总体答案错误，只要用户选择了这个选项，一律标记为答错
                        choiceList[i].showType = 'error';
                    } else if (fanswer.indexOf(code) >= 0) { // 正确答案
                        choiceList[i].showType = 'ok'; // 正确答案标记
                    } else {
                        choiceList[i].showType = 'normal'; // 非答案标记
                    }
                }
            }

            item.choiceList = choiceList;
            return hasError;
        },
        checkJudgeQuestion (item){ // 与单选题一样
            return this.checkSingleQuestion(item);
        },

        // 预处理题目
        preFormatQuestion (item) {
            let questionType = item.questionType;

            // step 1. 预处理题目内容，防止JSON解析失败
            // let content = item.content.replace(/\t+/g, '');
            //
            let content = passContent.passContent(item.content);

            this.$set(item,'imgUrl',content.titleImg)
            this.maskShowImg = item.imgUrl;
            // console.log('item----',item)

            // console.log('content',content)
            //反斜杆处理
            // content.title = content.title.replace(/&##/g,'\\');
            // const choiceList = content.choiceList;
            // for(let i = 0; i < choiceList.length; i++){
            //     if(choiceList[i].value && choiceList[i].value.indexOf('&##') != -1){
            //         choiceList[i].value = choiceList[i].value.replace(/&##/g,'\\');
            //     }
            // }
            if(item.questionType !=4){
                content.title = content.title.replace(/&##/g,'\\');
                const choiceList = content.choiceList;
                for(let i = 0; i < choiceList.length; i++){
                    if(choiceList[i].value && choiceList[i].value.indexOf('&##') != -1){
                        choiceList[i].value = choiceList[i].value.replace(/&##/g,'\\');
                    }
                }

            }else{
                 content.title = content.title.replace(/&##/g,'\\');
                // return;
            }
            // step 2. 把常用字段提升到上一层，方便使用
            item.choiceList = content.choiceList; // 选项列表
            item.subject    = content.title;      // 题干

            // step 3. 处理题干
            if (questionType == 4) { // 填空题
                item.subject = content.title.split(/____/); // 一个 ____ 表示一个填空项
            } else if (item.questionType <= 2) { // 选择题
                // 处理括号不在同一行显示的问题
                let pattern = /（\s*）|\(\s*\)/;
                let subjectParts = content.title.split(pattern);
                item.subjectParts = subjectParts;
                item.hasPar = true;
                item.userAnswerArr = [];
            }

            // step 4. 处理标准答案
            if (questionType == 2) { // 多选题
                // 处理因从word导入导致的答案不规范问题
                item.answer = item.answer.replace(/^\s+/, '').replace(/\s+$/, '').split('').sort().join('');
            } else if (questionType == 4) { // 填空题
                item.answer = item.answer.split('#'); // 填空题用 # 分割答案
                // 顺便处理下用户答案
                if (item.userAnswer) { //
                    let userAnswerArr = item.userAnswer.split('#');
                    for(let i=userAnswerArr.length; i<item.answer.length; i++) {
                        userAnswerArr.push('');
                    }
                    item.userAnswerArr = userAnswerArr;
                } else {
                    item.userAnswerArr = new Array(item.answer.length);
                }
            }

            // step 5. 如果用户答过该题目 处理答案
            if (item.userAnswer) {
                let hasError = false;
                if (questionType == 1) { // 单选题选项与答案检查
                    hasError = this.checkSingleQuestion(item);
                } else if (questionType == 2) { // 多选题选项与答案检查
                    hasError = this.checkMultiQustion(item);
                } else if (questionType == 3) { // 判断题选项与答案检查
                    hasError  = this.checkJudgeQuestion(item);
                } else if (questionType == 4) { // 填空选项与答案检查
                    if (item.answer != item.userAnswer) {
                        hasError = true;
                    }
                }
                item.hasError = hasError;
                item.clicked = true; // 不能做题了
            } else { // 如果用户没有做过该题
                if (questionType != 4) { // 用户没有做过的题目，一律正常显示
                    let choiceList = item.choiceList;
                    for(let i=0; i<choiceList.length; i++) {
                        choiceList[i].showType = 'normal';
                    }
                    item.choiceList = choiceList;
                }
                item.clicked = false; // 可以做题
            }

            return item;
        },
        // 获取题目
        init (isFirst, direction) {
            this.fetchingData = true;
            let startPage = 0, size = 0;
            // debugger;
            // 计算要获取题目的序号
            if (isFirst) {
                this.lastQType = this.questionTypeNum;
                //console.log("isFirst:" + this.realPageIndex);
                startPage = this.realPageIndex + 1 > this.totalQuestionsByType ? 0 : this.realPageIndex; // 从最后一页退出时回到第一页
            }
            if(isFirst == false) {
                //console.log("noFirst:" + this.realPageIndex + "," + direction);
                startPage = this.realPageIndex + direction;
            }

            if (startPage == -1) {
                //console.log("already the first");
                this.fetchingData = false;
                return;
            }

            //console.log("get question:" + startPage);
            if (startPage + 1 > this.totalQuestionsByType) { // 已超过题目总数，不获取了
                this.fetchingData = false;
                return;
            }

            let currentBatchNoCache = localStorage.getItem("currentBatchNoCache");
            // let viewQTotal = 0;
            // this.listArr.forEach((v) => {
            //     if (v && v.id) {
            //         viewQTotal++;
            //     }
            // });
            let params = {};
            if(direction == 0){
                // debugger;
                 params = {
                    "fieldId": this.$route.query.id,
                    "batchNo": currentBatchNoCache,
                    "questionType": this.questionTypeNum,
                    "page": startPage + 1,
                    // "currentBatchUpdateTime": this.currentBatchUpdateTime,
                    // "newQuestionByTypeCount": this.newQuestionByTypeCount,
                    "userQuestionByTypeCount": this.userQuestionByTypeCount,
                    // "flag": this.flag // 是否首次进入题库作答
                    //"isNext": direction >= 0 ? '1' : '0' // 划题方向（0：上一题，1：下一题）
                };
            }
            if(direction > 0){//表示右滑
                // debugger;
                params = {
                    "fieldId": this.$route.query.id,
                    "batchNo": currentBatchNoCache,
                    "questionType": this.questionTypeNum,
                    "page": startPage + 1,
                    // "currentBatchUpdateTime": this.currentBatchUpdateTime,
                    // "newQuestionByTypeCount": this.newQuestionByTypeCount,
                    "userQuestionByTypeCount": this.userQuestionByTypeCount,
                    // "flag": this.flag // 是否首次进入题库作答
                    //"isNext": direction >= 0 ? '1' : '0' // 划题方向（0：上一题，1：下一题）
                };
            }
            if(direction < 0){
                // debugger;
                if(this.realPageIndex == 1){
                    startPage = startPage - 1;
                }
                params = {
                    "fieldId": this.$route.query.id,
                    "batchNo": currentBatchNoCache,
                    "questionType": this.questionTypeNum,
                    "page": startPage + 3,
                    // "currentBatchUpdateTime": this.currentBatchUpdateTime,
                    // "newQuestionByTypeCount": this.newQuestionByTypeCount,
                    "userQuestionByTypeCount": this.userQuestionByTypeCount,
                    // "flag": this.flag // 是否首次进入题库作答
                    //"isNext": direction >= 0 ? '1' : '0' // 划题方向（0：上一题，1：下一题）
                };
            }
            // if(isFirst){
            //     params.page = this.currentPageNum;
            // }
            let self = this;
            let totalQuestionsByType = this.totalQuestionsByType;
            //setTimeout(() => {
                requestMethods.questionBank(params).then((res)=> {
                    // console.log(res);

                  //  this.nowId= res.id
                    //this.thisPage++; 不用了
                    if (res.id == null || res.id == undefined) { // 没数据
                        this.fetchingData = false;
                        return;
                    }

                    // 处理题目
                    let item = res;
                    // item.oldContent = item.content;
                    // item.oldContent = JSON.parse(item.oldContent)

                    // let item = res;
                    item = self.preFormatQuestion(item);
                    // this.maskShowImg = item.imgUrl;
                    // console.log('this item',item)
                    if (isFirst) {
                        this.listArr = [];
                        this.listArr[totalQuestionsByType-1] = null;
                        this.listArr.splice(startPage, 1, item);

                        this.thisPageIndex = startPage;
                        this.realPageIndex = startPage;

                        this.$nextTick(() => {
                            if (this.quetionModel) {
                                this.$refs.dtSwipe.init();
                            } else {
                                this.$refs.btSwipe.init();
                            }
                        });

                        let prePage  = startPage - 1;
                        let nextPage = startPage + 1;

                        // 第一题马上传答案
                        this.$nextTick(() => {
                            this.submitResult (item.id, item.questionType, '', item.answer);
                        });

                        if (prePage >= 0) {
                            this.init(false, -1);
                        } else {
                            // console.log("prePage < 0");
                        }
                        if (nextPage <= totalQuestionsByType) {
                            this.init(false, 1);
                        } else {
                            // console.log("nextPage > total");
                        }

                        if (direction > 0 && totalQuestionsByType == 1) {
                            Toast({
                                message: self.questionTypeNum > 0 ? '已是当前题型的最后一题' : '已是最后一题',
                                duration: 1000
                            });
                        };
                    } else {
                        // 检查是否有重复题目
                        let thisIndex = startPage;
                        let startIndex = Math.max(thisIndex-3, 0);
                        let endIndex   = Math.min(self.listArr.length, thisIndex+3);
                        for(let i=startIndex; i<endIndex; i++) {
                            if (i != thisIndex && self.listArr[i] && self.listArr[i].id == item.id) {
                                // console.log("发现重复题目:" + item.id + ',' + i + ',' + thisIndex);
                                // console.log(item);
                                // console.log(self.listArr[i]);
                            }
                        }
                        self.listArr.splice(startPage, 1, item);
                        // console.log('listArr',self.listArr)
                    }
                    this.fetchingData = false;
                });
            //}, 1 + Math.random()*5);
        },

        // 首次进入题库，调用接口获取批次号、题目总数、对错统计
        initBatchStatistics (isFirst) {
            let fieldId = this.$route.query.id;
            let questionType = this.questionTypeNum;
            requestMethods.errorStatistics(fieldId,questionType).then((res)=>{
                // if (res.batchNo == null) {
                //     return;
                // }
                let data = res;
				//if(data.pageNum < 2){
                  //data.pageNum = 2
                //}
                this.currentPageNum  = data.pageNum;
                let tkCache = {};
                tkCache[this.fieldId] = {
                    lastQType: data.currentBatchQuestionType,
                    lastIndex: [data.pageNum - 2],
                    lastBatchNo: data.currentBatchNo,
                    rightTotal: data.currentBatchCorrectCount,
                    wrongTotal: data.currentBatchErrCount
                }
                localStorage.setItem("tk-cache",JSON.stringify(tkCache));
                this.restoreStatus();
                this.totalObj = data;
                // 首次统计来自后端接口
                if (!this.userMyStatistics) { // 默认使用后台的统计
                    this.rightTotal = data.currentBatchCorrectCount;
                    this.wrongTotal = data.currentBatchErrCount;
                }


                //缓存批次号
                let currentBatchNo = data.currentBatchNo;
                this.currentBatchNo = currentBatchNo;
                localStorage.setItem("currentBatchNoCache", currentBatchNo);
                if (isFirst && this.lastBatchNo != currentBatchNo) { // 第一次进入，且批次号已改变，以下参数恢复默认
                    //console.log("batchNo changed, ignore cache");
                    this.realPageIndex = 0;
                    this.questionTypeNum = 0;
                    this.lastQType = 0;
                    this.lastBatchNo = currentBatchNo; // 换批次号了，更新

                    this.clearStatus(fieldId); // 清除该题库的页面位置信息
                }

                this.quetionModel = data.currentBatchPattern == 1 ? 1 : 0; // 答题模式
                this.titleIsActive = this.quetionModel ? 0 : 1;
                this.questionTypeNum = data.currentBatchQuestionType; // 接口返回的题型
                //this.totalQuestions = 0; // 已废 data.currentBatchQusertionCount; // 当前题库试题总数

                let alreadyQCount = 0; // 已废 data.currentBatchAlreadyQuestionByTypeCount; // 用户当前批次题型下已答题量
                alreadyQCount = Math.max(alreadyQCount, this.rightTotal + this.wrongTotal);

                this.totalQuestionsByType = data.currentBatchTotalQuestionByTypeCount; // 用户当前批次题型下总题量
                if (alreadyQCount > this.totalQuestionsByType) {
                    alreadyQCount = this.totalQuestionsByType;
                }
                this.totalQuestions = this.totalQuestionsByType;

                // 如果要切换为自己的统计，注释掉改行代码
                //this.realPageIndex = alreadyQCount > 0 ? alreadyQCount - 1 : alreadyQCount;

                if (this.totalQuestions <= 0) {
                    if (this.questionTypeNum == 0) {
                        Toast("该题库没有试题");
                        setTimeout(()=>{
                          this.$router.go(-1);
                        },2500)

                    } else {
                        this.listArr = [];
                        this.$forceUpdate();
                        Toast("没有该题目类型的题目");
                        // this.$router.go(-1);
                    }
                    return;
                }

                // 暂存后端返回的数据，获取试题时返回给后端
                // this.currentBatchUpdateTime = data.currentBatchUpdateTime;
                // this.newQuestionByTypeCount = data.newQuestionByTypeCount; // 题库题型下最新插入的题量
                this.userQuestionByTypeCount = data.userQuestionByTypeCount; // 题库题型下用户首次划过题的总数
                //this.flag = data.flag;
                // 获取题目
                this.init(isFirst, 0);
            });
        },

        // 获取答题统计
        choiceTotal () {
            let fieldId = this.$route.query.id;
            let questionType = this.questionTypeNum;
            let self = this;
            // 由我自己统计了
            // requestMethods.errorStatistics(fieldId,questionType).then((res)=>{
            //     console.log(res);
            //     if (res.code != 200) {
            //         return;
            //     }
            //     let data = res.data;
            //     this.rightTotal = data.currentBatchCorrectCount;
            //     this.wrongTotal = data.currentBatchErrCount;

            //     console.log("readyToLast:", this.readyToLast);
            //     if (!this.readyToLast) {
            //         console.log(res);
            //         this.totalObj = res;
            //     } else {
            //         console.log("choiceTotal: not last");
            //     }
            // });
        },

        // 答题模式、背题模式 切换
        switchBtn (index,ev) {
             if (index == this.titleIsActive) {
                 return;
             }
             this.titleIsActive = index;
             if (this.quetionModel == 1) {
                 if (this.questionTypeNum == 0 && this.realPageIndex+1 >= this.totalQuestionsByType) {
                     this.thisPageIndex = this.totalQuestionsByType-1;
                 } else {
                     this.thisPageIndex = this.realPageIndex;
                 }
                 this.$nextTick(() => {
                    this.$refs.btSwipe.init();
                });
             } else {
                this.thisPageIndex = this.realPageIndex;
                this.$nextTick(() => {
                    this.$refs.dtSwipe.init();
                });
             }
             this.quetionModel = !this.quetionModel;
        },
        // 题型选择
        typeSelection (index) { // 刷新批次号
            // 保留当前状态
            this.saveStatus();
            this.lastQType = this.questionTypeNum;

            // let fieldId = this.$route.query.id;
            let fieldId =  this.fieldId;
            let questionType = index;
            this.questionTypeNum = index;

            this.maskIsShow = !this.maskIsShow;
            this.typeChanged = true;

            requestMethods.selectionQuestionType(fieldId,questionType).then((res)=>{
               if(res.code == 200) {
                    let data = res.data;
                    // 重新获取批次号
                    //this.initBatchStatistics(true);
                    // console.log("切换题型返回:", data);

                    //let alreadyQCount         = data.alreadyQuestionCount; 后台不返回，由我自己统计
                    this.totalQuestionsByType   = data.totalQuestionByTypeCount; // 用户题库题型下总题量
                    // this.newQuestionByTypeCount = data.newQuestionByTypeCount;   // 题库题型下最新插入的题量
                    this.userQuestionByTypeCount = data.userQuestionByTypeCount; // 题库题型下用户首次划过题的总数

                    // 已经切换为自己的统计
                    //this.realPageIndex = alreadyQCount > 0 ? alreadyQCount - 1 : alreadyQCount;

                    this.lastPageIndex = -1;

                    if (this.totalQuestionsByType <= 0) {
                        if (this.questionTypeNum == 0) {
                            Toast("该题库没有题目");
                        } else {
                            this.listArr = [];
                            this.$forceUpdate();
                            Toast("没有该题目类型的题目");
                        }
                        return;
                    }

                    // 尝试恢复该问题类型的状态
                    // 如果要切换为自己的统计，取消该代码的注释
                    this.restoreStatusByQType(questionType);

                    // 获取题目
                    this.init(true, 0);

                    this.readyToLast = false;
                    this.isLast = false;
               }
            //    console.log(res)
            });
        },
        checkLast () { // 检查是否到了最后一题
            //console.log("checkLast:");
            //console.log(this.listArr.length, this.realPageIndex);
            if (this.realPageIndex + 1 == this.listArr.length) {
                this.readyToLast = true;
                return;
            }
        },

        // 是否可以隐藏 确认 按钮
        canHideConfirmBtn (index) {
            let item = this.listArr[index];
            let canShow = false;
            if (!item.clicked) {
                if (item.questionType == 2) {
                    for(let i=0; i<item.choiceList.length; i++) {
                        if (item.choiceList[i].showType == 'ok') {
                            canShow = true;
                            break;
                        }
                    }
                } else if (item.questionType == 4) {
                    for(let i=0; i<item.userAnswerArr.length; i++) {
                        if (item.userAnswerArr[i]) {
                            canShow = true;
                            break;
                        }
                    }
                }
            }
            return !canShow;
        },

        canHideNextBtn (index) { // 是否隐藏下一个按钮
            let item = this.listArr[index];
            if (!item.hasError) {
                return true;
            }
            if (item.clickedNext) {
                return true;
            }
            return index+1 < this.totalQuestionsByType;
        },

        // 选择题、判断题选项点击处理
        handleOptionClick (index, index1) {
            // debugger;
            let item = this.listArr[index];
            let qType = item.questionType;
            if (item.userAnswer) { // 用户已经做过该题，不处理
                return false;
            }

            if (qType == 1 || qType == 3) { // 单选题
                let code = item.choiceList[index1].id;
                let hasError = false;

                if (code == item.answer) { // right
                    item.choiceList[index1].showType = 'ok';
                    this.rightTotal++;
                } else { // wrong
                    hasError = true;
                    item.choiceList[index1].showType = 'error';
                    for(let i=0; i<item.choiceList.length; i++) {
                        if (item.answer == item.choiceList[i].id) {
                            item.choiceList[i].showType = 'ok';
                        }
                    }
                    this.wrongTotal++;
                }

                item.userAnswer = code;
                item.hasError   = hasError;
                // TODO: submit result
                this.previousSubmit = true;
                this.submitResult(item.id, item.questionType, item.userAnswer, item.answer);

                if (!hasError) {
                    this.toNext();
                } else {
                    this.thisConfirmed = true;
                    this.thisError = true;
                }
            } else if (qType == 2) { // 多选题
                let code = item.choiceList[index1].id;
                if (item.choiceList[index1].showType == 'normal') {
                    item.choiceList[index1].showType = 'ok';
                } else {
                    item.choiceList[index1].showType = 'normal';
                }
            }
        },
        handleToNextClick (index) {
            this.listArr[index].clickedNext = true;
            this.thisConfirmed = false;
            this.thisError = false;
            this.toNext();
        },

        // 多选题、填空题 确认按钮点击处理
        handleConfirmClick (index) {
            let item = this.listArr[index];
            let qType = item.questionType;
            if (item.userAnswer) {
                return false;
            }

            if (qType == 2) { // 多选题
                let answer = item.answer;
                let userAnswer = '';
                let hasError = false;
                for(let i=0; i<item.choiceList.length; i++) {
                    let choice = item.choiceList[i];
                    let code = choice.id;
                    let selected = choice.showType == 'ok' ? true : false;
                    if (answer.indexOf(code) >= 0) { // it is the right answer
                        if (selected) { // user choose the right answer
                            item.choiceList[i].showType = 'ok';
                            userAnswer += code;
                        } else { // user miss the right answer
                            item.choiceList[i].showType = 'ok';
                            hasError = true;
                        }
                    } else {
                        if (selected) { // user choose the wrong answer
                            item.choiceList[i].showType = 'error';
                            userAnswer += code;
                            hasError = true;
                        } else {
                            // do nothing
                        }
                    }
                }

                item.userAnswer = userAnswer;
                item.hasError   = hasError;
                let fanswer = answer.split('').sort().join('');
                let fuserAnswer = userAnswer.split('').sort().join('');
                hasError = fanswer == fuserAnswer ? false : true;
                if (hasError) { // 最终是答案错误
                    for(let i=0; i<item.choiceList.length; i++) {
                        let choice = item.choiceList[i];
                        if (userAnswer.indexOf(choice.id) >= 0) { // 用户选择了这个选项
                            item.choiceList[i].showType = 'error';
                        }
                    }
                    this.wrongTotal++;
                } else {
                    this.rightTotal++;
                }
                // TODO: submit result
                this.previousSubmit = true;
                item.clicked = true;
                this.submitResult(item.id, item.questionType, item.userAnswer, item.answer);
                if (!hasError) {
                    this.toNext();
                } else {
                    this.thisConfirmed = true;
                    this.thisError = true;
                }
            } else if (qType == 4) { // 填空题
                let answer = item.answer;
                let hasError = false;
                let userAnswer = '';
                let userAnswerArr = [];

                for(let i=0; i<answer.length; i++) {
                    // console.log(this.$refs);
                    // debugger;
                    try{
                        let minput = this.$refs['fill-' + index + '-' + i][0];
                        // console.log(minput)
                        let s = minput.getValue();
                        s = s.replace(/^\s+/, '').replace(/\s+$/, '');
                        //console.log("getvalue:", s);
                        userAnswerArr.push(s);
                        if (s == '') { // 没有输入内容
                            minput.$el.style.borderColor = '#f90c0c';
                            hasError = true;
                        } else {
                            if (s != answer[i]) { // 答案错误
                                hasError = true;
                                minput.$el.style.color = '#f90c0c';
                            } else {
                                minput.$el.style.color = '#5480fe';
                            }
                        }
                    }catch(e){

                    }

                };

                item.userAnswerArr = userAnswerArr;
                item.userAnswer = userAnswerArr.join('#');
                item.hasError   = hasError;
                if (hasError) {
                    this.wrongTotal++;
                } else {
                    this.rightTotal++;
                }
                 // TODO: submit result
                this.previousSubmit = true;
                item.clicked = true;
                this.submitResult(item.id, item.questionType, item.userAnswer, item.answer.join('#'));
                if (!hasError) {
                    this.toNext();
                } else {
                    this.thisConfirmed = true;
                    this.thisError = true;
                }
            }
        },

        // 提交用户答案至后台，统一在此调用
        submitResult (questionId, questionType, userAnswer, answer) {
            this.checkLast();
            if (userAnswer === null) {
                userAnswer = '';
            }
            if (questionType == 4) {
                if (typeof userAnswer != 'string') {
                    userAnswer = userAnswer.join('#');
                }
                if (typeof answer != 'string') {
                    answer = answer.join('#');
                }
            }

            let currentBatchNoCache = localStorage.getItem("currentBatchNoCache");
            let params = {
                pattern: this.quetionModel ? 1 : 2,//模式(1：答题2：背题)
                fieldId: this.$route.query.id,//题库ID
                batchNo: currentBatchNoCache, //用户当前批号
                questionId:  questionId,//题目id
                questionType: questionType, // 题型
                answer: answer, //正确答案
                userAnswer: this.quetionModel ? userAnswer : "" // 用户答案 背题模式下用户答案为空
            }
            // debugger;
            // whether is the last one
            if (this.realPageIndex == this.listArr.length) {
                this.currentBatchNo = currentBatchNoCache;
            }

            this.finalOK = this.rightTotal;
            this.finalNG = this.wrongTotal;
            this.finalUN = Math.max(0, this.listArr.length - this.rightTotal - this.wrongTotal);

            //setTimeout(() => {

                //  if(userAnswer != "" && userAnswer != null ){
                    requestMethods.chooseTheAnswer(params).then((res) =>{
                    if(res.data === true) {
                        this.choiceTotal();
                        if (this.readyToLast) {
                            this.isLast = true;
                        }
                    }else{
                    // this.isLast = false;
                        }
                    });
                //  }

            //}, Math.random()*7);

        },

        // ydui slider滑动拦截方法，判断是否可以滑到下一页
        canMoveNext (index) {
            // console.log(index)
            // console.log("canMoveNext...");
            if (this.listArr.length == 0) {
                return false;
            }
            if(navigator.onLine === false){
                Toast({
                    message: '连接失败，请确保手机网络可用',
                    duration: 1000
                });
                return false;
            }
            // console.log('11111111111',res)
            // if(res.status == 200){

            // }
            if (this.questionTypeNum > 0 || this.quetionModel == 0) {
                if (index+1 >= this.totalQuestionsByType) {
                    Toast({
                        message: this.questionTypeNum > 0 ? "已是当前题型的最后一题" : "已是最后一题",
                        duration: 1500
                    });
                    return false;
                }
            }
            return true;
        },

        // 切换到下一个页面
        toNext () {
            let self = this;
            //console.log("toNext");
            //console.log("this.realPageIndex:", this.realPageIndex);
            //console.log("total:", this.totalQuestionsByType);
            if (this.realPageIndex + 1 >= this.totalQuestionsByType) { // 已经最后一页，不跳转
                // console.log("already the end");
                return;
            }
            setTimeout(function(){
                let nextIndex = self.realPageIndex + 1;
                if (self.quetionModel) {
                    // console.log("toNext1");
                    self.$refs.dtSwipe.toNext();
                    //self.$refs.dtSwipe.showItem(nextIndex);
                } else {
                    // console.log("toNext2");
                    self.$refs.btSwipe.toNext();
                    //self.$refs.btSwipe.showItem(nextIndex);
                }
                //self.handleChange(nextIndex);
            }, 300);
        },
        // 页面切换事件处理
        handleChange (index) {
            //console.log("index=", index);
            window.scrollTo(0, 0);
            this.thisConfirmed = false;
            this.thisError = false;
            this.islastqustion = index;

            //console.log("index:", index);
            // console.log("len:", this.listArr.length);

            if (this.listArr.length >0 && index >= this.listArr.length) { // 最后一题提交统计
            //debugger
                requestMethods.getBatchStat(this.currentBatchNo, this.fieldId).then(() => {
                });
            }

            let listArr = this.listArr;
            if (this.lastPageIndex == -1) { // 首次进入
                this.lastPageIndex = index;
                this.realPageIndex = index;
                if (!listArr[index + 1]) {
                    this.init(false, 1);
                }
                if (!listArr[index - 1]) {
                    this.init(false, -1);
                }

                let item = this.listArr[this.realPageIndex];
                if (!this.typeChanged && !this.previousSubmit && item) {
                    this.submitResult(item.id, item.questionType, item.userAnswer, item.answer);
                }
                return;
            }

            // 页面切换
            let direction = index - this.lastPageIndex;
            if (direction == 0) {
                return;
            }
            let self = this;
            if (direction > 0 && index + 1 == this.totalQuestionsByType) {
                Toast({
                    message:  self.questionTypeNum > 0 ? '已是当前题型的最后一题' : '已是最后一题',
                    duration: 1000
                });
            };
            this.lastPageIndex = index;

            if (this.lastQType == this.questionTypeNum) { // 没有更改题目类型
                //console.log("handleChange:" + this.realPageIndex + "," + direction);

                let item = this.listArr[this.realPageIndex];
                if (!this.typeChanged && !this.previousSubmit && item) { // 该题目没有提交过答案，提交之
                    this.submitResult(item.id, item.questionType, item.userAnswer, item.answer); // 注释掉该行，没做题目时不传答案
                } else {
                    //console.log("not submit:" + "previousSubmit=" + this.previousSubmit + ",typeChanged=" + this.typeChanged + ",realPageIndex=" + this.realPageIndex);
                }
                this.previousSubmit = false;

                // 计算下一页页码
                this.realPageIndex += direction;
                if (this.realPageIndex > this.totalQuestionsByType) {
                    this.realPageIndex -= direction;
                }
                if (this.realPageIndex < 0) {
                    this.realPageIndex = 0;
                }
                //console.log("realPageIndex=", this.realPageIndex);

                if (this.fetchingData) {
                    // console.log("fetchingData stop");
                    this.typeChanged = false;
                    //return false;
                }

                let nextPage = this.realPageIndex + direction;
                //console.log("nextPage:", nextPage);
                if (direction > 0) { // 往前滑，预取下一题，如过该题没有获取过
                    if (!listArr[this.realPageIndex+1]) this.init(false, 1);
                    // if (!listArr[this.realPageIndex - 1]) { // 不用了
                    //     this.init(false, -1);
                    // }
                } else { // 往后滑，预取上一题，如过该题没有获取过
                    if (!listArr[this.realPageIndex]) this.init(false, 0);
                    // if (!listArr[this.realPageIndex + 1]) { // 不用了
                    //     this.init(false, 1);
                    // }
                }
            } else {
                //console.log("qType:" + this.lastQType + "," + this.questionTypeNum);
            }

            this.typeChanged   = false;
        },

        // 维护记录页面
        maintenanceRecord (index) {
            // console.log("maintenance");
            let questionCode = this.listArr[index].questionCode;
            this.errQuestionCode = questionCode;
            this.errQuestionId   = this.listArr[index].id;
            localStorage.setItem('errorQuestionId',this.errQuestionId)
            this.showMaintenance = true;
            return;

            this.$router.push({
                path : "/MaintenanceRecord",
                query : {
                    code : questionCode
                }
            })
        },
        ownerList(index){//责任人页面
            // console.log('go ownerList methods') 
            this.errorQuestionId = this.listArr[index].id;
            // localStorage.setItem('errorQuestionId',this.errorQuestionId)
            // console.log('errorQuestionId',this.errorQuestionId)
            this.showOwnerList = true;
        },
        // 报错页面
        getErroPage (index) {
            let nowTime = new Date().getTime();
            let sixMonths = 6*30*24*60*60*1000;
            let thisPageArr = this.listArr;
            let thisIndex = this.realPageIndex; //this.thisPageIndex;
            let item = thisPageArr[thisIndex];
            if (!item) {
                return;
            }
            let params = item.questionCode;
            //题目
            let thisPageSubject = item.content;
            //正确答案
            let thisPageRightKey = item.answer;
            //题目类型
            let thisPageQuestionType = item.questionType;
            localStorage.setItem("thisPageSubject",thisPageSubject);
            localStorage.setItem("thisPageRightKey",thisPageRightKey);
            localStorage.setItem("thisPageQuestionType",thisPageQuestionType);
            requestMethods.getTestStatus(params).then((res) => {
                // console.log(res)
                if(res != null && res.length > 0) {
                    if(res[0].reportType == "5" || res[0].reportType == "6") {
                        Toast({
                            message: '该试题处于审核状态，暂不能报错！',
                            position: 'middle',
                            duration: 3000
                        });
                        return;
                    }else if(nowTime - res[0].createTime < sixMonths){
                        Toast({
                            message: '距离上次报错还未超过6个月！',
                            position: 'middle',
                            duration: 3000
                        });
                        return;
                    }
                }
                localStorage.setItem('errQuestion', JSON.stringify(item));
                localStorage.setItem('thisErrIndex', thisIndex);

                let userRole = storage.getRole();
                if (userRole != 2) { // 普通用户直接展示
                    this.showUserReport = true;
                } else {
                    requestMethods.isExpert(this.fieldId).then((data) => {
                        //console.log("判断是否为专家:", data);
                        if (data) {
                            this.showExpertReport = true;
                        } else {
                            this.showUserReport = true;
                        }
                    });
                }
            })

        },

    },
    // beforeRouteLeave (to, from, next) {
    //      if(to.name == "Home") {
    //         next(false);
    //         return
    //      }
    //      //返回键 控制
    //     next();
    // }
};
</script>

<style lang="less" scoped>
    //外部样式引入，flex布局样式
    @import "../../common/css/public";
    @import "./questionBankPage.less";
    .head{
        padding: 0.05rem 0rem;
        border-bottom: none !important;
        position: fixed;
        top: 0;
        left: 0;
        height: 0.88rem;
    }

    html,body,body>div{
        height: 100%;
        -webkit-overflow-scrolling: unset !important;
        scroll-behavior: unset;
    }
    .tk-div .yd-slider-item {
        box-sizing: border-box;
        padding: 0 0.4rem;
    }
    .yd-slider-item img{
        display: '';
    }
    .subject{
        font-size:0.4rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.56rem;
    }
    .subject input {
        width: auto;
        min-width: 1.0rem;
        /* max-width: 100%; */
        border: none;
        border-bottom: solid 1px #ddd;
        padding: 0 0.05rem;
        font-size: 0.35rem;
    }
    .questionSource {
        box-shadow:1px 1px 6px #ccc;
        padding: 0 0.1rem;
        height: 3rem;
        border-radius: 0.2rem;
        margin-top: 0.2rem;
        margin-bottom: 2rem;
    }
    .qSource {
        font-size: 0.36rem;
        font-family: PingFangSC-Regular;
        color: #444444;
        font-weight: 600;
        line-height: 0.36rem;
    }
    .sourceText {//试题来源
        font-size: 0.3rem;
        color: #444444;
        // font-weight: 500;
        overflow-wrap: break-word;
        line-height: 0.3rem;
        margin-left: -0.2rem;
    }
    .answer-tx p {
        text-indent: 2em;
    }
    .option-p2-ok{
        color: #5480FE!important;
    }
    .option-p2-error{
        /* color:rgba(244,96,96,1)!important; */
    }
    .fill-ok {
        color: #5e87fe!important;
    }
    .fill-ng {
        color: #f90c0c!important;
    }
    .content {
        position: relative;
    }
    .main-content .subject-content{
        position: absolute;
        top: 0.88rem;
        left: 0;
        bottom: 0.96rem; /*距离底部的距离为底部盒子的高度，自己也可以设置*/
        overflow-y: scroll;
        width: 100%;
        height: auto;
        -webkit-overflow-scrolling: touch!important;   /*这句是为了滑动更顺畅*/
        box-sizing: border-box;
    }
    .main-content .subject-content .option .option-p1 {
        font-size: 0.30rem;
        border: 1px solid rgba(68, 68, 68, 1);
        border-radius: 100%;
        width: 0.56rem;
        height: 0.56rem;
        text-align: center;
        line-height: 0.56rem;
        position: relative;
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        // border: 0.01rem solid transparent;
    }
    .main-content .subject-wrap {
        word-break: break-all;
        text-align: inherit;
    }
    .footer-total {
        position: absolute;
        bottom: 0;
        height: 0.96rem;
        z-index: 1000;
    }
    .bor-sty-color{
        color:#9e9e9e;
    }
    .marg-to {
        margin-top: 0.2rem !important;
    }
    .tx-fs24-img{
        width: 0.1rem;
        height: 0.06rem;
        transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        /* line-height: 0.2rem; */
        padding-top: 0.1rem;
    }
    .class-r{
        border-top-right-radius: 0.08rem;
        border-bottom-right-radius: 0.08rem;
    }
    .class-l{
        border-top-left-radius: 0.08rem;
        border-bottom-left-radius: 0.08rem;
    }

    .fill-ans {
        display: inline;
    }
    .fill-ok.fill-ans {
        border-bottom: solid 1px #5e87fe!important;
    }
    .fill-ng.fill-ans {
        border-bottom: solid 1px #f90c0c!important;
    }
    .maskPic {//放大后图片样式
        background: #000;
        width: 100%;
        height: 100%;
        position: fixed;
        top: .88rem;
        left: 0;
        z-index: 10000;
    }
    .mask-page {
        height: 100%;
        background: #fff;
    }
</style>

<style>
    .fixed-water-mark {
        position: fixed;
        pointer-events: none;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1600;
    }
    .fixed-water-mark #watermark {
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        opacity: 0.4;
        margin: 0 auto;
    }
</style>

