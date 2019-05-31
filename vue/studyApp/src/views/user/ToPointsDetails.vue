<template>
    <div class="To-point">
        <integral-head :title='headTitle' class="head"></integral-head>
        <div class="Points-header-box">
            <div class="Points-header">
                <div  class="Points-text">
                    <h4 v-cloak  style="text-align:center">{{pointsList.totalCredit}}</h4>
                    <span>当前累计积分</span>
                </div>
            </div>
        </div>
        
        <div class="Points-list">
            <div class="Points-list-center" v-if="getPoint.list">
                <div class="Points-list-box" v-for="(item,index) in getPoint.list" :key="index">
                    <div>
                        <h5>{{item.reason}}</h5>
                        <span>{{item.createTime.substr(0,getPoint.startTime.length-3)}}</span>
                    </div>
                    <div><span>{{item.awardMoney>0 ? "+"+item.awardMoney:item.awardMoney}}</span></div>
                </div>
            </div>
            <!-- <div class="Points-list-center">
                <div class="Points-list-box" v-if="hasId">
                    <div>
                        <h5>{{chosetype}}专业认证报名考试</h5>
                        <span>{{ time }}</span>
                    </div>
                    <div><span>-200</span></div>
                </div>
            </div>
            <div class="Points-list-center">
                <div class="Points-list-box">
                    <div>
                        <h5>系统赠送</h5>
                        <span>{{  time }}</span>
                    </div>
                    <div><span>+200</span></div>
                </div>  
            </div>     -->

        </div>
    </div>
</template>
<script>
  import {formatDate} from '../../utils/dataTime.js';//时间日期转化方法引入
  import requestMethods from "@/api/request";//请求地址引入
import IntegralHead from "@/components/appHeader/IntegralHead";//头部组件引入
export default {
    data(){
        return{
            pointsList:[],
            getPoint:{},
            choseIndex: "",
            hasId:"",
            chosetype: "",
            headTitle: "",
            time : ""
        }
    },
    created(){
      this.init();
    },
   methods: {
        init() {
            console.log('route',this.$route)
            this.hasId = this.$route.query.id
            this.choseIndex = this.$route.query.key;
            let clickList = JSON.parse(this.$route.query.clickList);
            this.pointsList = clickList;
            this.chosetype = clickList.paperName.substr(0,2);
            let index = clickList.paperName.indexOf("考试");
            let choseTypeIndex = clickList.paperName.indexOf("专业");
            if(clickList.paperName.indexOf("考试") > -1) {
                    this.headTitle = clickList.paperName.substr(0,index)+"积分明细";
            }else{
                this.headTitle = clickList.paperName+"积分明细"; 
            }
            //截取专业
            if(clickList.paperName.indexOf("专业") > -1) {
                this.chosetype = clickList.paperName.substr(0,choseTypeIndex);
            }else{
                this.chosetype = clickList.paperName;
            }
            if(this.$route.query.id !== null){
                this.getList()
            }
        },
        getList () {
            requestMethods.getPointDetail(this.$route.query.id).then((res) =>{
                console.log(res)
                this.getPoint = res;
                this.time = res.startTime.substr(0,res.startTime.length-3);
                
                // console.log(this.getPoint)
            })
        },
    },
    components : {
        IntegralHead,
    },
}
</script>
<style scoped>
  [v-cloak] {
    display: none;
  }
  .To-point {
    width: 100%;
    height: 13.3rem;
    overflow: hidden;
    background-color: #F2F4F5;;
     overflow-x : hidden;
  }
    /* .head{
        font-size:0.34rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1) !important;
        line-height:0.34rem;
    } */
    #app-header-content[data-v-3f9d7aad] {
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        height: 0.88rem;
        width: 100%;
        /* color:rgba(255,255,255,1) !important; */
        background: none;
        border-bottom: none;
    }
    #app-header-content .header-title[data-v-3f9d7aad] {
            font-size: 0.34rem;
            color: rgba(255,255,255,1) !important;
        }
    .Points-header-box{
        width: 100%;
        min-height: 4.42rem;
        overflow: hidden;
        position: relative;
        /* height: 100%; */
    }
    .Points-header{
      
        background: -webkit-gradient(linear,left top, left bottom,from(#7ED1FF),to(#5480FE));
        background: linear-gradient(#7ED1FF,#5480FE);
        width: 130%;
        min-height: 4.42rem;
        border-radius: 20%;
        position: absolute;
        margin: 0 auto;
        left: -15%;
        top: -12px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        position: fixed;
        top: -0.24rem;
    }
    .Points-text h4{
        height:0.7rem;
        font-size:0.72rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        /* line-height:0.64rem; */
    }
    .Points-text span{
        width:1.68rem;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:300;
        color:rgba(255,255,255,0.8);
        line-height:0.28rem;
    }
    .Points-list{
      background-color: white;
      width: 93.6%;
      max-height:70%;
      border-radius: .08rem;
      margin: 0 auto;
      left: 0;
      right: 0;
      top: 3.5rem;
      z-index: 1000;
      overflow-y: auto;
      position: fixed;
      margin-bottom: 3.5rem;
      /* margin: 3.5rem .24rem .1rem .24rem; */

    }
    .Points-list-center:last-child>.Points-list-box{
        border-bottom:none; 
    }
    .Points-list-center{
        padding: 0rem 0.4rem 0rem 0.32rem;
    }
    .Points-list-box{
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding: 0.32rem 0rem 0.32rem 0rem;
        line-height:0.28rem;
    }
    
    .Points-list-box h5{
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
        margin-bottom: 0.08rem;
    }
    .Points-list-box div:nth-child(1) span{
        width:2.56rem;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
    }
    .Points-list-box div:nth-child(2) span{
        width:0.74rem;
        height:0.4rem;
        font-size:0.4rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.4rem;
    }
    .Points-list-box{
        border-bottom: 0.01rem solid #E8E8E8;
    }
</style>
