<template>
    <div class="box">
         <app-header :title='title' :rightObj="rightObj" v-on:listFinish="finish"></app-header>
         <div class="box-hander">
            <h4>资格认证考试</h4>
            <div class="box-rule-one"><div class="numbox ub ub-ac ub-pc"><p>1</p></div><span class="textbox">资格考试没有考过，可重复考试直到通过，通过考试即获得任命资格；</span></div>
            <div class="box-rule-two"><div class="numbox ub ub-ac ub-pc"><p>2</p></div><span  class="textbox">每月上中下分三旬，每旬有效期为10天：</span></div>
            <div class="text-box-last" style="margin-bottom:0.16rem;">
                <span class="text-box-last-text">上旬考试时间:26日-05日；对应有效期:01日-10日;</span>
                <span class="text-box-last-text">中旬考试时间:06日-15日；对应有效期:11日-20日;</span>
                <span class="text-box-last-text">下旬考试时间:16日-25日；对应有效期:21日-月底;</span>
            </div>
            <div class="box-rule-three"><div class="numbox ub ub-ac ub-pc"><p>3</p></div><span  class="textbox">在有效保级期限之内通过保级考试的，自动续保下一周期资格；</span></div>
            
            <div class="box-rule-three"><div class="numbox ub ub-ac ub-pc"><p>4</p></div><span  class="textbox">考试没通过，补考无次数限制；</span></div>
            <div class="box-rule-three"><div class="numbox ub ub-ac ub-pc"><p>5</p></div><span  class="textbox">老的专家需要保级，老的专家需要重新走资格考试流程；</span></div>

            <h5>认证考试阶段：</h5>
            <table border="1" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <th align="center">认证考试<br/>通过时间</th>
                <th align="center">认证资格<br/>对应有效期</th>
                <th align="center">下次保级考试<br/>开放时间</th>
                </tr>
                <tr>
                <td align="center">上旬(01日—10日)</td>
                <td align="center">通过认证后—20日</td>
                <td align="center">16日—25日</td>
                </tr>
                <tr>
                <td align="center">中旬(11日—20日)</td>
                <td align="center">通过认证后—月底</td>
                <td align="center">26日—次月5日</td>
                </tr>
                <tr>
                <td align="center">下旬(21日—月底)</td>
                <td align="center">通过认证后—次月10日</td>
                <td align="center">次月6日—15日</td>
                </tr>
            </table>
            
            <h5 style="margin-top:0.2rem;">保级考试阶段：</h5>
            <table border="1" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <th align="center">保级考试<br/>通过时间</th>
                <th align="center">认证资格<br/>对应有效期</th>
                <th align="center">下次保级考试<br/>开放时间</th>
                </tr>
                <tr>
                <td align="center">16日—25日</td>
                <td align="center">下旬(21日—月底)</td>
                <td align="center">26日—次月5日</td>
                </tr>
                <tr>
                <td align="center">26日—次月5日</td>
                <td align="center">上旬(01日—10日)</td>
                <td align="center">次月6日—15日</td>
                </tr>
                <tr>
                <td align="center">06日—15日</td>
                <td align="center">中旬(11日—20日)</td>
                <td align="center">16日—25日</td>
                </tr>
            </table>
        </div>
        <div class="box-center">
            <h4>小专家赛考试</h4>
            <div class="relegation-rules"><div class="numbox ub ub-ac ub-pc"><p>1</p></div><span class="textbox">开放对象为BU1所有员工；</span></div>
            <div class="relegation-rules"><div class="numbox ub ub-ac ub-pc"><p>2</p></div><span class="textbox">报名后4周之内每周考试通过，则获得小专家荣誉称号并奖励200积分；</span></div>
            <div class="relegation-rules"><div class="numbox ub ub-ac ub-pc"><p>3</p></div><span class="textbox">认证阶段，没有考过本周之内补考次数不限制，直到通过，假如本周没考过，则需重新报名认证；</span></div>
            <div class="relegation-rules"><div class="numbox ub ub-ac ub-pc"><p>4</p></div><span class="textbox">保级阶段，连续三周通过考试，则奖励50积分，获得一枚三连击奖章；</span></div>
            <div class="relegation-rules"><div class="numbox ub ub-ac ub-pc"><p>5</p></div><span class="textbox">一周没保级成功，则减去50积分，直到积分减为0，则失去小专家称号；</span></div>
            <div class="relegation-rules"><div class="numbox ub ub-ac ub-pc"><p>6</p></div><span class="textbox">奖章规则：</span></div>
            <div class="text-box-last">
                <span class="text-box-last-text">连续三周通过考试 = 1枚三连击奖章，</span>
                <span class="text-box-last-text">3个三连击奖章 = 1个九连击奖章，</span>
                <span class="text-box-last-text">3个九连击奖章 = 学习之星奖章（半年奖章），</span>
                <span class="text-box-last-text">2个半年奖章 = 学习之神奖章（1个一年奖章）。</span>
            </div>
        </div>
        <div class="important-reminder">
            <h4><span style="color:red;">*</span>重要提醒</h4>
            <div class="important-reminder-text"><span>所有考试学员均可自主选择时间、地点参加完成，考试过程请本着奋斗者精神，诚实守信原则独立完成考试。</span></div>
        </div>
        <div class="behavior-text">
           <div class="behavior-conter"><span>若您发现作弊行为，首页底部的“作弊举报”模块可为您提供举报入口。</span></div>
        </div>
    </div>
