
<template>
    <div class="home">
      <index-app-header :title="userInfo.userName" :user-photo="userInfo.image || defaultImg">
         <div slot="headerRight" v-if="medalList.length" class="badge" @click="badgeToSee">
              <div :class="item.medalType == 3 ? 'ub ub-ac img-sty' : 'ub img-sty'" v-for="(item,index) in medalList" :key="index">
                  <img :src="medalIconList[item.medalType]" alt="">
              </div>
              <!-- <div class="ub img-sty" v-for="item in flagStatu.nineMedal">
                  <img src="../views/user/imges/icom-index-nine.png" alt="">
              </div>
              <div class="ub ub-ac img-sty" v-for="item in flagStatu.halfMedal ">
                  <img src="../views/user/imges/icom-index-half.png" alt="">
              </div>
              <div class="ub img-sty" v-for="item in flagStatu.yearMedal"> -->
                  <!-- 为4个的时候，只展示3个icon -->
                  <!-- <img src="../views/user/imges/icom-index-year.png" alt="">
              </div> -->
          </div>
      </index-app-header>
          <!-- 积分 -->
          <div class="question_m main-content">
            <template>
              <yd-slider :index="integralSliderIndex" :show-pagination="pagination" :auto="0" :callback="handleChange" :pagination-color="'#348BEC'" :pagination-active-color="'#ABD4FF'">
                <yd-slider-item v-for="(item,key) in pointInfo" :key="key">
                  <section class="apply_inner" :class="[item.paperType == 0 ? 'apply_bgc' : '']">
                    <div class="border_rad" :class="[item.paperType == 1 ? 'apply' : '']">
                      <!-- 资格赛 -->
                      <template v-if="item.paperType == 0">
                        <div class="apply_l" style="margin-left:0.3rem;">
                          <div class="head-top" style="margin-top:-1.1rem;">
                            <span class="exam-type fontStyle">资格赛</span>
                            <span class="fontStyle">-</span>
                            <span class="fontStyle">{{item.nPaperName}}</span>
                          </div>
                          <!-- 考试通过 -->
                          <template v-if="item.examResult == 1">
                            <p class="apply_text" v-html="item.neWreminder"></p>
                            <template v-if="item.nextStartTime != 'null'">
                              <div class="paper-time">{{"您的保级考试开放时间：" + item.nextStartTime}}</div>
                            </template>
                          </template>
                          <!-- 考试未通过 -->
                          <template v-else-if="item.examResult == 0">
                            <p class="apply_text" @click="goExamList" v-html="item.neWreminder"></p>
                          </template>
                          <!-- 中途退出 -->
                          <template v-else>
                            <p class="apply_text" @click="goExamList">请您继续考试</p>
                          </template>
                        </div>
                      </template>
                      <!-- 小专家赛 -->
                      <template v-if="item.paperType == 1">
                        <div class="apply_l">
                          <div class="head-top">
                            <span class="exam-type fontStyle">专家赛</span>
                            <span class="fontStyle">-</span>
                            <span class="fontStyle">{{item.nPaperName}}</span>
                          </div>
                          <!-- 认证阶段 -->
                          <template v-if="item.examType == 1">
                             <!-- 考试通过 -->
                            <template v-if="item.examResult == 1">
                              <p class="apply_text" v-html="item.neWreminder"></p>
                              <template v-if="item.nextStartTime != 'null'">
                                <div class="passing-times" v-show="item.successCount > 0">
                                  <span  :class="{'activeP':item.successCount>0}"></span>
                                  <span  :class="{'activeP':item.successCount>1}"></span>
                                  <span  :class="{'activeP':item.successCount>2}"></span>
                                  <span  :class="{'activeP':item.successCount>3}"></span>
                                  <div class="progress-bar"> {{item.successCount}}/4</div>
                                </div>
                                <div class="paper-time">{{"您的下次考试开放时间：" + item.nextStartTime}}</div>
                              </template>
                            </template>
                            <!-- 考试未通过 -->
                            <template v-else-if="item.examResult == 0">
                              <!-- 考试未通过，过完一周提示 -->
                              <p class="apply_text" @click="goExamList" v-html="item.neWreminder"></p>
                              <template v-if="item.nextStartTime != 'null'">
                                <div class="passing-times" v-show="item.successCount > 0">
                                  <span  :class="{'activeP':item.successCount>0}"></span>
                                  <span  :class="{'activeP':item.successCount>1}"></span>
                                  <span  :class="{'activeP':item.successCount>2}"></span>
                                  <span  :class="{'activeP':item.successCount>3}"></span>
                                  <div class="progress-bar"> {{item.successCount}}/4</div>
                                </div>
                              </template>
                            </template>
                            <!-- 中途退出 -->
                            <template v-else>
                              <p class="apply_text" @click="goExamList">请您继续考试</p>
                            </template>
                          </template>
                          <!-- 保级阶段 -->
                          <template v-else>
                            <!-- 考试通过 -->
                            <template v-if="item.examResult == 1">
                              <p class="apply_text" v-html="item.neWreminder"></p>
                              <template v-if="item.nextStartTime != 'null'">
                                <div class="paper-time">{{"您的下次保级考试时间：" + item.nextStartTime}}</div>
                              </template>
                            </template>
                            <!-- 考试未通过 -->
                            <template v-else>
                              <p class="apply_text" @click="goExamList" v-html="item.neWreminder"></p>
                            </template>
                          </template>
                         
                        </div>
                        <div v-if="item.totalCredit != 0" class="ub" :class="{'apply_r':item.newestStatus != 1 || item.newestStatus != 3,'icon-authentication-through':item.newestStatus == 1 || item.newestStatus == 3 }" @click="toPointDetail(key)">
                          <span class="point">{{item.totalCredit}}</span>
                        </div>
                      </template>
                      <!-- 培训考试 -->
                      <template v-else>

                      </template>
                    </div>
                  </section>
                </yd-slider-item>
              </yd-slider>
            </template>
            <template v-if="pointInfo.length == 0">
              <yd-slider :pagination-color="'#348BEC'" :pagination-active-color="'#ABD4FF'">
                <yd-slider-item>
                  <section class="apply_inner_bgc">
                    <div class="noDataInfo">
                      <div class="noDataTipText">
                        <span class="studyPrd">学习产品</span>
                        <span class="online">正式上线发布！</span>
                      </div>
                      <div class="noDataTipTime">2019年02月18日</div>
                    </div>
                  </section>
                </yd-slider-item>
              </yd-slider>
            </template>

          </div>
          <!-- 学习视频 -->
          <!-- <section class="question">
            <div class="question_t mar-b-36">
              <span>学习</span>
            </div>
            <template>
              <div class="player-container">
                <video-player 
                class="vjs-custom-skin" 
                :options="playerOptions"
                ref="videoPlayer"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                @ended="onPlayerEnded($event)">
                </video-player>
              </div>
            </template>
          </section> -->
          <!-- 题库 -->
          <section class="question">
            <div class="question_t mar-b-36">
              <span>题库</span>
            </div>
            <div class="question_m ub question-bank-content">
                <yd-slider :loop="false" :auto="0" :pagination-color="'#D8D8D8'" :pagination-active-color="'#6B89DE'" :callback="handleTkChange">
                  <yd-slider-item v-for="(tkList, k1) in gtkList" :key="k1">
                    <template  v-for="(item, k2) in tkList">
                      <div :class="{'bor-none':tkList.length == 1 && gtkList.length == k1+1,'bor-b-none': tkList.length == 2 && gtkList.length == k1+1}" class="tk question-content" @click="getQuestionPants(k1, k2)" :key="k2">
                          <img :src="item.img" />
                          <dl>
                            <dt>{{item.fieldName}}</dt>
                            <dd>{{item.memo}}</dd>
                          </dl>
                      </div>
                    </template>
                    <!-- <div style="width:100%;height:10px;background:#fff;clear:both;position: relative;top:-4px;"></div> -->
                  </yd-slider-item>
                </yd-slider>
            </div>
            <p class="no-data-hint" v-if="gtkList == ''">暂无题库数据,请联系管理员</p>
          </section>
          <section class="question">
              <div class="question_t mar-b-36">
                <span>考试</span>
                <router-link to="/user/examList" class="ks-link-more">
                   <div class="ub ub-ac">
                      <div class="more-data">更多</div>
                      <img class="get-to-more" src="../assets/images/icon-to-more.png" />
                   </div>
                </router-link>
              </div>
              <div class="question_ks">
                <div class="ub ub-ac ks" style="position:relative;" v-for="(item,index) in examList" @click="handlerExamClick(item,index)" :key="index" :data-id="index">
                    <img :src="item.paperIcon || defaultPaperIcon" />
                    <dl>
                      <dt :class="!item.isAvailable ? 'grey' : ''">{{item.newPaperName}}</dt>
                      <dd class="mar-t10">{{item.memo}}</dd>
                    </dl>
                    <!-- <div class="examIcon">
                      <span class="examIconText">试用</span>
                    </div> -->

                </div>
              </div>
              <p class="no-data-hint" v-if="examList.length == 0">暂无考试试卷，请联系管理员</p>
            </section>
            <footer class="footer">
              <dl @click="toExamRecord">
                  <dt><img src="../assets/images/ft1.png" /></dt>
                  <dd>考试记录</dd>
              </dl>
              <dl @click="toRank">
                  <dt><img src="../assets/images/ft2.png" /></dt>
                  <dd>认证排名</dd>
              </dl>
              <dl class="errorCheck" @click="toPage('/user/ExpertReview')" v-if="userInfo && userInfo.userType == 2">
                  <dt><img src="../assets/images/ft3.png" /></dt>
                  <dd>错题审核</dd>
                  <!-- <mt-badge v-if="isExit" type="error" size="small">{{checkNum}}</mt-badge> -->
                  <div class="badgeIcon" v-if="isExit">
                    <div class="number">{{checkNum}}</div>
                  </div>
              </dl>
              <dl @click="toPage('/user/ViewMaintenanceRecord')" v-else>
                  <dt><img src="../assets/images/icon-maintenance-record.png" /></dt>
                  <dd>维护记录</dd>
              </dl>
              <dl @click="toPage('/user/Cheat')">
                  <dt><img src="../assets/images/ft4.png" /></dt>
                  <dd>作弊举报</dd>
              </dl>
            </footer>
            <footer class="footer ft-more" v-if="userInfo && userInfo.userType == 2">
              <!-- 专家显示维护记录，如果他不是所有题库的专家的话，目前默认显示出来 -->
              <dl @click="toPage('/user/ViewMaintenanceRecord')">
                  <dt><img src="../assets/images/icon-maintenance-record.png" /></dt>
                  <dd>维护记录</dd>
              </dl>
            </footer>

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
                      <button class="mint-msgbox-btn mint-msgbox-confirm  home-box-true" @click="ShowMsgbox1">确定</button>
                  </div>
                </div>
              </div>
              <div class="v-modal" style="z-index: 2008;"></div>
            </div>
    </div>
  </template>

  <script>
  import {Slider, SliderItem} from "vue-ydui/dist/lib.rem/slider";//轮播插件
  import methodSet from "@/common/js/public";//获取url参数和时间日期的转换
  import request from "@/api/request";//请求链接
  import defaultImg from '../assets/images/default_uimg.png';//首页顶部默认头像
  import defaultPaperIcon from '../assets/images/ks1.png';//题库默认图标引入
  import storage from "@/utils/storage";//本地存储方法封装
  import { Toast, MessageBox } from 'mint-ui';//mint-ui引入
  import IndexAppHeader from "@/components/appHeader/IndexAppHeader";//顶部组件引入

  //奖章类型
  import threeImg from "../assets/images/icom-index-three.png";//三连击奖章图标
  import nineImg from "../assets/images/icom-index-nine.png";//九连击奖章图标
  import halfImg from "../assets/images/icom-index-half.png";//半年奖章图标
  import yearImg from "../assets/images/icom-index-year.png";//一年奖章图标
  // import three from "../views/user/imges/icom-index-three.png";
  import { Indicator } from 'mint-ui';
  //引入video样式
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  //引入hls.js
  // import 'videojs-contrib-hls.js/src/videojs.hlsjs' 
  // import Watermark from '@/common/js/watermark';



  let thisToken = '';

  //业务逻辑
    export default {
      components: {
        'yd-slider': Slider,
        'yd-slider-item': SliderItem,
        IndexAppHeader
      },
      data () {
        return {
          isNextTime:true,
          isStartTime:true,
          // 个人信息
          userInfo: {
            userName: '',
            roleNames: [
              ''
            ],
            image: '',
            userType: 3 // 1 普通用户 2 题库专家  3 特殊类型（不可考试）
          },
          defaultImg: defaultImg,

          pagination : true,//轮播分页是否显示
          userTypeMap: [
            '', '普通用户', '题库专家', '特殊类型'
          ],
          medalIconList:[
            null,threeImg,nineImg,halfImg,yearImg
          ],
          isExit: false,

          // 积分信息
          pointInfo: [

          ],
          integralSliderIndex : 0,//积分下标
          //奖状标志
          flagStatu: {
            hasMedal: 0,
            threeMedal: 0,
            nineMedal: 0,
            halfMedal: 0,
            yearMedal: 0
          },
          medalList: [], // 奖章列表

          changeName:"",
          //用户认证控制标志
          kaoIndex:0,
          //判断只有认证考试的轮播图才能显示
          baoIndex:0,
          successCounts: 3,
          //用户id
          userID: "",
          // nineMedal:[],
          // 考试列表
          examList: [],
          defaultPaperIcon: defaultPaperIcon,

          // 题库列表
          gtkList: [], // 分组后的题库
          tkPages: 0,  // 滑动的页面数量
          tkIndex: 0,  // 当前滑动的页面
          lastIndex: -1, // 上一次的页面

          tokenOK: false,
          showMsgbox:false,
          query: {}, // 是否考试确定事件的参数
          checkNum:'',//错题审核个数
          playerOptions: {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            controls: true, //控制条
            preload: 'auto', //视频预加载
            muted: false, //默认情况下将会消除任何音频。
            loop: false, //导致视频一结束就重新开始。
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            isFullscreen: true,
            sources: [{
                  type: 'application/x-mpegURL',
                  type: 'video/ogg',
                  type: 'video/mp4',
                  // src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
                  src: 'https://outin-4875bd7d5c2211e99f4000163e06123c.oss-cn-shanghai.aliyuncs.com/3d18d11ffa244aa987e52420926b2f74/17f885354d904a2193638863aca669c1-13e186b861f67613887e03fb18c17194-sd.mp4?Expires=1554974006&OSSAccessKeyId=LTAItL9Co9nUDU5r&Signature=%2BrcDR71EbjcgyWoR62ZAU7vQtXU%3D',
                  // src: 'https://outin-0b13e5895a6911e9b24b00163e1c60dc.oss-cn-shanghai.aliyuncs.com/05907f11a0904b069f8085c2ab9f9b68/e206411941244ba5b1bcbd4648e4c61d-c9e92910f25b81d1083ff50cfc94f3ec-sd.mp4?Expires=1554781397&OSSAccessKeyId=LTAItL9Co9nUDU5r&Signature=p1o2Meg1mOzFnUlZlCmsuSfBX00%3D'
            }],
            // poster: "http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg", //你的封面地址
            poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-6.jpg", //你的封面地址
            width: document.documentElement.clientWidth,
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
            },
          },
          examApplyId: '',
          TrainExamType: '',
          trainReminder: '',
        }
      },
      // beforeRouteLeave (to, from, next) {
      //   if (to.name == 'ViewMaintenanceRecord' || to.name == 'ExpertReview') {
      //     to.meta.isUseCache = true;
      //   }
      //   next();
      // },
      beforeCreate () {
        thisToken = methodSet.getQuery("access_token");

        if (!thisToken) { // 不是第一次授权登录
          let token = storage.getToken();
          if (token) { // 缓存有token，要校验
            // begin uat 不校验token
            thisToken = token; // 标识已经获得token
            this.tokenOK = true;
            // end uat

            // request.checkToken(token).then((data) => {
            //   //console.log('check token', data);
            //   if (!data || !data.data) {
            //     //console.log("token check failed:", data);
            //     redirectToLogin(); // token无效，去登录
            //   } else {
            //     thisToken = token; // 标识已经获得token
            //     this.tokenOK = true;
            //   }
            // });
          } else { // 缓存没有token，去登录
            //console.log("local token 404");
            window.location.href = 'api/app/index'
          }
        } else { // 第一次授权登录，保存token
          storage.saveToken(thisToken);
        }

        // 没有token 跳转登录页面
        // if(thisToken) {
        //   storage.saveToken(thisToken);
        // } else {
        //   redirectToLogin();
        // }
      },
      computed: {
        player() {
          return this.$refs.videoPlayer.player
        }
      },
      watch: {
        tokenOK: function() {
          this.getData();
        }
      },
      created () {
        if (!thisToken) { // 没有获取到token，不调接口
          return;
        }

        this.getData();
        //this.getHistoryExamList();
      },
      // activated(){
      //   if(!this.$route.meta.isUseCache) {//为true重新刷新获取数据
      //     this.getReminds()
      //     this.getData();
      //     this.$route.meta.isUseCache = false;
      //   }
      // },
      mounted () {
        storage.saveRole(this.userInfo.userType);
      },
      methods:{
        onPlayerPlay(player) {
          // console.log('player play!', player)
        },
        onPlayerPause(player) {
          // console.log('player pause!', player)
        },
        onPlayerEnded(player) {
          // console.log('player ended!', player)
        },
        goExamList(){//banner去考试列表
          this.$router.push('/user/examList')
        },
        getData() {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.badgeList();
          this.getUserInfo();
          this.getPointInfo();
          this.getTkList({});
          this.getExamList(1, 3);
          this.getReminds();
          // this.getTkListByPage(1, 4);
        },
        getReminds() {//获取错题审核提醒数字
          let self = this;
          request.expertReminds().then((res) => {
            // console.log('go getReminds methods',res)
            if(!res) return;
            if(!res.totalCount) {
              self.checkNum = ' ';
              self.isExit = false;
              return;
            }
            if(res){
              self.isExit = true;
              if(res.totalCount <= 9) {
                self.checkNum = res.totalCount;
              }else {
                self.checkNum = '9+';
              }
            }

          })
        },
        handleChange (index) {
           sessionStorage.setItem("integralSliderIndex",index);
        },
        goBack () { // Depreciated
          //第三方页面--使用 “助英台” 登录
           window.location.href = "https://sit.4009515151.com/api/lebang/oauth/authorize?client_id=183f595244b764ad5a511dfacbbb3849&scopes=r-staff&redirect_uri=http%3A%2F%2Felsit.vankeservice.com%2Fapi%2Fapp%2Foauth&response_type=code&state=222&sign=y";
        },
        // 进入题库做题
        getQuestionPants(k1, k2) {
          let tk = this.gtkList[k1][k2];
          localStorage.setItem("curTkName", tk.fieldName);
          let fieldId = tk.id;
          this.$router.push({
             path : "/QuestionBankPage",
             query : {
               id : fieldId
             }
          });
        },
        handleTkChange(index) { // 处理题库列表页面滑动问题
          let direction = index - this.lastIndex;
          if (direction > 0) {
            //console.log('get next:', index+1);
            if (!this.gtkList[index+2]) { // 该页不存在
              this.getTkListByPage(index+2, 4, false); // 获取下一页
            }
          } else {
            //console.log('tkindex:', index);
          }
        },
        getTkListByPage(page, limit, isFirst) { // 分页获取题库
          request.getTkListByPage(page, limit).then((data) => {
            if (!data) return;
            let records = data.records;
            if (isFirst) {
              let total = data.total;
              let pages = total%4 == 0 ? total/4 : parseInt(total/4) + 1; // 计算总页数
              let gtkList = [];
              gtkList[pages-1] = null;
              gtkList.splice(page-1, 1, records);
              this.gtkList = gtkList;
              this.tkPages = pages;

              this.getTkListByPage(2, limit, false);
              this.lastIndex = 0;
            } else {
              if (data.records && data.records.length > 0) {
                // if (data.records.length < 4) {
                //   data.records.push(data.records[1]);
                // }
                this.gtkList.splice(page-1, 1, data.records);
              }
            }

            //this.gtkList = [];
          });
        },
        // 获取题库列表
        getTkList(params) {
          // debugger;
          this.getTkListByPage(1, 4, true); // 改为分页获取
          return;

          let self = this;
          request.getTkList(params).then((data) => {
            // console.log('题库Data',data)
            if (!data) return;
            let tkList = data; // data.records
            if (data) {
              Indicator.close();
            }
            let groupedTkList = [];
            let i = 0;
            while (i <= tkList.length) {
              let gtk = tkList.slice(i, i+4);
              if (gtk && gtk.length > 0) {
                groupedTkList.push(gtk);
              }
              i+=4;
            }
            self.gtkList = groupedTkList;
          });
        },
        // 获取用户信息
        getUserInfo() {
          let self = this;
          request.getUserInfo({}).then((data) => {
            if (!data.userName) {
              storage.saveRole(self.userInfo.userType);
              return;
            }
            self.userInfo = data;
            //用户角色: 1--普通用户 2--题库专家 3-特殊类型(不可考试)
            storage.saveRole(data.userType);
            let mobileNum = self.userInfo.mobile;
            let mobile = mobileNum.substr(mobileNum.length - 4)//截取手机号后四位
            let mob;
            if(self.userInfo.sap) {//存在SAP号
              mob = self.userInfo.sap;
            }else {
              mob = mobile;
            }
            localStorage.setItem('name',self.userInfo.userName)
            localStorage.setItem('num',mob)
            let time = self.getNowFormatDate()
            // console.log('time',time)
            // Watermark.set(self.userInfo.userName + '-' + mob)
            
          });
        },
        getNowFormatDate(time) {//格式化时间
          let date = new Date();
          let seperator1 = "-";
          let seperator2 = ":";
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          if (month >= 1 && month <= 9) {
              month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
          }
          let hours = date.getHours();
          if(hours >= 0 && hours <= 9) {
            hours = "0" + hours;
          }
          let minutes = date.getMinutes();
          if(minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
          }
          let seconds = date.getSeconds();
          if(seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
          }
          let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
              + " " + hours + seperator2 + minutes + seperator2 + seconds;
          return currentdate;
        },
        // 获取积分信息
        getPointInfo() {
          request.getPointInfo().then((data) => {
            // debugger;
            if (!data) return;
            this.pointInfo = data.filter(item => item.paperType != 2);//过滤掉培训考试
            // console.log(this.pointInfo)
            //console.log(data)
            //轮播当前下标
            let thisIndex =  sessionStorage.getItem("integralSliderIndex");
            if(thisIndex) {
              this.integralSliderIndex = thisIndex*1;
            }else{
              this.integralSliderIndex = 0;
            }
            if(this.pointInfo.length < 2) {
               this.pagination = true;
            }
            this.pointInfo.forEach ((item,index) => {
              let thisIndex = item.paperName.indexOf('考试');
              let nPaperName;
              nPaperName = (item.paperName.indexOf('考试') > -1 ? item.paperName.substr(0,thisIndex) : item.paperName) + '专业资格考试'
              this.$set(item,'nPaperName',nPaperName)
              if(item.nextStartTime == null){//时间到了下次考试时间
                item.nextStartTime = 'null'
              }else {
                item.nextStartTime = methodSet.getDate(item.nextStartTime)
              }
              let neWreminder = item.reminder;
              //新加
              // let a = '';
              // console.log(neWreminder)
                 if (item.reminder) {
                   neWreminder = item.reminder.replace(/(\d+)/, `<span style='color:#fff;padding-left:.08rem;padding-right:.08rem;font-weight:800;'>$1</span>`);
                   this.$set(item,'neWreminder',neWreminder);
                 }
            });

            //this.pointInfo = [];
            // 暂存积分信息，考试提示时用到
            sessionStorage.setItem('point-list', JSON.stringify(this.pointInfo));
          });
        },
        // 获取考试列表
        getExamList(page, limit) {
          request.getExamList(page, limit).then((data) => {
            if (!data) return;
            this.examList = data.records.length > 3 ? data.records.slice(0, 3) : data.records;
            this.examList.forEach((item,index) => {
              let thisPaperName = item.paperName;
              let thisIndex = thisPaperName.indexOf("考试");
              let newPaperName;
              
              if(item.paperType < 2) {//认证&保级
                if(item.examType == 1) {//认证考试
                  // newPaperName = (thisPaperName.indexOf("考试") > -1 ? thisPaperName.substr(0,thisIndex) : thisPaperName) + "认证考试";
                  newPaperName = (thisPaperName.indexOf("考试") > -1 ? thisPaperName.substr(0,thisIndex) : thisPaperName) + "考试";
                } else {
                  // newPaperName = (thisPaperName.indexOf("考试") > -1 ? thisPaperName.substr(0,thisIndex) : thisPaperName) + "保级考试";
                  newPaperName = (thisPaperName.indexOf("考试") > -1 ? thisPaperName.substr(0,thisIndex) : thisPaperName) + "考试";
                }
              }else {//培训
                let thatIndex = thisPaperName.indexOf('培训')
                newPaperName = (thisPaperName.indexOf("培训") > -1 ? thisPaperName.substr(0,thatIndex) : thisPaperName) + "培训考试";
              }
              this.$set(item,"newPaperName",newPaperName);
            });

            //this.examList = [];
          });
        },

        //查看奖状
        badgeToSee() {
          this.$router.push({
            path: "/user/Badge",
          })
        },
        // 进入考试页面
        handlerExamClick(item,key) {
          // console.log('item',item)
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
          let params = {};
          params.paperBankId = item.paperId;
          params.paperType = item.paperType;
          request.getExamApply(params).then(res=>{
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
              //     duration: 2000
              //   })
              // }
              //第一次考试
              if(item.applyId == null || item.applyId == '') {
                //paperType：0资格考试-1小专家考试-2培训考试
                if(item.paperType == 0) {
                  sessionStorage.setItem('exam-from-home', 1);
                  this.$router.push({
                    path : "/user/CertificationExam",//协议页面
                      query : {
                        paperBankId : item.paperId,//考试试卷类型ID
                        examType : res.data.examType,//1认证考试-2保级考试
                        // examCount : item.examCount, //是否第一次考试1：是；2：否
                        // paperName : item.paperName,
                        paperType : item.paperType
                      }
                  });
                }else if(item.paperType == 1) {
                  sessionStorage.setItem('exam-from-home', 1);
                  this.$router.push({
                    path : "/user/RelegationExam",//保级协议页面
                      query : {
                        paperBankId : item.paperId,//考试试卷类型ID
                        examType : res.data.examType,//1认证考试-2保级考试
                        // examCount : item.examCount, //是否第一次考试1：是；2：否
                        // paperName : item.paperName
                        paperType : item.paperType
                      }
                  });
                }else {//培训考试
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
              } else {
                // try{
                  this.showMsgbox =true;
                  if(item.paperType < 2) {//资格&小专家
                    this.query = {
                      paperBankId : item.paperId,//考试试卷类型ID
                      examType : res.data.examType,//1认证考试-2保级考试
                      // examCount : item.examCount //是否第一次考试1：是；2：否
                      paperType : item.paperType
                    };
                  }else {//培训考试
                  this.trainReminder = res.data.msg;
                    this.query = {
                      paperBankId : item.paperId,//考试试卷类型ID
                      examType : '1',//1认证考试-2保级考试
                    }
                  }
                // }catch(e) {

                // }
              };
            }
          })
        },
          flaseMsgbox(){
            this.showMsgbox =false
          },
          ShowMsgbox1(){
            sessionStorage.setItem('exam-from-home', 1);
            this.$router.push({
              path : "/EmployeeExamination",//考试页面
              query : this.query
            })
          },
        // beforeRouteLeave(to,from,next){
        //   next(vm => {
        //     console.log(1)
        //   })
        // },
        //点击进入积分详情
        toPointDetail(key){
          let item = this.pointInfo[key];
          this.$router.push({//积分明细
             path : "/user/ToPointsDetails",
             query : {
               key:key,
               id : item.applyId,
               clickList: JSON.stringify(item)
             }
          });
        },

        //查看奖状列表
        badgeList (query) {
          request.badgeCheck(query).then((data) =>{
            if (!data) return;
            // 0：没有奖章记录 1:三连击奖章 2:九连击奖章 3:半年奖章 4:一年奖章
            //console.log(data)
            //this.flagStatu = res.data;
            this.medalList = data;
            this.medalList.sort((v1, v2) => {
              return v1.medalType > v2.medalType;
            });
          })
        },

        // 考试记录
        toExamRecord() {
          this.$router.push({
            path: '/user/examRecord'
          });
        },
        // 排名
        toRank() {
          this.$router.push({
            path: '/user/Rank'
          });
        },
        toPage(path) {
        	this.$router.push({
        		path: path
        	});
        }
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
    .isExit {
      /*background: #fff!important;*/
      /*z-index: 100!important;*/
    }
    .seven-t {
      width:1.6rem;
      height:0.32rem;
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:0.32rem;
      margin-bottom: 0.1rem;
    }
    .home{
      background:#f8f9fb;
      padding-bottom: 0.26rem;
    }
    .passing-times {
      width: 2rem;
      height: .12rem;
      margin-top: 0.1rem;
      border:1px solid rgba(19,64,187,0.24);
      position: relative;
    }
    .passing-times span {
      display: inline-block;
      width: 0.48rem;
      height: 0.12rem;
      float: left;
      margin-right: 0.02rem;
      background-color: #fff;
      opacity: 0.24 ;


    }
    .passing-times span:nth-of-type(6){
      margin-right: 0.1rem
    }
    .progress-bar{
       height: .12rem;
       line-height: .12rem;
       position: absolute;
       right: -0.5rem;
       font-size: 0.2rem;
       margin: 0 auto;
       bottom: 0;
       top: 0;
    }
    .passing-times p {

      /* padding-left: 0.2rem; */
      font-size: 0.2rem;
    }
    .activeP {
      background-color:   #FAE557 !important;
      opacity: 1 !important;

    }
    .passing-times .mar-r0{
      margin-right: 0 !important;
    }
    .home .mint-header{
      top: 0;
      left: 0;
      height:0.88rem;
      background:#fff;
      padding-top: .12rem;
    }
    .mint-header{
      color:#666;
    }
    .mint-header-title{
      line-height:0.4rem;
      font-weight: 400;
      color: rgba(68,68,68,1);
      /* line-height: 32px; */
      font-size: 0.32rem;
    }
    .apply_inner{
      /* position: absolute; */
      color:#fff;
      width: 100%;
      background: #f4f5f7;
      /* padding:0rem 0.24rem; */
      padding-left: .24rem;
      padding-right: .24rem;
      height: 3.14rem;
    }
    .apply_inner_bgc {
      color:#fff;
      width: 100%;
      background: #f4f5f7;
      /* padding:0rem 0.24rem; */
      padding-left: .24rem;
      padding-right: .24rem;
      height: 3.2rem;
      background: url('../assets/images/Bannerbgc.png') no-repeat;
      background-position: center;
      background-size: cover;
    }
    .apply_inner .bj {
      position: relative;
      z-index: 100;
      top: 0;
      left: .32rem;
      font-size: 0.35rem;
    }
    .bj img{
      width: 1.2rem;
    }
    .img-defalt{
     position: absolute;
    }

    .apply{
      position: relative;
      /* padding:0rem 0.24rem; */
      padding-left: .1rem;
      padding-right: .1rem;
      box-sizing:border-box;
      display:flex;
      justify-content:space-between;
      align-items:center;
      /* box-shadow:rgb(221, 221, 221) 1px .2rem .35rem; */
      box-shadow:0px 20px 40px 0px rgba(0,0,0,0.13);
      width:100%;
      height:2.82rem;
      border-radius:0.08rem;
      background:#33B7FB;
      background:-webkit-linear-gradient(left,#3DA9FC 30%,#5480FE);
      /* background: url('../assets/images/Bannerbgc.png') center center; */
      /* background-size: cover; */
    }
    .apply_l {
      height: 1.4rem;
      margin-left: 0.16rem;
    }
    .apply_bgc{
      color:#fff;
      width: 100%;
      background: url('../assets/images/Bannerbgc.png') no-repeat;
      background-position: center;
      background-size: cover;

      position: relative;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-shadow: 0px 20px 40px 0px rgba(0,0,0,0.13);
      box-shadow: 0px 20px 40px 0px rgba(0,0,0,0.13);
      width: 100%;
      border-radius: 0.08rem;
    }
    .head-top {
      font-size:0.26rem;
      margin-top:-.4rem;
      font-family:PingFangSC-Light;
      color: rgba(223,241,255,1);
    }
    .head-top .exam-type {
      border: 1px solid #fff;
      padding: 0.01rem 0.2rem;
      border-radius: 0.3rem;
    }
    .head-top .fontStyle {
      font-size: 0.26rem;
      line-height: 0.26rem;
      vertical-align: middle;
    }
    .apply_l h3{
      font-size:0.36rem;
      font-family:PingFangSC-Medium;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:0.36rem;
      margin-bottom: 0.12rem;
    }
    .apply_l p{
      width: 4.6rem;
      /* font-size:0.28rem; */
    }
    .apply_l span{
      font-size:0.14rem;
    }
    /* .qualification {
      background: url('../assets/images/Bannerbgc.png') no-repeat center;
      position: 100% 100%;
      background-size: cover;
    } */
    .apply_text{
      font-family:PingFangSC-Light;
      font-weight:300;
      color:rgba(223,241,255,1);
      line-height:0.36rem;
      margin-top: 0.13rem;
      font-size: 0.26rem;
      height: 0.4rem;
      display: inline-block;
    }
    .apply_r{
      width: 1.52rem;
      height: 1.58rem;
      background:url(../assets/images/rzwtg.png);
      background-size: 100% 100%;
      text-align:center;
      flex-shrink: 0;
      display: flex;
      align-items:center;
      justify-content:center;
      flex-direction: column;
    }
    .icon-authentication-through{
      width:1.76rem;
      height:1.58rem;
      background:url(../assets/images/icon-authentication-through.png);
      background-size:100% 100%;
      text-align:center;
      flex-shrink: 0;
      display: flex;
      align-items:center;
      justify-content:center;
      flex-direction: column;
    }
    .icon-authentication-through span{
       color:#979799;
       font-size:.2rem;
       display:block;
    }
    .icon-authentication-through .txt{
       margin-top: .08rem;
       margin-bottom: .08rem;
    }
    .icon-authentication-through .point {
      color: #5480FE;
      font-size: 0.32rem;
      font-weight: 600;
    }
    .apply_r span{
      color:#979799;
      font-size:0.2rem;
      display:block;
    }
    .apply_r .point {
      color: #5480FE;
      font-size: 0.36rem;
      font-weight: 600;
      font-family: "黑体";
    }
     .apply_r .txt {
      /* margin-top: .08rem;*/
      margin-bottom: .18rem;
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
      /* height:3.4rem; */
      width:100%;
      box-sizing:border-box;
      /* padding:0 0.15rem; */
    }
    .main-content{
      margin-top: .88rem;
      background: #f4f5f7;
      padding-top: .4rem;
      /* padding-bottom: .32rem; */
      /* padding-left: .24rem;
      padding-right: .24rem; */
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

    .tk{
      box-sizing:border-box;
      float:left;
      width:50%;
      /* height:1.3rem; */
      border-bottom: .01rem solid #F4F4F4;
      border-right: .01rem solid #F4F4F4;
      overflow:hidden;
      display:flex;
      align-items:center;
      padding-left:0.15rem;
    }
    .question-bank-content{
      padding-bottom: .2rem;
    }
    .question-content {
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
    .question-content:nth-child(odd){
      padding-right: .45rem;
    }
    .question-content:nth-child(even){
      border-right:none;
      padding-left: .45rem;
    }
    .question-content:nth-child(1){
      padding-bottom: .30rem;
    }
    .question-content:nth-child(2){
      padding-bottom: .30rem;
    }
    .question-content:nth-child(3){
      padding-top: .4rem;
      border-bottom: none;
    }
    .question-content:nth-child(4){
      padding-top: .4rem;
      border-bottom: none;
    }
    .bor-none{
       border: none;
    }
    .bor-b-none{
      border-bottom: none;
    }
    .tk img{
      width:0.88rem;
      height:0.88rem;
      /*border:1px dashed #000;*/
    }
    .tk dl{
      padding-left:0.16rem;
    }
    .tk dl dt{
      font-size:0.32rem;
      color:#000;
      width:1.9rem;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      font-weight:400;
      font-family:PingFangSC-Regular;
      height: 0.42rem;
    }
    .tk dl dd{
      color:#979799;
      font-size:0.24rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 1.9rem;
      height: 0.38rem;
      margin-top: 0.05rem;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
    .question_test{
      display: flex;
      justify-content: space-between;
      align-items: center
    }
    .question_t span{
      font-size:0.36rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(0,0,0,1);
      line-height:0.36rem;
      /* line-height:0.65rem; */
    }
    .question_t .more{

    }
    .mar-b-36{
      margin-bottom: .36rem;
      position: relative;
    }
    .ks-link-more {
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: 0.05rem;
    }
    .more-data{
      font-size: .28rem;
      color: #979797;
      margin-right: .1rem;
    }
    .get-to-more{
      width: .14rem;
      height: .20rem;
    }
   /* ../assets/images/icon-to-more.png */
    .question_t .more i{
      /* right: -0.4rem;
      top: 0.33rem;
      position: absolute; */
    }
    .question_t .more em{
      /* font-style: normal;
      color:#979799;
      font-size:0.24rem;
      font-weight: normal;
      margin-top:0.03rem; */

      margin-left:-0.46rem;
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(151,151,153,1);

    }
    .errorCheck {
      position: relative;
    }
    .badgeIcon {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      top: -0.1rem;
      right: 0.16rem;
      border-radius: 50%;
      background-color: red;
      padding: 5% 7%;
      line-height: 0.2rem;
      vertical-align: middle;
      text-align: center;
    }
    .badgeIcon .number {
      font-size: 0.2rem;
      color: #fff;
    }
    /* 专家提醒icon */
    .mint-badge.is-error {
      position: absolute;
      top: -0.1rem;
      right: 0.16rem;
    }
    .mint-badge.is-size-small {
      font-size: 0.16rem;
      padding: 0 0.14rem;
      width: auto;
      height: auto;
      border-radius: 50%;
      line-height: 0.35rem;
      display: flex;
      justify-content: center;
      align-items: Center;
      /*display: table;*/
    }
    .mint-cell-allow-right::after{
      top:15px;
      border: solid 0.02rem #c8c8cd;
      border-bottom-width: 0;
      border-left-width: 0;
      content: " ";
      top: 50%;
      right: 20px;
      position: absolute;
      width: 0.1rem;
      height: 0.1rem;
      -webkit-transform: translateY(-50%) rotate(45deg);
      transform: translateY(-50%) rotate(45deg);
    }
    .question_ks{
      margin-top: .1rem;
      padding-bottom: .04rem;
    }
    .mar-t10{
      margin-top: .1rem;
      max-width: 4.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .question_ks .ks{
      display:flex;
      background:#FAFAFA;
      border-radius:0.05rem;
      /* margin-top:0.16rem; */
      margin-bottom: .16rem;
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
       font-family:PingFangSC-Light;
    }
    .grey {
      color: #999;
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,1);
      /* line-height:36px; */
      max-width: 4.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .footer{
      background:#fff;
      padding:0.2rem 0;
      display: flex;
      -webkit-display: flex;
      justify-content:space-around;
      align-items:center;
    }
    .footer dl{
      display: flex;
      -webkit-display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .footer dl img {
      display: block;
    }
    .footer dl dt{
      width:0.52rem;
      height:0.52rem;
    }
    .footer dl dd{
      font-size:0.24rem;
      color:#444;
      margin-top: 0.15rem;
      font-weight:400;
      font-family:PingFangSC-Regular;
      display: inline-block;
    }
    .footer dl dt img{width:100%;}

    .ft-more {
      display: block;
    }
    .ft-more dl {
      width: 25%;
    }
    .mint-msgbox-content {
      padding-top: .8rem;
    }
    .badge {
      /* position: absolute; */
      display: flex;
      right: 0.24rem;
      height: 0.62rem;
      border-radius: 1.31rem;
      border: 1px solid #F7F7F7;
      overflow:hidden;
      background: #ffffff;
      padding: .01rem;
      padding-left: .1rem;
      padding-right: .1rem;
      /* padding-right: .15rem; */
    }
    .img-sty{
      justify-content:center;
      align-items:center;
    }
    .badge img {
      width: .64rem;
      height: .6rem;
      /* margin-left: 0.1rem; */
      margin-right: .06rem;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .more{
      text-decoration: none;


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
    .noDataInfo {
      padding-left: .24rem;
      padding-right: .24rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /* display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center; */
      -webkit-box-shadow: 0px 20px 40px 0px rgba(0,0,0,0.13);
      box-shadow: 0px 20px 40px 0px rgba(0,0,0,0.13);
      width: 100%;
      height: 2.8rem;
      border-radius: 0.08rem;
      /* background: #33B7FB; */
      /* background: -webkit-linear-gradient(left,#5DA9F5 30%,#5480FE); */
      /* background: url('../assets/images/Bannerbgc.png') no-repeat;
      background-position: center;
      background-size: cover; */
    }
    .noDataTipText {
      font-size:0.3rem;
      padding-top:0.8rem;
      text-align:left;
      margin-bottom:0.28rem;
    }
    .studyPrd {
      margin-left: 0.16rem;
      border: 1px solid #fff;
      padding: 0.02rem 0.28rem;
      border-radius: 0.3rem;
      opacity: 66.83%;
      font-weight: Medium;
    }
    .online {
      font-size: 0.37rem;
      font-weight: Semibold;
      line-height: 0.37rem;
    }
    .noDataTipTime {
      font-size:0.3rem;
      text-align:left;
      margin-left: 0.16rem;
      opacity: 0.8;
    }
    .no-data-hint {
      padding-bottom: 0.8rem;
      min-height: 0.8rem;
    }
    .paper-time {
      font-size:0.26rem;
      margin-top:0.2rem;
      font-family:PingFangSC-Light;
      color: rgba(223,241,255,1);
    }
    .player-container{
      /* width: 750px; */
      margin: 0px auto;
    }
    @media screen and (max-width: 640px) {
      width: 100%;
    };
    /* 播放器播放按钮样式 */
    .vjs-custom-skin > .video-js .vjs-big-play-button{
      height: 2em!important;
      width: 2em!important;
      line-height: 2em!important;
      border-radius: 2em!important;
      border: 0;
    }
    .vjs-custom-skin > .video-js .vjs-big-play-button{
      /* margin-left: -1em; */
    }
    .video-js .vjs-big-play-button:hover, .vjs-custom-skin .video-js:hover .vjs-big-play-button{
      background-color: #FF0000;
      transition: all 0.3s;
    }
    .video-js .vjs-control:focus:before, .video-js .vjs-control:hover:before, .video-js .vjs-control:focus{
      outline: none;
    }
    .vjs-custom-skin > .video-js .vjs-play-progress, .vjs-custom-skin > .video-js .vjs-volume-level{
      background-color: #FF0000;
    }
    .marginTop {
      margin-top: 6px;
    }
  </style>
 <style>
    .vjs-custom-skin > .video-js .vjs-big-play-button{
      font-size: 3em!important;
      height: 2em!important;
      /* width: 2em!important; */
      line-height: 2em!important;
      border-radius: 2em!important;
      border: 0;
    }
     .mint-header .is-left .mint-button .mint-button-icon .mintui-back::before{
        content: "\E600";
      /* width: .05rem;
      height: .35rem; */
     /* background:url("../assets/images/icon_back_arrow.png") center no-repeat; */
      background-size: 50% 60%;
       /* background: red; */
      color: #444;
      font-weight:900;
    }
    .home .main-content .yd-slider-pagination{
       bottom: .5rem;
    }
    .home .question-bank-content .yd-slider {
        padding-bottom: .45rem;
    }
    /* .home .question-bank-content .yd-slider-pagination {
      bottom: .1rem !important;
    } */
    .home .question_m .yd-slider-pagination-item{
       width: .2rem;
       height: .06rem;
       border-radius: .04rem;
    }
    .home .question_m .yd-slider-pagination-item{
      margin: .02rem;
      opacity: 0.7;
    }
  </style>
