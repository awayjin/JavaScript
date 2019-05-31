<template>
    <div>
        <app-header :title='title' >  
        </app-header>
        <div id="box">
            <div class="boxLi" @click="toTestScore">
                <ul>
                    <li class="bioaTi"><span>安全专业保级考试</span></li>
                    <li class="time"><span>2018-07-25 15:00</span></li>
                </ul>
                <ul>
                    <li><span style="color:#EBAE41">76</span>分</li>
                </ul>
            </div>
             <div class="boxLi1">
                <ul>
                    <li class="bioaTi"><span>安全专业保级考试</span></li>
                    <li class="time"><span>2018-07-25 15:00</span></li>
                </ul>
                <ul>
                    <li><span>88</span>分</li>
                </ul>
            </div>
             <div class="boxLi1">
                <ul>
                    <li class="bioaTi"><span>安全专业保级考试</span></li>
                    <li class="time"><span>2018-07-25 15:00</span></li>
                </ul>
                <ul>
                    <li><span>88</span>分</li>
                </ul>
            </div>
            
        </div>
    </div>
    
</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader"; //头部组件引入
export default {
    data(){
        return {
            title:'考试记录'
        }
    },
    components : {
      AppHeader
    },
    methods:{
        toTestScore(){
            this.$router.push({
            path : "/testScore",
            //  query : {
            //    id : fieldId
            //  }
          })
        }
    }
}
</script>
<style  scoped>
    #box{
        margin-top: 0.5rem;
         padding: 0.32rem 0.32rem 0.32rem 0.32rem;
    }
    .header-title{
        padding: .48rem 0.48rem .24rem;
        width: 1.36rem;
        height: 0.34rem;
        font-family: PingFangSC;
        font-weight:400;
        color:rgba(68,68,68,1);
    }
    .bioaTi span{
       width:2.56rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
    }
    .time{
        width:2.5rem;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
        margin-top: 0.16rem;
    }
    .boxLi{
        border-bottom: 0.01rem solid #E8E8E8;
         padding: 0rem 0rem 0.32rem 0rem;
    }
    .boxLi ul:nth-child(2){
        float: right;
        margin-top: -0.5rem;
    }
    .boxLi ul:nth-child(2) li {
        width:0.72rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        line-height:0.32rem;
    }
    .boxLi ul:nth-child(2) li span{
        width:0.72rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(79,191,107,1);
        line-height:0.32rem;
    }
    .boxLi1{
         padding: 0rem 0rem 0.32rem 0rem;
        border-bottom: 0.01rem solid #E8E8E8;
    }
    .boxLi1 ul:nth-child(2){
        float: right;
        margin-top: -0.5rem;
    }
    .boxLi1 ul:nth-child(2) li{
        width:0.72rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        line-height:0.32rem;
    }
    .boxLi1 ul:nth-child(2) li span{
        width:0.72rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(79,191,107,1);
        line-height:0.32rem;
    }

</style>
