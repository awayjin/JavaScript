<template>
  <div id="app-header-content" class="title-content ub ub-ac border-bottom">
      <div id="go-back" @click="goBack">
         <div class="back-btn"></div>
      </div>
      <div class="header-title">{{title}}</div>
      <div class="head-right" v-show="rightObj.isMore">
          <span @click="finish()">{{ rightObj.title }}</span>
          <span class="iconfont" @click="finish()" v-html="rightObj.icon"></span>
          <slot name="headerRight"></slot>
      </div>
  </div>
</template>

<script type="text/babel">
export default {
    props:['title', 'from' ,'rightObj'],
    data() {
        return {}
    },
    methods: {
        goBack () {
            if (this.from == 'tk') {
                this.$parent.hideMe();
                return;
            } else if (this.from == 'the-test-question') {
                this.$parent.hideMe();
                return;
            }

            this.$router.go(-1);
        },
        finish(){
            let self = this;
            if(self.rightObj.isMore){
                self.$emit('listFinish','点击完成')
            }
        },
    }
};
</script>
<style lang="less" scoped>
    //引入样式表flex布局
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
    .border-bottom::before{
        border-bottom-color: #E8E8E8;
    }
    .header-title{
            font-size: .34rem;
            color: #444444;
            font-size:0.34rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(68,68,68,1);
            line-height:0.34rem;
            margin-left: -.4rem;
            // position: fixed;
            // left: 2.2rem;
            text-align: center;
            margin: 0 auto;
        }
        #go-back{
            padding: .24rem;
        }
        .back-btn{
            width: .18rem;
            height: .3rem;
            background:url("../../assets/images/icon_back_arrow.png") center no-repeat;
            background-size: 100% 100%;
        }
        .head-right{
            padding-right: .24rem;
            line-height: .3rem;
            font-size: 0.2rem;
        }
    #app-header-content.rank-header .header-title{
      color: #fff!important;
    }
</style>
