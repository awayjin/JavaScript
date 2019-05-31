<template>
  <div id="app-header-content" class="title-content ub ub-ac border-bottom">
      <div id="go-back" @click="goBack">
         <div class="back-btn"></div>
      </div>
      <div class="header-title">{{title}}</div>
      <div class="head-right">
 
          <div class="right">
              <!-- <div class="t-left"></div> <div class="t-right"></div> -->
                <!-- ../../assets/img/rebel.png   另一张图片路径 --> 
                <img src="../../assets/images/positive.png" alt="">
        </div>
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
    //外部样式引入  flex布局样式
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
    #go-back{
        padding: .24rem;
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
        }
        .back-btn{
            width: .18rem;
            height: .3rem;
            background:url("../../assets/images/back.png") center no-repeat;
            background-size: 100% 100%;
        }
        .head-right{
            margin-right: .24rem;
        }
    #app-header-content.rank-header .header-title{
      color: #fff!important;
    }
    // .right{
    //     width:0.7rem;
    //     height:0.48rem;
    //     // border-radius:0.04rem;
    //     // border:1px solid rgba(183,223,255,1);
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     border-radius: 0.08rem;
    // }
    .right img{
        width:0.7rem;
        height:0.48rem;
        // border-radius:0.04rem;
        // border:1px solid rgba(183,223,255,1);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.08rem;
    }
    // .t-left{
    //     width:100%;
    //     height:100%;
    //     background:url("../../assets/img/positive.png") center no-repeat;
    //     padding: 0.02rem 0.08rem;
    // }
    
    // .t-right{
    //     width:100%;
    //     height:100%;
    //     background:url("../../assets/img/rebel.png") center no-repeat;
     //       padding: 0.02rem 0.08rem;
    // }
</style>




