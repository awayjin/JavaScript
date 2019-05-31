<template>
    <div class="proclamation">
        <app-header style="display: block;" title="审核专家公示" :from="from" :rightObj="rightObj" v-on:listFinish="finish"></app-header>
        <div style="height:0.5rem;width:100%;" class="center"></div>
        <div class="main_m" v-for="(item,index) in proclamationArr" :key="index">
            <div class="ub ub-ac ub-pc mar-b40">
                <div class="line"></div>
                <p class="pad-lr24 tx-sty">{{item.fieldName.replace('题库', '') + '管理专业委员会'}}</p>
                <div class="line"></div>
            </div>
            <div class="name-rank">（姓名不分前后）</div>
            <dl v-for="(item1,index1) in item.speciaListDto" :key="index1" class="ub ub-ac proclasmation">
                <dt v-if="item1.imageUrl" class="tx_img"><img :src="item1.imageUrl" /></dt>
                <dt v-else class="tx_img"><img src="../../assets/images/icon-head-image.png" /></dt>
                <div>
                    <dd class="ub ub-ac">
                        <span class="pro-name">{{item1.staffName}}</span>
                        <span class="pro-text">{{item1.roleName | formatRoleName}}</span>
                    </dd>
                    <dd v-if="item1.manageName">
                        <p class="pro-position">{{item1.manageName}}</p>
                    </dd>
                </div>
                <!-- <dd><span class="pro-name">{{item1.staffName}}</span><span class="pro-text">2132313212</span></dd>                <dd><p class="pro-position">{{item1.manageName}}</p></dd> -->
            </dl>
        </div>
    </div>
</template>

<script>
    import AppHeader from "@/components/appHeader/AppHeader";//头部组件引入
    import requestMethods from "@/api/request";//请求地址链接封装
    export default{
        components : {
            AppHeader
        },
        props: ['from', 'fieldId'],
        data(){
            return{
                proclamationArr:[],
                rightObj: {
                    isMore: false,
                    title: ""
                },
            }
        },
        filters: {
            formatRoleName(roleName) {
                if (roleName) {
                    let arr = roleName.split(",");
                    return arr[0];
                }
                return roleName;
            }
        },
        methods:{
            hideMe() {
                this.$parent.showProclamation = false;
            },
            getList () {
                //console.log("fieldId:", this.fieldId);
                let fieldId = '-1'; //this.fieldId || this.$parent.$data.fieldId || 0;
                requestMethods.expertPublicity(fieldId).then((res) =>{
                    //console.log(res);
                    this.proclamationArr = res;
                })
            },
            finish () {},
        },
        created(){
            this.getList();
        },
        mounted(){
            this.$el.parentNode.style.position = 'absolute'; // fixed => absolute 防止ios下滑动问题
        }
    }
</script>


<style scoped>
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
 .ub-ver{
    flex-direction: column;
}
.proclasmation{
    /* padding: 0.36rem 0 0.13rem 0; */
}
.center{
    padding-bottom: 0.5rem;
}
.header-title{
    font-size:0.34rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(68,68,68,1);
    line-height:0.34rem;
}
.proclamation{
    /* position:fixed; */
    /* height:100%; */
    background:#F2F4F5;
    width:100%;
    box-sizing: border-box;
}
.mint-header{
    height:50px;
    background:#fff;
}
.mint-header{
    color:#666;
}
.tx_img{
    width:0.76rem;
    height:0.76rem;
    border-radius:100%;
    overflow:hidden;
    /* 行间样式 */
    margin-right: .24rem;
}
.tx_img img{
    /* width:100%; */
    height: 100%;
}
.main_m{
    box-sizing:border-box;
    background:#fff;
    border-radius:0.08rem;
    padding:0.56rem 0.32rem 0.2rem;
    width:92%;
    margin: 0 auto;
    position: relative;
    margin-top:0.4rem;
}
.mar-b40{
    margin-bottom: .1rem;
}
.line{
    width: .4rem;
    height: .032rem;
    border-radius: .02rem;
    background: #D8D8D8;
}
.name-rank{
  font-size: 0.2rem;
  color: #979797;
  font-family: PingFangSC-Regular;
  display: inherit;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  font-weight: bold;
  padding: 0 0 0.1rem;
}
.pad-lr24{
    padding: 0 .24rem;
}
.tx-sty{
    font-size: .32rem;
    color: #000000;
    font-weight: bold;
}
.main_t{
    /* border-top:0.04rem solid#D8D8D8;
    position: relative;
    width:78%;
    margin:0 auto;
    text-align: center;
    padding-bottom: 0.72rem; */
}
.main_m h2{
    font-size:0.32rem;
    text-align: center;
    width:80%;
    background:#fff;
    margin:-0.2rem auto;
    font-family:PingFangSC-Medium;
    font-weight:bold;
    color:rgba(0,0,0,1);
    line-height:0.32rem;
}
.main_m dl{
    padding: .32rem 0rem .24rem 0rem;
    border-bottom:0.01rem solid #E8E8E8;
}
.main_m dl:nth-last-child(1){
    border:none;
}
.main_m dl dd b{
    font-size:0.32rem;
    color:#444;
    font-weight: bold;
    display: inline-block;
    /* width:1rem; */
}
.main_m dl dd span{
    /* height: 0.32rem; */
    font-size:0.32rem;
    /* line-height:0.32rem; */
}
.main_m dl dd p{
    font-size:0.28rem;
    color:#979797;
    margin-top: .16rem;
}
.pro-text{
    font-size:0.32rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#444;
    line-height:0.32rem;
    /* margin-left: 0.64rem; */

}
.pro-name{
    font-size:0.32rem;
    font-family:PingFangSC-Medium;
    font-weight:bold;
    color:#444;
    /* line-height:0.32rem; */
    width: 1.3rem;
    display: inline-block;
}
.pro-position{
    font-size:0.28rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(151,151,151,1);
    line-height:0.28rem;
    /* 行间样式 */
    margin-top: 1px;
}
.icon-head-image{

}
</style>
