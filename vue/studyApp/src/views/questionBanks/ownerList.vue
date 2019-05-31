<template>
  <div class="ownerPaper">
    <app-header title="责任人列表" from="tk" :rightObj="rightObj" :listFinish="finish"></app-header>
    <div class="main">
      <!-- <mt-cell title="责任人" value="李四"></mt-cell> -->
      <table v-if="ownerList.length != 0" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <th align="center">责任人</th>
          <th align="center">审核阶段</th>
          <th align="center">审核结果</th>
          <th align="center">审批时间</th>
        </tr>
        <tr v-for="(item,index) in ownerList" :key="index">
          <td align="center">{{item.staffName}}</td>
          <td align="center">{{item.auditStatus}}</td>
          <td align="center">{{item.specialOpinion}}</td>
          <td align="center">{{item.createTime}}</td>
        </tr>
      </table>
      <table v-else width="100%" cellpadding="0" cellspacing="0">
        <p class="noOwnerInfo" align="center">暂无责任人</p>
      </table>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/appHeader/AppHeader";//顶部组件引入
import requestMethods from "@/api/request";//请求链接
import methodSet from "@/common/js/public";//获取url后面参数和时间日期的转换方法封
export default {
  components:{
      AppHeader
  },
  data(){
    return {
      rightObj: {
        isMore: false,
        icon:'',
        title:''
      },
      ownerList: [],
    }
  },
  mounted(){
    this.queryOwnerList();
  },
  methods:{
    finish(){},
    hideMe() {
      this.$parent.showOwnerList = false;
    },
    queryOwnerList(){//责任人详情
      let questionId = localStorage.getItem('errorQuestionId')
      // console.log('questionId',questionId)
      requestMethods.getquestionOwner(questionId).then((res) => {
        // console.log('责任人res',res)
        let resData = res;
        resData.forEach(function(item,index){
          item.createTime = methodSet.timestampToTime(item.createTime);
        })
        this.ownerList = resData;
      })
    },
  }
}
</script>

<style lang="less">
  .ownerPaper{
    background: #fff;
  }
  .main {
    background-color: #fff;
    height: 100%;
    font-family:PingFangSC-Regular;
    margin-top: 0.9rem;
    overflow: hidden;
    padding: 0 0.36rem;
    font-size: 0.28rem;
    padding-bottom: 11.4rem;
  }
  table {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgb(211, 202, 221);
  }
  table td {
    padding: 5px 10px;
    font-size: 12px;
    font-family: Verdana;
    color: rgb(95, 74, 121);
  }
  table tr:nth-child(2n) {
    background: rgb(223, 216, 232)
  }
  table tr:nth-child(2n+1) {
    background: #fff;
  }
  table tr{
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgb(211, 202, 221);
  }

  th {
    height: 0.6rem;
  }
  td {
    height: 0.8rem;
  }
  .noOwnerInfo {
    margin-top: 0.16rem;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 12px;
    font-family: Verdana;
    color: rgb(95, 74, 121);
    background: rgb(223, 216, 232)
  }
</style>
<style>
  .mint-cell-wrapper{
    padding: 0 24px !important;
  }
</style>

