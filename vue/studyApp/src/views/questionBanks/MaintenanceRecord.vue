<template>

    <div class="whjl-box">
        <app-header title="维护记录" from="tk" :rightObj="rightObj" :listFinish="finish"></app-header>
        <div class="owner">
            <span class="own">责任人:</span>
            <div class="ownerList" v-for="(item,index) in ownerList" :key="index">
                <span class="ownerName">{{item.staffName}}</span>
            </div>
        </div>
        <div class="whjl">
            <div class="whjl_m" v-for="(item,index) in listArr" :key="index">
                
                <div class="whjl_l">
                    <div class="line-bottom" v-if="item.reportType == 7 || item.reportType == 8">
                        <div class="line"></div>
                    </div>
                    <!-- 此图片和背影颜色需要根据后台数据做循环变换。 -->
                    <div :class="'whjl_img ' + item.colorCls" >
                        <!-- comiterorr 提交报错 -->
                        <!-- <img class="candidates-report" src="../imges/comiterorr.png" style="width:75%;height:75%"> -->
                        <!-- edit  专家编辑 -->
                        <!-- <img class="candidates-report" src="../imges/edit.png" style="width:75%;height:75%"> -->
                        <!-- pass  审核通过   审核通过下面有绑定pass样式 需要遍历一起改变。-->
                        <!-- <img class="candidates-report" src="../imges/pass.png" style="width:75%;height:75%"> -->
                        <!-- nopass  审核不通过   审核不通过下面有绑定nopass样式 需要遍历一起改变。-->
                        <!-- <img class="candidates-report" src="../imges/nopass.png" style="width:75%;height:75%"> -->
                        <!-- review  待复核   审核不通过下面有绑定review样式 需要遍历一起改变。-->
                        <img class="candidates-report" :src="item.icon" style="width:69%;height:69%">

                    </div>
                    <span>{{item.typeTxt}}</span>
                </div>
                <div class="whjl_r">
                    <dl>
                        <dt v-if="item.content">{{item.content}}</dt>
                        <dd v-if="item.userName">
                        <img src="../../assets/images/errorman.png" />{{item.userName}}</dd>
                        <dd style="float:right;">{{item.createTime.indexOf('1970') == 0 ? '' : item.createTime}}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//顶部组件引入
import requestMethods from "@/api/request";//请求链接
import methodSet from "@/common/js/public";//获取url后面参数和时间日期的转换方法封
import comiterorrImg from '../../assets/images/icon-comiterorr.png';//提交报错图标
import editImg from '../../assets/images/icon-edit.png';//专家编辑图标
import reviewImg from '../../assets/images/review.png';//待复核图标
import passImg from '../../assets/images/pass.png';//审核通过图标
import nopassImg from '../../assets/images/icon-nopass1.png';//审核不通过图标

export default {  
		components:{
            AppHeader
        },
        props: ['questionCode', 'questionId'],
		data () {
			return {
               listArr : [],
               reportTypeMap: [
                    '', '提交报错', '专家报错', '专家编辑', '复审',
                    '待审核', '待复核', '审核通过', '审核不通过'
                ],
                reportIconMap: [
                    '', 'report', 'report', 'edit', 'edit',
                    'toreview', 'toreview', 'reviewok', 'reviewng'
                ],
                reportColorClass: [
                    '', 'comiterorr', 'comiterorr', 'edit', 'edit',
                    'review', 'review', 'pass', 'nopass'
                ],
                imgMap: [
                    null, comiterorrImg, comiterorrImg, editImg, editImg,
                    reviewImg, reviewImg, passImg, nopassImg
                ],
                rightObj: {
                    isMore: false,
                    icon:'',
                    title:''
                },
                ownerList:[],
            }
        },
        watch:{

        },
        methods:{
            queryOwnerInfo(){//获取责任人信息
                this.ownerList = [];
                let questionId = localStorage.getItem('errorQuestionId')
                // console.log('questionId',questionId)
                requestMethods.getquestionOwner(questionId).then((res) => {
                    // console.log('责任人res',res)
                    if(!res) return;

                    let hash = {};
                    res = res.reduce(function(item, next) {
                        hash[next.staffName] ? '' : hash[next.staffName] = true && item.push(next);
                        return item
                    }, [])
                    res = res.filter(item => item.staffName !== null)
                    this.ownerList = res;
                })
            },
            hideMe() {
                this.$parent.showMaintenance = false;
            },
            getReportTypeTxt(item) {
                let typeTxt = '';
                if (item.reportType == 4) { // 复审
                    if (item.specialOpinion == 3) {
                        typeTxt = '复核通过';
                    } else if (item.specialOpinion == 4) {
                        typeTxt = '复核不通过';
                    }
                } else {
                    typeTxt = this.reportTypeMap[item.reportType];
                }
                return typeTxt;
            },
            getReportTypeIcon(item) {
                let icon = '';
                if (item.reportType == 4) {
                    if (item.specialOpinion == 3) {
                        icon = reviewok;
                    } else if (item.specialOpinion == 4) {
                        icon = reviewng;
                    }
                } else {
                    icon = this.imgMap[item.reportType];
                }
                return icon;
            },
			questionBank() {
                let params = {
                    questionCode : this.questionCode //this.$route.query.code
                }
                requestMethods.maintenanceRecord(params).then((res) => {
                    //console.log(res)
                    let recordList = res;
                    recordList.forEach((item,index) =>{
                        let typeTxt = '';  // 说明文字
                        let icon = '';     // 图标
                        let colorCls = ''; // 颜色样式

                        if (item.reportType == 4) {
                            if (item.specialOpinion == 3) {
                                typeTxt  = '复核通过';
                                icon     = passImg;
                                colorCls = 'pass';
                            } else if (item.specialOpinion == 4) {
                                typeTxt  = '复核不通过';
                                icon     = nopassImg;
                                colorCls = 'nopass';
                            }
                        } else {
                            // if(item.reportType == null){
                            //     item.reportType = 4;
                            // }
                            typeTxt = this.reportTypeMap[item.reportType];
                            icon    = this.imgMap[item.reportType];
                            colorCls= this.reportColorClass[item.reportType];
                        }
                        item.typeTxt = typeTxt;
                        item.icon    = icon;
                        item.colorCls= colorCls;

                        item.createTime = methodSet.timestampToTime(item.createTime);
                    });

                    let firstRow = recordList[recordList.length-1];
                    if (firstRow.reportType == 2 && recordList[0].reportType == 5) { // 专家报错且为待审核，改为待复核
                        recordList[0].typeTxt = '待复核';
                    }

                    this.listArr = recordList;
                })
            },
            getQuestionLog() {
                let questionId = this.questionId;
                requestMethods.getQuestionLog(questionId).then((res) => {
                    //console.log(res);
                });
            },
            finish(){},
		},
		created(){
            this.questionBank();
            this.queryOwnerInfo();
            //this.getQuestionLog();
		}
	}
