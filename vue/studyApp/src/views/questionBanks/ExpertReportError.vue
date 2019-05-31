<template>
    <div class="expert-box" style="height: 100%;">
        <div class="main-content"  :style="'display:' + (showMe ? 'block' : 'none')" style="height: 100%;">
            <app-header :title="title" from="tk" :rightObj="rightObj" v-on:listhFinish="finish">
                <div class="header-right" slot="headerRight" @click="getToProclamation"></div>
            </app-header>
            <div class="content">
                <div class="content-text">
                    <div class="tx-fs32 tx-cl444">错误类型</div>
                    <div class="ub ub-wrap type-content">
                        <p class="false-type"  :class="{'is-active':activeIndex==index,'dsn':index == 1 && (questionType == 3 || questionType == 4) }" v-for="(item,index) in quetionTypeArr" :key="index" @click="swichBtn(index)">{{item}}</p>
                    </div>
                    <!--<template v-if="activeIndex>=0">-->
                    <!--<div class="out-text-area out-text-area1" v-if="errType == 1"> &lt;!&ndash; 题干有误 &ndash;&gt;-->
                        <!--<textarea class="text-area" v-model="newTitle" style="textarea::-webkit-input-placeholder {-->
                            <!--font-size:0.28rem;-->
                            <!--font-weight:400;-->
                            <!--color:#000;-->
                            <!--line-height:0.4rem;-->
                        <!--}"></textarea>-->
                    <!--</div>-->
                    <!--<div class="" v-else-if="errType == 2"> &lt;!&ndash; 选项有误 &ndash;&gt;-->
                        <!--<p class="q-title border-top">{{newTitle}}</p>-->
                        <!--<div class="out-text-area out-text-area1">-->
                            <!--<ul class="q-choice-list" v-if="questionType <= 2">-->
                                <!--<textarea class="text-area" v-model="choiceTxt" style="textarea::-webkit-input-placeholder {-->
                                    <!--font-size:0.28rem;-->
                                    <!--font-weight:400;-->
                                    <!--color:#000;-->
                                    <!--line-height:0.4rem;-->
                                <!--}"></textarea>-->
                                <!--<li v-if="false" class="q-choice" v-for="(item,key) in newChoiceList">-->
                                    <!--<span>{{item.id}}:</span>-->
                                    <!--<p contenteditable="true" style="word-break:break-all">{{newChoiceList[key].value}}</p>-->
                                    <!--<input type="text" class="q-choice-value" @input="resizeInput($event)" v-model="newChoiceList[key].value"> &ndash;&gt;-->
                                <!--</li>-->
                            <!--</ul>-->
                            <!--<ul class="q-choice-list" v-else-if="questionType == 3"> &lt;!&ndash; 判断题 &ndash;&gt;-->
                                <!--<li class="q-choice" v-for="(item,key) in newChoiceList">-->
                                    <!--<span></span><input type="text" class="q-choice-value" @input="resizeInput($event)"  v-model="newChoiceList[key].value">-->
                                <!--</li>-->
                            <!--</ul>-->
                            <!--<ul class="q-choice-list" v-else>-->
                                <!--<li class="q-choice" v-for="(item,key) in newAnswer">-->
                                    <!--<span>选项{{key+1}}:</span><input type="text" @input="resizeInput($event)"  class="q-choice-value" v-model="newAnswer[key]">-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="out-text-area out-text-area1" v-else-if="errType == 3"> &lt;!&ndash; 答案有误 &ndash;&gt;-->
                        <!--<p class="q-title">{{newTitle}}</p>-->
                        <!--<ul class="q-choice-list option-list" v-if="questionType == 1"> &lt;!&ndash; 单选题 &ndash;&gt;-->
                            <!--<mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer">-->
                            <!--</mt-radio>-->
                            <!--<li class="q-choice"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>-->
                            <!--<li class="q-choice"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>-->
                        <!--</ul>-->
                        <!--<ul class="q-choice-list option-list" v-else-if="questionType == 2"> &lt;!&ndash; 多选题 &ndash;&gt;-->
                            <!--<mt-checklist :options="optionList" v-model="newAnswer" @change="handleCheckListChange">-->
                            <!--</mt-checklist>-->
                            <!--<li class="q-choice"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer.join('')}}</span></li>-->
                            <!--<li class="q-choice"><span class="grey">修改后答案: </span><span class="new-ans">{{checkChanged ? formatArr(newAnswer) : ''}}</span></li>-->
                        <!--</ul>-->
                        <!--<ul class="q-choice-list option-list" v-else-if="questionType == 3"> &lt;!&ndash; 判断题 &ndash;&gt;-->
                            <!--<mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer">-->
                            <!--</mt-radio>-->
                            <!--<li class="q-choice"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>-->
                            <!--<li class="q-choice"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>-->
                        <!--</ul>-->
                        <!--<ul class="q-choice-list option-list" v-else> &lt;!&ndash; 填空题 &ndash;&gt;-->
                            <!--<li class="q-choice"><span class="grey">原答案:</span></li>-->
                            <!--<li class="q-choice" v-for="(item,key) in detail.answer.split('#')"><span>填空项{{key+1}}: </span> {{item}}</li>-->
                            <!--<li class="q-choice"><span class="grey">修改后答案: </span></li>-->
                            <!--<li class="q-choice" v-for="(item,key) in newAnswer">-->
                                <!--<span>填空项{{key+1}}:</span>-->
                                <!--&lt;!&ndash; <input type="text" class="q-choice-value" @input="resizeInput($event)" v-model="newAnswer[key]"> &ndash;&gt;-->
                                <!--<minput :index="0" :ak="key" @mchange="minputChange"></minput>-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</div>-->
                    <!--</template>-->
                    <div class="out-text-area small" style="background:#eee" v-show="activeIndex >= 0">
                        <textarea id="q-desc" readonly v-model="specialExplain" class="text-area small" style="background:#eee" placeholder="请根据【试题来源】核实后，说明报错具体原因，并列出出处！"></textarea>
                    </div>
                </div>
            </div>

            <div class="WrongTitle-center" v-show="activeIndex < 0">
                <p class="wrong-concont">{{detail.content.title}}</p>
                <!-- 题干中显示图片 -->
                <div class="img-content" v-if="detail.imgUrl">
                  <img style="width:100%;height:3rem;" :src="imgUrl" alt="">
                </div>
                <ul class="q-choice-list">
                    <template v-if="questionType <= 2"> <!-- 单选题、多选题 -->
                    <li :class="'q-choice' + (detail.answer.indexOf(item.id)>=0 ? ' q-choice-ok' : '')" v-for="(item,key) in detail.content.choiceList">
                        {{item.id}}: {{item.value}}
                    </li>
                    </template>
                    <template v-else-if="questionType == 3">
                    <li :class="'q-choice' + (detail.answer == item.id ? ' q-choice-ok' : '')" v-for="(item,key) in detail.content.choiceList">
                        {{key == 0 ? 'A' : 'B'}}: {{item.value}}
                    </li>
                    </template>
                    <template v-else>
                    <li class="q-choice" v-for="(item,key) in detail.answer.split('#')">
                        <span>填空项{{key+1}}: </span>{{item}}
                    </li>
                    </template>
                </ul>
            </div>

            <div class="commit-btn" @click="submit" v-show="activeIndex >= 0">
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


        <div v-if="showReportError">
            <div class="mint-msgbox mint-box" style="z-index: 999;" >
                <div class="mint-msgbox-header mint-box-header">
                    <div class="mint-msgbox-title">提示</div>
                </div>
                <div class="mint-msgbox-content mint-content">
                    <div class="mint-msgbox-message mint-message">{{showQuetion}}</div>
                    <div class="mint-msgbox-input" style="display: none;">
                        <input placeholder="" type="text">
                        <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                    </div>
                </div>
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel " style="display: none;" @change="hiddenReportError">取消</button>
                    <button class="mint-msgbox-btn mint-msgbox-confirm " @click="confirmReportError">确定</button>
                </div>
            </div>
            <div class="v-modal" style="z-index: 998;"></div>
        </div>
    </div>
