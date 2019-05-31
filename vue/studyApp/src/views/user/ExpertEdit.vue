<template>
    <div>
        <app-header :title="title" :style="showProclamation ? 'display:none' : 'block'" :rightObj="rightObj" v-on:listFinish="finish">
            <div class="header-right" slot="headerRight" @click="showProclamationPage"></div>
        </app-header>
        <div class="content" :style="showProclamation ? 'display:none' : 'block'">
            <div class="content-text">
                <div class="tx-fs32 tx-cl444">错误类型</div>
                <div class="ub ub-wrap type-content">
                    <p class="false-type" :class="{'is-active':activeIndex==index,'dsn':index == 2 && (questionType == 3 || questionType == 4) }"
                    v-for="(item,index) in errTypeMap" :key="index" v-if="index != 0" @click="errorWrong(index)">{{item}}</p>
                    <!--<p class="false-type">{{eType}}</p>-->
                </div>
                <template v-if="activeIndex>=activeIndex">
                  <!-----------------------------------------------------------题干有误----------------------------------------------------------->
                    <div class="out-text-area" v-if="errType == 1"><!--题干有误-->
                        <p style="font-size: 0.28rem;">试题题干</p>
                        <div class="marRig">
                          <textarea class="text-area" v-model="newTitle" style="textarea::-webkit-input-placeholder {height:auto;font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem; }"></textarea>
                          <!--<input v-model="newTitle" contenteditable="true" style="width:100%;border:0;outline:none;word-break: break-all;font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem; "></input>-->
                          <!-- 题干中显示图片 --><!-- v-if="detail.oldContent.titleImg"-->
                          <div class="img-content" @click="imgClick" v-if="imgUrl">
                            <img style="width:100%;height:3rem;" :src="imgUrl" alt="">
                          </div>
                        </div>
                        <div  v-if="questionType <= 2">
                            <p style="font-size: 0.28rem;">试题选项</p>
                            <div class="marRig">
                              <ul class="q-choice-list" v-if="errType <= 2">
                                <textarea class="text-area" v-model="choiceTxt" style="textarea::-webkit-input-placeholder {font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem;}"></textarea>
                              </ul>
                              <ul class="q-choice-list" v-else-if="errType == 3"> <!-- 判断题 -->
                                <li class="q-choice" v-for="(item,key) in newChoiceList">
                                  <span></span><input type="text" class="q-choice-value" @input="resizeInput($event)"  v-model="newChoiceList[key].value">
                                </li>
                              </ul>
                              <ul class="q-choice-list" v-else>
                                <li class="q-choice" v-for="(item,key) in newAnswer">
                                  <span>选项{{key+1}}:</span><input type="text" @input="resizeInput($event)"  class="q-choice-value" v-model="newAnswer[key]">
                                </li>
                              </ul>
                            </div>
                        </div>
                        <p style="font-size: 0.28rem;">试题答案</p>
                        <div class="marRig">
                            <ul class="q-choice-list option-list" v-if="questionType == 1"> <!-- 单选题 -->
                              <mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer"></mt-radio>
                              <li class="q-choice q-choice-qustion"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>
                              <li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>
                            </ul>
                            <ul class="q-choice-list option-list" v-else-if="questionType == 2"> <!-- 多选题 -->
                              <mt-checklist :options="optionList" v-model="newAnswer" @change="handleCheckListChange"></mt-checklist>
                              <li class="q-choice q-choice-qustion">
                                <span class="grey">原答案: </span> <span class="old-ans">{{typeof detail.answer === 'string' ? detail.answer : detail.answer.join()}}</span>
                              </li>
                              <li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{checkChanged ? formatArr(newAnswer) : ''}}</span></li>
                            </ul>
                            <ul class="q-choice-list option-list" v-else-if="questionType == 3"> <!-- 判断题 -->
                              <mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer"></mt-radio>
                              <li class="q-choice q-choice-qustion"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>
                              <li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>
                            </ul>
                            <ul class="q-choice-list option-list" v-else> <!-- 填空题 -->
                              <li class="q-choice q-choice-qustion"><span class="grey">原答案:</span></li>
                              <li class="q-choice" v-for="(item,key) in answer" :key="key"><span>填空项{{key+1}}: </span> {{item}}</li>
                              <li class="q-choice"><span class="grey">修改后答案: </span></li>
                              <li class="q-choice" v-for="(item,key) in newAnswer">
                                <span>填空项{{key+1}}:</span>
                                <!-- <input type="text" class="q-choice-value" @input="resizeInput($event)" v-model="newAnswer[key]"> -->
                                <minput :index="0" :ak="key" @mchange="minputChange"></minput>
                              </li>
                            </ul>
                        </div>
                    </div>
                    <!-----------------------------------------------------------选项有误----------------------------------------------------------->
                    <div class="out-text-area q-title-hader" v-else-if="errType == 2">
                        <p style="font-size: 0.28rem;">试题题干</p>
                        <div class="marRig">
                          <textarea class="text-area" v-model="newTitle" style="textarea::-webkit-input-placeholder {height:auto;font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem; }"></textarea>
                          <!--<div contenteditable="ture" style="outline:none;word-break: break-all;font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem; ">{{newTitle}}</div>-->
                          <!-- 题干中显示图片 --><!-- v-if="detail.oldContent.titleImg"-->
                          <div class="img-content" @click="imgClick" v-if="imgUrl">
                            <img style="width:100%;height:3rem;" :src="imgUrl" alt="">
                          </div>
                        </div>

                        <div  v-if="questionType <= 2">
                          <p style="font-size: 0.28rem;">试题选项</p>
                          <div class="marRig">
                            <ul class="q-choice-list" v-if="errType <= 2">
                              <textarea class="text-area" v-model="choiceTxt" style="textarea::-webkit-input-placeholder {font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem;}"></textarea>
                            </ul>
                            <ul class="q-choice-list" v-else-if="errType == 3"> <!-- 判断题 -->
                              <li class="q-choice" v-for="(item,key) in newChoiceList">
                                <span></span><input type="text" class="q-choice-value" @input="resizeInput($event)"  v-model="newChoiceList[key].value">
                              </li>
                            </ul>
                            <ul class="q-choice-list" v-else>
                              <li class="q-choice" v-for="(item,key) in newAnswer">
                                <span>选项{{key+1}}:</span><input type="text" @input="resizeInput($event)"  class="q-choice-value" v-model="newAnswer[key]">
                              </li>
                            </ul>
                          </div>
                        </div>

                        <p style="font-size: 0.28rem;">试题答案</p>
                        <div class="marRig">
                          <ul class="q-choice-list option-list" v-if="questionType == 1"> <!-- 单选题 -->
                            <mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer"></mt-radio>
                            <li class="q-choice q-choice-qustion"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>
                            <li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>
                          </ul>
                          <ul class="q-choice-list option-list" v-else-if="questionType == 2"> <!-- 多选题 -->
                            <mt-checklist :options="optionList" v-model="newAnswer" @change="handleCheckListChange"></mt-checklist>
                            <li class="q-choice q-choice-qustion">
                              <span class="grey">原答案: </span> <span class="old-ans">{{typeof detail.answer === 'string' ? detail.answer : detail.answer.join()}}</span>
                            </li>
                            <li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{checkChanged ? formatArr(newAnswer) : ''}}</span></li>
                          </ul>
                          <ul class="q-choice-list option-list" v-else-if="questionType == 3"> <!-- 判断题 -->
                            <mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer"></mt-radio>
                            <li class="q-choice q-choice-qustion"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>
                            <li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>
                          </ul>
                          <ul class="q-choice-list option-list" v-else> <!-- 填空题 -->
                            <li class="q-choice q-choice-qustion"><span class="grey">原答案:</span></li>
                            <li class="q-choice" v-for="(item,key) in answer"><span>填空项{{key+1}}: </span> {{item}}</li>
                            <li class="q-choice"><span class="grey">修改后答案: </span></li>
                            <li class="q-choice" v-for="(item,key) in newAnswer">
                              <span>填空项{{key+1}}:</span>
                              <!-- <input type="text" class="q-choice-value" @input="resizeInput($event)" v-model="newAnswer[key]"> -->
                              <minput :index="0" :ak="key" @mchange="minputChange"></minput>
                            </li>
                          </ul>
                        </div>
                        <!--<p class="q-title border-top">{{newTitle}}</p>-->
                        <!--<div class="out-text-area">-->
                            <!--<ul class="q-choice-list" v-if="errType <= 2">-->
                                <!--<textarea class="text-area" v-model="choiceTxt" style="textarea::-webkit-input-placeholder {font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem;}"></textarea>-->
                            <!--</ul>-->
                            <!--<ul class="q-choice-list" v-else-if="errType == 3"> &lt;!&ndash; 判断题 &ndash;&gt;-->
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
                    </div>
                  <!-----------------------------------------------------------答案有误----------------------------------------------------------->
                    <div class="out-text-area q-title-hader" v-else-if="errType == 3"> <!-- 答案有误 -->
                      <p style="font-size: 0.28rem;">试题题干</p>
                      <div class="marRig">
                        <textarea class="text-area" v-model="newTitle" style="textarea::-webkit-input-placeholder {height:auto;font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem; }"></textarea>
                        <!--<div contenteditable="ture" style="outline:none;word-break: break-all;font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem; ">{{newTitle}}</div>-->
                        <!-- 题干中显示图片 --><!-- v-if="detail.oldContent.titleImg"-->
                        <div class="img-content" @click="imgClick" v-if="imgUrl">
                          <img style="width:100%;height:3rem;" :src="imgUrl" alt="">
                        </div>
                      </div>
                      <div  v-if="questionType <= 2">
                        <p style="font-size: 0.28rem;">试题选项</p>
                        <div class="marRig">
                          <ul class="q-choice-list" v-if="errType > 2">
                            <textarea class="text-area" v-model="choiceTxt" style="textarea::-webkit-input-placeholder {font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem;}"></textarea>
                          </ul>
                          <ul class="q-choice-list" v-else-if="errType == 3"> <!-- 判断题 -->
                            <li class="q-choice" v-for="(item,key) in newChoiceList">
                              <span></span><input type="text" class="q-choice-value" @input="resizeInput($event)"  v-model="newChoiceList[key].value">
                            </li>
                          </ul>
                          <ul class="q-choice-list" v-else>
                            <li class="q-choice" v-for="(item,key) in newAnswer">
                              <span>选项{{key+1}}:</span><input type="text" @input="resizeInput($event)"  class="q-choice-value" v-model="newAnswer[key]">
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p style="font-size: 0.28rem;">试题答案</p>
                      <div class="marRig">
                        <ul class="q-choice-list option-list" v-if="questionType == 1"> <!-- 单选题 -->
                          <mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer"></mt-radio>
                          <li class="q-choice q-choice-qustion"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>
                          <li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>
                        </ul>
                        <ul class="q-choice-list option-list" v-else-if="questionType == 2"> <!-- 多选题 -->
                          <mt-checklist :options="optionList" v-model="newAnswer" @change="handleCheckListChange"></mt-checklist>
                          <li class="q-choice q-choice-qustion">
                            <span class="grey">原答案: </span> <span class="old-ans">{{typeof detail.answer === 'string' ? detail.answer : detail.answer.join()}}</span>
                          </li>
                          <li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{checkChanged ? formatArr(newAnswer) : ''}}</span></li>
                        </ul>
                        <ul class="q-choice-list option-list" v-else-if="questionType == 3"> <!-- 判断题 -->
                          <mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer"></mt-radio>
                          <li class="q-choice q-choice-qustion"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>
                          <li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>
                        </ul>
                        <ul class="q-choice-list option-list" v-else> <!-- 填空题 -->
                          <li class="q-choice q-choice-qustion"><span class="grey">原答案:</span></li>
                          <li class="q-choice" v-for="(item,key) in answer"><span>填空项{{key+1}}: </span> {{item}}</li>
                          <li class="q-choice"><span class="grey">修改后答案: </span></li>
                          <li class="q-choice" v-for="(item,key) in newAnswer">
                            <span>填空项{{key+1}}:</span>
                            <!-- <input type="text" class="q-choice-value" @input="resizeInput($event)" v-model="newAnswer[key]"> -->
                            <minput :index="0" :ak="key" @mchange="minputChange"></minput>
                          </li>
                        </ul>
                      </div>
                        <!--<p class="q-title q-title-aswers">{{newTitle}} </p>-->
                        <!--<ul class="q-choice-list option-list" v-if="questionType == 1"> &lt;!&ndash; 单选题 &ndash;&gt;-->
                            <!--<mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer"></mt-radio>-->
                            <!--<li class="q-choice q-choice-qustion"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>-->
                            <!--<li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>-->
                        <!--</ul>-->
                        <!--<ul class="q-choice-list option-list" v-else-if="questionType == 2"> &lt;!&ndash; 多选题 &ndash;&gt;-->
                            <!--<mt-checklist :options="optionList" v-model="newAnswer" @change="handleCheckListChange"></mt-checklist>-->
                            <!--<li class="q-choice q-choice-qustion">-->
                              <!--<span class="grey">原答案: </span> <span class="old-ans">{{typeof detail.answer === 'string' ? detail.answer : detail.answer.join()}}</span>-->
                            <!--</li>-->
                            <!--<li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{checkChanged ? formatArr(newAnswer) : ''}}</span></li>-->
                        <!--</ul>-->
                        <!--<ul class="q-choice-list option-list" v-else-if="questionType == 3"> &lt;!&ndash; 判断题 &ndash;&gt;-->
                            <!--<mt-radio :options="optionList" :value="detail.answer" v-model="newAnswer"></mt-radio>-->
                            <!--<li class="q-choice q-choice-qustion"><span class="grey">原答案: </span> <span class="old-ans">{{detail.answer}}</span></li>-->
                            <!--<li class="q-choice q-choice-chuang"><span class="grey">修改后答案: </span><span class="new-ans">{{newAnswer}}</span></li>-->
                        <!--</ul>-->
                        <!--<ul class="q-choice-list option-list" v-else> &lt;!&ndash; 填空题 &ndash;&gt;-->
                            <!--<li class="q-choice q-choice-qustion"><span class="grey">原答案:</span></li>-->
                            <!--<li class="q-choice" v-for="(item,key) in answer"><span>填空项{{key+1}}: </span> {{item}}</li>-->
                            <!--<li class="q-choice"><span class="grey">修改后答案: </span></li>-->
                            <!--<li class="q-choice" v-for="(item,key) in newAnswer">-->
                                <!--<span>填空项{{key+1}}:</span>-->
                                <!--&lt;!&ndash; <input type="text" class="q-choice-value" @input="resizeInput($event)" v-model="newAnswer[key]"> &ndash;&gt;-->
                                <!--<minput :index="0" :ak="key" @mchange="minputChange"></minput>-->
                            <!--</li>-->
                        <!--</ul>-->
                    </div>
                    <div class="out-text-area q-title-hader" v-else>
                        <p style="font-size: 0.28rem;">试题题干</p>
                        <div class="marRig">
                            <textarea class="text-area" readonly v-model="newTitle" style="textarea::-webkit-input-placeholder {height:auto;font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem; }"></textarea>
                            <!--<div contenteditable="ture" style="outline:none;word-break: break-all;font-size:0.28rem;font-weight:400;color:#000;line-height:0.4rem; ">{{newTitle}}</div>-->
                            <!-- 题干中显示图片 --><!-- v-if="detail.oldContent.titleImg"-->
                            <div class="img-content" @click="imgClick" v-if="imgUrl">
                              <img style="width:100%;height:3rem;" :src="imgUrl" alt="">
                            </div>
                        </div>
                    </div>
                </template>
                <div class="out-text-area small" style="background: rgb(255, 255, 255);" v-show="activeIndex >= activeIndex">
                  <textarea v-model="specialExplain" class="text-area small small-area" placeholder="请描述试题错误的内容，并给予修改意见"></textarea>
                </div>
            </div>
        </div>
        <div class="commit-btn" @click="submit">
            <div class="commit-btn-tx">提交</div>
        </div>

        <!-- 图片遮罩层 -->
        <div class="maskIsShow" v-if="maskIsShow">
          <div class="mask" @click="maskIsShow = false">
            <img style="width:100%;margin-top:30%;" :src="imgUrl" alt="">
          </div>
        </div>

        <blue-msg-box :message="'2名专家复核通过后，将更新题库'" v-if="showEditOKNotify"></blue-msg-box>

        <div class="mask-page" v-if="showProclamation">
            <proclamation :from="'tk'"></proclamation>
        </div>
    </div>
