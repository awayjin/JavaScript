<template>
  <div id="app-header-content" class="title-content ub ub-ac">
      <div class="ub ub-ac back-content" @click="goBack">
         <div id="go-back" class="back-btn"></div>
         <div class="tx-sty">学习</div>
      </div>
      <div class="ub ub-ac ub-pc user-name">
         <img v-if="userPhoto" class="user-photo" :src="userPhoto" />
         <div class="header-title">{{title}}</div>
      </div>
      
      <div class="head-right ub ub-ac">
          <slot name="headerRight"></slot>
      </div>
  </div>
</template>

<script type="text/babel">
export default {
    props:['title', 'userPhoto'],
    data() {
        return {}
    },
    methods: {
        goBack () {
          // 关闭调App接口
          let closeObj = {
            'method': 'closeWeb',
            'content': '',
            'success': '',
            'error': ''
          }
          window.location = '/native_service?data=' + JSON.stringify(closeObj)
        }
    }
};
</script>
<style lang="less" scoped>
    //引用外部样式flex布局
    @import "../../common/css/public";

    #app-header-content{
        justify-content: space-between;
        height: .88rem;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background: #fff;
    }
     .user-name{
        position: absolute;
        margin: 0 auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }   
    .header-title{
            font-size: .34rem;
            color: #444444;
            font-size:0.34rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(68,68,68,1);
            line-height:0.34rem;
            margin-top: 0.05rem;
        }
        
        .back-content{
            padding: .2rem 0;
        }
        .back-btn{
            margin-left: .24rem;
            width: .18rem;
            height: .3rem;
            background:url("../../assets/images/icon_back_arrow.png") center no-repeat;
            background-size: 100% 100%;
        }
        .tx-sty{
            color: #666666;
            font-size: .28rem;
            margin-left: .08rem;
        }
        .user-photo{
            width: .4rem;
            height: .4rem;
            border-radius: 100%;
            overflow: hidden;
            margin-right: .1rem;
        }
        .head-right{
            margin-right: .24rem;
        }
    #app-header-content.rank-header .header-title{
      color: #fff!important;
    }
</style>

