<template>
    <div>
        <div id="app-header-content" class="rank-header title-content ub ub-ac" :style="!myRank ? 'padding-bottom:0' : ''">
            <div id="go-back" class="back-btn" @click="goBack">
            </div>
            <div class="header-title">{{title}}</div>
            <div class="head-right">
                <div class="right" @click="reverseSort">
                    <img :src="sortIcon[sortType]" alt="">
                </div>
                <slot name="headerRight"></slot>
            </div>
        </div>

        <div class="rank-hbg" v-if="myRank"></div>

        <div id="box" :style="!myRank ? 'margin-top:0' : ''">
        	<div class="rank-item my-dept" v-show="fetchDone && myRank">
                <template v-if="noData || !myRank">
                    <p class="dept-name" style="text-align:center">暂无数据</p>
                </template>
                <template v-else>
                    <span class="dept-rank grey bgl-color"><span class="dept-rank grey"></span>{{ myRankPosition}}</span>
                    <span class="dept-name" v-if="myRank">{{myRank.manageCode}}  {{myRank.manageName}}</span>
                    <span class="dept-person-count bold" v-if="myRank">{{myRank.count}}</span>
                    <span class="dept-people sm">人</span>
                </template>
	        </div>
            <div :class="'rank-item rank-item-' + item.rank" v-for="(item,key) in rankList">
	        	<span class="dept-rank grey bgl-color"><span class="dept-rank grey"></span> {{item.rank < 4 ? '': item.rank}}</span>
	        	<span class="dept-name">{{item.manageCode}}  {{item.manageName}}</span>
        		<span class="dept-person-count bold ">{{item.count}}</span>
        		<span class="dept-people sm ">人</span>
	        </div>
        </div>

        <p class="no-data-hint" v-if="false">暂无数据</p>
    </div>

</template>
<script>
import {serverUrl} from "@/api/serverConfig";//生产环境和UAT环境不同地址的配置，本页面没有用到
import request from "@/api/request";//请求链接封装

import imgUp from '../../assets/images/positive.png';//升序图标引入
import imgDown from '../../assets/images/rebel.png';//降序图标引入

