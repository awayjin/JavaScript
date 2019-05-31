<template>
    <div class="box">
        <div class="box-header">
            <h4>您已做完最后一题</h4>
            <p>完成练习，离通过考试更近一步</p>
        </div>
        <div class="content ub ub-pc">
            <div class="ub ub-f1 ub-pc ub-ac ub-ver content-list border-right">
                <p class="list-title-tx">做对题数</p>
                <p class="list-num-tx">{{finalOK}}</p>
            </div>
            <div class="ub ub-f1 ub-pc ub-ac ub-ver content-list border-right">
                <p class="list-title-tx">做错题数</p>
                <p class="list-num-tx">{{finalNG}}</p>
            </div>
            <div class="ub ub-f1 ub-pc ub-ac ub-ver content-list">
                <p class="list-title-tx">未做题数</p>
                <p class="list-num-tx">{{finalUN}}</p>
            </div>
        </div>
    </div>
</template>
<script>

import request from "@/api/request"//请求链接封装引用

export default {
   data() {
       return {
            currentBatchCorrectCount: 0,
            currentBatchErrCount: 0,
            currentBatchNotCount: 0
       }
   },
   props: ['batchNo', 'finalOK', 'finalNG', 'finalUN', 'fieldId'],
   computed: {
   },
   created () {
       //this.getBatchStat(this.batchNo, this.fieldId);
   },
   mounted () {
       window.scrollTo(0, 0);
   },
   methods: {
        // getBatchStat(batchNo, fieldId) {
        //     request.getBatchStat(batchNo, fieldId).then(() => {
        //     });
        // }
   }
}
</script>
<style lang="less" scoped>
    .box{
        margin-top: 0.25rem;
        padding: 0.4rem 0.32rem 0rem 0.32rem;
        background:linear-gradient(135deg,rgba(126,209,255,1) 0%,rgba(84,128,254,1) 100%);
        box-shadow:0.04rem 0.08rem 0.12rem 0rem rgba(205,219,255,1);
        border-radius:0.16rem;
    }
    .content{
        width: 100%;
        margin-top: .8rem;
        padding-bottom: .88rem;
        .content-list{
          width: 100%;  
          color: #fff;
          border-right-color: rgba(255,255,255,0.4);
          .list-title-tx{
              font-size: .28rem;   
          }
          .list-num-tx{
              font-size: .48rem;
              font-weight: 500;
              margin-top: .24rem;
          }
        }
    }
    .box-header h4{
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:0.32rem
    }
    .box-header p{
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#c9e7ff;
        line-height: .6rem;
    }

    .ub{
       display: flex;
       display: -webkit-flex;
    }
    .ub-ac{
      align-items:center;
    }
    .ub-pc{
      justify-content:center;
    }
    .ub-end{
       justify-content: flex-end;
    }
    .ub-ver{
        flex-direction: column;
    }
</style>