</template>

<script type="text/babel">
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引入
import Proclamation  from "./Proclamation";//审核专家公示页面引用
import Successfully  from "./Successfully";//本题库的专家审核公示页面
import Minput from "@/components/questionsBankModule/Minput";//填空题监听输入框组件引用

import requestMethods from "@/api/request";//请求链接地址封装
import { Toast, MessageBox } from 'mint-ui';//mint-ui引用

import request from "@/api/request"; //请求链接地址封装
import storage from "@/utils/storage";//本地缓存方法封装引用
import passContent from "@/utils/passContent";
export default {
    components : {
      AppHeader, Proclamation, Successfully, Minput
    },
    data() {
        return {
            rightObj: {
              isMore: true,
              title:'',
              // icon:'&#xe71d;'
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
            oldAnswer: '',  // 旧的试题答案
            optionList: [], // 选项列表
            checkChanged: false, // 是否修改了选项列表

            errType : -1,      // 错误类型
            questionType: -1,  // 题目类型

            //用户角色 -- 默认 1 普通用户 或 非该题库的专家，2 该题库的专家
            userRole: 2,
            readyShow: false, // 是否准备好显示界面

            question: null,
            fieldId: '',
            showProclamation: false, // 是否显示专家列表页面
            showSuccess: false,      // 是否显示提交成功页面

            thisErrIndex: 0, // 报错的试题id
            showReportError:false, //模态窗显示或隐藏
            showQuetion:'',//模态窗提示内容
            ExpertOff:true,
            imgUrl:'',//图片地址
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
        this.userRole = storage.getRole();

        this.init();
    },
    mounted () {
    },
    destroyed () {
        //localStorage.removeItem('errQuestion');
    },
    methods: {
        confirmReportError(){
            this.showReportError=false
        },
        hideMe() {
            this.$parent.showExpertReport = false;
            //this.$parent.$forceUpdate();
        },
        hideSuccess() {
            this.showSuccess = false;
        },
        minputChange ($event, index, k) { // 填空题输入框事件处理
            //console.log("minputchanged");
            //console.log($event);
            this.newAnswer[$event.ak] = $event.value.replace(/\t+/g, '');
            // console.log(this.newAnswer);
        },
        init () {
            // debugger;
            this.thisErrIndex = localStorage.getItem('thisErrIndex');
            let question = localStorage.getItem('errQuestion');
            let detail = JSON.parse(question);
            this.imgUrl = detail.content.titleImg;
            // console.log("details:", detail);
            this.imgUrl = detail.imgUrl;
            // debugger;
            if (typeof detail.answer == 'string') {
                this.oldAnswer = detail.answer.replace(/\t+/g, '');
            } else {
                if (detail.questionType == 4) {
                    detail.answer = detail.answer.join('#');
                    this.oldAnswer = detail.answer.replace(/\t+/g, '');
                } else if (detail.questionType == 2) {
                    this.oldAnswer = detail.answer.join('');
                }
            }
            //console.log("oldAnswr:", this.oldAnswer);
            //
            let content = passContent.passContent(detail.content);

            try{
                for(let i = 0; i < content.choiceList.length; i++){
                if(content.choiceList[i].value && content.choiceList[i].value.indexOf("&##") != -1 ){
                    content.choiceList[i].value =content.choiceList[i].value.replace(/&##/g, '\\');
                    }
                }
            }catch(e){

            }

            detail.content = content;
            content.title = content.title.replace(/&##/g, '\\');
            this.newTitle = content.title.replace(/\t+/g, '');
            this.questionType = detail.questionType;
            this.fieldId = detail.fieldId;
            this.detail = detail;

            //console.log(detail);
            // 如果是专家，进一步判断是否为该题库的专家，才能编辑试题
            if (this.userRole == 2) {
                request.isExpert(detail.fieldId).then((data) => {
                    //console.log("判断是否为专家:", data);
                    if (data) {
                        this.userRole = 2;
                    } else {
                        this.userRole = 1;
                    }
                });
            }
        },
        // 错误类型按钮点击切换
        swichBtn (index) {
            let questionType = this.questionType;
            if ((questionType == 3 || questionType == 4) && index == 1) { // 判断题、填空题没有选项错误
                return;
            }
            let detail   = this.detail;
            let content  = detail.content;
            let errType  = index + 1;

            // if (errType == 1) { // 题干有误
            //     this.newTitle = content.title.replace(/\t+/g, '');
            // } else if (errType == 2) { // 选项错误
            //     if (questionType == 4) { // 填空题
            //         if (typeof detail.answer == 'string') {
            //             this.newAnswer = detail.answer.split('#');
            //         }
            //     }
            //     this.newChoiceList = content.choiceList;
            //     let choiceTxt = '';
            //     for(let i=0; i<content.choiceList.length; i++) {
            //         let choice = content.choiceList[i];
            //         choiceTxt += (choice.id + ': ' +   choice.value + "\n");
            //     }
            //     this.choiceTxt = choiceTxt.replace(/\t+/g, '');
            // } else if (errType == 3) { // 答案错误
            //     if (questionType <= 3) {
            //         // 处理选项
            //         let optionList = [];
            //         for(let i=0; i<content.choiceList.length; i++) {
            //             let choice = content.choiceList[i];
            //             let label = '';
            //             if (questionType == 3) {
            //                 label = i == 0 ? 'A' : 'B';
            //             } else {
            //                 label = choice.id;
            //             }
            //
            //             let option = {
            //                 label: label + ': ' + choice.value,
            //                 value: choice.id,
            //             };
            //             if ((questionType == 1 || questionType == 3) && choice.id == detail.answer) {
            //                 option.disabled = true;
            //             }
            //             optionList.push(option);
            //         }
            //         this.optionList = optionList;
            //         //console.log(optionList);
            //
            //         // 处理答案
            //         if (questionType == 1) {
            //             this.newAnswer = '';
            //         } else if (questionType == 2) {
            //             if (typeof detail.answer == 'string') {
            //                 this.detail.answer = detail.answer.split('');
            //             }
            //
            //             //console.log(this.detail.answer);
            //             this.newAnswer = this.detail.answer;
            //         } else {
            //             this.newAnswer = '';
            //         }
            //     } else if (questionType == 4) { // 填空题
            //         //console.log("questionType == 4");
            //         let ans;
            //         if (typeof detail.answer == 'string') {
            //             ans = detail.answer.split('#');
            //         } else {
            //             ans = detail.answer;
            //         }
            //
            //         this.answer = ans;
            //         this.newAnswer = [];
            //         for(let i=0; i<ans.length; i++) {
            //             this.newAnswer.push('');
            //         }
            //     }
            // } else {
            //     this.newChoiceList = content.choiceList;
            // }
            //
            // if (errType == 3) { // 答案错误
            // } else {
            //     if (questionType != 4) {
            //         this.newAnswer = detail.newAnswer;
            //     }
            // }

            this.errType = errType;
            this.activeIndex = index + 1;
            this.detail.errType = this.activeIndex;
            // console.log('报错详情',detail)
            localStorage.setItem('err-detail', JSON.stringify(this.detail));
            localStorage.setItem('currentRoute',this.$route.path)//当前路由
            // console.log('专家报错detail',this.detail)
            this.$router.push({
                name: 'ExpertEdit'
            });
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
            // debugger
            //console.log("submit");
            if (!this.ExpertOff) {
                return;
            }
            this.ExpertOff=false;
            let detail = this.detail;
            let errType = this.errType;
            let questionType = this.questionType;
            let newContent = '';



            if (this.activeIndex == -1) {
                Toast({
                    message: '请选择问题类型',
                    duration: 1500
                });
                this.ExpertOff=true;
                return;
            }

            let desc = this.specialExplain.replace(/^\s+/, '').replace(/\s+$/, '');
            let len = this.computeLength(desc, 10);
            if (len < 10) {
                Toast({
                    message: '至少输入5个字',
                    duration: 1500
                });
                this.ExpertOff=true;
                return;
            } else if (len > 200) {
                Toast({
                    message: '最多输入100个字',
                    duration: 1500
                });
                this.ExpertOff=true;
                return;
            }

            // 专家报错，检查试题编辑情况
            if (this.userRole == 2) {
                if (errType == 1) { // 题干错误
                    if (this.newTitle.replace(/^\s+/, '').replace(/\s+$/) == '') {
                        //MessageBox('提示', '题干不能为空');
                        this.showQuetion='题干不能为空'
                        this.showReportError=true;
                        this.ExpertOff=true;
                        return;
                    }

                    let content = detail.content;
                    if (content.title == this.newTitle) {
                        Toast("题干内容未修改");
                        this.ExpertOff=true;
                        return;
                    }

                    content.title = this.newTitle;
                    content.title = content.title.replace(/"([^"]*)"/g, "“$1”");
                    content.title = content.title.replace(/'([^']*)'/g, "‘$1’");
                    let clist = content.choiceList;
                    for(let i = 0; i < clist.length; i++){
                        let c = clist[i].value;
                        clist[i].value = c.replace(/"([^"]*)"/g, "“$1”").replace(/'([^']*)'/g, "‘$1’");
                    }
                    content.choiceList = clist;
                    newContent = JSON.stringify(content);
                } else if (errType == 2) { // 选项有误
                    if (questionType <= 2) { // 单选题、多选题
                        let lines = this.choiceTxt.split("\n");
                        let choiceList = [];
                        for(let i=0; i<lines.length; i++) {
                            let m = /^([A-Z]): /.exec(lines[i]);
                            if (m) {
                                let choice = {
                                    id: m[1],
                                    value: lines[i].substring(2)
                                };
                                choiceList.push(choice);
                            } else {
                                choiceList[choiceList.length-1].value += lines[i];
                            }
                        }
                        //console.log(choiceList);
                        if (choiceList.length == 0) {
                           // MessageBox('提示', '选项内容不能为空');
                            this.showQuetion='选项内容不能为空';
                            this.showReportError=true;
                             this.ExpertOff=true;
                            return;
                        }

                        let oldChoiceList = this.newChoiceList;
                        // console.log(oldChoiceList)
                        // debugger
                        let changed = oldChoiceList.length == choiceList.length ? false : true; // 是否修改选项内容
                        for(let i=0; i<choiceList.length; i++) {
                            choiceList[i].value = choiceList[i].value.replace(/^\s+/, '').replace(/\s+$/);
                            if (choiceList[i].value == '') {
                               // MessageBox('提示', '选项内容不能为空');
                                this.showQuetion='选项内容不能为空';
                                this.showReportError=true;
                                 this.ExpertOff=true;
                                return;
                            } else if (!changed) {
                                if (choiceList[i].value != oldChoiceList[i].value) {
                                    changed = true; // 有一个选项修改了就修改了
                                }
                            }
                        }
                        if (!changed) {
                            //MessageBox('提示', '选项内容未修改');
                            // this.showQuetion='选项内容未修改';
                            // this.showReportError=true;
                            Toast("选项内容未修改");
                             this.ExpertOff=true;
                            return;
                        }

                        let content = detail.content;
                        content.choiceList = choiceList;
                        content.title = content.title.replace(/"([^"]*)"/g, "“$1”");
                        content.title = content.title.replace(/'([^']*)'/g, "‘$1’");
                        let clist = content.choiceList;
                        for(let i = 0; i < clist.length; i++){
                            let c = clist[i].value;
                            clist[i].value = c.replace(/"([^"]*)"/g, "“$1”").replace(/'([^']*)'/g, "‘$1’");
                        }
                        content.choiceList = clist;
                        newContent = JSON.stringify(content);
                        //console.log(newContent);
                    } else if (questionType == 3) { // 判断题
                        let choiceList = [];
                        for(let i=0; i<this.newChoiceList.length; i++) {
                            let val = this.newChoiceList[i].value;
                            choiceList.push({
                                id: val,
                                value: val
                            });
                        }
                        let content = detail.content;
                        content.choiceList = choiceList;
                        content.title = content.title.replace(/"([^"]*)"/g, "“$1”");
                        content.title = content.title.replace(/'([^']*)'/g, "‘$1’");
                        let clist = content.choiceList;
                        for(let i = 0; i < clist.length; i++){
                            let c = clist[i].value;
                            clist[i].value = c.replace(/"([^"]*)"/g, "“$1”").replace(/'([^']*)'/g, "‘$1’");
                        }
                        content.choiceList = clist;
                        newContent = JSON.stringify(content);
                        //console.log(newContent);
                    } else { // 填空题
                        newContent = this.newAnswer.join('#');
                    }
                } else if (errType == 3) { // 答案有误
                    newContent  = this.newAnswer;
                    if (questionType == 1) {
                        if (this.newAnswer.length == 0) {
                           // MessageBox('提示', '请选择新的答案');
                           this.showQuetion='请选择新的答案';
                           this.showReportError=true;
                            this.ExpertOff=true;
                            return;
                        }
                    } else if (questionType == 2) { // 多选题
                        if (this.newAnswer.length < 2) {
                           // MessageBox('提示', '多选题至少两个选项');
                            this.showQuetion= '多选题至少两个选项';
                            this.showReportError=true;
                             this.ExpertOff=true;
                            return;
                        }

                        newContent = newContent.sort().join('');
                    } else if (questionType == 3) { // 判断题
                        if (this.newAnswer.length == 0) {
                           // MessageBox('提示', '请选择新的答案');
                            this.showQuetion='请选择新的答案';
                            this.showReportError=true;
                             this.ExpertOff=true;
                            return;
                        }
                    } else if (questionType == 4) { // 填空题
                        let answer = this.newAnswer;
                        for(let i=0; i<answer.length; i++) {
                            if (answer[i].replace(/^\s+/, '').replace(/\s+$/) == '') {
                               // MessageBox('提示', '答案不能为空');
                                this.showQuetion='答案不能为空';
                                this.showReportError=true;
                                 this.ExpertOff=true;
                                return;
                            }
                        }
                        //console.log(this.newAnswer);

                        newContent = this.newAnswer.join('#');
                        //console.log("fill:", newContent);
                    }

                    if (newContent == this.oldAnswer) {
                        // this.showQuetion='答案未修改';
                        // this.showReportError=true;
                        Toast("答案未修改");
                        this.ExpertOff=true;
                        return;
                    }
                }
            }

            let self = this;
            let params = {
                description: desc,
                fieldId: detail.fieldId,
                questionId: detail.id,
                questionCode: detail.questionCode,
                errType: errType,
                reportType: 2, // 专家报错
                // reportType: 1, // 专家报错临时改为1
                updateContent: newContent,
            };
            request.chooseTtheAnswer(params).then((data) => {
                // console.log("提交报错返回:", data);
                if (data&&data.code == 200) {
                    self.$parent.setReported(localStorage.getItem('thisErrIndex'));
                    this.showSuccess = true;
                    this.ExpertOff=true
                    return;
                }else {
                    this.ExpertOff=true;
                    MessageBox('提示', '提交错误');
                    return;
                }

            });
        },
        finish () {},
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
    //外部样式引入，这是flex布局样式。
    @import "../../common/css/public";
    // .mask-page{
    //     background: #f2f4f5;
    // }
   body{
       .expert-box  .main-content{
           -webkit-overflow-scrolling: unset;
       }
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
            //   position: flex;
            //   bottom: 0;
            padding: 0.32rem 0.24rem 0.32rem 0.24rem;
            margin-bottom: 0.32rem;
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
            // border-top: 0.01rem solid #f2f2f2;
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
    .mint-box > .mint-box-header{
        border-bottom:transparent !important;
    }
    .mint-content > .mint-message{
        text-align: center !important;
        /* line-height: 0; */
        line-height: 12px !important;
    }
    .mint-content.mint-msgbox-content{
        padding: 0rem !important;
    }
    .dsn {
        display: none;
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
        /* background-color: #fff; */
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
    .img-content {
      margin-top: 0.16rem;
    }
</style>