export default {
    data(){
        return {
            title:'认证排名',
            sortType: 0, // 0 顺序 1 倒序
            sortIcon: [
                imgUp, imgDown
            ],
            identityId: '123',

            myRank: null,
            myRankPosition: 0,
            rankList: [],

            noData: false,
            fetchDone: false
        };
    },
    // beforeRouteLeave (to, from, next) {
    //   if (to.name == 'Home') {
    //     to.meta.isUseCache = true;
    //   }
    //   next();
    // },
    methods:{
        goBack() {
            this.$router.go(-1);
        },
        reverseSort() {
            this.sortType = 1 - this.sortType;
            this.getRankList({
                sortType: this.sortType,
                identityId: this.identity
            });
        },
        getRankList(params) {
          let self = this;
          request.getRankList(params).then((data) => {
            if (!data || data.length == 0) {
                self.noData = true;
                return;
            }

            let foundMine = false;

            //data[1].whether = 1;
            for(let i=0; i<data.length; i++) {
                data[i].rank = self.sortType == 0 ? i+1 : data.length - i;
                if (data[i].whether == 1) {
                    self.myRank = data[i];
                    self.myRankPosition = data[i].rank;
                    //data.splice(i, 1);
                    foundMine = true;
                    // console.log("myRank:", self.myRank);
                }
            }

            self.fetchDone = true;
            self.rankList = data;
          });
        }
    },
    created() {
    	this.getRankList({
    		sortType: this.sortType,
    		identityId: this.identity
    	});
    },
    mounted() {

    }
}
</script>
<style scoped>
    #app-header-content{
        justify-content: space-between;
        height: .88rem;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background: #fff;
        border-bottom: .01rem solid #E8E8E8;
        display: flex;
        align-items: center;
    }
    .header-title{
        display: inline-block;
        font-size: .34rem;
        color: #444444;
        font-size:0.34rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.34rem;
    }
    .back-btn{
        display: inline-block;
        margin-left: .24rem;
        width: .18rem;
        height: .3rem;
        background:url("../../assets/images/white.png") center no-repeat;
        background-size: 100% 100%;
    }
    .head-right{
        margin-right: .24rem;
    }
    #app-header-content.rank-header .header-title{
      color: #fff!important;
    }

    .right img{
        width:0.7rem;
        height:0.48rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.08rem;
    }

	#app-header-content.rank-header {
		padding-bottom: 1rem;
		background: linear-gradient(#71d1ff, #74b1ff);
		color: #fff;
	}
	#app-header-content.rank-header .header-title{
		color: #fff!important;
	}
	.rank-hbg {
		height: 40px;
		background: linear-gradient(#74b1ff, #74b1ff);
	}
	.rank-item {
		/* padding: 0.2rem; */
        padding-top: 0.25rem;
        padding-left: 0.2rem;
        padding-bottom: 0.1rem;
		height: 0.7rem;
	    border-bottom: solid 1px #f2f2f2;
	    position: relative;
	}
	.rank-item.my-dept {
		top: -0.18rem;
		z-index: 100;
	    background: #fff;
	    border: solid 1px #f2f2f2;
	    border-radius: 0.1rem;
	    /* box-shadow: 0px 0.1rem 0.09rem #f2f2f2; */
        box-shadow:0px 4px 12px 0px rgba(211,211,211,0.5);
	    position: fixed;
	    width: 90%;
	    margin-top: 1.55rem;
	}
	#box:nth-last-child {
		border-bottom: none;
    }
	.rank-item .dept-rank {
		font-size: 0.35rem;
	}
	.rank-item .dept-name {
	    font-size: 0.35rem;
	    color: #666;
	    font-weight: 400;
	    text-align: left;
        left: 1.0rem;
        font-family:PingFangSC-Regular;
	}
	.rank-item span, .my-dept .dept-person {
		position: absolute;
		bottom: 0.32rem;
	}
	.rank-item .dept-person-count {
		right: 0.5rem;
        top: 0.32rem;
	}
	.rank-item .dept-people {
		right: 0.25rem;
		top: 0.46rem;
	}
	.grey {
		color: #666;
	}
	.bold {
		font-size: 0.35rem;
	    font-weight: 600;
	    color: #555;
	}
	.sm {
		font-size: 0.20rem;
	}
    #box{
        margin-top: 0.8rem;
        padding: 0.32rem 0.24rem;
        padding-top: 1.0rem;
    }
    .header-title{
        /* padding: .48rem 0.48rem .24rem; */
        /* width: 1.36rem; */
        height: 0.34rem;
        font-family: PingFangSC;
        font-weight:400;
        color:rgba(68,68,68,1);
    }
    .bioaTi span{
        width:2.56rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
    }
    .time{
        width:2.5rem;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
        margin-top: 0.16rem;
    }
    .boxLi{
        border-bottom: 0.01rem solid #E8E8E8;
         padding: 0rem 0rem 0.32rem 0rem;
    }
    .boxLi ul:nth-child(2){
        float: right;
        margin-top: -0.5rem;
    }
    .boxLi ul:nth-child(2) li {
        width:0.72rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        line-height:0.32rem;
    }
    .boxLi ul:nth-child(2) li span{
        width:0.72rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(79,191,107,1);
        line-height:0.32rem;
    }
    .boxLi1{
         padding: 0rem 0rem 0.32rem 0rem;
        border-bottom: 0.01rem solid #E8E8E8;
    }
    .boxLi1 ul:nth-child(2){
        float: right;
        margin-top: -0.5rem;
    }
    .boxLi1 ul:nth-child(2) li{
        width:0.72rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        line-height:0.32rem;
    }
    .boxLi1 ul:nth-child(2) li span{
        width:0.72rem;
        height:0.32rem;
        font-size:0.32rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(79,191,107,1);
        line-height:0.32rem;
    }
    .rank-item-1 span:nth-child(1),
    .rank-item.show-icon:nth-child(2) span:nth-child(1) {
        width: 0.56rem;
        height: 0.68rem;
        margin-left: -0.12rem;
        display: inline-block;
    }
    .rank-item-1 span:nth-child(1) span,
    .rank-item.show-icon:nth-child(2) span:nth-child(1) span {
        background: url(../../assets/images/icon-GroupOne.png) no-repeat center ;
        background-size:100% 100%;
        position: absolute;
        top: 0.1rem;
        left: 0.07rem;
    }
    .rank-item-2 span:nth-child(1),
    .rank-item.show-icon:nth-child(3) span:nth-child(1) {
        width: 0.56rem;
        height: 0.68rem;
        margin-left: -0.12rem;
        display: inline-block;
    }
    .rank-item-2 span:nth-child(1) span,
    .rank-item.show-icon:nth-child(3) span:nth-child(1) span {
        background: url(../../assets/images/icon-GroupTrere.png) no-repeat center ;
        background-size:100% 100%;
        position: absolute;
       top: 0.1rem;
        left: 0.07rem;
    }
    .rank-item-3 span:nth-child(1),
    .rank-item.show-icon:nth-child(4) span:nth-child(1) {
        width: 0.56rem;
        height: 0.68rem;
        margin-left: -0.12rem;
        display: inline-block;
    }
    .rank-item-3 span:nth-child(1) span,
    .rank-item.show-icon:nth-child(4) span:nth-child(1) span {
        background: url(../../assets/images/icon-GroupTwo.png) no-repeat center ;
        background-size:100% 100%;
        position: absolute;
        top: 0.1rem;
        left: 0.07rem;
    }
</style>