</script>
<style scoped>
    /* .mask-page{
         background:#fff !important;
         
    } */
    .whjl-box{
        width: 100%;
        height: 100%;
        background:#fff;
        padding-top: 0.01rem;
    }
    .owner {
        margin-top: 1.2rem;
        font-size: 0.28rem;
        padding: 0 0.36rem 0 0.4rem;
        height: 0.78rem;
    }
    .own {
        display: inline-block;
        /* margin-left: 0.4rem; */
        font-weight: 400;
        font-size: 0.3rem;
        line-height: 0.3rem;
    }
    .ownerList {
        display: inline-block;
        margin-right: 0.08rem;
        font-size: 0.28rem;
        line-height: 0.3rem;
        border: 1px solid rgb(211, 202, 221);
        padding: 0.04rem 0.2rem;
        border-radius: 0.5rem;
        margin-bottom: 0.06rem;
    }
    .line-bottom {
        margin: 0 0.1rem 0.1rem 0.25rem;;
    }
    .line {
        width: 100%;
        border-top: 1px #E8E8E8 solid;
        height: 1px;
    }
</style>

<style >
/* .whjl-box{
    width: 100%;
    height: 100%;
    background:#fff;
    padding-top: 0.01rem;
} */
    .head{
        border-bottom: none;
    }
    .mint-header{
      height:0.88rem;
      background:#fff;
      top:0px;
    }
    .mint-header{
      color:#666;
    }
    .whjl{
        margin-top:1.6rem;
        overflow: hidden; 
        padding-bottom:0.1rem;
        margin-bottom: 0.1rem;
    }
    .whjl_m{
        padding:0 0.36rem 0 0.4rem;
    }
    .whjl_l{
        float:left;
        width: 100%;
    }
    .whjl_img{
        width:0.44rem;
        height:0.44rem;
        border-radius:50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        float:left;
        /* background-image: url('../imges/comiterorr.png') no-repeat; */
        /* width: 0.18rem;
        height: 0.22rem; */
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
        background: rgba(79,191,107,1);
    }
     /* 审核不通过 */
    .nopass{
        background: rgba(252,67,67,1);
    } 
    /* 待复审   */
    .review{
        background: rgba(205,205,205,1);
    }   
    .whjl_l span{
        color:#000;
        font-size:0.32rem;
        margin-left:0.1rem;
        float:left;
        font-family:PingFangSC-Regular;
    }
    .whjl_r{
        float:left;
        width:100%;
        padding:0 0.1rem;
        box-sizing:border-box;
    }
    .whjl_m:last-child > .whjl_r dl{
         padding-bottom:0.05rem;
    }
    .whjl_r dl{
       box-sizing:border-box;
       width:100%;
       border-left:1px #E8E8E8 solid; 
       overflow: hidden;
       padding-bottom:0.66rem;
       padding-top:0.05rem;
       padding-left:0.3rem;
       margin-left:0.1rem;
    }
    .whjl_r dl dt{
        color:#444;
        font-size:0.28rem;
        margin-top:0.05rem;
        margin-left:0.05rem;
        font-family:PingFangSC-Regular;
    }
    .whjl_r dl dd{
        float:left;
        margin-top:0.05rem;
        color:#444;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
    }
    .whjl_r dl dd:nth-child(3){
       color:rgba(151,151,151,1);
    }
    .whjl_r dl dd img{
        position: relative;
        width:11px;
        height:auto;
        top: 1.5px;
        margin-right: 5px;
        margin-left: 5px;
    }
    /* .candidates-report{
        background: url('../imges/comiterorr.png') no-repeat;
        width: 0.18rem;
        height: 0.22rem;
    } */

</style>