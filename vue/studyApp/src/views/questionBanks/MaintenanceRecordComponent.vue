<template>
    <div class="whjl">
        <div class="whjl_m" v-for="(item,index) in realData" :key="index">
            <div class="whjl_l">
                <!-- 此图片和背影颜色需要根据后台数据做循环变换。 -->
                <div :class="'whjl_img ' + item.colorCls" >
                    <!-- comiterorr 提交报错 -->
                    <!-- <img class="candidates-report" src="../imges/comiterorr.png" style="width:75%;height:75%"> -->
                    <!-- edit  专家编辑 -->
                    <!-- <img class="candidates-report" src="../imges/edit.png" style="width:75%;height:75%"> -->
                    <!-- pass  审核通过   审核通过下面有绑定pass样式 需要遍历一起改变。-->
                    <!-- <img class="candidates-report" src="../imges/pass.png" style="width:75%;height:75%"> -->
                    <!-- nopass  审核不通过   审核不通过下面有绑定nopass样式 需要遍历一起改变。-->
                    <!-- <img class="candidates-report" src="../imges/nopass.png" style="width:75%;height:75%"> -->
                    <!-- review  待复核   审核不通过下面有绑定review样式 需要遍历一起改变。-->
                    <img class="candidates-report" :src="item.icon" style="width:69%;height:69%">

                </div>
                <span>{{item.typeTxt}}</span>
            </div>
            <div class="whjl_r">
                <dl>
                    <dt>{{item.content}}</dt>
                    <dd v-if="item.userName">
                    <img src="../../assets/images/errorman.png" />{{item.userName}}</dd>
                    <dd style="float:right;">{{index == 0 ? '' : item.createTime}}</dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
import methodSet from "@/common/js/public";//获取后面url参数和日期装换方法封装

import comiterorrImg from '../../assets/images/icon-comiterorr.png';//提交报错图标
import editImg from '../../assets/images/icon-edit.png';//专家编辑图标
import reviewImg from '../../assets/images/review.png';//待复核图标
import passImg from '../../assets/images/pass.png';//审核通过图标
import nopassImg from '../../assets/images/icon-nopass1.png';//审核不通过图标

export default {  
		components:{
        },
        props: ['historyList'],
		data () {
			return {
                realData: [], // 处理后的数据
                reportTypeMap: [ // 报错类型/阶段
                    '', '提交报错', '专家报错', '专家编辑', '复审',
                    '待审核', '待复核', '审核通过', '审核不通过'
                ],
                reportIconMap: [ // 图标样式
                    '', 'report', 'report', 'edit', 'edit',
                    'toreview', 'toreview', 'reviewok', 'reviewng'
                ],
                reportColorClass: [ // 颜色样式
                    '', 'comiterorr', 'comiterorr', 'edit', 'edit',
                    'review', 'review', 'pass', 'nopass'
                ],
                imgMap: [ // 步骤条中显示的图标
                    null, comiterorrImg, comiterorrImg, editImg, editImg,
                    reviewImg, reviewImg, passImg, nopassImg
                ]
            }
        },
        methods:{
            translateFields () { // 处理接口返回的内容
                //console.log(this.historyList);
                this.realData = [];
                this.historyList.forEach((item,index) =>{
                    let typeTxt = '';  // 说明文字
                    let icon = '';     // 图标
                    let colorCls = ''; // 颜色样式
                    if (item.reportType == 4) { // 专家报错，特殊处理
                        if (item.specialOpinion == 3) {
                            typeTxt  = '复核通过';
                            icon     = passImg;
                            colorCls = 'pass';
                        } else if (item.specialOpinion == 4) {
                            typeTxt  = '复核不通过';
                            icon     = nopassImg;
                            colorCls = 'nopass';
                        }
                    } else { // 普通用户报错，正常处理
                        typeTxt = this.reportTypeMap[item.reportType];
                        icon    = this.imgMap[item.reportType];
                        colorCls= this.reportColorClass[item.reportType];
                    }
                    item.typeTxt = typeTxt;
                    item.icon    = icon;
                    item.colorCls= colorCls;
                    
                    item.createTime = index == 0 ? '' : methodSet.timestampToTime(item.createTime);

                    //console.log("item:", item);
                    this.realData.push(item);
                });

                let recordList = this.historyList;
                let firstRow = recordList[recordList.length-1];
                if (firstRow.reportType == 2 && recordList[0].reportType == 5) { // 专家报错且为待审核，改为待复核
                    this.realData[0].typeTxt = '待复核';
                }

                this.$forceUpdate();
            }
		},
		created (){
            this.translateFields();
            //this.getQuestionLog();
		}
	}
</script>
<style scoped>
    .head{
        border-bottom: none;
    }
    .mint-header{
      height:0.88rem;
      background:#fff;
      top:0px;
    }
    .mint-header{
      color:#666;
    }
    .whjl{
        margin-top:0.6rem;
        overflow: hidden; 
        padding-bottom:0.1rem;
    }
    .whjl_m{
        padding:0 0.36rem 0 0.4rem;
    }
    .whjl_l{
        float:left;
    }
    .whjl_img{
        width:0.44rem;
        height:0.44rem;
        border-radius:50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        float:left;
        /* background-image: url('../imges/comiterorr.png') no-repeat; */
        /* width: 0.18rem;
        height: 0.22rem; */
    }
    /* 提交报错  考生报错*/
    .comiterorr{
        background:#5480FE;
    }
    /* 专家编辑 */
    .edit{
        background:#5480FE;
    }
    /* 审核通过 */
    .pass{
        background: rgba(79,191,107,1);
    }
     /* 审核不通过 */
    .nopass{
        background: rgba(252,67,67,1);
    } 
    /* 待复审   */
    .review{
        background: rgba(205,205,205,1);
    }
    /* .review::before{
        content: '';
        display: block;
        height: .7rem;
        width: .1rem;
        background: #26a2ff;
        position: absolute;
        margin: 0 auto;
        bottom: 0.09rem;
        left: 0;
        right: 0;
    }    */
    .whjl_l span{
        color:#000;
        font-size:0.32rem;
        margin-left:0.1rem;
        float:left;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.45rem;
    }
    .whjl_r{
        float:left;
        width:100%;
        padding:0 0.1rem;
        box-sizing:border-box;
        /* position: relative;
        top: -0.03rem; */
    }
    .whjl_r dl{
       box-sizing:border-box;
       width:100%;
       border-left:1px #E8E8E8 solid; 
       overflow: hidden;
       padding-bottom:1rem;
       padding-top:0.05rem;
       padding-left:0.3rem;
       margin-left:0.1rem;
       /* height: 2.21rem; */
    }
    .whjl_m:last-child > .whjl_r dl{
         padding-bottom:0.05rem;
    }
    .whjl_r dl dt{
        color:#444;
        font-size:0.28rem;
        margin-top:0.02rem;
        padding-top: 0.1rem;
        margin-left:0.05rem;
        font-family:PingFangSC-Regular;
        font-weight: 400;
        line-height: 0.4rem;
    }
    .whjl_r dl dd{
        float:left;
        margin-top:0.1rem;
        color:#444;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        line-height:0.24rem;
    }
    .whjl_r dl dd:nth-child(3){
       color:#979797;
    }
    .whjl_r dl dd img{
        position: relative;
        width:12px;
        height:auto;
        top: 2px;
        margin-right: 5px;
        margin-left: 5px;
    }
    /* .candidates-report{
        background: url('../imges/comiterorr.png') no-repeat;
        width: 0.18rem;
        height: 0.22rem;
    } */

</style>