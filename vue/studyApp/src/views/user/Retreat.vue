<template>
    <div>
        <div class="box">  
        </div>
        <div class="bigbox">
            <div class="bigbox-box">
                <div class="bigbox-header"><img src="../../assets/images/icon-Retreat.png" alt="" style="width:1rem;height:1rem"></div>
                <div class="bigbox-conter"><p>您已完成<span class="frist-mun">{{finishNum}}</span>道题，还剩<span class="last-mun">{{totalNum}}</span>题未做</p></div>
                <div class="bigbox-foot">
                    <div class="no-agree"  @click="isAgree">现在交卷</div>
                    <div class="agree"  @click="notAgree">继续答题</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props : {
        finishNum : {
            type : Number,
            default : 0
        },
        totalNum : {
            type : Number,
            default : 10
        }
    },
    data(){
        return {
        }
    },
    methods: {
        notAgree () {
            this.$emit("isAgree","0");
        },
        isAgree () {
            this.$emit("isAgree","1");
        }
    }
}
</script>
<style scoped>
    html,body{
        height:100%;
        width:100%; 
        overflow:hidden; 
        margin:0;
        padding:0;}
/* style="" */
   .box{
        width: 100%;
        height: 100%;
        background: #b2b2b2;
        position: fixed;
        top: 0;
        left: 0;
        opacity:0.95;
        /* 针对 IE8 以及更早的版本 */
        filter:alpha(opacity=40);
        z-index: 999;
    }
    .bigbox{
        background:rgba(255,255,255,1);
        width: 74.66%;
        border-radius: 0.16rem;
        position: absolute;
        left:50%;
        top:50%;
        transform:translateX(-50%) translateY(-50%); 
      -webkit-transform:translateX(-50%) translateY(-50%);
        z-index: 1000;
    }
    .bigbox-box{
          z-index: 100;
    }
    .bigbox-header{
        display: flex;
        justify-content:center;
        align-items: center;
        /* background: rgba(242,244,245,1); */
        /* border-top-left-radius: 0.16rem;
        border-top-right-radius: 0.16rem; */
        padding-top: 0.8rem;
        /* padding-bottom: 0.24rem; */
    }
    .bigbox-header h4{
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:0.32rem;
    }
    .bigbox-conter{
        display: flex;
        justify-content:center;
        align-items: center;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
        padding-top: 0.48rem;
        padding-bottom: 0.8rem;
    }
    .frist-mun{
       color: rgba(84,128,254,1);
    }
    .last-mun{
        color: #fc4343
    }
    .bigbox-foot{
        display: flex;
        justify-content:space-around;
        border-top:1px solid #e8e8e8;
    }
    
    .no-agree{
        width: 50%;
        text-align: center;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        position: relative;
        padding-top: 0.22rem;
        padding-bottom: 0.22rem;
    }
    .no-agree:after{
        content: '';
        /* display: inline-block; */
        width: 1px;
        height: 100%;
        background: #E8E8E8;
        position: absolute;
        top: 0;
        right: 0;
    }
    .agree{
        width: 50%;
        text-align: center;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#5480FE;
        padding-top: 0.22rem;
        padding-bottom: 0.22rem;
    }
</style>
