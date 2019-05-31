<template>
<!-- 维护记录 -->
    <div id="font-size">
        <app-header :title='title' :rightObj="rightObj" v-on:listFinish="finish"></app-header>
         <div class="main-content" :style="'position:' + (maskIsShow ? '' : 'fixed')"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
             <div class="Maintain-header" v-for="(item,index) in listArr" :key="index" @click="getDetails(item,index)">
                <div><span class="uhide">{{item.fieldName}}</span><b> {{item.contentText}} </b></div>
                <div><p><img src="../../assets/images/WrongTitle/icon-errortitle.png" alt="" class="main-imges"><span>{{item.thisErrType}}</span></p><p class="minimges-text">{{item.createTime}}</p></div>
                <div class="status" :class="item.classObj"><span class="status-text">{{item.statusTxt}}</span></div>
            </div>
            <!--背景图-->
            <div v-if="noData">
                <default-page :img="''"></default-page>
            </div>
           <!--显示加载中-->
           <div class="loading-box tc" v-if="isLoading">
             <span class="loading-more-txt">加载中...</span>
           </div>

            <p class="no-data-hint" v-if="noMoreData">没有更多数据了</p>
         </div>
         <!-- <div class="main-content">
             <div class="Maintain-header">
                <div><span>环境题库</span><b> 指挥中心、电话机房、消防控制室电梯机房、等重要的设备......</b></div>
                <div><p><img src="./imges/u1311.png" alt=""><span>题干有误</span></p><p>2018-07-05 11:42</p></div>
                <div class="status status-tx-pass-audited">待审核</div>
            </div>
         </div> -->
         <!-- 遮罩层 -->
        <div :class="{uhide:maskIsShow}">
            <div class="mask" @click="maskIsShow = true"></div>
            <div class="ub mask-content">
                <div v-for="(item,index) in questionBankList" :key="index" @click="typeSelection(item,index)"  class="question-select">{{item.TKname}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//顶部组件引入
import requestMethods from "@/api/request";//请求链接
import methodSet from "@/common/js/public";//获取url后面参数和时间日期的转换方法封
import defaultPage from "@/components/defaultPage/DefaultPage";//暂无数据图片组件引用
import storage from '@/utils/storage';//本地缓存的方法封装

export default {
    data(){
        return{
            oneTime: true,
            title : '维护记录',
            listArr : [],
            page: 0,
            limit: 10,
            total: 0,
            pages: 1,
            fieldId:'',
            loading: false,
            isLoading:true,

            classObject : {
                'unaudited' : false,//待审核
                'underReview':false,//审核中
                'auditedPass' : false,//已审核、已通过
                'auditedNoPass' : false,//已审核、未通过
                'deleted' : false
            },

            errTypeMap: [
                '', '题干有误', '选项有误', '答案有误', '题目过时'
            ],

            noData: false,
            noMoreData: false,
            rightObj: {
                isMore: true,
                icon: '&#xeb6d;',
                title:'全部题库'
            },
            maskIsShow:true,//是否显示遮罩层
            questionBankList: [],// 题库列表
            params: {
                "page" : 0,
                "limit" : 10,
                "fieldId" : ""
            },
            scroll: '',
        }
    },
    components : {
        AppHeader,defaultPage
    },
    created () {
        // console.log('go created methods')
        this.maskIsShow = true;
        this.params.fieldId = '';
        // this.params.page = 1;
        this.loadMore();
        this.queryMaintenceLists();
        this.getRecord();
        this.rightObj.title = "全部题库";
        this.questionBankList = [];//题库集合
        this.listArr = [];//列表数据
    },
    computed : {
       statusTextFun () { // Depreciated
           let statusText;
           this.listArr.forEach((item,index) => {
            //    5：待审核,6：审核中7：审核通过8：审核不通过
                 let reportType = item.reportType;
                 let errType = item.errType;
                //  console.log(reportType);
                 switch(reportType) {
                        case "5":
                        statusText = "待审核";
                        this.classObject.unaudited = true;
                        break;
                        case "6":
                        statusText = "审核中";
                        // console.log(statusText);
                        this.classObject.underReview = true;
                        break;
                        case "7" && errType != "4" :
                        statusText = "已审核（通过）";
                        this.classObject.auditedPass = true;
                        break;
                        case "7" && errType == "4" :
                        statusText = "已删除"
                        this.classObject.deleted = true;
                        break;
                        case "8":
                        // console.log(statusText);
                        statusText = "已审核（不通过）";
                        this.classObject.auditedNoPass = true;
                        break;
                        default:

                        break;
                    }
           });
           return statusText ;
       }
    },
    activated(){
        // console.log('go activated methods' + this.oneTime)
        if(!this.oneTime){//为false时才会清空原有数据并重新获取数据
            // console.log('clear')
            this.maskIsShow = true;
            this.questionBankList = [];//题库集合
            this.listArr = []; // 清空原有数据
            this.params.fieldId = '';
            this.params.page = 0;
            this.rightObj.title = "全部题库";
            this.queryMaintenceLists();
            this.getRecord(); // 获取数据的函数
            document.body.scrollTop = 0;
        }
        this.oneTime = false;
    },
    // deactivated(){
    //     if(!this.$route.meta.isUseCache){//isUseCache为false时才会清空原有数据并重新获取数据
    //         this.questionBankList = [];//题库集合
    //         this.listArr = []; // 清空原有数据
    //         this.params.fieldId = '';
    //         this.params.page = 0;
    //         this.rightObj.title = "全部题库";
    //         this.queryMaintenceLists();
    //         this.getRecord(); // 获取数据的函数
    //         this.$route.meta.isUseCache = false;
    //         document.body.scrollTop = 0;
    //     }
    // },
    beforeRouteLeave(to, from, next){
        // from.meta.keepAlive = false;
        // console.log('keepAlive',this.$route.meta.keepAlive)
        if (to.path.indexOf('WrongTitledetails') >= 0) {
            // console.log('keepAlive','WrongTitledetails')
            this.oneTime = true
        }
        next();
    },
    mounted(){},
    methods : {
        // handleScroll () {
        //   this.scroll  = document.documentElement &&  document.documentElement.scrollTop;
        //   console.log(this.scroll)
        // },
        queryMaintenceLists(){//获取题库集合
            let self = this;
            self.questionBankList = [];
            requestMethods.getTkList().then((res)=>{
                // console.log('题库集合',res);
                if(!res) return;
                let resData = res;
                resData.forEach(function(item,index){
                    item.Tkid = item.id;
                    item.TKname = item.fieldName
                    self.questionBankList.push(item)
                })
            })
        },
        loadMore() {
            this.params.page++;
            this.loading = true;
            this.isLoading = true;
            this.noMoreData = false;
            // if (this.params.page == this.pages) {
                // console.log("no more data");
                // this.params.page = this.pages;
                // this.isloading = false;
                // this.noMoreData = true;
            // }
            if (this.params.page > this.pages) {
                this.loading = false;
                this.isLoading = false;
                this.noMoreData = true;
                return;
            }
            setTimeout(()=>{
                this.getRecord();
                this.isLoading = false;
                this.loading = false;
            },1000)

        },
        getRecord() {
            let getParams = this.params;
            this.noMoreData = false;
            requestMethods.getMantenanceRecordByPage(getParams).then((data) => {
                // console.log("getRecord:", data);
                if(data.pages == 0){
                    this.isLoading = false;
                    this.noMoreData = false;
                    this.noData = true;
                }
                this.pages = data.pages;
                this.total = data.total;
                // this.listArr = [];
                if (data.records && data.records.length > 0) {
                    this.noData = false;
                    let records = data.records;
                    records.forEach((item, index) => {
                        //console.log(item);
                        try {
                            let contentText = JSON.parse(item.oldContent.replace(/\t+/g, '')).title;

                            let time = item.createTime;
                            item.createTime = methodSet.timestampToTime(time);
                            item.contentText = contentText;
                            item.thisErrType = this.errTypeMap[item.errType];

                            let [statusTxt, classObj] = this.getStatusTxt(item.reportType, item.errType);
                            item.statusTxt = statusTxt
                            item.classObj  = classObj;

                            this.listArr.push(item);
                        } catch (e) {

                        }
                    });
                    if (this.params.page >= data.pages) {
                        // console.log("nomoredata");
                        this.isLoading = false;
                        this.loading = false;
                        this.noMoreData = true;
                    }
                }
            });
        },
        init () { // Depreciated. Please see getRecord() above
            requestMethods.ViewmaintenanceRecord({}).then((res) => {

                this.listArr = res;
                this.listArr.forEach((item,index) => {
                    let contentText = JSON.parse(item.oldContent.replace(/\t+/g, '')).title;
                    let quetionType = item.errType;
                    let time = item.createTime;
                    item.createTime = methodSet.timestampToTime(time);
                    this.$set(item,"contentText" , contentText);
                    switch(quetionType) {
                        case "1":
                        this.$set(item,"thisErrType" , "题干有误");
                        break;
                        case "2":
                        this.$set(item,"thisErrType" , "选项有误");
                        break;
                        case "3":
                        this.$set(item,"thisErrType" , "答案有误");
                        break;
                        case "4":
                        this.$set(item,"thisErrType" , "题目过时");
                        break;
                        default:

                        break;
                    }

                    let statusAndClass = this.getStatusTxt(item.reportType, item.errType);
                    this.$set(item, "statusTxt", statusAndClass[0]);
                    this.$set(item, "classObj", statusAndClass[1]);
                })
                // console.log(this.listArr)
            })
        },
        getDetails(item,index) {
            if (false && item.reportType < 6) {
                return;
                let userRole = storage.getRole();
                if (userRole != 2) { // 专家才可以看
                    return;
                }

                this.$router.push({
                    path : "/user/WrongTitle",
                    query : {
                        id : item.errTabId,
                        errType : item.errType,//问题类型
                    }
                })
            } else {
                this.$router.push({
                    path : "/user/WrongTitledetails",
                    query : {
                        id : item.errTabId,
                        errType : item.errType,//问题类型
                        code: item.questionCode
                    }
                })
            }

        },

        getStatusTxt(reportType, errType) {
            let statusText = '';
            let classObject = Object.assign({}, this.classObject);

            switch(reportType) {
                case "5":
                    statusText = "待审核";
                    classObject.unaudited = true;

                    break;
                case "6":
                    statusText = "审核中";
                    classObject.underReview = true;

                    break;
                case "7":
                    if (errType == "4") {
                        statusText = "已删除"
                        classObject.deleted = true;
                    } else {
                        statusText = "已审核(通过)";
                        classObject.auditedPass = true;
                    }
                    //console.log("statusText:", statusText);
                    break;
                case "8":
                    statusText = "已审核(不通过)";
                    classObject.auditedNoPass = true;
                    break;
                default:
                    //console.log("statusTxt 404");
                    break;
            }

            return [statusText, classObject];
        },
        finish(data){//右上角图标切换函数
            // console.log(data)
            let self = this;
            self.maskIsShow = !self.maskIsShow;//遮罩层
            self.rightObj.icon = '&#xe607;'
        },
        typeSelection(item,index){//题库选择切换
            let self = this;
            // console.log(item,index)
            self.$route.meta.keepAlive = true;//切换题库时保存位置
            self.rightObj.title = item.TKname;
            self.maskIsShow = true;
            self.rightObj.icon = '&#xeb6d;'
            let fieldId = item.Tkid;
            self.params.fieldId = fieldId;
            self.params.page = 1;
            self.listArr = [];
            self.getRecord()
        },
    }
}
</script>
<style lang="less" scoped>
    #font-size{
            font-size: 0.37rem !important;
    }
    .main-content{
        background: #ffffff;
        padding-top: 1rem;
    }
    .Maintain-header{
        margin: 0 .24rem;
        padding: 0.33rem 0rem .24rem 0;
        border-bottom: .01rem solid #f2f2f2;
        position: relative;
    }
    .status{
        position: absolute;
        right: 0;
        top: 40%;
        /* bottom: 50%; */
        -webkit-transform:translate(0,-50%);
        padding: 1px .15rem;
        -webkit-transform:rotate(-15deg);
        font-size: .2rem;
        background: #fff;
    }
    .status-text{
        font-size:0.2rem;
        font-weight:400;
        line-height:0.24rem;
    }
    // 加载中。。。
    .loading-box{
      padding:.1rem 0;
      height: 0.6rem;
      .loading-more{
        display:inline-block;
        vertical-align: middle;
        margin-right:.2rem;
      }
      .loading-more-txt{
        vertical-align: middle;
        font-size:.22rem;
        text-align: center;
        display: inherit;
      }
    }
    /* 待审核  */
    .unaudited {
         border: .02rem solid rgba(191,154,98,1);
         color: rgba(191,154,98,1);
         border-radius: .02rem;
    }
    /* 审核中 */
    .underReview {
         border: .02rem solid rgba(84,128,254,1);
         color: rgba(84,128,254,1);
         border-radius: .02rem;
    }
    /* 已审核（通过） */
    .auditedPass {
         border: .02rem solid #4FBF6B;
         color: #4FBF6B;
         border-radius: .02rem;
    }
    /* 已审核（不通过） */
    .auditedNoPass {
         border: .02rem solid #fd6464;
         color: #fd6464;
         border-radius: .02rem;
    }
    /* 已删除 */
    .deleted {
         border: .02rem solid rgba(151,151,151,1);
         color:rgba(151,151,151,1);
         border-radius: .02rem;
    }
    .Maintain-header-list{
        padding: .2rem 0.3rem .24rem 0.24rem;
        line-height:0.44rem;
    }
    .Maintain-header div:nth-child(1) span{
        width:1.2rem;
        height:0.32rem;
        border-radius:0.16rem;
        border:1px solid rgba(232,232,232,1);
        font-size:0.2rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.2rem;
        padding: 1px 0.1rem;
    }
    .Maintain-header div:nth-child(1) b{
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.44rem;
    }
    .Maintain-header div:nth-child(2){
        display: flex;
        justify-content:space-between;
        align-items: center;
    }
    .Maintain-header div:nth-child(2) p span{
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(252,67,67,1);
        line-height:0.24rem;
        margin-left: 0.08rem;
    }
    .Maintain-header div:nth-child(2) p:nth-child(2){
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.24rem;
    }
    /* .uhide{
        display: none;
    } */
    .uhide{
        position: relative;
        top: -0.06rem;
        padding: 0.1rem 0.1rem;
        line-height: 0.2rem;
        margin-top:0.1rem
    }
    .main-imges{
        width: 12px;
        height: auto;
        position: relative;
        top: 0.04rem;
    }
    .minimges-text{
        position: relative;
        top: 0.08rem;
    }
    // 遮罩层样式
    .mask{
        height: 100%;
        width: 100%;
        background: #000000;
        opacity: 0.3;
        position: fixed;
        top: .88rem;
        left: 0;
        z-index: 100;
    }
    .mask-content{
        height: 100%;
        width: 100%;
        position: fixed;
        overflow-y: auto;
        top: .88rem;
        left: 0;
        z-index: 10000;
        background: #fff;
        padding: .64rem 0 .2rem 0;
        flex-flow: wrap;
    }
    .question-select{
        padding: .24rem 0;
        background: #E7EDFF;
        border-radius: 3.38rem;
        color: #444444;
        font-size: .26rem;
        margin-left: .3rem;
        flex-basis: 25%;
        margin-bottom: .4rem;
        text-align: center;
        float: left;
        width: 28%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .uhide{
        display: none !important;
    }
</style>

