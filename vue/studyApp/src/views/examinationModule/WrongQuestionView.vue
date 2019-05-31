<template>
  <div class="content">
     <app-header :title='title' :rightObj="rightObj" :listFinish="finish"></app-header>
     <yd-slider class="wrongView" :index="thisIndex" :callback="handleChange" :loop="false" :show-pagination="false">
       <yd-slider-item v-for="(item,index) in listArr" :key="index">
        <div class="main-content" :class="'content-select'+index">
          <div class="ub subject-content">
            <div class="titile-tx" :data-before="item.statusText" v-html="item.subject"></div>
          </div>
          <!-- 题干中显示图片 -->
          <div class="img-content" @click="imgClick" v-if="item.imgUrl">
            <img style="width:100%;height:3rem;" :src="item.imgUrl" alt="">
          </div>
          <div class="seleced-option">
            <div class="ub option-content" v-for="(item1,index1) in item.selected" :key="index1">
              <div class="option-num uncompressed ub ub-ac ub-pc" :data-option="item1.id">
                <div class=""> {{item.questionType != 3 ? item1.id : ''}}</div>
              </div>
              <div class="uhide select-truecontent option-select-bc ub ub-ac ub-pc">
                <div class="option-select-true"></div>
              </div>
              <div class="uhide option-select-false-content ub ub-ac ub-pc">
                <div class="option-select-false"></div>
              </div>
              <div class="ub-f1 seleced-tx tx-cl444">{{item1.value}} </div>
            </div>
          </div>



          <div>
            <P class="answer-tx">您的答案:
              <span class="answer-tx-val" style="color:#F46060; font-family: PingFangSC-Regular;">{{item.userAnswer}}</span>
            </P>
            <P class="answer-tx">正确答案:
              <span class="answer-tx-val" style="color: #5e87fe;font-family: PingFangSC-Regular;" v-html="item.answer"></span>
            </P>
          </div>

          <div class="questionSource" v-if="item.questionSource">
            <span class="qSource">试题来源：</span>
            <span class="sourceText">{{item.questionSource}}</span>
          </div>
        </div>
        </yd-slider-item>
      </yd-slider>
    <div class="footer">
         <div class="fs-tx32 bor-sty">
            <span style="width: 30px;display: inline-block;">{{thisPageIndex+1}}</span>
            <span class="bor-sty-color">/</span>
            <span style="width: 30px;display: inline-block;" class="bor-sty-color">{{this.$route.query.quetionLength}}</span>
        </div>
    </div>
    <!-- 图片遮罩层 -->
    <div class="maskIsShow" v-if="maskIsShow">
      <div class="mask" @click="maskIsShow = false">
        <img style="width:100%;margin-top:30%;" :src="imgUrl" alt="">
      </div>
    </div>
  </div>

</template>

