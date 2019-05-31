<template>
    <div>
      <app-header :title='title' :rightObj="rightObj" v-on:listFinish="finish"></app-header>
       <div class="body-color">
        <div class="Wrong-haeder">
            <div class="Wrong-text"><span>已获得</span></div>
            <ul class="Wrong-header-ul">
                <li v-for="(item,index) in yearMedalList" :key="index+'year'"><div><img src="../../assets/images/icon-medal-year.png" alt=""></div><p class="Badge">一年奖章</p><p class="Badge-text">{{item.createTime | formatDate}}</p></li>
                <li v-for="(item,index) in halfMedal" :key="index+'half'"><div><img src="../../assets/images/icon-medal-half.png" alt=""></div><p class="Badge">半年奖章</p><p class="Badge-text">{{item.createTime | formatDate}}</p></li>
                <li v-for="(item,index) in nineMedal" :key="index+'nine'"><div><img src="../../assets/images/icon-medal-nine.png" alt=""></div><p class="Badge" style="white-space:nowrap;">九连击奖章</p><p class="Badge-text">{{item.createTime | formatDate}}</p></li>
                <li v-for="(item,index) in threeMedal" :key="index+'three'"><div><img src="../../assets/images/icon-medal-three.png" alt=""></div><p class="Badge" style="white-space:nowrap;">三连击奖章</p><p class="Badge-text">{{item.createTime | formatDate}}</p></li>
            </ul>
        </div>
        <div class="Wrong-center">
            <div class="center-text">
                <span>奖章足迹</span>
            </div>
            <div class="WrongTitle-header">
                    <ul class="Step-bar">
                            <!--<p class="description">-->
                                <ul class="Wrong-ul" v-for="(item,index) in medalFootprints" :key="index+'list'">
                                    <li class="Wrong-li">
                                        <div class="li">
                                        <!-- 1:三连击奖章 2:九连击奖章 3:半年奖章 4:一年奖章 -->     
                                          <div v-if="item.medalType === '1'">
                                            <img  src="../../assets/images/icon-medal-1.png" alt="">
                                          </div>
                                          <div v-else-if="item.medalType === '2'">
                                            <img  src="../../assets/images/icon-medal-2.png" alt="">
                                          </div>
                                          <div v-else-if="item.medalType === '3'">
                                            <img src="../../assets/images/icon-medal-3.png" alt="">
                                          </div>
                                          <div v-else-if="item.medalType === '4'">
                                                <img src="../../assets/images/icon-medal-4.png" alt="">
                                          </div> 

                                          </div>
                                        <div>
                                            <!-- medalType 1:三连击奖章 2:九连击奖章 3:半年奖章 4:一年奖章 -->  
                                            <p v-if="item.medalType == 1">三连击奖章</p>
                                            <p v-if="item.medalType == 2">九连击奖章</p>
                                            <p v-if="item.medalType == 3">半年奖章</p>
                                            <p v-if="item.medalType == 4">一年奖章</p>
                                            <p>
                                                <span>{{item.createTime | formatDate}}</span>
                                                <span>{{item.medalSource}}</span>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            <!--</p>-->
                    </ul>
                </div>
         </div>
        </div> 
    </div>
