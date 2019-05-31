<template>
<!-- 维护记录 -->
    <div>
        <app-header :title='title'></app-header>
        <div class="Maintain-header">
            <div><span>环境题库</span><b> 指挥中心、电话机房、消防控制室电梯机房、等重要的设备......</b></div>
            <div><p><img src="./imges/u1311.png" alt=""><span>题干有误</span></p><p>2018-07-05 11:42</p></div>
        </div>
        <div class="Maintain-header-list Maintain-header">
            <div><span>环境题库</span><b> 指挥中心、电话机房、消防控制室电梯机房、等重要的设备......</b></div>
            <div><p><img src="./imges/u1311.png" alt=""><span>题干有误</span></p><p>2018-07-05 11:42</p></div>
        </div>
        <div class="Maintain-header-list Maintain-header">
            <div><span>环境题库</span><b> 指挥中心、电话机房、消防控制室电梯机房、等重要的设备......</b></div>
            <div><p><img src="./imges/u1311.png" alt=""><span>题干有误</span></p><p>2018-07-05 11:42</p></div>
        </div>
        <div class="Maintain-header-list Maintain-header">
            <div><span>环境题库</span><b> 指挥中心、电话机房、消防控制室电梯机房、等重要的设备......</b></div>
            <div><p><img src="./imges/u1311.png" alt=""><span>题干有误</span></p><p>2018-07-05 11:42</p></div>
        </div>
        <div class="Maintain-header-list Maintain-header">
            <div><span>环境题库</span><b> 指挥中心、电话机房、消防控制室电梯机房、等重要的设备......</b></div>
            <div><p><img src="./imges/u1311.png" alt=""><span>题干有误</span></p><p>2018-07-05 11:42</p></div>
        </div>
        <div class="Maintain-header-list Maintain-header">
            <div><span>环境题库</span><b> 指挥中心、电话机房、消防控制室电梯机房、等重要的设备......</b></div>
            <div><p><img src="./imges/u1311.png" alt=""><span>题干有误</span></p><p>2018-07-05 11:42</p></div>
        </div>
    </div>
</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引用
export default {
    data(){
        return{
            title:'维护记录',
        }
    },
    components : {
        AppHeader,
    },
}
</script>
<style scoped>
    .Maintain-header{
        padding: 1.2rem 0.3rem 0rem 0.24rem;
        line-height:0.44rem;
    }
    .Maintain-header-list{
        padding: .2rem 0.3rem 0rem 0.24rem;
        line-height:0.44rem;
    }
    .Maintain-header div:nth-child(1) span{
        width:1.2rem;
        height:0.32rem;
        border-radius:0.16rem;
        border:0.02rem solid rgba(232,232,232,1);
        font-size:0.2rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.2rem;
        padding: 0.03rem 0.06rem;
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
        margin-left: 0.06rem;
    }
    .Maintain-header div:nth-child(2) p:nth-child(2){
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.24rem;
    }
</style>

