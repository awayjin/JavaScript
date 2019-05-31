<template>
  <div class="notice">
    <index-app-header :title="userInfo.userName" :user-photo="userInfo.image"></index-app-header>
    <template>
      <div class="icon iconfont" @click="goHome">&#xe619;</div>
      <div class="textArea">
        <div class="important-reminder">
          <h4>各位用户大家好：</h4>
          <div class="important-reminder-text">
            <span style="margin-top: 0.4rem;">1.系统进行全面升级中。</span>
          </div>
          <div class="important-reminder-text">
            <span>2.期间所产生的任何数据不予保留。</span>
          </div>
          <div class="important-reminder-text">
            <span>3.不便之处，敬请谅解。</span>
          </div>
        </div>
      </div>
      
    </template>
  </div>
</template>

<script>
import IndexAppHeader from "@/components/appHeader/IndexAppHeader";//顶部组件引入
import defaultImg from '../assets/images/default_uimg.png';//首页顶部默认头像
export default {
  components:{
    IndexAppHeader
  },
  data(){
    return {
      // 个人信息
      userInfo: {
        userName: '公告',
        roleNames: [
          ''
        ],
        image: '',
        userType: 3 // 1 普通用户 2 题库专家  3 特殊类型（不可考试）
      },
      defaultImg: defaultImg,
    }
  },
  mounted(){

  },
  methods: {
    goBack () { // Depreciated
      //第三方页面--使用 “助英台” 登录
        window.location.href = "https://sit.4009515151.com/api/lebang/oauth/authorize?client_id=183f595244b764ad5a511dfacbbb3849&scopes=r-staff&redirect_uri=http%3A%2F%2Felsit.vankeservice.com%2Fapi%2Fapp%2Foauth&response_type=code&state=222&sign=y";
    },
    goHome(){
      this.$router.push('/Home')
    },
  }
}
</script>

<style scoped>
  .notice {
    background:#f8f9fb;
    padding-bottom: 0.26rem;
    height: 100%;
    position: relative;
  }
  .icon {
    position: absolute;
    top: 1rem;
    right: 0.1rem;
    font-size: 0.6rem;
    color: #e4e4e4;
    /* width: 1rem;
    height: 1rem;
    background: red; */
  }
  .textArea {
    font-size: 0.28rem;
    height: 100%;
  }
  .important-reminder {
    /* margin-top: 0.48rem; */
    padding: 3rem 0.2rem;
  }
  .important-reminder h4{
    font-size:0.32rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:0.32rem;
    margin-left: 18%;
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
    margin-left: 26%;
  }
</style>