</template>

<script type="text/babel">
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引用
import requestMethods from "@/api/request";//请求链接封装引用
import { Toast, MessageBox } from 'mint-ui';//mint-ui弹窗提示引用
import Minput from "@/components/questionsBankModule/Minput";//填空题输入框变化监听组件引用

import request from "@/api/request";//请求链接封装引用
import storage from "@/utils/storage";//本地缓存方法封装

import BlueMsgBox from "@/components/msgbox/BlueMsgBox";//错题详情专家点击提交成功后弹窗组件

const Proclamation = () => import("@/views/questionBanks/Proclamation");//审核专家公示页面

export default {
    components: {
      AppHeader, BlueMsgBox, Minput, Proclamation
    },
    data() {
        return {
            maskIsShow: false,//图片展示
            title : "专家编辑",
            eType:'',
            rightObj: {
                isMore : true,
            },
            errTypeMap: [
                '', '题干有误', '选项有误', '答案有误', '题目过时'
            ],
            detail: {
                reportType: 1
            },

            specialExplain : "", // 专家审核说明
            newTitle: '', // 新的试题题干
            newChoiceList: [], // 新的试题选项
            newAnswer: '', // 新的试题答案
            oldAnswer: '', // 原答案
            optionList: [{label: 'a',value:'2'}],
            checkChanged: false,
            choiceTxt: '',
            activeIndex: -1,
            errType : 1, // 错误类型
            questionType: -1, // 试题类型

            //用户角色 -- 默认 1 普通用户，2 专家
            userRole : 1,
            answer:'',
            showEditOKNotify: false, // 显示弹窗

            showProclamation: false,
            errTypes:'',
            backupRoute:'',
            imgUrl:'',//图片路径
        };
    },
    created () {
        this.init ();
    },
    mounted () {
        // let eId = this.detail.errType;
        // this.eType = this.errTypeMap[eId]
      // debugger
        this.backupRoute = localStorage.getItem('currentRoute')
    },
    destroyed () {
        localStorage.removeItem('err-detail');
    },
    methods: {
        goBack () {
            this.$router.go(-1);
        },
        imgClick(){//图片点击
            this.maskIsShow = !this.maskIsShow;
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
        minputChange ($event, index, k) { // 填空题输入框事件处理
            //console.log("minputchanged");
            //console.log($event);
            this.newAnswer[$event.ak] = $event.value;
            // console.log(this.newAnswer);
        },
        init () {
          let that = this
            let userRole = storage.getRole();
            this.userRole = userRole;
            if (userRole != 2) { // 不是专家，返回
                this.goBack();
                return;
            }

            let detailJson ={};
            detailJson= localStorage.getItem('err-detail');
            if (!detailJson) {
                this.$router.go(-2);
                return;
            }
            let detail = JSON.parse(detailJson);
            // console.log('detail',detail)
            if(detail.imgUrl){
              this.imgUrl = detail.imgUrl;
            }

            detail.answer = detail.answer.replace(/^\s+/, '').replace(/\s+$/,'');
            this.detail = detail;
            /*试题选项*/
            let content = detail.content || detail.oldContent;
            let choiceText = '';
            if(content.choiceList){
              for(let i=0; i<content.choiceList.length; i++) {
                let choice = content.choiceList[i];
                choiceText += (choice.id + ': ' +   choice.value + "\n");
              }
              this.choiceTxt = choiceText.replace(/\t+/g, '');
            }
            this.newTitle = content.title;
            this.questionType = detail.questionType;
            this.errType= detail.errType;
            this.activeIndex = detail.errType;

          // if (detail.questionType <= 3) { // 选择题和判断题，需要处理选项和答案
            // 1.处理选项
            // debugger;
            this.optionList = [];
            if(content.choiceList){
              for(let i=0; i<content.choiceList.length; i++) {
                let choice = content.choiceList[i];
                let label = '';
                if (detail.questionType == 3) {
                  label = i == 0 ? 'A' : 'B';
                } else {
                  label = choice.id;
                }

                let option = {
                  label: label + ': ' + choice.value,
                  value: choice.id,

                };
                this.optionList.push(option);
              }
            }

            // that.optionList = optionListList;
          // debugger
            // console.log('---optionList',optionList);
            // debugger;
            // 2.处理答案
            if (detail.questionType == 1) {
              this.newAnswer = this.detail.answer;
            } else if (detail.questionType == 2) {

              this.detail.answer = detail.answer.split('');
              this.newAnswer = this.detail.answer;
              //console.log(this.detail.answer);
            } else {
              this.newAnswer = this.detail.answer;
            }
          // if (detail.questionType == 4) { // 填空题，预处理答案
            // console.log("qtype == 4");
          if(detail.questionType != 2){
            let ans = detail.answer.split('#');
            // console.log('=======',ans)
            this.answer = ans;
            this.newAnswer = [];
            if(ans){
              for(let i=0; i<ans.length; i++) {
                this.newAnswer.push('');
              }
            }

            this.errorWrong(detail.errType)
          }
            // debugger;
        },
        formatQuestionData(index){
            // debugger;
            let userRole = storage.getRole();
            this.userRole = userRole;
            if (userRole != 2) { // 不是专家，返回
                this.goBack();
                return;
            }

            let detailJson = localStorage.getItem('err-detail');
            if (!detailJson) {
                this.$router.go(-2);
                return;
            }
            let detail = JSON.parse(detailJson);
            detail.errType = index;
            detail.answer = detail.answer.replace(/^\s+/, '').replace(/\s+$/,'');
            this.detail = detail;

            let content = detail.content || detail.oldContent;
            this.newTitle = content.title;
            this.questionType = detail.questionType;
            if (detail.errType == 2) { // 选项错误
                if (detail.questionType == 4) { // 填空题
                    this.newAnswer = detail.answer.split('#');
                }

                this.newChoiceList = content.choiceList;
                let choiceTxt = '';
                for(let i=0; i<content.choiceList.length; i++) {
                    let choice = content.choiceList[i];
                    choiceTxt += (choice.id + ': ' +   choice.value + "\n");
                }
                this.choiceTxt = choiceTxt;
            }

            if (detail.errType == 3) { // 答案错误
                this.oldAnswer = detail.answer;
                // debugger;
                if (detail.questionType <= 3) { // 选择题和判断题，需要处理选项和答案
                    // 1.处理选项
                  this.optionList = [];
                    for(let i=0; i<content.choiceList.length; i++) {
                        let choice = content.choiceList[i];
                        let label = '';
                        if (detail.questionType == 3) {
                            label = i == 0 ? 'A' : 'B';
                        } else {
                            label = choice.id;
                        }

                        let option = {
                            label: label + ': ' + choice.value,
                            value: choice.id,

                        };
                        //  debugger
                        // if ((detail.questionType == 1 || detail.questionType == 3) && choice.id == detail.answer) {
                        //     option.disabled = true;
                        // }
                      this.optionList.push(option);
                    }
                    // console.log('----optionList2',optionList);
                    // debugger;
                    // 2.处理答案
                    if (detail.questionType == 1) {
                        this.newAnswer = '';
                    } else if (detail.questionType == 2) {

                        this.detail.answer = detail.answer.split('');
                        this.newAnswer = this.detail.answer;
                        //console.log(this.detail.answer);
                    } else {
                        this.newAnswer = '';
                    }
                } else if (detail.questionType == 4) { // 填空题，预处理答案
                   // console.log("qtype == 4");
                    let ans = detail.answer.split('#');
                    this.answer = ans;
                    this.newAnswer = [];
                    for(let i=0; i<ans.length; i++) {
                        this.newAnswer.push('');
                    }
                }
            } else {
                this.newChoiceList = content.choiceList;
            }

            if (detail.errType == 3) { // 答案错误
            } else {
                if (detail.questionType != 4) {
                    this.newAnswer = detail.answer;
                }
            }
            // console.log(detail);
            // console.log("newAnswer:", this.newAnswer);
        },
        errorWrong(index){//题干有误index是1对应的errType也是1
            // debugger;
            this.specialExplain = '';
            this.formatQuestionData(index)
            let questionType = this.questionType;
          // console.log('-------c',this.optionList)
            if ((questionType == 3 || questionType == 4) && index == 2) { // 判断题、填空题没有选项错误
                return;
            }

            let detail   = this.detail;
            let content  = detail;
            let errType  = index;
            this.detail.errType = index;
            if (errType == 1) { // 题干有误
                if(content.content){
                  this.newTitle = content.content.title.replace(/\t+/g, '');//题干
                }else {
                  this.newTitle = content.oldContent.title.replace(/\t+/g, '');//题干
                }

                // if (detail.questionType == 2) {//多选
                  let optionList = [];
                  if(content.content.choiceList){
                    for(let i=0; i<content.content.choiceList.length; i++) {
                      let choice = content.content.choiceList[i];
                      let label = '';
                      if (detail.questionType == 3) {//判断
                        label = i == 0 ? 'A' : 'B';
                      } else {
                        label = choice.id;
                      }

                      let option = {
                        label: label + ': ' + choice.value,
                        value: choice.id,
                      };
                      // if ((detail.questionType == 1 || detail.questionType == 3) && choice.id == detail.answer) {
                      //   option.disabled = true;
                      // }
                      optionList.push(option);
                    }
                    this.optionList = optionList;
                  }

                  // 2.处理答案
                  if (detail.questionType == 1) {
                    this.newAnswer = '';
                  } else if (detail.questionType == 2) {
                    this.newAnswer = this.detail.answer;
                    if (typeof detail.answer == 'string') {
                      this.detail.answer = detail.answer.split('');
                    }
                    //console.log(this.detail.answer);
                  } else {
                    this.newAnswer = '';
                  }
                // }
                /*填空题修改后答案项*/
                if (detail.questionType == 4) { // 填空题
                  //console.log("questionType == 4");
                  let ans;
                  if (typeof detail.answer == 'string') {
                    ans = detail.answer.split('、');
                  } else {
                    ans = detail.answer;
                  }

                  this.answer = ans;
                  this.newAnswer = [];
                  for(let i=0; i<ans.length; i++) {
                    this.newAnswer.push('');
                  }
              }

            } else if (errType == 2) { // 选项错误
                 if (detail.questionType == 4) { // 填空题
                    this.newAnswer = detail.answer.split('#');
                  }
                  if (detail.questionType == 1){
                      this.newAnswer = '';
                  }
                this.newChoiceList = content.content.choiceList;
                let choiceTxt1 = '';
                let optionList1 = [];
                let choice1={};
              let option1={}
                for(let i1 = 0 ; i1 < content.content.choiceList.length ; i1++) {
                  choice1= content.content.choiceList[i1];
                    // console.log(choice1)
                    choiceTxt1 += (choice1.id + ': ' +   choice1.value + "\n");

                    let label1 = '';
                    if (detail.questionType == 3) {//判断
                      label1 = i1 == 0 ? 'A' : 'B';
                    } else {
                      label1 = choice1.id;
                    }

                    option1 = {
                      label: label1 + ': ' + choice1.value,
                      value: choice1.id,
                    };
                    // if ((detail.questionType == 1 || detail.questionType == 3) && choice1.id == detail.answer) {
                    //   option1.disabled = true;
                    // }
                    optionList1.push(option1);
                    // console.log('optionList1',optionList1);
                }
                this.choiceTxt = choiceTxt1.replace(/\t+/g, '');

                /*试题答案选项*/
                // let optionList = [];
                // debugger;
                // for(let j=0; j<content.oldContent.choiceList.length; j++) {
                //     let choice = content.oldContent.choiceList[j];
                //     let label = '';
                //     if (detail.questionType == 3) {//判断
                //         label = j == 0 ? 'A' : 'B';
                //     } else {
                //         label = choice.id;
                //     }
                //
                //     let option = {
                //         label: label + ': ' + choice.value,
                //         value: choice.id,
                //     };
                //     if ((detail.questionType == 1 || detail.questionType == 3) && choice.id == detail.answer) {
                //         option.disabled = true;
                //     }
                //     optionList.push(option);
                // }
                this.optionList = optionList1;

            } else if (errType == 3) { // 答案错误
                // debugger;
                if (detail.questionType == 3) {
                    // 处理选项

                if (detail.questionType == 3) { // 选择题和判断题，需要处理选项和答案
                    // 1.处理选项
                  this.oldAnswer = detail.content.choiceList || detail.oldContent.choiceList;
                    let optionList = [];
                    for(let i=0; i<content.content.choiceList.length; i++) {
                        let choice = content.content.choiceList[i];
                        let label = '';
                        if (detail.questionType == 3) {
                            label = i == 0 ? 'A' : 'B';
                        } else {
                            label = choice.id;
                        }

                        let option = {
                            label: label + ': ' + choice.value,
                            value: choice.id,
                        };
                        // if ((detail.questionType == 1 || detail.questionType == 3) && choice.id == detail.answer) {
                        //     option.disabled = true;
                        // }
                        optionList.push(option);
                    }
                    this.optionList = optionList;

                    // 2.处理答案
                    if (detail.questionType == 1) {
                        this.newAnswer = '';
                    } else if (detail.questionType == 2) {
                        // debugger;
                        this.newAnswer = this.detail.answer;
                        if (typeof detail.answer == 'string') {
                            this.detail.answer = detail.answer.split('');
                        }else if(typeof detail.answer == 'object'){
                          // console.log(detail.answer.join(""))
                        }
                    } else {
                        this.newAnswer = '';
                    }
                }
                  // else if (detail.questionType == 4) { // 填空题，预处理答案
                //    // console.log("qtype == 4");
                //     // console.log("qtype == 4");
                //     let ans = detail.answer.split('#');
                //     this.answer = ans;
                //     this.newAnswer = [];
                //     for(let i=0; i<ans.length; i++) {
                //         this.newAnswer.push('');
                //     }
                // }
                } else if (detail.questionType == 4) { // 填空题
                    //console.log("questionType == 4");
                    let ans;
                    if (typeof detail.answer == 'string') {
                        ans = detail.answer.split('、');
                    } else {
                        ans = detail.answer;
                    }

                    this.answer = ans;
                    this.newAnswer = [];
                    for(let i=0; i<ans.length; i++) {
                        this.newAnswer.push('');
                    }
                }
            } else{

                this.newChoiceList = content.choiceList;
            }
            // if (errType == 3) { // 答案错误
            //
            // } else {
            //     if (detail.questionType != 4) {
            //         this.newAnswer = detail.newAnswer;
            //     }   答案类型有数组和字符串  这样写不就行
            // }
            if (detail.questionType == 2) {
              // alert(1)
              if(errType == 1){

                this.newAnswer = detail.answer.join().split(',');
              } else if(errType == 2){
                // debugger
                let app = detail.answer
                // console.log('===',app)
                this.newAnswer = app.split('');
                detail.answer = detail.answer.split('').join(',')

                // console.log('-------a',detail.answer)
                // console.log('-------b',this.newAnswer)

              } else if (errType == 3) {
                this.newAnswer = detail.answer.join().split(',');
              }

            }
            this.errType = errType;
            this.activeIndex = index;

           // debugger
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
        submitConfrim(){//提交弹框
          // MessageBox.confirm('', {
          //   message: '确认提交吗？',
          //   title: '提示',
          //   confirmButtonText: '确认',
          //   cancelButtonText: '取消'
          // }).then(action => {
          //   if (action == 'confirm') {//确认的回调
          //     // console.log(1);
          //     this.submit();
          //   }
          // }).catch(err => {
          //   if (err == 'cancel') {//取消的回调
          //     // console.log(2);
          //     Toast('您已取消修改')
          //   }
          // });
        },
        // 提交后台
        submit () {
            let detail = this.detail;
            // console.log('detail',detail)
            let newContent = {
                title:'',
                titleImg: this.imgUrl,
                choiceList:[],
                answer:''
            };
            let errType = detail.errType;
            let questionType = this.questionType;
            this.specialExplain = this.specialExplain.replace(/^\s+/, '').replace(/\s+$/, '');//专家审题说明
            let len = this.computeLength(this.specialExplain, 20);
            let params1 = {};//专家初审
            let params2 = {};//专家报错
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

            if (errType <= 3){//题干有误、选项有误、答案有误
                /*获取题干信息*/
                this.errTypes = 1;
                if(errType == 1){//题干有误
                    if (this.newTitle.replace(/^\s+/, '').replace(/\s+$/) == '') {
                        MessageBox('提示', '题干不能为空');
                        return;
                    }
                    let con = detail.content || detail.oldContent;
                    // console.log('con',con.title);
                    // console.log('newTitle',this.newTitle)
                    // if(con.title == this.newTitle){
                    //     Toast("题干内容未修改");
                    //     return;
                    // }
                }

                //  debugger;
                let content = detail.content || detail.oldContent;
                // if (content.title == this.newTitle) {
                //     Toast("题干内容未修改");
                //     return;
                // }
                content.title = this.newTitle;
                content.title = content.title.replace(/"([^"]*)"/g, "“$1”");
                content.title = content.title.replace(/'([^']*)'/g, "‘$1’");
                if(content.choiceList) {
                  let clist = content.choiceList;
                  for(let i = 0; i < clist.length; i++){
                    let c = clist[i].value;
                    clist[i].value = c.replace(/"([^"]*)"/g, "“$1”").replace(/'([^']*)'/g, "‘$1’");
                  }
                  content.choiceList = clist;
                }

                if (questionType == 2){
                  content.answer = this.newAnswer.join('');
                }else if(questionType == 4){
                  content.answer = this.newAnswer.join('#');
                } else {
                  content.answer = this.newAnswer;
                }


                newContent = JSON.stringify(content);
                // console.log('题干报错-判断题newContent',JSON.parse(newContent))
                /*选项信息*/
                if (questionType <= 2) { // 单选题、多选题
                  // 解析选项
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
                    MessageBox('提示', '选项内容不能为空');
                    return;
                  }
                //   if (this.newAnswer == '') {
                //     MessageBox('提示', '答案不能为空');
                //     return;
                //   }
                  // 检查是否修改选项内容
                  let oldChoiceList = this.newChoiceList;
                  let changed = oldChoiceList.length == choiceList.length ? false : true;
                  for(let i=0; i<choiceList.length; i++) {
                    choiceList[i].value = choiceList[i].value.replace(/^\s+/, '').replace(/\s+$/);
                    if (choiceList[i].value == '') {
                      MessageBox('提示', '选项内容不能为空');
                      return;
                    } else if (!changed) {
                      if (choiceList[i].value != oldChoiceList[i].value) {
                        changed = true; // 有一个选项修改了就修改了
                      }
                    }
                  }
                  // if (!changed) {
                  //   MessageBox('提示', '选项内容未修改');
                  //   return;
                  // }

                  let content = detail.content || detail.oldContent;
                  content.choiceList = choiceList;
                  content.title = content.title.replace(/"([^"]*)"/g, "“$1”");
                  content.title = content.title.replace(/'([^']*)'/g, "‘$1’");
                  let clist = content.choiceList;
                  for(let i = 0; i < clist.length; i++){
                    let c = clist[i].value;
                    clist[i].value = c.replace(/"([^"]*)"/g, "“$1”").replace(/'([^']*)'/g, "‘$1’");
                  }
                  if(this.newAnswer.length == 0) {
                      content.answer = detail.answer
                  }
                  content.choiceList = clist;
                  newContent = JSON.stringify(content);
                  //console.log(newContent);
                } else if (questionType == 3) {//判断
                  content  = detail;
                  this.newChoiceList = content.content.choiceList;
                  let choiceList = [];
                  for(let i=0; i<this.newChoiceList.length; i++) {
                    let val = this.newChoiceList[i].value;
                    choiceList.push({
                      id: val,
                      value: val
                    });
                  }
                  let content = detail.content || detail.oldContent;
                  content.choiceList = choiceList;
                  content.title = content.title.replace(/"([^"]*)"/g, "“$1”");
                  content.title = content.title.replace(/'([^']*)'/g, "‘$1’");
                  let clist = content.choiceList;
                  for(let i = 0; i < clist.length; i++){
                    let c = clist[i].value;
                    clist[i].value = c.replace(/"([^"]*)"/g, "“$1”").replace(/'([^']*)'/g, "‘$1’");
                  }
                  content.choiceList = clist;
                  if(this.newAnswer == '') {
                      this.newAnswer = detail.answer;
                  }
                  content.answer = this.newAnswer;
                  newContent = JSON.stringify(content);
                  //console.log(newContent);
                } else { // 填空题
                    // newContent = this.newAnswer.join('#');
                    for(let i=0;i<this.newAnswer.length;i++){
                        if(this.newAnswer[i].replace(/^\s+/, '').replace(/\s+$/) == ''){
                            // this.newAnswer = detail.answer;
                            // content.answer = this.newAnswer;
                            content.answer = detail.answer;
                        }
                    }
                    newContent = JSON.stringify(content);
                }
                
                /*试题答案*/
                if (questionType == 1) {
                //   if (errType == 3) {
                    if (this.newAnswer.length == 0) {
                    //   MessageBox('提示', '请选择新的答案');
                    //   return;
                    this.newAnswer = detail.answer;
                    }
                //   }
                  // newContent = this.newAnswer;
                } else if (questionType == 2) { // 多选题
                  if (this.newAnswer.length == 0){
                    // MessageBox('提示', '答案不能为空');
                    // return;
                    this.newAnswer = detail.content.answer;
                  }
                //   if (errType ==3){
                    if (this.newAnswer.length < 2)  {
                      MessageBox('提示', '多选题至少两个选项');
                      return;
                    }
                //   }
                  // newContent = this.newAnswer.sort().join('');
                } else if (questionType == 3) { // 判断题
                  if (this.newAnswer.length == 0) {
                    // MessageBox('提示', '请选择新的答案');
                    // return;
                    this.newAnswer = detail.answer;
                  }
                  // newContent = this.newAnswer;
                } else if (questionType == 4) { // 填空题
                  let answer = this.newAnswer;
                  // this.newAnswer = this.newAnswer.join('#')
                //   for(let i=0; i<answer.length; i++) {
                    // if (answer[i].replace(/^\s+/, '').replace(/\s+$/) == '') {
                    //   MessageBox('提示', '答案不能为空');
                    //   return;
                    // this.newAnswer = detail.answer
                    // }
                //   }
                //   newContent = this.newAnswer;
                }
                // if (detail.answer == newContent.answer) {
                //   Toast("答案未修改");
                //   return;
                // }
            } else {//题目过时
                newContent = '';
                this.errTypes = 2;
            }
            // console.log('来源路由',this.backupRoute)
            if(this.backupRoute == '/QuestionBankPage'){
                params2 = {
                    description: this.specialExplain,
                    fieldId: detail.fieldId,
                    questionId: detail.id,
                    questionCode: detail.questionCode,
                    errType: detail.errType,
                    reportType: 2,
                    updateContent: newContent
                }
                // console.log('专家报错params',params2)
                request.chooseTtheAnswer(params2).then((data) => {
                  if (data&&data.code == 200) {
                      this.showMsg();
                      this.$router.push({
                          path:'/QuestionBankPage',
                          query:{
                              id: detail.fieldId
                          }
                      });
                      return;
                  }else {
                      MessageBox('提示', '提交错误');
                      return;
                    }
                });
            }else if(this.backupRoute == '/user/WrongTitle') {
                params1 = {
                    errTabId: detail.errTabId,
                    specialOpinion: '3', // 3 同意修改， 4 不同意修改
                    specialExplain: this.specialExplain,//专家审题说明
                    updateContent: newContent,
                    auditStart: '3', // 3 初审， 4 复审
                    questionId: detail.qid,
                    errType: detail.errType
                };
                // console.log('专家编辑params',params1)
                let self = this;
                request.submitExpertEdit(params1).then((data) => {
                  if (data.code == 200) {
                      self.showMsg();
                      if(this.backupRoute == 'QuestionBankPage'){
                          this.$router.push(this.backupRoute)
                      }
                  }
                });
            }
        },
        showProclamationPage() {
            this.showProclamation = true;
        },
        //审核专家公示
        getToProclamation () {
            this.$router.push({
                path : "/Proclamation",
                query : {
                    fieldId : this.$route.query.fieldId
                }
            })
        },
        showBlueBox() {
            this.showEditOKNotify = true;

            let self = this;
            setTimeout(function(){
                self.showEditOKNotify = false;
                self.$router.go(-2);
            }, 1500);
        },
        showMsg (){
            this.showBlueBox();
            return;
            // Depreciated
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
           }, 500);
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
        finish (){},
    }
};
</script>

