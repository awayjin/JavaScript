<template>
  <div class="contentEmploy">
    <head-component :title='totalTime' @toPopup="recoil()" ></head-component>
    <div class="out-content">
     <transition-group name="list" tag="p">
     <div v-show="show==index" class="main-content" v-for="(item,index) in listArr" :data-index="index" :key="index">

           <div class="ub subject-content">
               <div class="titile-tx" :data-before="item.statusText" v-html="item.subject"></div>
           </div>
           <!-- 题干中显示图片 -->
           <div class="img-content" @click="imgClick" v-if="item.imgUrl">
               <img style="width:100%;height:3rem;" :src="item.imgUrl" alt="">
           </div>
           <!--<div class="img-content" @click="imgClick(item)">-->
               <!--<img style="width:100%;height:3rem;" src="../../assets/images/backupImg.png" alt="">-->
           <!--</div>-->
           <div class="seleced-option">
               <div class="ub option-content" v-for="(selecedItem,selecedIndex) in item.selected" :key="selecedIndex" @click="seleced($event,item,selecedItem,selecedIndex)">
                   <div class="option-num uncompressed ub ub-ac ub-pc">
                       <div class="">{{item.questionType != 3 ? selecedItem.id : ''}}</div>
                   </div>
                   <div class="uhide select-true-content uncompressed option-select-bc ub ub-ac ub-pc">
                        <p class="option-select-true"></p>
                    </div>
                    <div class="uhide option-select-false-content uncompressed ub ub-ac ub-pc">
                           <div class="option-select-false"></div>
                    </div>
                   <div class="ub-f1 seleced-tx tx-cl444">{{selecedItem.value}}</div>
               </div>
           </div>

           <div class="ub ub-ac next-tx-content">
               <p class="set-inval-time ub-f1">{{'00:'+timer}}</p>
               <div class="next-btn" v-if="alreadyExamTopicCount+1 != totalNum.examTopicCount" @click="nextQuestion(item,index,$event)">下一题</div>
               <div class="next-btn" v-else @click="nextQuestion(item,index,$event)">交卷</div>
           </div>
            <!-- 图片遮罩层 -->
            <div class="maskIsShow" v-if="maskIsShow">
                <div class="mask" @click="maskIsShow = false">
                    <img style="width:100%;margin-top:30%;" :src="item.imgUrl" alt="">
                </div>
            </div>
      </div>
    </transition-group>
   </div>
     <div class="footer js-footer">
         <div class="fs-tx32 bor-sty">
            <span style="width: 30px;display: inline-block;">{{alreadyExamTopicCount+1}}</span>
            <span class="bor-sty-color">/</span>
            <span class="bor-sty-color" style="width: 30px;display: inline-block;">{{totalNum.examTopicCount}}</span>
        </div>
        <!-- 下一题按钮移至左下角 -->
        <!-- <div class="ub ub-ac next-content">
            <div class="next-btn" v-if="alreadyExamTopicCount+1 != totalNum.examTopicCount" @click="nextQuestion(item,index,$event)">下一题</div>
            <div class="next-btn" v-else @click="nextQuestion(item,index,$event)">交卷</div>
        </div> -->
     </div>

     <div v-if="isBack">
         <retreat :finishNum="alreadyExamTopicCount" :totalNum="surplusNum" @isAgree="toBeAgree"></retreat>
     </div>
  </div>

