<template>
    <div class="bigBox">
        <app-header :title='title' ></app-header>
        <div class="box">
            <div class="boxHeader">
                <div class="Grade">
                    <div><span>6</span></div>
                    <div><span>5</span></div>
                    <div><span>分</span></div>
                </div>
                <div class="notice"><span>很遗憾，您本次考试未通过...</span></div>
                <div class="recording"><span>已通过3次考试，还差3次即可获得初级环境</span></div>
            </div>
            <div class="time">
                <h5>这是您第3次认证考试</h5>
                <div class="timer">
                    <p>认证考试时间: 2018年05月02日--2018年07月22日</p>
                    <p class="p">认证考试时间: 2018年05月02日--2018年07月22日</p>
                </div>
            </div>
            <div class="look">
                <div>
                    <p><img src="./imges/u6241.png" alt=""><span class="tmLook">错题查看</span></p>
                    <p class="lookP">做错5题</p>
                    <img src="./imges/u5699.png" alt="" class="lookimg">
                </div>
            </div>
            <div class="foot"><p>参与考试代表您已同意<a href="#">《考试规则》</a></p></div>
        </div>
    </div>
</template>
<script>
//import AppHeader from "@/components/appHeader/AppHeader";
export default {
     data(){
        return {
            title:'考试记录'
        }
    },
    components : {
     // AppHeader
    },
}
</script>
<style  scoped>
.bigBox{
    background:rgba(242,244,245,1);
    height: 100%;
}
    #app-header-content .header-title[data-v-3f9d7aad]{
        width:1.36rem;
        height:0.34rem;
        font-size:0.34rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.34rem;

    }
    .box{
        padding: 0.32rem 0.24rem 0 0.24rem;
    }
    .boxHeader{
        margin-top: 0.9rem;
        width: 7.02rem;
        height: 4.34rem;
        background: linear-gradient(left, #7ED1FF,#5480FE);
        border-radius:8px 8px 0px 0px;
    }
    .Grade{
        padding-left: 2.24rem;
        padding-top: 0.8rem;
       
        height: 1.6rem;
    }
    .Grade div:nth-child(1),.Grade div:nth-child(2){
        width: 1.2rem;
        height: 1.6rem;
        background:rgba(255,255,255,0.3);
        float: left;
        border-radius:0.08rem;
        box-shadow:2px 6px 4px 0px rgba(85,139,255,1);
    }
    .Grade div:nth-child(1) span,.Grade div:nth-child(2) span{
        width:0.7rem;
        height:1.16rem;
        font-size:1.16rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        padding-left: 0.26rem;
    }
    .Grade div:nth-child(2){
        margin-left: 0.16rem;
        
    }
    .Grade div:nth-child(3){
        float: left;
        margin-left: 0.16rem;
        width:0.52rem;
        height:0.52rem;
        border: 1px solid black;
        border-radius:0.08rem;
        margin-top: 1rem;
        border:0.02rem solid rgba(203,217,255,1);
        /* opacity:0.3;
        border:0.02rem solid rgba(203,217,255,1); */
    }
    .Grade div:nth-child(3) span{
        width:0.32rem;
        height:0.4rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(215,234,255,1);
        float: left;
        margin-left: 0.1rem;
        margin-top: 0.05rem;
    }
    .notice{
        margin-left: 1.72rem;
        margin-top: 0rem;
    }
    .notice span{
       width:3.6rem;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:0.28rem;
    }
    .recording{
        margin-left: 0.88rem;
        margin-top: -0.2rem;
    }
    .recording span{
        width:5.26rem;
        height:0.28rem;
        font-size:0.2rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(215,234,255,1);
        line-height:0.28rem;
    }
    .time{
        padding-top: 0.4rem;
        background:rgba(255,255,255,1);
        border-radius:0px 0px 8px 8px;
        padding-bottom: .4rem;
    }
    .time h5{
        padding-left: 2.17rem;
        text-align: center;
        width:2.7rem;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(84,128,254,1);
        line-height:0.28rem;

    }
    .timer {
        margin-top: 0.24rem;
        margin-left: 0.76rem;
    }
    .timer p {
        width:5.92rem;
        height:0.24rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
    }
    .p{
        margin-top: 0.16rem;
    }

    .look{
        margin-top: 0.32rem;
        background:rgba(255,255,255,1);
        border-radius:8px; 
    }
    .look div p img{
        width: 0.32rem;
        height: 0.32rem;
        margin-top: 0.34rem;
        margin-left: 0.34rem;
    }
    .tmLook{
        margin-top: 0.34rem;
        margin-left: 0.21rem;
        width:1.28rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
    }
    .lookP{
        width:1.02rem;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
        margin-left: 0.86rem;
    }

    .lookimg {
      position: absolute;
      right: 0.5rem;
      top: 8.5rem;
    }
    .foot{
        margin-left: 2.16rem;
        margin-top: 3.9rem;
        padding-bottom: 0.1rem;
    }
    .foot p{
       
        font-size:0.2rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.2rem;

    }
</style>
