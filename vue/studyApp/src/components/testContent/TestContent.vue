<template>
    <div class="TestBox">
        <div class="swich-btn">
            <mt-navbar v-model="selected" style="background-color:rgba(242,244,245,1);height:0.88rem;">
                <mt-tab-item id="1" class="inspection">试题内容</mt-tab-item>
                <mt-tab-item id="2" class="inspection">报错及审批记录</mt-tab-item>
            </mt-navbar>
        </div>
        <green-review v-if="review"></green-review>
        <div class="main-content overflowauto">
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div v-if="detail">
                    <!-- <app-header :title='title'></app-header> -->
                    <div class="WrongTitle-header">
                        <div class="WrongTitle-center">
                            <p class="WrongTitile-title">原题目<span>({{errTypeMap[detail.errType]}})</span></p>
                            <p class="wrong-concont">{{detail.oldContent.title.replace(/&##/g, '\\')}}</p>
                            <!-- 题干中显示图片 -->
                            <div class="img-content" @click="imgClick" v-if="detail.oldContent.titleImg">
                              <img style="width:100%;height:3rem;" :src="oldImgTitle" alt="">
                            </div>
                            <ul class="q-choice-list">
                                <template v-if="questionType <= 2"> <!-- 单选题、多选题 -->
                                  <li :class="'q-choice' + (detail.answer.indexOf(item.id)>=0 ? ' q-choice-ok' : '')" v-for="(item,key) in detail.oldContent.choiceList">
                                      {{item.id}}: {{item.value}}
                                  </li>
                                  <span style="font-size:0.35rem;">答案:</span>
                                  <span style="font-size:0.35rem;">{{detail.answer}}</span>
                                </template>
                                <template v-else-if="questionType == 3">
                                  <li :class="'q-choice' + (detail.answer == item.id ? ' q-choice-ok' : '')" v-for="(item,key) in detail.oldContent.choiceList">
                                      {{key == 0 ? 'A' : 'B'}}: {{item.value}}
                                  </li>
                                  <span style="font-size:0.35rem;">答案:</span>
                                  <span style="font-size:0.35rem;">{{detail.answer}}</span>
                                </template>
                                <template v-else>
                                  <!--<li class="q-choice" v-for="(item,key) in answer">-->
                                      <!--<span>填空项{{key+1}}: </span>{{item}}-->
                                  <!--</li>-->
                                  <span style="font-size:0.35rem;">答案:</span>
                                  <span style="font-size:0.35rem;">{{detail.answer.split('#').join('、')}}</span>
                                </template>
                                <!--<template v-else-if="detail.errType == 4">&lt;!&ndash;题目过时&ndash;&gt;-->
                                  <!--<template v-if="questionType != 4">&lt;!&ndash;除了填空题&ndash;&gt;-->
                                    <!--<span style="font-size:0.35rem;">答案:</span>-->
                                    <!--<span style="font-size:0.35rem;">{{detail.answer}}</span>-->
                                  <!--</template>-->
                                <!--</template>-->
                            </ul>
                        </div>
                        <!-------------------------------------------修改后--------------------------------------------------->
                        <div class="WrongTitle-foter" v-if="detail.newContent"> <!-- 专家报错，或者已经修改过 -->
                            <p v-if="errType != 4">修改后</p> <!-- 已过时不显示 修改后 -->
                            <template v-if="detail.reportType == 8"><!--审核不通过-->
                              <p v-if="errType != 4">{{detail.newContent.title.replace(/&##/g, '\\')}}</p>
                               <!--题干中显示图片-->
                              <div class="img-content" v-if="detail.newContent.titleImg">
                                <img style="width:100%;height:3rem;" :src="newImgTitle" alt="">
                              </div>
                              <ul v-if="errType != 4" class="q-choice-list">
                                  <template v-if="questionType <= 2"> <!-- 单选题、多选题 -->
                                    <li :class="'q-choice' + (detail.answer.indexOf(item.id)>=0 ? ' q-choice-ok' : '')" v-for="(item,key) in detail.oldContent.choiceList">
                                        {{item.id}}: {{item.value}}
                                    </li>
                                  </template>
                                  <template v-else-if="questionType == 3">
                                    <li :class="'q-choice' + (detail.answer == item.id ? ' q-choice-ok' : '')" v-for="(item,key) in detail.oldContent.choiceList">
                                        {{key == 0 ? 'A' : 'B'}}: {{item.value}}
                                    </li>
                                  </template>
                                  <template v-else>
                                    <li class="q-choice" v-for="(item,key) in answer">
                                        <span>填空项{{key+1}}: </span>{{item}}
                                    </li>
                                  </template>
                              </ul>
                              <ul class="q-choice-list"  v-else> <!-- 题目过时 -->
                                  <!--<li class="list-titl">题目过时</li>-->
                              </ul>
                            </template>
                            <template v-else><!--修改后审核通过-->
                              <p v-if="errType != 4">
                                  <template v-if="detail.reportType != 8">
                                      <span v-for="(it,idx) in newContentList" :class="it.status==0 ? 'red' : ''">{{it.value}}</span>
                                  </template>
                                  <template v-if="errType != 1">{{detail.newContent.title.replace(/&##/g, '\\')}}</template>
                              </p>
                              <!-- 题干中显示图片 -->
                              <div class="img-content" @click="imgClick" v-if="detail.newContent.titleImg">
                                <img style="width:100%;height:3rem;" :src="newImgTitle" alt="">
                              </div>
                                  <!-- {{errType == 1 ? (detail.reportType != 8? newContent : detail.oldContent.title) : detail.oldContent.title}} -->
                              <ul class="q-choice-list" v-if="errType == 1"> <!-- 题干有误 -->
                                  <template v-if="questionType == 1"><!--单选-->
                                  <li :class="'q-choice' + (detail.newContent.answer.indexOf(item.id)>=0 ? ' q-choice-edit' : '')" v-for="(item,key) in detail.newContent.choiceList">
                                      {{item.id}}: {{item.value}}
                                  </li>
                                  <!--<span style="font-size:0.35rem;">答案:</span>-->
                                  <!--<span style="font-size:0.35rem;">{{detail.newContent.answer}}</span>-->
                                  </template>
                                  <template v-if="questionType == 2"><!--多选-->
                                    <li :class="'q-choice' + ( (detail.oldContent.choiceList[key] && (detail.oldContent.choiceList[key].value == detail.newContent.choiceList[key].value) )? '': ' q-choice-corrected')" v-for="(item,key) in detail.newContent.choiceList">
                                      {{item.id}}: {{item.value || item.val}}
                                    </li>
                                    <span style="font-size:0.35rem;">答案:</span>
                                    <span style="font-size:0.35rem;">{{detail.newContent.answer.split('').sort().join('')}}</span>
                                  </template>
                                  <template v-else-if="questionType == 3"><!--判断题-->
                                    <li :class="'q-choice' + (detail.newContent.answer == item.id ? ' q-choice-edit' : '')" v-for="(item,key) in detail.newContent.choiceList">
                                        {{key == 0 ? 'A' : 'B'}}: {{item.value}}
                                    </li>
                                    <span style="font-size:0.35rem;">答案:</span>
                                    <span style="font-size:0.35rem;">{{detail.newContent.answer}}</span>
                                  </template>
                                  <template v-else><!--题干有误-填空题-->
                                    <li class="q-choice" v-for="(item,key) in answer">
                                      <span>填空项{{key+1}}: </span>{{item}}
                                    </li>
                                    <span style="font-size:0.35rem;">答案:</span>
                                    <span style="font-size:0.35rem;">{{detail.newContent.answer.split('#').join('、')}}</span>
                                  </template>
                              </ul>
                              <ul class="q-choice-list" v-else-if="errType == 2">  <!-- 选项错误 -->
                                  <template v-if="questionType < 4">
                                    <li :class="'q-choice' + ( (detail.oldContent.choiceList[key] && (detail.oldContent.choiceList[key].value == newChoiceList[key].value) )? '': ' q-choice-corrected')" v-for="(item,key) in newChoiceList">
                                        {{item.id}}: {{item.value || item.val}}
                                    </li>
                                    <span style="font-size:0.35rem;">答案:</span>
                                    <span style="font-size:0.35rem;">{{detail.newContent.answer.split('').sort().join('')}}</span>
                                  </template>
                                  <template v-else>
                                      <li :class="'q-choice' + (answer[key] != newAnswer[key] ? ' q-choice-corrected' : '')" v-for="(item,key) in newAnswer">
                                          {{item}}
                                      </li>
                                  </template>
                              </ul>
                              <ul class="q-choice-list" v-else-if="errType == 3"> <!-- 答案错误 -->
                                  <template v-if="questionType <= 2"> <!-- 单选题、多选题 -->
                                    <li :class="'q-choice' + (newAnswer.indexOf(item.id) >= 0 ? ' q-choice-corrected' : '')" v-for="(item,key) in detail.newContent.choiceList">
                                        {{item.id}}: {{item.value || item.val}}
                                    </li>
                                    <span style="font-size:0.35rem;">答案:</span>
                                    <span style="font-size:0.35rem;">{{detail.newContent.answer.split('').sort().join('')}}</span>
                                  </template>
                                  <template v-else-if="questionType == 3"> <!-- 判断题 -->
                                    <li :class="'q-choice' + (getColor == item.id ? ' q-choice-corrected' : '')" v-for="(item,key) in detail.newContent.choiceList">
                                        {{key == 0 ? 'A' : 'B'}}: {{item.value}}
                                    </li>
                                    <span style="font-size:0.35rem;">答案:</span>
                                    <span style="font-size:0.35rem;">{{detail.newContent.answer}}</span>
                                  </template>
                                  <template v-else><!--填空项{{key+1}}-->
                                      <li :class="'q-choice' + (answer[key] != newAnswer[key] ? ' q-choice-corrected' : '')" v-for="(item, key) in newAnswer">
                                          <span class="grey">填空项{{key+1}}: </span> {{ item}}
                                      </li>
                                  </template>
                              </ul>
                              <ul class="q-choice-list" v-else-if="errType == 4"> <!-- 题目过时 -->
                                  <!--<li class="list-titl">题目过时</li>-->
                                <!--<span style="font-size:0.35rem;">答案:</span>-->
                                <!--<span style="font-size:0.35rem;">{{detail.answer}}</span>-->
                              </ul>
                            </template>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="WrongTitle-header">
                    <maintenance-record-component v-if="errorHistoryList.length" ref="mrecord" :history-list="errorHistoryList"></maintenance-record-component>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
      </div>
        <div class="WrongTitle-btn" v-if="detail && nextFlag == 2"> <!-- 复审 -->
            <mt-button type="default" style="border-radius:5rem;width:40%;background:#fff;font-size:0.34rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:#444444;
                line-height:0.34rem;" @click="recheckFail">复核不通过</mt-button>
            <mt-button type="primary" @click="recheckOK" style="border-radius:5rem;width:40%;
                background-color:#4caf50;
                font-size:0.34rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                margin-left:0.4rem;
                color:#ffff;
                line-height:0.34rem;">复核通过</mt-button>
        </div>

        <div v-if="showReasonBox">
            <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 999;">
                <div class="mint-msgbox" style="">
                    <div class="mint-msgbox-content">
                        <div class="mint-msgbox-message">
                            <textarea id="no-edit-msg" placeholder="请填写复核不通过的原因" rows="4" cols="38" style="padding:0.3rem 0rem 0.3rem 0rem;outline: none;border:none"></textarea>
                        </div>
                        <div class="mint-msgbox-input" style="display: none;">
                            <input placeholder="" type="text">
                            <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                        </div>
                    </div>
                    <div class="mint-msgbox-btns">
                        <button class="mint-msgbox-btn mint-msgbox-cancel" @click="hideReasonBox">取消</button>
                        <button class="mint-msgbox-btn mint-msgbox-confirm" @click="confirmNoPass">确认</button>
                    </div>
                </div>
            </div>
            <div class="v-modal" style="z-index: 998;"></div>
        </div>
        <!-- 图片遮罩层 -->
        <div class="maskIsShow" v-if="maskIsShow">
          <div class="mask" @click="maskIsShow = false">
            <img style="width:100%;margin-top:40%;max-height:7rem;" :src="maskShowImg" alt="">
          </div>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabItem } from 'mint-ui';//引入mint-ui组件
import { MessageBox, Toast } from 'mint-ui';//引入mint-ui组件
import MainTenanceRecordComponent from "@/views/questionBanks/MaintenanceRecordComponent"; //维护记录

import GreenReview from "@/components/greenreview/GreenReview";//复审通过蒙层

import request from "@/api/request";//请求地址的封装
import { getLCSL2 } from '@/utils/LCS';//字符串对比方法的封装
import passContent from "@/utils/passContent";
export default {
    data(){
        return{
            maskIsShow:false,
            maskShowImg: '',
            selected:'1',
            title:'错题详情',
            myData: [
                '待复核',
                '专家编辑',
                '提交报错',
            ],

            //提交成功的模态窗显示或者隐藏。
            review:false,

            errTypeMap: [
                '', '题干有误', '选项有误', '答案有误', '题目过时'
            ],

            questionType: 0, //错误类型
            detail: null,
            newContent: '',
            newContentList: [],
            newChoiceList: [],
            newAnswer: '',
            answer: '',

            errType: -1,

            errorHistoryList: [],
            reportTypeMap: [ // 报错类型/阶段
                '', '提交报错', '专家报错', '初审', '复审',
                '待审核', '审核中', '审核通过', '审核不通过'
            ],
            reportIconMap: [ // 图标
                '', 'report', 'report', 'edit', 'edit',
                'toreview', 'toreview', 'reviewok', 'reviewng'
            ],

            submiting: false,
            showReasonBox: false,
            getColor:'',
            editAnswer: '',
            oldImgTitle:'',//原图路径
            newImgTitle:'',//新图路径
        }
    },
    props: ['errId', 'questionCode', 'nextFlag', 'questionId'],
    components: {
        'maintenance-record-component': MainTenanceRecordComponent,
        'green-review': GreenReview
    },
    created() {
        this.getErrorHistoryDetail(this.errId);
        this.getErrorHistoryList(this.errId);
    },
    filters: {
        formatTime (t) {
            if (!t) {
                return '';
            }
            let date = new Date(t);
            let year  = date.getFullYear();
            let month = date.getMonth() + 1;
            let day   = date.getDate();
            let hour  = date.getHours();
            let minute = date.getMinutes();
            return year + '-' + month + '-' + day + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
        },
        itemAnswerFilter (value) {
            // console.log(value)
            return JSON.parse(value).answer
        }
    },
    methods:{
        imgClick () {
            this.maskIsShow = !this.maskIsShow;
        },
        getErrorHistoryDetail (id) { // 获取错误详情
            // console.log("get Error detail");
            let self = this;
            request.getErrorHistoryDetail(id).then((data) => {
                // console.log("错误详情：", data);
                let detail = data[0];
                detail.oldContent= passContent.passContent(detail.oldContent);
                try{
                    detail.oldContent = JSON.parse(detail.oldContent);
                    for(let i = 0; i < detail.oldContent.choiceList.length; i++){
                    if(detail.oldContent.choiceList[i].value && detail.oldContent.choiceList[i].value.indexOf("&##") != -1 ){
                        detail.oldContent.choiceList[i].value =detail.oldContent.choiceList[i].value.replace(/&##/g, '\\');
                        }
                    }
                }catch(e){

                }
                // debugger;

                self.detail = detail;
                // console.log('details',self.detail)
                // self.detail.newContent = JSON.parse(self.detail.newContent)
                // let oldTitleLength = self.detail.oldContent.title.length;
                // console.log(self.detail.newContent)
                // console.log(JSON.parse(self.detail.newContent))
                try{
                  if(detail.errType == 4){//题目过时
                    if(self.detail.newContent){
                      let newCon = JSON.stringify(self.detail.newContent);
                      self.detail.newContent = newCon;
                    }
                  }else {
                    if(self.detail.newContent){
                      let newCon = JSON.parse(self.detail.newContent)
                      self.detail.newContent = newCon;
                    }
                  }
                }catch(e){

                }

                // console.log('details',self.detail)
                this.oldImgTitle = self.detail.oldContent.titleImg;//原图
                this.newImgTitle = self.detail.newContent.titleImg || self.detail.oldContent.titleImg;//新图
                this.maskShowImg = self.detail.oldContent.titleImg;
                // let newTitleLength = self.detail.newContent.title.length;
                // let editTitle = self.detail.newContent.title.substring(oldTitleLength,newTitleLength)
                // console.log('新增片段title',editTitle)
                // console.log('detail',detail)
                let errType = detail.errType;
                //console.log("errType:", errType);
                if (errType == 1) { // 题干错误
                    if (detail.newContent && detail.newContent[0] == '{') {
                        let content = JSON.parse(detail.newContent);
                        self.newContent.title = content.title;
                        self.answer = content.answer;
                    } else {
                        self.newContent = detail.newContent;
                    }

                    let formatedContent = getLCSL2(detail.oldContent.title, self.newContent.title);
                    self.newContentList = formatedContent;

                } else if (errType == 2) { // 选项错误
                    if (detail.questionType < 4) {
                        let content = detail.newContent;
                        self.newChoiceList = content.choiceList;
                        //console.log("newChoiceList:", self.newChoiceList);
                    } else {
                        self.answer = detail.answer.split('#');
                        self.newAnswer = detail.newContent.answer.split('#');
                    }
                } else if (errType == 3) { // 答案错误
                    if (detail.questionType < 4) {
                        self.newAnswer = detail.newContent.answer;
                        // console.log(detail)
                        if (detail.questionType == 3) {
                          // detail.newContent = JSON.parse(detail.newContent)//判断题
                          self.getColor = detail.newContent.answer
                        }

                    } else {
                        // self.newAnswer  = JSON.parse(self.newAnswer)
                        self.answer = detail.answer.split('#');
                        self.newAnswer = detail.newContent.answer.split('#');
                    }
                }else {//题目过时
                    self.answer = detail.answer.split('#');
                }

                self.errType = errType;
                self.questionType = detail.questionType;

                //console.log(self.detail);
            });
        },
        WrongTitle (){
            this.$router.push({
                path : "/user/WrongTitle",
            });
        },
        toWrongTitledetails (){ // 错题详情
            this.$router.push({
                path : "/user/WrongTitledetails",
            });
        },
        getErrorHistoryList (errId) { // 获取维护记录
            //console.log("维护记录：");
            let self = this;
            let params = JSON.stringify({
                id: errId,
                questionCode: this.questionCode
            });
            request.getErrorHistoryList(params).then((data) => {
                // console.log("维护记录：", data);
                // 交给组件处理
                self.errorHistoryList = data;
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
        confirmNoPass() {
            let ele = document.getElementById('no-edit-msg');
            let msg = ele.value;

            msg = msg.replace(/^\s+/, '').replace(/\s+$/, '');
            let len = this.computeLength(msg, 20);
            if (len < 10) {
                Toast({
                    message: '至少输入5个字',
                    duration: 1500
                });
                return;
            } else if (len > 200) {
                Toast({
                    message: '最多输入100个字',
                    duration: 1500
                });
                return;
            }

            let detail = this.detail;
            let params = {
                errTabId: detail.errTabId,
                specialOpinion: '4', // 4 不同意
                specialExplain: msg,
                updateContent: JSON.stringify(detail.newContent),
                auditStart: '4', // 4 复审
                questionId: this.questionId,
                errType: detail.errType
            };

            let self = this;
            this.hideReasonBox();
            request.submitExpertEdit(params).then((data) => {
            if (data.code == 200) {
                self.hideReasonBox();

                Toast('提交成功');
                // 回到 审核列表页面
                setTimeout(function(){
                    self.$router.go(-1);
                }, 500);
            }
        });
        },
        recheckFail () { // 复审不通过
            //console.log("recheckFail");
            if (this.submiting) { // 正在提交，不处理
                return;
            }
            this.showReasonBox = true;
            return;

            let detail = this.detail;
            let params = {
                errTabId: detail.errTabId,
                specialOpinion: '4', // 4 不同意
                specialExplain: '',
                updateContent: JSON.stringify(detail.newContent),
                auditStart: '4', // 4 复审
                questionId: this.questionId,
                errType: detail.errType
            };

            let self = this;
            const textarea =  `<textarea id="no-edit-msg" placeholder="请填写复核不通过的原因" rows="4" cols="38" style="padding:0.3rem 0rem 0.3rem 0rem;outline: none;border:none;"></textarea> `
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

                    msg = msg.replace(/^\s+/, '').replace(/\s+$/, '');
                    let len = this.computeLength(msg, 20);
                    if (len < 10) {
                        Toast({
                            message: '至少输入5个字',
                            duration: 1500
                        });
                        return;
                    } else if (len > 200) {
                        Toast({
                            message: '最多输入100个字',
                            duration: 1500
                        });
                        return;
                    }

                    params.specialExplain = msg;

                    request.submitExpertEdit(params).then((data) => {
                        if (data.code == 200) {
                            Toast('提交成功');

                            // 回到 审核列表页面
                            setTimeout(function(){
                                self.$router.go(-1);
                            }, 500);
                        }
                    });
                }
            });
        },
        recheckOK () { // 复审通过
            if (this.submiting) { // 正在提交
                return;
            }

            this.submiting = true; // 标识正在提交
            console.log('----',detail)
            let detail = this.detail;
            let params = {
                errTabId: detail.errTabId,
                specialOpinion: '3', // 3 同意 4 不同意
                specialExplain: '',
                updateContent: JSON.stringify(detail.newContent), // 更新后的内容
                auditStart: '4', // 4 复审
                questionId: this.questionId,
                errType: detail.errType
            };

            let self = this;
            let reqStartTime = (new Date()).getTime();
            request.submitExpertEdit(params).then((data) => {
                if (data.code == 200) {
                    // Toast('复核成功'); 不用了
                    let reqEndTime = (new Date()).getTime();
                    let delayTime  = 1200 - (reqEndTime - reqStartTime); //  延时 1.2s
                    // console.log('delayTime:', delayTime);
                    if (delayTime < 0) {
                        delayTime = 10;
                    }

                    setTimeout(() => {
                        // 点复核通过按钮提交成功后显示遮罩层
                        this.review = true;
                        // 回到 审核列表页面
                        setTimeout(function(){
                            self.submiting = false; // 结束提交
                            self.$router.go(-1);
                        }, 2000);
                    }, delayTime);
                }
            });
        }
    }
}
</script>

<style>

</style>

<style scoped>
    .TestBox{
        height:100%;
    }
    .swich-btn{
        position: fixed;
        width: 100%;
        top: .88rem;
        left: 0;
        z-index: 200;
    }
    .main-content{
        padding-top: .88rem;
        height: 100%;
    }
    .main-content.overflowauto{
        margin-bottom: 3rem;
        /* padding-bottom:7rem; */
    }
    .inspection{
        font-size:0.28rem !important;
        font-family:PingFangSC-Regular;
        font-weight:400;
        line-height:0.2rem !important;
    }
    *{margin: 0;padding: 0;}
    .Step-bar{
        padding: 0.56rem 0.4rem 3rem 0.4rem;
    }
    .Step-bar li p img{
        width:0.24rem;
        height:0.24rem;
        background:rgba(255,255,255,1);
        /* border:0.2rem solid rgba(151,151,151,1); */
    }
    .Step-bar .header{
        font-size: 0.14rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.32rem;

    }
    .description{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.4rem;
    }
    .timer span{
        height:0.24rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.24rem;
    }
    .Step-bar li{list-style: none;padding: 0.2rem 20px;border-left: 2px solid #999;position: relative;}
    .Step-bar li .rt-icon-wrap {
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 0.44rem;
        height: 0.44rem;
        margin-left: -0.26rem;
        border-radius: 50%;

    }
    /* 提交报错  考生报错*/
    .comiterorr{
        background:#5480FE;
    }
    /* 专家编辑 */
    .edit{
        background:#5480FE;
    }
    /* 审核通过 */
    .pass{
        background: #4fbf6b;
    }
     /* 审核不通过 */
    .nopass{
        background: rgba(252,67,67,1);
    }
    /* 待复审   */
    .review{
        background: rgba(205,205,205,1);
    }

    .rt-icon-wrap-report, .rt-icon-wrap-edit {
        border: solid 1px rgba(84,128,254,1);
        background: rgba(84,128,254,1);
    }
    .rt-icon-wrap-reviewok {
        border: solid 1px #4fbf6b;
        background: #4fbf6b;
    }
    .rt-icon-wrap-reviewng {
        border: solid 1px rgba(252,67,67,1);
        background: rgba(252,67,67,1);
    }
    .Step-bar li .rt-icon {
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 0.44rem;
        height: 0.44rem;
        /* margin-left: -0.26rem; */
        border-radius: 50%;
        background-repeat: no-repeat, no-repeat;
        background-position: center;
        /* background: rgba(84,128,254,1); */
    }
    .rt-icon.rt-icon-report {
        background-image: url("../../assets/images/icon-comiterorr.png");
        background-size: 70% 70%;
        background-repeat:no-repeat;
    }
    .rt-icon.rt-icon-edit {
        background-image: url("../../assets/images/icon-edit.png");
        background-size: 70% 70%;
        background-repeat:no-repeat;
    }
    .rt-icon.rt-icon-toreview {
        background-image: url("../../assets/images/review.png");
        background-size: 70% 70%;
        background-repeat:no-repeat;
    }
    .rt-icon.rt-icon-reviewok {
        background-image: url("../../assets/images/pass.png");
        background-size: 70% 70%;
        background-repeat:no-repeat;
    }
    .rt-icon.rt-icon-reviewng {
        background-image: url("../../assets/images/icon-nopass1.png");
        background-size: 70% 70%;
        background-repeat:no-repeat;
    }
    .Step-bar ul{width: 6rem;margin: 0 auto;}
   .WrongTitle-header{
        padding-top: 0rem;
        margin-top: 0.3rem;
        margin-bottom: 0.2rem;
        height:100%;
    }
    .WrongTitle-center{
        padding: 0rem 0.32rem 0 0.32rem;
    }

    .WrongTitile-title{
        font-size: 0.35rem;
        font-family: PingFangSC-Regular;
        font-weight: 700;
        color: #444444;
        line-height: 0.44rem;
        margin-top: 0.24rem;
    }
    .WrongTitile-title span{
        font-size: 0.32rem;
        font-family: PingFangSC-Regular;
        font-weight: 500;
        color: #797979;
        line-height: 0.44rem;
        margin-top: 0.24rem;
    }
    .wrong-concont{
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
        margin-top: 0.24rem;
    }
    .WrongTitle-center hr{
        padding: 0rem;
        margin: 0rem;
        border: 0.01rem solid rgba(232,232,232,1);
    }
    .WrongTitle-foter{
         padding: 0.2rem 0.32rem 0.1rem 0.32rem;
         height: 100%;
         margin-bottom: 3rem;
    }
    .WrongTitle-foter b{
        width:1.28rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:500;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
    }
    .WrongTitle-foter p:nth-child(1){
        font-size: 0.35rem;
        font-family: PingFangSC-Regular;
        font-weight: 700;
        color: #444444;
        line-height: 0.44rem;
        padding-bottom: 0.24rem;
        border-top: 1px solid #f2f2f2;
        padding-top: 0.32rem;
    }
    .WrongTitle-foter p:nth-child(2){
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }
    .WrongTitle-foter-ul{
        line-height: 0.2rem;
        /* display: flex;
        align-items:center;
        justify-content:space-between; */
    }
    .WrongTitle-foter-ul2{
        margin-top: 1.3rem;
        line-height: 0.2rem;
    }
    .WrongTitle-foter-ul li:nth-child(4){
        padding-bottom: 0.3rem;
    }
    .WrongTitle-foter-ul li:nth-child(1) span{
        width:1.06rem;
        height:1.76rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }

    .WrongTitle-foter-ul li:nth-child(2) span{
        width:1.06rem;
        height:1.76rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }
    .WrongTitle-foter-ul li:nth-child(3) span{
        width:1.06rem;
        height:1.76rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }
    .WrongTitle-foter-ul li:nth-child(4) span{
        width:1.06rem;
        height:1.76rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }
    .WrongTitle-foter-ul2 li:nth-child(1) span{
        width:1.06rem;
        height:1.76rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }

    .WrongTitle-foter-ul2 li:nth-child(2) span{
        width:1.06rem;
        height:1.76rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }
    .WrongTitle-foter-ul2 li:nth-child(3) span{
        width:1.06rem;
        height:1.76rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }
    .WrongTitle-foter-ul2 li:nth-child(4) span{
        width:1.06rem;
        height:1.76rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }
    .WrongTitle-btn {
        width: 100%;
        position: fixed;
        left: 0.32rem;
        bottom:0rem;
       margin-top: 2rem;
        padding: 0.3rem 0.08rem;
        background: #fff
    }
    .q-choice-list {
        margin: 0;
        padding: 5px;
        padding-left: 0;
        font-size: 0.35rem;
    }
    .list-titl{
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
    }
    .q-choice {
        margin: 0;
        padding: 5px;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.44rem;
    }
    .q-choice-ok {
        color:#26a2ff;
    }
    .q-choice-edit {
        color: #f00;
    }
    .q-choice-corrected {
        color: #d02424;
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
    .mask {
      background: #000;
      width: 100%;
      height: 100%;
      position: fixed;
      top: .68rem;
      left: 0;
      z-index: 10000;
    }
   /* .mint-tab-container{
        height:100%;
        padding-bottom:7rem;
    }*/
</style>
<style>
    .audit-hader .mint-navbar .mint-tab-item-label{
        font-size: .28rem;
        color: #444444;
    }
    .audit-hader .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
        font-size: .28rem;
        color: #26a2ff;
        font-weight:600;
    }
    .audit-hader .mint-navbar .mint-tab-item.is-selected {
        border-bottom: none;
        position: relative;
    }
    .audit-hader .mint-navbar .mint-tab-item.is-selected :after{
        content: '';
        display: block;
        height: .04rem;
        width: .72rem;
        background: #26a2ff;
        position: absolute;
        margin: 0 auto;
        bottom: 0.09rem;
        left: 0;
        right: 0;
    }
    textarea::-webkit-input-placeholder {
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#979797;
        line-height:0.28rem;
    }
   textarea:-moz-placeholder {
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
    }
    textarea::-moz-placeholder {
       font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#979797;
        line-height:0.28rem;
    }
    textarea:-ms-input-placeholder {
       font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#979797;
        line-height:0.28rem;
    }

    .red {
        color: #f00;
    }
    /* 修改message-box模态窗样式 */
    .mint-msgbox{
        border-radius: 0.16rem !important;
    }
    .mint-msgbox-header {
        padding: 0.5rem 0 0.5rem 0 !important;
        border-bottom:1px solid #e8e8e8 !important;
    }
    .mint-msgbox-title{
         font-size:0.32rem !important;
        font-weight:400 !important;
        color:#444 !important;
        line-height:0.32rem !important;
    }
    .mint-msgbox-confirm{
        font-size:0.32rem !important;
        font-weight:400 !important;
        color:#5480FE !important;
        line-height:0.44rem !important;
        /* border-top:0.01rem solid #f2f2f2; */
    }
    .mint-msgbox-btns{
        line-height: 0.44rem !important;
        height: 0.86rem !important;
    }
     .mint-msgbox-content {
        border-bottom: 1px solid #f2f2f2 !important;
    }
    .mint-msgbox-cancel {
        width: 50%;
        border-right: 1px solid #f2f2f2 !important
    }
</style>