<style lang="less" scoped>
    //外部引入样式，flex布局
   @import "../../common/css/public";

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
           }
          .type-content{
            padding-left: .16rem;
            margin-top: .32rem;
            .false-type{
               color: #444444;
               font-size: .32rem;
               background: #E7EDFF;
               border-radius: 1.38rem;
               padding: .22rem .32rem;
               margin-right: .4rem;
               margin-bottom: .4rem;

            }
            .false-type:last-child{
               color: #444444;
               font-size: .32rem;
               background: #E7EDFF;
               border-radius: 1.38rem;
               padding: .22rem .32rem;
               margin-right: .4rem;
               margin-bottom: .4rem;
           }
           .is-active{
               color: #fff!important;
               background: #5480FE!important;
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
         .q-title-hader{
             padding-top: 0.1rem;
         }
         .q-title.q-title-aswers{
            padding-top: 0rem;
         }
         .q-title {
            margin-right: 0.24rem;
            font-size:0.28rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#444;
            line-height:0.4rem;
            padding-top: 0.24rem;
         }

         .out-text-area{
             margin-top: .24rem;
             margin-right: .24rem;
             border: solid 1px #E8E8E8;
             padding: .2rem;
            border-radius: 0.12rem;
            .q-choice-list {
                // margin-top: -0.4rem;
                margin-bottom: 0.2rem;
                font-size: 0.30rem;
            }
            .option-list {
                margin-top: 0.2rem;
                margin-bottom:0;
            }
            .q-choice-qustion{
                margin-top: 0.24rem;
                height: 0;
            }
            .q-choice {
                height: 0.7rem;
                span {
                    font-size: 0.3rem;
                    padding-right: 0.1rem;
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
            .q-choice-chuang{
                height: 0.55rem;
            }
            .q-choice-qustion{
                height: 0.6rem;
            }
         }
         .out-text-area-awswe{
              padding: .2rem .2rem 0 .2rem;
         }
        textarea::-webkit-input-placeholder {
            font-size:0.28rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(151,151,151,1);
            line-height:0.35rem;
        }
         .text-area{
             width: 100%;
             height: 2.0rem;
             font-size: .28rem;
             color: #979797;
             /*font-family: "黑体";*/
             border: none;
             outline: none;
             resize: none;
         }
         .small {
             height: 1.5rem;
         }

       }
       .commit-btn{
            margin: 0 .24rem;
            margin-bottom: .6rem;
            .commit-btn-tx{
                width: 100%;
                text-align: center;
                padding: .28rem 0;
                background: linear-gradient(to right, #7ED1FF , #5480FE);
                background: -webkit-linear-gradient(to right, #7ED1FF , #5480FE);
                border-radius: 1.44rem;
                font-size: .34rem;
                color: #fff;
            }
        }

        .border-top {
            padding: 0.1rem 0.3rem 0 0.18rem;
        }
        .grey {
            color: #999;
        }
        .new-ans {
            color: #5480FE;
        }
   }

    .dsn {
        display: none;
    }
    .marRig {
      /*margin-top: 0.24rem;*/
      /*margin-right: 0.24rem;*/
      border: solid 1px #E8E8E8;
      padding: 0.2rem;
      border-radius: 0.12rem;
      margin: 0.2rem 0;
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
    .mint-msgbox-btns{
        height: 0.95rem !important;
    }
    .mint-msgbox{
        border-radius: 0.16rem !important;
    }
    .mint-msgbox-confirm{
        font-size:0.32rem !important;
        font-family:PingFangSC-Regular;
        font-weight:400 !important;
        color:#5480FE !important;
        line-height:0.44rem !important;
    }
    .mint-cell:last-child {
        background: transparent !important;
    }
    .mint-cell{
        background: transparent !important;
        min-height: 0.6rem !important;
    }
    .mint-checklist {
        margin-left: -0.4rem;
    }
    .mint-radiolist {
        margin-left: -0.4rem !important;

    }

    /* 多选题样式 */
    /* 默认没有选中的样式 */
    .mint-radio-input[disabled] + .mint-radio-core{
        background-color: #fff !important;
        border-color: #ccc !important;
    }
    .mint-radio-input:disabled+.mint-radio-core:after {
        top: 3px !important;
        left: 3px !important;
        width: 12px !important;
        height: 12px !important;
        background-color: #ccc!important;
        transform: scale(1)!important;
    }
    /* .mint-radio-input:disabled + .mint-radio-core::after{
        background-color: #d9d9d9;
        border-color: #ccc
    } */
    .mint-radio-core::after{
          background-color:#5480FE !important;
    }

    /* 选中的样式 */
    .mint-radio-input:checked + .mint-radio-core {
        background-color: #fff !important;
        border-color: #ccc !important;
    }
    .mint-radio-input:checked + .mint-radio-core::after{
        background-color:#5480FE !important;
        top: 3px !important;
        left: 3px !important;
        width: 12px !important;
        height: 12px !important;
    }

</style>
