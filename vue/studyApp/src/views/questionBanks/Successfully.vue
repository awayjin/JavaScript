<template>
    <div class="successfully">
        <!-- <header data-v-7ba5bd90="" class="mint-header" style="z-index:1" fixed>
            <div class="mint-header-button is-left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </div> 
        </header> -->
        <successfully-header from="the-test-question"></successfully-header>
        <div class="main_wrap">
            <div class="main_inner">
                <span><img src="../../assets/images/icon-errorquetion.png" class="errorquetion">提交成功</span>
                <p v-if="listArr.length">您的报错信息已经提交给{{listArr[0].fieldName.replace('题库', '') + '管理专业委员会'}}</p>
            </div>
        </div>
        <!-- 名单开始 -->
        <!-- <div class="main_m" v-for="(item,index) in listArr" :key="index">
            <div class="main_t"><h2>{{item.fieldName}}名单</h2></div>
            <div style="height:0.2rem;width:100%;"></div>
            <dl v-for="(item1,index1) in item.speciaListDto" :key="index1">
                <dt class="tx_img"><img :src="item1.imageUrl" /></dt>
                <dd><b>{{item1.staffName}}</b><span>{{item1.roleName | formatRoleName}}</span></dd>
                <dd><p>{{item1.manageName}}</p></dd>
            </dl>
        </div> -->


         <div class="main_m" v-for="(item,index) in listArr" :key="index">
            <div class="ub ub-ac ub-pc mar-b40">
                <div class="line"></div>
                <!-- <p class="pad-lr24 tx-sty">{{item.fieldName}}</p> -->
                <p class="pad-lr24 tx-sty">{{listArr[0].fieldName.replace('题库', '') + '管理专业委员会名单'}}</p>
                <div class="line"></div>
            </div>
            
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
import SuccessfullyHeader from "@/components/appHeader/SuccessfullyHeader";//头部组件引用
import requestMethods from "@/api/request"//请求链接封装引用
    export default{
        props: ['from', 'fieldId'],
        data(){
            return{
                listArr : []
            }
        },
        filters: {
            formatRoleName(roleName) {
                //console.log("roleName:", roleName);
                if (roleName) {
                    let arr = roleName.split(",");
                    //console.log(arr);
                    return arr[0];
                }
                return roleName;
            }
        },
        components:{
            SuccessfullyHeader
        },
        methods:{
            getList () {
                let params = this.fieldId || this.$parent.$data.fieldId; //this.$route.query.fieldId ;
                requestMethods.expertPublicity(params).then((res) =>{
                    // console.log(res);
                    if (res.length == 0) { // 如果后台没有返回题库和专家信息，自己构造一个
                        let curTkName = localStorage.getItem('curTkName');
                        if (curTkName) {
                            // let showTkName = curTkName.replace('题库', '') + '管理专业委员会';
                            let showTkName = curTkName;
                            res = [
                                {
                                    fieldName: showTkName,
                                    speciaListDto:[]
                                }
                            ];
                        }
                    }
                    this.listArr = res;
                })
            },
            goBack() {
                //console.log('goback');
                if (this.from == 'the-test-question') {
                    this.$parent.hideSuccess();
                    this.$parent.hideMe();
                    return;
                }

                this.$router.go(-2);
            }
        },
        created(){
            this.getList();
        },
        mounted(){
        }
    }
</script>


<style scoped>
.mintui-back:before{
    color: #fff;
}
    .errorquetion{
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.12rem;
    }
.successfully{
    /* position:fixed; */
    height:100%;
    background:#F2F4F5;
    width:100%;
    box-sizing: border-box;
}
.content{

    line-height:2;
    padding:10px;
}
.content img{
    max-width:80%;
}

.mint-header{
    background:none;
    border:none;
    width:auto;
    color: #fff;
}
.main_wrap{
    width:100%;
    min-height:4.42rem;
    overflow:hidden;
    position: relative;
}
.main_inner{
    background: linear-gradient(#7ED1FF,#5480FE);
    width: 130%;
    min-height: 4.42rem;
    border-radius: 20%;
    position: absolute;
    margin: 0 auto;
    left: -15%;
    top: -12px;
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
}
.main_inner span{
    font-size:0.4rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:0.4rem;
    align-items: center;
    justify-content: center;
    display: flex;
    padding-bottom: 0.24rem;
}
.main_inner p{
    font-size:0.24rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#dfecfc;
    line-height:0.34rem;
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
    background:transparent;
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
    margin-top:-1.1rem;
}
.mar-b40{
    margin-bottom: .4rem;
}
.line{
    width: .4rem;
    height: .032rem;
    border-radius: .02rem;
    background: #D8D8D8;
}
.pad-lr24{
    padding: 0 .24rem;
}
.tx-sty{
    font-size: .32rem;
    color: #000000;
    font-weight: 500;
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
    font-weight:500;
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