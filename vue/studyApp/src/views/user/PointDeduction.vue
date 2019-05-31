<template>
    <div>
        <div class="box">  
        </div>
        <div class="bigbox" >
            <div class="bigbox-box">
                <div class="bigbox-header"><h4>当前积分{{points}}</h4></div>
                <div class="bigbox-conter"><p>报名认证考试需要扣除<span>200</span>积分</p></div>
                <div class="bigbox-foot">
                    <div class="no-agree" @click="notAgree">不同意</div>
                    <div class="agree" @click="isAgree">同意并开始考试</div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            points: 200,
            onOff: false
        }
    },
    created() {
        // 获取在首页缓存的积分信息
        let pointListStr = sessionStorage.getItem('point-list');
        if (pointListStr) {
            let pointList = JSON.parse(pointListStr);
            let query = this.$route.query;
            let paperId = query.paperBankId;
            for(let i=0; i<pointList.length; i++) {
                if (pointList[i].paperId == paperId) {
                    //console.log("found -points");
                    //console.log(pointList[i]);
                    this.points = pointList[i].totalCredit;
                    break;
                }
            }
        }
    },
    methods: {
        notAgree () {
            this.$emit("isAgree","0");
        },
        isAgree () {
            if(!this.onOff) {
                this.$emit("isAgree","1");
                this.onOff = true;
            }
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
        /* 初级验证考试禁止对话框上下移动 */
        overflow: auto;
    }
    .bigbox{
        background:rgba(255,255,255,1);
        min-height: .6rem;
        width: 74.66%;
        border-radius: 0.16rem;
        position: absolute;
        margin:0 auto;
        left: 0;
        right: 0;
        top: 50%;
        margin-top: -40%;
        /* margin-top: -3.14rem;  */
        /* left:50%;
        top:50%;
        transform:translateX(-50%) translateY(-50%); 
      -webkit-transform:translateX(-50%) translateY(-50%); */
        z-index: 1000;
    }
    .bigbox-box{
          z-index: 100;
    }
    .bigbox-header{
        display: flex;
        justify-content:center;
        align-items: center;
        background: #F2F4F5;
        border-top-left-radius: 0.16rem;
        border-top-right-radius: 0.16rem;
        padding-top: 0.32rem;
        padding-bottom: 0.24rem;
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
        padding-top: 1.1rem;
        padding-bottom: 1.1rem;
    }
    .bigbox-conter span{
        color: #fc4343
    }
    .bigbox-foot{
        display: flex;
        justify-content:space-around;
        border-top:1px solid #f2f2f2;
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
        /* border-right:0.015rem solid rgba(232,232,232,1); */
    }
    .no-agree:after{
        content: '';
        /* display: inline-block; */
        width: 1px;
        height: 100%;
        background: #f2f2f2;
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