</template>
<script type="text/babel">
import headComponent from "@/components/appHeader/headComponent";//顶部组件引入
import Retreat from "@/views/user/Retreat";//答题中点击后退键跳出的提示
import requestMethods from "@/api/request";//请求链接封装
import { Toast,MessageBox} from 'mint-ui';//提示语Toast组件引用
import Minput from "@/components/questionsBankModule/Minput";//填空题输入框组件引用，
import $ from 'jquery'//jquery组件引用
import passContent from "@/utils/passContent";
export default {
    components : {
       headComponent,Retreat,Minput
    },
    data() {
        return {
            inTime: 0,
            maskIsShow:false,
            footerShow:true,
            listArr : [],
            selctedArr : [1,2,3,4],
            show : 0,
            timer : 30,//答题时间
            defalTtimer : 60,
            totalNum : {},
            totalTime : "",
            totalMinute : "",
            totalTimeBoolean : true,
            titleTime : "",
            userPaperId : "",//用户试卷id
            recordId : "",//考试记录id
            alreadyExamTopicCount : 0,
            examTopicCountBase : 0,
            examTopicCount : 10,//总题数
            surplusNum : 0,
            page : 0,//页数
            examId : "",//报考id
            onOff : false,
            isBack : false,
            thisCountDown : undefined,//定时器
            thisTimingMeter : undefined, //总时长

            totalSeconds: 0, // 考试总秒数
            isCommit: false,//是否已经提交
            form: {
                topicId: undefined,
                recordId: undefined,
                answer: undefined,
                userAnswer: undefined,
                position: 0
            },

            paperBankId: '',
            saveData: {},
            examStartTime: '',//考试开始时间
            sysCurrentTime: '',//系统当前时间
            instance: '',
            backUpSeconds: '',//备份考试总时长
        };
    },
    created () {
        let win_h = $(window).height();
        window.addEventListener('resize', function () {
            if($(window).height() < win_h){
              document.getElementsByClassName('js-footer')[0].style = "display:none !important;"
            }else{
                document.getElementsByClassName('js-footer')[0].style = "display:block;"
            }
        });
       this.totalFun();
    },
    mounted(){
        this.$nextTick(()=>{
            if(this.saveData == undefined) {
                this.alreadyExamTopicCount = 0;
            }
            this.sysCurrentTime = Date.now();
        })
    },
    watch: {
        'totalTime': function(val,oldVal) {
            let index = val.lastIndexOf('长');
            let currentTime = val.substring(index+1,val.length)
            let currentArr = currentTime.split(':');
            // console.log('currentTime',currentTime)
            let min = currentArr[0];
            let seconds = currentArr[1];
            let totalMinPlusSeconds = parseInt(min*60) + parseInt(seconds);
            if(totalMinPlusSeconds <= 180) {
                if(min <= 0) {
                    this.instance = Toast('考试将在'+seconds+'秒后结束');
                }else {
                    this.instance = Toast('考试将在'+min+'分'+seconds+'秒后结束');
                }
                setTimeout(() => {
                    this.instance.close();
                }, 1000);
            }
        }
    },
    beforeRouteLeave (to, from, next) {
      const isOk = this.totalNum.examTopicCount == this.alreadyExamTopicCount+1;
      if (isOk) {
        next()
      }else {
        next(false);//阻止物理返回键
      }
    },
    methods: {
        imgClick(){//点击图片放大
            this.maskIsShow = !this.maskIsShow;
        },
        saveStatus(resData) { // 记住当前做到第几题
            let key = 'user-paper-cache';
            let cacheData = localStorage.getItem(key);
            if (cacheData) {
                cacheData = JSON.parse(cacheData);
            } else {
                cacheData = {};
            }

            let paperKey = this.paperBankId;
            if (!cacheData[paperKey]) cacheData[paperKey] = {};
            cacheData[paperKey].lastCount = this.alreadyExamTopicCount;
            cacheData[paperKey].lastTime = (new Date()).getTime();
            if (resData) {
                 cacheData[paperKey].resData = resData;
            }
            localStorage.setItem(key, JSON.stringify(cacheData));
        },
        restoreStatus(paperBankId) {
            let key = 'user-paper-cache';
            let cacheData = localStorage.getItem(key);
            if (cacheData) {
                cacheData = JSON.parse(cacheData);
            } else {
                cacheData = {};
            }
            let lastStatus = cacheData[paperBankId];
            if (lastStatus && lastStatus.resData) {
                try {
                    lastStatus.resData = JSON.parse(lastStatus.resData);
                } catch (e) {
                    return null;
                }
            }
            return lastStatus;
        },
        clearStatus() {
            let key = 'user-paper-cache';
            let cacheData = localStorage.getItem(key);
            if (cacheData) {
                cacheData = JSON.parse(cacheData);
                delete cacheData[this.paperBankId];
                localStorage.setItem(key, JSON.stringify(cacheData));
            }
        },
        init (position) {
            let self = this;
            let userPaperId = this.userPaperId;
            let limit =  1;
            let page = this.alreadyExamTopicCount+1;
             requestMethods.getTheTitleURL(userPaperId,limit,page).then((res) =>{
                if(res.code==200 || typeof(res.code)=='undefined'){
                    // console.log('details',res.records)
                    let _listArr = res.records;
                    if (self.listArr.length === position) {
                      //试题列表
                      self.listArr = [...self.listArr,..._listArr];
                      self.listArr.forEach((item,index) => {
                        let content = passContent.passContent( item.content);
                        content.title = content.title.replace(/&##/g, '\\');
                        if(content.choiceList){
                          for(let i = 0; i < content.choiceList.length; i++){
                            if(content.choiceList[i].value && content.choiceList[i].value.indexOf("&##") != -1 ){
                              content.choiceList[i].value =content.choiceList[i].value.replace(/&##/g, '\\');
                            }
                          }
                        }
                        if (item.questionType == 4) { // 填空题处理
                          content.title = content.title.replace(/"([^"]*)"/g, "“$1”");
                          content.title = content.title.replace(/'([^']*)'/g, "‘$1’");
                          content.title = content.title.replace(/\\/g, "/");
                          content.title = content.title.replace(/\s+/g, "");
                          let title = content.title.replace(/\t+/g, '');
                          content.title = title.replace(/____/g,"<div  ref='iptStatus' @click='iptClick()' style='border:none;border-bottom: 1px solid #5480fe;color:#5480fe;  display: inline; outline: none;max-width: 100%;white-space: pre-wrap;word-break: break-all;padding:0 0.3rem;-webkit-user-select: auto;' contenteditable='true' class='staClass input-val inpt-sty' onkeydown='if(event.keyCode==13){event.keyCode=0;event.returnValue=false;}'>&nbsp;&nbsp;</div>")
                        }
                        let questionType = item.questionType;
                        switch(questionType) {
                          case "1":
                            self.$set(item,"statusText","单选题");
                            break;
                          case "2":
                            self.$set(item,"statusText","多选题");
                            break;
                          case "3":
                            self.$set(item,"statusText","判断题");
                            break;
                          case "4":
                            self.$set(item,"statusText","填空题");
                            break;
                          default:

                            break;
                        }
                        self.$set(item,"subject",content.title);
                        self.$set(item,"imgUrl",content.titleImg)
                        //选项
                        self.$set(item,"selected", content.choiceList);
                        self.form.topicId = _listArr[0].id;
                        self.form.recordId = this.recordId;
                        self.form.answer = _listArr[0].answer;
                        self.form.userAnswer = "";
                        self.form.position = position;
                      })
                    }
                  }else{
                      MessageBox.alert('网络异常请刷新').then(action => {
                          self.init(self.show);
                      });
                      // Toast(res.msg);
                  }
             }).catch(err => {
               MessageBox.alert('网络异常请刷新').then(action => {
                 self.init(self.show);
               });
             })
             self.timer = self.defalTtimer;
             self.timingMeter ();
             //剩余题数
             self.surplusNum = self.examTopicCount - self.alreadyExamTopicCount;
            //  let that = self;
            //  this.$nextTick(()=>{
            //      let that = self;
            //     setTimeout(() => {
            //         let iptB = document.getElementsByClassName('staClass')
            //         for(let i = 0; i < iptB.length; i ++) {
            //             iptB[i].onfocus = function() {
            //                 that.footerShow=false;
            //             }
            //         }
            //         for(let i = 0; i < iptB.length; i ++) {
            //             iptB[i].onblur = function() {
            //                 setTimeout(()=>{
            //                     that.footerShow=true;
            //                 },536)
            //             }
            //         }
            //     },300)
            // })
        },
        totalFun () {
           let thisRouter = this.$route.query;
        //    console.log('route',this.$route)
           let params = {
                paperBankId : thisRouter.paperBankId,
                examType : thisRouter.examType,
                examCount : thisRouter.examCount
           }
           let saveKey = thisRouter.paperBankId;
           this.paperBankId = saveKey;
            let cacheData = this.restoreStatus(saveKey); // 恢复上次状态
            
            if (cacheData) { // 不需要调接口了
                let resData = cacheData.resData;
                if(resData) {
                    let nowTime = (new Date()).getTime();
                    this.inTime = resData.inTime || nowTime
                    if (!resData.inTime) {
                        resData.inTime = this.inTime;
                        this.saveStatus(JSON.stringify(resData)); // save
                    }
                    
                    // if (nowTime < (cacheData.lastTime + 3000)) { // 至少3s
                    //     nowTime = cacheData.lastTime +3000;
                    // }
                    // console.log('t:', (nowTime - cacheData.lastTime));
                    resData.examSurplusTime -= (nowTime - this.inTime); // 过去的时间

                    this.totalNum = resData;
                    this.userPaperId = resData.userPaperId;
                    //单题限时
                    this.timer = resData.singleTime;
                    this.defalTtimer = resData.singleTime;
                    //总时长
                    if(this.totalTimeBoolean) {
                        this.titleTime = parseInt((resData.examSurplusTime % (1000 * 60 * 60)) / (1000 * 60));
                        this.totalMinute = parseInt((resData.examSurplusTime % (1000 * 60)) / 1000);
                        this.totalTimeBoolean = false;

                        this.totalSeconds = parseInt(resData.examSurplusTime)/1000; // 总秒数
                        // this.totalSeconds = parseInt(this.backUpSeconds - (nowTime - cacheData.lastTime))

                        this.totalTtimingMeter();
                    }
                    //已经答题总数
                    if(cacheData.lastCount == 0) {//当处于第一题考试时，关闭进程
                        this.alreadyExamTopicCount = cacheData.lastCount
                        this.examTopicCountBase = cacheData.lastCount
                    }else {//中途关闭进程
                        this.alreadyExamTopicCount = cacheData.lastCount+1
                        this.examTopicCountBase = cacheData.lastCount+1
                    }
                    
                    //总题数
                    this.examTopicCount = resData.examTopicCount;
                    //考试记录id
                    this.recordId = resData.recordId;
                    //报考id
                    this.examId = resData.examId;

                    this.init(this.show)
                    return;
                }
                
            }

            this.inTime = (new Date()).getTime();
           params = JSON.stringify(params);

            // console.log('params',params)
            requestMethods.examinationQuestions(params).then((res) =>{
                // console.log('考试界面res',res)
                this.examStartTime = res.data.examStartTime 
                try {
                    if(res.code == 200) {
                        let resData = res.data;
                        resData.inTime = this.inTime;
                        this.saveData = resData;
                        this.totalNum = resData;
                        this.userPaperId = resData.userPaperId;
                        //单题限时
                        this.timer = resData.singleTime;
                        this.defalTtimer = resData.singleTime;
                        //总时长
                        if(this.totalTimeBoolean) {
                            this.titleTime = parseInt((resData.examSurplusTime % (1000 * 60 * 60)) / (1000 * 60));
                            this.totalMinute = parseInt((resData.examSurplusTime % (1000 * 60)) / 1000);
                            this.totalTimeBoolean = false;

                            this.totalSeconds = parseInt(resData.examSurplusTime)/1000; // 总秒数
                            this.backUpSeconds = parseInt(resData.examSurplusTime)/1000;//备份

                            this.totalTtimingMeter();

                        }
                        //已经答题总数
                        this.alreadyExamTopicCount = resData.alreadyExamTopicCount;
                        this.examTopicCountBase = resData.alreadyExamTopicCount;
                        if(this.alreadyExamTopicCount == null) {
                            this.alreadyExamTopicCount = 0;
                            this.examTopicCountBase = 0;
                        }
                        //总题数
                        this.examTopicCount = resData.examTopicCount;
                        //考试记录id
                        this.recordId = resData.recordId;
                        //报考id
                        this.examId = resData.examId;
                        this.saveStatus(JSON.stringify(resData)); // save

                        this.init(this.show)
                    }else{
                        // if(res.data.examTopicCount == 0) {//考试界面无试题
                            Toast(res.msg);
                            setTimeout(() => {
                                this.$router.replace({
                                    path: "/Home"
                                });
                            }, 2500);
                        // }
                    }
                } catch (e) {
                    this.$router.push({
                        path: "/500"
                    });
                }
            });
        },
        nextQuestion (item,index,ev) {
            // if(!this.onOff) {
                // this.onOff = false;
                this.nextQuestionFun(item,index,ev);
                // this.onOff = false;
            // }

        },
        //下一题
        nextQuestionFun (item,index,ev) {
            // debugger
            let vm = this
            if(this.onOff) {
                return
            }
            if (index != this.listArr.length - 1) { // 当前页面提交
              return
            }
            this.onOff = true; // 锁
            this.clearTimer(this.thisCountDown)
            this.thisCountDown = undefined
            let userAnswer = "";
            let answer = item.answer;
            let topicId = item.id;
            //获取答案 (单选--判断)
            if(item.questionType == 1 || item.questionType == 3) {
                userAnswer = $(ev.currentTarget).closest(".main-content").find("*[data-answer]").attr("data-answer");
            }
            //多选
            if(item.questionType == 2) {
                 let userAnswerDom = $(ev.currentTarget).closest(".main-content").find("*[data-answer]");
                 userAnswerDom.each((index,item) => {
                     userAnswer += $(item).attr("data-answer");
                 })
            }
            if(item.questionType == 4) {
                let userAnswerVal = $(ev.currentTarget).closest(".main-content").find(".input-val");
                userAnswerVal.each((index,item) => {
                    userAnswer += "#"+$(item).text().trim();
                })
                userAnswer = userAnswer.substring(1);
            }
             if(userAnswer == undefined) {
                userAnswer = "";
             }
             /*let params = {
                 topicId : topicId,//考试题目ID
                 recordId : this.recordId,//考试记录ID
                 answer : answer,//答案
                 userAnswer : userAnswer//用户答案
             }  */
                if (this.form.position !== index) {
                  this.onOff = false
                  return
                }
                this.form.userAnswer = userAnswer;
                this.saveStatus(); // 保存当前做到第几道题目
                requestMethods.examTopicPersistenceURL(this.form).then((res) => {
                if(res.code == 200) {
                    //最后一题
                    if(this.totalNum.examTopicCount == this.alreadyExamTopicCount+1) {
                        this.page = this.totalNum.examTopicCount;
                        this.alreadyExamTopicCount = this.totalNum.examTopicCount-1;
                        this.show = this.listArr.length - 1;
                        this.sunbmitBtn();

                    } else{

                        vm.show = vm.listArr.length;//下一页
                        this.page ++;
                        vm.alreadyExamTopicCount = vm.examTopicCountBase + vm.show;
                        this.init(vm.show);
                        // this.onOff = false;
                    }

                }
                this.onOff = false
                //   debugger;
            })
            .catch(e => {
                this.onOff = false
            })
            //  debugger;


        },
      clearTimer (id) {
        if (typeof id !== 'undefined') {
          clearInterval(id)
        }
      },
        timingMeter () {
          this.clearTimer(this.thisCountDown)
          this.thisCountDown = undefined
          if(this.timer < 10) {
              this.timer = "0"+this.timer;
          }
          this.thisCountDown = setInterval(() => {
            this.timer--;
            if(this.timer == "00") {
              this.clearTimer(this.thisCountDown)
              this.thisCountDown = undefined
                //点击事件
                $(".next-btn").eq(this.show).trigger("click");
            }
            if(this.timer < 10) {
              this.timer = "0"+this.timer;
            }
          },1000);

        },
        formatRemainTime(seconds) {
            let minute = parseInt(seconds / 60);
            let second = parseInt(seconds % 60);

            let fminute = minute < 10 ? '0' + minute : minute;
            let fsecond = second < 10 ? '0' + second : second;
            return fminute + ':' + fsecond;
        },
        //总时长
        totalTtimingMeter () {
            if (this.thisTimingMeter) {
              this.clearTimer(this.thisTimingMeter)
              this.thisTimingMeter = undefined
            }

            // let minute = this.titleTime;
            // let second = this.totalMinute;
            // //初始化 数字
            // if(minute < 10) {
            //     minute = "0" + minute;
            // }
            // if(second < 10) {
            //     second = "0" + second;
            // }
            this.thisTimingMeter = setInterval(() => {
                 //second--;
                 // add by lcy
                 this.totalSeconds--;
                 if (this.totalSeconds <= 0) {
                     // 考试考试时，examApply阶段获取定时器，而不请求btn接口，获取定时器的剩余时间，如果剩余时间==0，上次考试已经自动交卷，请在考试记录中查看结果
                   this.sunbmitBtn();
                   this.clearTimer(this.thisTimingMeter)
                   this.thisTimingMeter = undefined
                   return;
                 }
                 // End

                //  if(second == "00" && minute == "00") {
                //      this.sunbmitBtn();
                //      clearInterval(this.thisTimingMeter);
                //      return
                //  }

                // if(second == "00") {
                //       second = 60;
                //       minute--;
                //       if(minute < 10){
                //          minute = "0" + minute;
                //       }
                //}
                //当秒钟为00时，秒数重新给值
                // if(second < 10) {
                //     second = "0" + second;
                // }
                // if (isNaN(second)) {
                //     second = '00';
                // }

                // add by lcy
                this.totalTime = "剩余总时长" + this.formatRemainTime(this.totalSeconds);
                return;
                // End

                //this.totalTime = "剩余总时长" + minute+":"+second;
            },1000);

        },
        seleced (ev,item,selecedItem,selecedIndex) {
             if(item.questionType == 1 || item.questionType == 3) {
                 $(ev.currentTarget).closest(".seleced-option").find(".select-true-content").addClass("uhide").removeAttr("data-answer");
                 $(ev.currentTarget).closest(".seleced-option").find(".option-num").removeClass("uhide");
                 //点击当前 加勾选按钮
                 $(ev.currentTarget).find(".select-true-content").removeClass("uhide").attr("data-answer",selecedItem.id);
                 $(ev.currentTarget).find(".option-num").addClass("uhide");
             }
             //多选题
             if(item.questionType == 2) {
                 let trueBtn = $(ev.currentTarget).find(".select-true-content");
                 if(trueBtn.hasClass("uhide")) {
                    $(ev.currentTarget).find(".select-true-content").removeClass("uhide").attr("data-answer",selecedItem.id);
                    $(ev.currentTarget).find(".option-num").addClass("uhide");
                 }else{
                     $(ev.currentTarget).find(".select-true-content").addClass("uhide").removeAttr("data-answer");
                     $(ev.currentTarget).find(".option-num").removeClass("uhide");
                 }
             }
        },
        sunbmitBtn () {
            let params = {
                userPaperId : this.userPaperId, //用户试卷ID
                examId : this.examId, //报考ID
                recordId : this.recordId //考试记录ID
            }
            this.clearStatus(); // 交卷后清除记录

            requestMethods.examTopicCompleteURL(params).then((res) => {
                try {
                    if(res.code == 200) {
                        let resData = res.data;
                        let thisRouter = this.$route.query;
                        localStorage.setItem("submitSuccessfulInformation",JSON.stringify(resData));
                        // debugger;
                        this.isCommit=true;
                        this.$router.push({
                            path: "/testScore",
                            query : {
                                userPaperId : this.userPaperId,//用户试卷ID
                                examType : thisRouter.examType,//考试类型
                                // examCount : thisRouter.examCount//是否第一次考试
                            }
                        })
                    }else{
                        // Toast(res.msg);
                        // setTimeout(() => {
                        //     this.$router.replace({
                        //         path: "/Home"
                        //     });
                        // }, 2000);
                         this.$router.push({
                            path: "/testScore",
                            query : {
                                userPaperId : this.userPaperId,//用户试卷ID
                                examType : thisRouter.examType,//考试类型
                                // examCount : thisRouter.examCount//是否第一次考试
                            }
                        })
                    }
                } catch (e) {
                    this.$router.push({
                        path: "/500"
                    });
                    // setTimeout(() => {
                    //     this.$router.replace({
                    //         path: "/Home"
                    //     });
                    // }, 1500);
                }
            });

        },
        //弹框
        recoil(){
          //剩余题数
          this.surplusNum = this.examTopicCount - this.alreadyExamTopicCount;
          this.isBack = true;
        //   debugger;
        },
        toBeAgree (index) {
            this.isBack = false;
            if(index == 0) {
                //继续答题
                return
            }
            this.sunbmitBtn ();
            // debugger
        }

    },
    // resetTemp() {
    //   this.parans={
    //         userPaperId:undefined,
    //         page:undefined,
    //         limit:undefined
    //     }
    // },

    beforeRouteEnter (to, from, next) {
        let isFromHome = sessionStorage.getItem('exam-from-home');
        if (isFromHome) {
            sessionStorage.removeItem('exam-from-home');
            next(true);
        } else {
            next(false);
        }
    },
    beforeRouteLeave (to, from, next) {
        if(to.name != "/Home" && to.path != "/500" && to.name != "/user/CertificationExam" && !this.isCommit && to.name == "/user/examList" && to.name!="/errorPages/500") {
        // this.isBack = true;
        // if(this.isCommit){
        //      next();
        // }
        recoil()
        next(false);
        return
        }
        this.isCommit=false;
        //清除定时器
        this.clearTimer(this.thisTimingMeter)
        this.thisTimingMeter = undefined
        this.clearTimer(this.thisCountDown)
        this.thisCountDown = undefined
        //返回键 控制
        next();
    }
};
</script>
<style lang="less" scoped>
    //外部样式引入，这是flex布局样式。
   @import "../../common/css/public";
    .contentEmploy {
      position: relative;
      height: 100%;
      /*padding-bottom: 0.96rem;*/
    }
  .img-content {
      margin-top: 0.16rem;
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
  .main-content{
      padding: .34rem .4rem .4rem .4rem;
      margin-bottom: .8rem;
      .titile-tx{
        font-size : .4rem;
        color : #444;
        font-family:PingFangSC-Regular;
        // line-height: 0.56rem;
        overflow-wrap: break-word;
        // text-align: justify;
        word-break: break-all;
      }
      .titile-tx:before {
            content: attr(data-before);
            display: inline-block;
            font-size: .2rem;
            line-height:0.28rem;
            color: #5480FE;
            border: 1px solid #5480FE;
            padding: 1px 0.12rem;
            border-radius: .2rem;
            position: relative;
            bottom : .08rem;
            margin-right : .12rem;
            // display: inline-block;
      }
      .seleced-option{
          margin-top: .48rem;
          border:.01rem solid transparent;
          .option-content{
             margin-bottom: .72em;
             line-height:0.56rem;
              border:.01rem solid transparent;
             .option-num{
                font-size: 0.32rem;
                border: 1px solid rgba(68,68,68,1);
                font-family: PingFangSC-Regular;
                border-radius: 50%;
                width: 0.56rem;
                height: 0.56rem;
                line-height: 0.56rem;

             }
             .seleced-tx{
                font-size: .33rem;
                font-family: PingFangSC-Regular;
                margin-left: .16rem;
                color: #444444;
                font-weight: 400;
                line-height:0.56rem;
                 border:.01rem solid transparent;
             }
             .select-content{
                font-size: .32rem;
                border: 1px solid #BBCCFF;
                border-radius: 100%;
                width: .56rem;
                height: .56rem;
                text-align: center;
                line-height: .56rem;
                position: relative;
            }
            .option-select-true{
                background: url(../../assets/images/true.png) no-repeat center;
                width: .32rem;
                height: .24rem;
                background-size: 100% 100%;
            }
            .option-select-bc{
              background: linear-gradient(180deg, #7ED1FF , #5480FE);
              background: -webkit-linear-gradient(180deg, #7ED1FF , #5480FE);
              background: -o-gradient(180deg, #7ED1FF , #5480FE);
              background: -moz-linear-gradient(180deg, #7ED1FF , #5480FE);
              border: solid 1px #bbccff;
              width: .56rem;
              height: .56rem;
              border-radius: 100%;
              box-shadow:0rem 0.05rem 0.1rem 0rem rgba(187,204,255,1);
              -webkit-box-shadow:0rem 0.05rem 0.1rem 0rem rgba(187,204,255,1)
          }
         .option-select-false{
                background: url(../../assets/images/err.png) no-repeat center;
                width: .26rem;
                height: .26rem;
                background-size: 100% 100%;
                border-radius: 100%;
           }

           .option-select-false-content{
              background: linear-gradient(180deg, #FB9A9A , #F46060);
              background: -webkit-linear-gradient(180deg, #FB9A9A , #F46060);
              background: -o-linear-gradient(180deg, #FB9A9A , #F46060);
              background: -moz-linear-gradient(180deg, #FB9A9A , #F46060);
              width: .56rem;
              height: .56rem;
              border-radius: 100%;
          }


          }
      }
      .next-tx-content {
          margin-top: .48rem;
          justify-content: space-between;
          .next-btn{
            padding-left: 1.14rem;
            padding-right: 1.12rem;
            height: .88rem;
            line-height: .88rem;
            border-radius: .44rem;
            background: #E8E8E8;
            text-align: center;
            font-size: .34rem;
            color: #fff;
            background: linear-gradient(90deg, #7ED1FF , #5480FE);
            background: -webkit-linear-gradient(90deg, #7ED1FF , #5480FE);
            background: -moz-linear-gradient(90deg, #7ED1FF , #5480FE);
            background: -O-linear-gradient(90deg, #7ED1FF , #5480FE);
            box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
            -webkit-box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
         }
         .set-inval-time{
             color: #F46060;
             font-size: .32rem;
         }
      }
  }
  .footer{
       position: absolute;
       background: #fff;
       z-index: 1000;
       width: 100%;
       left: 0;
       bottom: 0;
       padding: 0rem 0; // 0.16rem 0
       border-top: 1px solid #E8E8E8;
    //    padding-left: .4rem;
    //    padding-right: .4rem;
       height: 0.96rem;
       .bor-sty{
          display: inline-block;
          border: 1px solid #E8E8E8;
          border-radius: .5rem;
          padding: .07rem .28rem;
          text-align:center;
          position: absolute;
          top: .2rem;
          margin-left: .32rem;
        }
        // 下一题按钮左下角样式
        // .next-content {
        //   .next-btn {
        //         padding-left: 0.66rem;
        //         padding-right: 0.66rem;
        //         height: 0.63rem;
        //         line-height: 0.63rem;
        //         border-radius: 0.44rem;
        //         background: #E8E8E8;
        //         text-align: center;
        //         font-size: 0.32rem;
        //         color: #fff;
        //         background: -webkit-gradient(linear, left top, right top, from(#7ED1FF), to(#5480FE));
        //         background: linear-gradient(90deg, #7ED1FF, #5480FE);
        //         margin-left: 3.0rem;
        //     }
        // }
        .mar-l32{
            margin-left: .32rem;
        }
        .mar-r32{
            margin-right: .32rem;
        }
       .fs-tx32{
        font-size: .32rem;
        color:#444444;
       }
  }
  .out-content{
          width: 100%;
          position: absolute;
          visibility: visible;
          top: 0.88rem;
          bottom: 0.96rem;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          /*padding-bottom: .88rem;*/
          box-sizing: border-box;
      }
      .main-content{
        //   position: absolute;
        //   top: 0;
        //   left: 0;
      }

.list-enter-active {
    transition: all .05s ease;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
}

.list-enter, .list-leave-to {
   opacity: 0;
   -webkit-transform: translate(100%, 0);
   transform: translate(100%, 0);
}

  .uhide{
      display: none !important;
  }
  .bor-sty-color{
    color:#9e9e9e;
  }
</style>