</template>
<script>
import requestMethods from "@/api/request";
import {formatDate} from '../../utils/dataTime.js';
import AppHeader from "@/components/appHeader/AppHeader";
// import Bus from '@utils/busEvent.js'
export default {
    data(){
        return{
            title:'我的奖章',
            medalFootprints: [],//奖章足迹
            yearMedalList : [],//一年奖章
            halfMedal: [],//半年奖章
            nineMedal: [],//九连击奖章
            threeMedal: [],//三连击奖章
            rightObj: {
                isMore: false,
            }
        }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList (query) {
        requestMethods.badgeList(query).then((res) =>{
          //console.log(res)
          if(res.code == 200) {
              let resData = res.data;
            //奖章足迹
            this.medalFootprints = resData.medalList
            //三连击奖章
            this.threeMedal = resData.threeMedalList;
            //九连击奖章
            this.nineMedal = resData.nineMedalList;
            //半年奖章
            this.halfMedal = resData.halfMedalList;
            //一年奖章
            this.yearMedalList = resData.yearMedalList;
          }
            

        })
      },
      finish(){},

    },
     components : {
        AppHeader,
    },
    mounted() {

    },
}
</script>
<style scoped>
    .body-color{
        background: #fafafa;
        height: 100%;
    }
    .Step-bar{
       padding: 0 0.4rem 0 0.7rem;
    }
    .Step-bar li p img{
        width:0.24rem;
        height:0.24rem;
        background:rgba(255,255,255,1);
    }
    .Step-bar .header{
        font-size: 0.14rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.32rem;

    }
    .timer span{
        width:0.48rem;
        height:0.24rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.24rem;
    }
    .Step-bar li{list-style: none;padding: .4rem .2rem .2rem .2rem;border-left: 1px solid #E8E8E8;position: relative;}
    .Step-bar li:before{
        content: "";
        width: 0.2rem;
        height: 0.2rem;
        display: block;
        background: rgba(207,207,207,1);
        position: absolute;left: 0.02rem;
        top: .35rem;
        margin-left:-0.13rem;
        margin-top: .5rem;
        border-radius: 100%;
        background-repeat: no-repeat, no-repeat;
        background-position: center;
    }
    .Step-bar ul{margin: 0 auto;}

    .Wrong-haeder,.Wrong-center{
        background: #fff;
        padding: 1.21rem 0rem 0.32rem 0.34rem
    }
    .Wrong-haeder{
         /* box-shadow: 0 -2px 5px red;   */
    }
    .Wrong-center{
        padding-top: 0.32rem;
        background-color: #fafafa;
        -webkit-box-shadow: 0 .04rem .04rem #EDEDED inset;
        -moz-box-shadow: 0 .04rem .04rem #EDEDED inset;
        box-shadow: 0 .04rem .04rem #EDEDED inset;
    }
    .Wrong-text{
        width:1.44rem;
        height:0.56rem;
        background:rgba(238,238,238,1);
        border-radius:0.32rem;
        border:0.02rem solid rgba(232,232,232,1);
        display: flex;
        justify-content:space-around;
        align-items: center;
    }
    .Wrong-text span{
        width:0.84rem;
        height:0.32rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
    }
    .Wrong-header-ul{
        display: flex;
        margin-top: .24rem;
        overflow-y: auto;
        margin-right: 0.34rem;
        /* ios 下滑动加速*/
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        /* flex-wrap: nowrap; */
    }
    .Wrong-header-ul::-webkit-scrollbar {display:none}
    .Wrong-header-ul li {
        /* width: 1.8rem; */
        margin-left: 0.34rem;
        float: left;
    }
    .Wrong-header-ul li:nth-of-type(1) {
      margin-left: 0;
      float: left;
    }
    .Wrong-header-ul li:nth-last-of-type{
      margin-right: 0.34rem;
    }
    .Wrong-header-ul li div img {
      width: 1.76rem;
      height: 1.64rem;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .Badge{
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.28rem;
        text-align:center;
    }
    .Badge-text{
        height:0.24rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,153,1);
        line-height:0.24rem;
        white-space:nowrap;
        text-align: center;
        margin-top: 0.08rem;
    }
    .center-text{
        width:1.44rem;
        height:0.56rem;
        background:rgba(238,238,238,1);
        border-radius:0.32rem;
        border:0.02rem solid rgba(232,232,232,1);
        display: flex;
        justify-content:space-around;
        align-items: center;
    }
    .center-text span{
        width:1.13rem;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.28rem;
        white-space:nowrap;
    }
    .Wrong-ul{
        margin-top: .4rem;
    }
    .Wrong-ul img{
        width: 1.12rem;
        height: 1.04rem;
    }
    .Wrong-li{
        display: flex;
        justify-content:flex-start;
        align-items: center;
        padding: .09rem 0 .3rem 1.13rem;
    }
    .Wrong-li div:nth-child(2) p:nth-child(1){
        width:3.12rem;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.28rem;
        margin-bottom: 0.08rem;
        padding-left: 0.12rem;
    }
    .Wrong-li div:nth-child(2) p:nth-child(2){
        width:1.12rem;
        height:0.24rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,153,1);
        line-height:0.24rem;
        white-space:nowrap;
        padding-left: 0.12rem;
    }
    .Wrong-li div:nth-child(2) p:nth-child(2) span:nth-child(2){
       /* margin-left: .3rem; */
    }
</style>
