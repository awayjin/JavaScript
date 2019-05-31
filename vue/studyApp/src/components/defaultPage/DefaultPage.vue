<template>
  <div  class="content">
      <div class="content-list ub ub-ver ub-pc">
          <div class="defalt-img"><img :src='defaltImg' /></div>
          <div class="text">{{contentText}}</div>
      </div>
  </div>
</template>

<script type="text/babel">
export default {
    props:{
        defaltImg:{
            type:String,
            default: require('../../assets/images/icon-credit-status.png')
        },
        contentText: {
            type: String,
            default: "暂无数据！"
        }
    },
    data() {
        return {}
    },
    methods: {
       
    }
};
</script>
<style lang="less" scoped>
    //引入外部css文件 flex布局
    @import "../../common/css/public";

    .content{
        position: fixed;
        z-index: 9999;
        width: 60%;
        top: 50%;
        background: #fff;
        left: 0;
        right: 0;
        margin: 0 auto;
        margin-top: -3.1rem;
        .content-list{
            
            .defalt-img{
                text-align: center;
                margin: 0.2rem;
               img{
                    width: 3.9rem;
                  height: auto;
                }
            }
            .text{
                text-align: center;
                font-size: .32rem;
                color: #444444;
                padding-bottom: .24rem;
            }
        }
    }
</style>
