<template>
  <div id="app-header-content" class="title-content ub ub-ac">
      <div id="go-back" @click="goBack">
         <div class="back-btn"></div>
      </div>
      <div class="header-title">{{title}}</div>
      <div class="head-right">
          <div></div>
          <slot name="headerRight"></slot>
      </div>
  </div>
</template>

<script type="text/babel">
export default {
    props:['title', 'from'],
    data() {
        return {}
    },
    methods: {
        goBack () {
            //console.log("goback");
            if (this.from == 'tk') {
                this.$parent.$parent.showMaintenance = false;
                this.$parent.$parent.showTestQuestion = false;
                return;
            } else if (this.from == 'the-test-question') {
                this.$parent.$parent.showProclamation = false;
                return;
            }

            this.$router.go(-1);
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
        // background: #fff;
        // border-bottom: .01rem solid #E8E8E8;

    }
    .header-title{
        font-size:0.34rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:0.34rem;
        margin-left: -.4rem;
        }
        #go-back{
            padding: .24rem;
        }
        .back-btn{
            width: .18rem;
            height: .3rem;
            background:url("../../assets/images/icon_back_arrow.png") center no-repeat;
            background-size: 100% 100%;
            background-color:rgba(255,255,255,1);
        }
        .head-right{
            margin-right: .34rem;
        }
    #app-header-content.rank-header .header-title{
      color: #fff!important;
    }
</style>