<script type="text/babel">
import Vue from 'vue';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider'; //轮播组件引入
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引入
import requestMethods from "@/api/request";//请求地址封装
import { Toast } from "mint-ui";//Toast提示语组价引用
import $ from 'jquery'//jquery引用
import passContent from "@/utils/passContent";
export default {
  components: {
    AppHeader,
    'yd-slider': Slider,
    'yd-slider-item': SliderItem
  },
  data() {
    return {
      maskIsShow:false,
      title: "错题查看",
      listArr: [],
      thisPageIndex: 0,
      statusText: "",
      thisIndex : 0,
      rightObj: {
        isMore: false,
        icon: ''
      },
      imgUrl:'',
    };
  },
  computed: {
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    imgClick(){
      // this.maskIsShow = !this.maskIsShow;
    },
    getList() {
      let thisRouter = this.$route.query
      let params = {
        id : thisRouter.userPaperId,//用户试卷ID
        // page: 1,
        // limit: thisRouter.quetionLength//总页数
      };
      requestMethods.wrongSee(params).then(res => {
        this.listArr = res;
        // console.log('listArr',this.listArr)
        this.listArr.forEach((item, index) => {
          // let contentq = item.content;
          let content = passContent.passContent(item.content)
          //反斜杆处理
         content.title = content.title.replace(/&##/g, '\\');
         if(content.choiceList){
           for(let i = 0; i < content.choiceList.length; i++){
            if(content.choiceList[i].value && content.choiceList[i].value.indexOf("&##") != -1 ){
                content.choiceList[i].value =content.choiceList[i].value.replace(/&##/g, '\\');
            }
           }
         }

          if (item.questionType == 4) {
            // 填空题处理
            content.title = content.title.replace(
              /____/g,
              `<span class="user-answer" style="color:red;border-bottom:solid 0.01rem #333;padding: 0 0.5rem;text-align:center;border-bottom-color: red;">${
                item.userAnswer == null ? "" : item.userAnswer
              }</span>`
            );
          }
          this.$set(item, "subject", content.title);
          this.$set(item, "selected", content.choiceList);
          this.$set(item,'imgUrl',content.titleImg)
          this.imgUrl = item.imgUrl;
          let questionType = item.questionType;
                     switch(questionType) {
                            case "1":
                            this.$set(item,"statusText","单选题");
                            break;
                            case "2":
                            this.$set(item,"statusText","多选题");
                            break;
                            case "3":
                            this.$set(item,"statusText","判断题");
                            break;
                            case "4":
                            this.$set(item,"statusText","填空题");
                            break;
                            default:

                            break;
                     }
          this.$nextTick(() => {
            let thisDom = $(".content-select" + index).find(".option-num");
            //单选
            if (item.questionType == 1 || item.questionType == 3) {
              thisDom.each((i, thisItem) => {
                if (item.answer == $(thisItem).attr("data-option")) {
                  $(thisItem).addClass("uhide");
                  $(thisItem)
                    .next()
                    .removeClass("uhide");
                }
                if (item.userAnswer == $(thisItem).attr("data-option")) {
                  $(thisItem).addClass("uhide");
                  $(thisItem)
                    .next()
                    .next()
                    .removeClass("uhide");
                }
              });
            }
            //多选
            if (item.questionType == 2) {
              thisDom.each((i, thisItem) => {
                if (item.answer.indexOf($(thisItem).attr("data-option")) > -1) {
                  $(thisItem).addClass("uhide");
                  $(thisItem)
                    .next()
                    .removeClass("uhide");
                }
                if (item.userAnswer != null && item.userAnswer != "") {
                  if (
                    item.userAnswer.indexOf($(thisItem).attr("data-option")) >
                    -1
                  ) {
                    $(thisItem).addClass("uhide");
                    $(thisItem)
                      .next()
                      .addClass("uhide");
                    $(thisItem)
                      .next()
                      .next()
                      .removeClass("uhide");
                  }
                }
              });
              // item.answer = item.answer.split("").join("、");
            }
            //填空
            //  this.$nextTick(()=>{
            if (item.questionType == 4) {
              // item.userAnswer = item.userAnswer.split("#").join(" &nbsp;&nbsp;");
              let answer = item.userAnswer;
              if (answer) {
                answer = answer.split("#");
                let thisAnswerDom = $(".content-select" + index).find(
                  ".user-answer"
                );
                thisAnswerDom.each((i, thisItem) => {
                  $(thisItem).text(answer[i]);
                });
                item.userAnswer = answer.join(" 、");
              }
              item.answer = item.answer.split("#").join(" &nbsp;&nbsp;");
            }
            // })
          });
        });
      });
    },
    handleChange(index) {
      this.thisPageIndex = index;
    },
    finish(){},
  }
};
</script>

<style lang="less" scoped>
//外部样式引入flex布局
@import "../../common/css/public";
.wrongView {
  padding-bottom: 0.96rem;
}
.mint-swipe {
  overflow: hidden;
  position: relative;
  height: 9rem;
}
.content {
  padding-bottom: 3rem;
}
.main-content {
  padding: 0.58rem 0.4rem 1.12rem 0.4rem;
  .titile-tx:before {
            content: attr(data-before);
            font-size: .2rem;
            color: #5480FE;
            border: 1px solid #5480FE;
            padding: 1px 0.12rem;
            border-radius: .2rem;
            position: relative;
            bottom : .08rem;
            margin-right : .12rem;
            display: inline-block;
      }
  .titile-tx {
    font-size: 0.4rem;
    color: #000000;
    font-family: PingFangSC-Regular;
    overflow-wrap: break-word;
    word-break: break-all;
    // text-align: justify;
  }
  .subject-content {
    positin: relative;
  }
  .type-question {
    position: absolute;
    font-size: 0.14rem;
    padding: 0.01rem 0.12rem;
    border-radius: 0.12rem;
    border: 0.01rem solid #5480fe;
    color: #5480fe;
    vertical-align: middle;
    margin-top: 0.06rem;
    text-align: center;
  }
  .question-content {
    text-indent: 1.2rem;
    font-size: 0.4rem;
    color: #444444;
    font-weight: 500;
    overflow-wrap: break-word;
    font-family:PingFangSC-Regular;
  }
  .answer-tx {
    font-size: 0.4rem;
    font-family: PingFangSC-Regular;
    color: #444444;
    margin-bottom: 0.2rem;
  }
  .seleced-option {
    margin-top: 0.48rem;
    .option-content {
      margin-bottom: 0.72em;
      .option-num {
        font-size: 0.32rem;
        border: 1px solid rgba(68,68,68,1);
        border-radius: 100%;
        width: 0.56rem;
        height: 0.56rem;
        text-align: center;
        line-height: 0.56rem;
        font-family:PingFangSC-Regular;
        color:rgba(68,68,68,1);
      }
      .seleced-tx {
        font-size: 0.33rem;
        font-family:PingFangSC-Regular;
        margin-left: 0.16rem;
        line-height: 0.6rem;
      }
      .select-content {
        font-size: 0.32rem;
        border: 1px solid #bbccff;
        border-radius: 100%;
        width: 0.56rem;
        height: 0.56rem;
        text-align: center;
        line-height: 0.56rem;
        position: relative;
      }
      .option-select-true {
        background: url(../../assets/images/true.png) no-repeat center;
        width: 0.32rem;
        height: 0.24rem;
        background-size: 100% 100%;
      }
      .option-select-bc {
        background: linear-gradient(180deg, #7ed1ff, #5480fe);
        background: -webkit-linear-gradient(180deg, #7ed1ff, #5480fe);
        background: -o-linear-gradient(180deg, #7ed1ff, #5480fe);
        background: -moz-linear-gradient(180deg, #7ed1ff, #5480fe);
        width: 0.56rem;
        height: 0.56rem;
        border-radius: 100%;
        box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
        -webkit-box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
      }
      .option-select-false {
        background: url(../../assets/images/err.png) no-repeat center;
        width: 0.26rem;
        height: 0.26rem;
        background-size: 100% 100%;
      }

      .option-select-false-content {
        background: linear-gradient(180deg, #FB9A9A , #F46060);
        background: -webkit-linear-gradient(180deg, #FB9A9A , #F46060);
        background: -o-linear-gradient(180deg, #FB9A9A , #F46060);
        background: -moz-linear-gradient(180deg, #FB9A9A , #F46060);
        width: 0.56rem;
        height: 0.56rem;
        border-radius: 100%;
        box-shadow: 0rem 0.05rem 0.1rem 0rem #ffb8b8;
        -webkit-box-shadow: 0rem 0.05rem 0.1rem 0rem #ffb8b8;
      }
    }
  }
  .next-tx-content {
    margin-top: 0.48rem;
    justify-content: space-between;
    .next-btn {
      padding-left: 1.14rem;
      padding-right: 1.12rem;
      height: 0.88rem;
      line-height: 0.88rem;
      border-radius: 0.44rem;
      background: #e8e8e8;
      text-align: center;
      font-size: 0.34rem;
      color: #fff;
      background: linear-gradient(to bottom, #7ed1ff, #5480fe);
      background: -webkit-linear-gradient(to bottom, #7ed1ff, #5480fe);
    }
    .set-inval-time {
      color: #f46060;
      font-size: 0.32rem;
    }
  }
}
.footer {
    position: fixed;
    background: #fff;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 0rem 0;
    border-top: 1px solid #E8E8E8;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    height: 0.96rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    z-index: 1000;
    -webkit-display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  .bor-sty {
      display: inline-block;
      border: 1px solid #E8E8E8;
      border-radius: 0.5rem;
      padding: 0.12rem 0.3rem;
      line-height: 0.36rem;
      text-align: center;
      height: 0.36rem;
      display: -webkit-box;
      display: -ms-flexbox;
      // display: flex;
      // -webkit-display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
  }
  .bor-sty-color{
    color:#9e9e9e;
  }
  .mar-l32 {
    margin-left: 0.32rem;
  }
  .mar-r32 {
    margin-right: 0.32rem;
  }
  .fs-tx32 {
    font-size: 0.32rem;
    color: #444444;
    font-family: "黑体";
  }
}

.uhide {
  display: none !important;
}
.body-height-box>.body-view.body-router{
  height: 100%;
}
.body-height-box>.body-view.body-router>.yd-slider{
  height: 100%;
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
.questionSource {
  // box-shadow:1px 1px 6px #ccc;
  // padding: 0 0.1rem;
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
</style>
<style>
.content .yd-slider .yd-slider-wrapper{
   -webkit-align-items: flex-start;
   align-items: flex-start;
}
</style>