</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引用
export default {
    data(){
        return {
            title:'考试规则',
            rightObj:{
                isMore: false,
                icon:''
            }
        }
    },
    components : {
      AppHeader
    },
    methods:{
        finish(){},
    }
}
</script>

<style lang="less" scoped>
    //外部样式引入 flex布局
    @import "../../common/css/public";

    .box{
        padding: 0.32rem 0.32rem  0rem 0.32rem ;
        height:15rem;
        background:rgba(255,255,255,1);
    }
    .box-hander{
        padding-top: 0.88rem;
    }
    .box-hander h4{
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.32rem;
    }
    .box-rule-one{
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 0.16rem;
        margin-top:0.16rem;
    }
    .box-rule-two,.box-rule-three{
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 0.16rem;
    }

    .numbox{
        width:12px;
        height:12px;
        border-radius: 100%;
        /* padding: 0 0.1rem; */
        font-size: 0.24rem;
        line-height: 0.24rem;
        text-align: center;
        /* flex-shrink: 0; */
        border:1px solid rgba(68,68,68,1);
        flex-shrink: 0;
        margin-top: 0.08rem;
    }
    .textbox{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.4rem;
        margin-left: 0.1rem;
    }



    .box-center h4{
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.32rem;
        margin-top: 0.48rem;
    }
    .relegation-rules{
        display: flex;
        flex-wrap: nowrap;
        margin: 0.16rem 0rem;
    }
    .relegation-rules-tail{
        display: flex;
        flex-wrap: nowrap;
        /* justify-content:flex-start; */
    }
    .relegation-rules-batter{
        display: flex;
        flex-wrap: wrap;
        margin-left: 0.3rem;
    }
    .important-reminder {
        margin-top: 0.48rem;
    }
    .important-reminder h4{
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.32rem;
    }
    .important-reminder-text{
        display: flex;
        flex-wrap: wrap;
    }
    .important-reminder-text span{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        margin-top: 0.16rem;
    }

    .behavior-text{
        margin-top: 0.16rem;
        margin-bottom: 0.16rem;
    }
    .behavior-conter{
        display: flex;
        flex-wrap: wrap;
    }
    .behavior-conter span{
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.34rem;
    }
    .text-box-last {
        display: flex;
        flex-flow: wrap;
    }
    .text-box-last-text {
        font-size: 0.28rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(68, 68, 68, 1);
        line-height: 0.4rem;
        padding-left: 0.32rem;
    }
    .box-hander h5{
        font-size:0.29rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.32rem;
    }
    table {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        // border-bottom-color: rgb(211, 202, 221);
        border: 1px solid #ccc;
        margin-top: 0.2rem;
    }
    table td {
        padding: 5px 10px;
        font-size: 12px;
        font-family: Verdana;
        background: #fff;
        // color: rgb(95, 74, 121);
    }
    // table tr:nth-child(2n) {
    //     background: rgb(223, 216, 232)
    // }
    // table tr:nth-child(2n+1) {
    //     background: #fff;
    // }
    table tr{
        border-top-width: 1px;
        border-top-style: solid;
        // border-top-color: rgb(211, 202, 221);
        font-size: 0.28rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #444444;
        line-height: 0.4rem;
    }

    th {
        height: 0.6rem;
        background: #D6D8D6;
        border: 1px solid #ccc;
    }
    td {
        height: 0.8rem;
        border: 1px solid #ccc;
    }
</style>
