<template>
    <div>
        <div class="box" @click="hideMe" @touchstart="tstart" @touchend="tend">
           <div class="box-center">
               <div class="box-gesture"><span>上一题</span><span>下一题</span></div>
               <div class="box-img"><img src="../../assets/images/icon-left.png" alt="" ><img src="../../assets/images/icon-right.png" alt=""></div>
               <div class="box-big-gesture"><img src="../../assets/images/icon-gesture.png" alt="" ></div>
           </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            lastPageX: 0,
            lastPageY: 0
        }
    },
    methods: {
        hideMe() {
            setTimeout(() => {
                this.$parent.$data.showPrompt = false;
            }, 500);
        },
        tstart(e) {
            //console.log(e);
            let t = e.touches[0];
            this.lastPageX = t.pageX;
            this.lastPageY = t.pageY;
        },
        tend(e) {
            //console.log(e);
            let t = e.changedTouches[0];
            if (Math.abs(t.pageX - this.lastPageX) > 80) {
                this.hideMe();
            }
        }
    }
}
</script>
<style scoped>

    html,body{
        height:100%;
        width:100%; 
        overflow:hidden; 
        margin:0;
        padding:0;}
/* style="" */
    .box{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
    }
    .box-center{
        /* padding: 3.26rem 0.4rem 0rem 0.4rem; */
        /* width: 100%; */
        /* height: 100%; */
         min-height: 10.1rem;
        padding-left: 0.4rem;
        padding-right: 0.4rem;
        padding-top: 3.26rem;
    }
    .box-gesture{
        display: flex;
        justify-content:space-between;
    }
    .box-gesture span{
        font-size:0.36rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:0.56rem;
    }
    .box-img{
        display: flex;
        justify-content:space-between;
        margin-top: 0.24rem;
    }
    .box-img img{
        width:1.8rem;
        height:0.4rem
    }
    .box-big-gesture{
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .box-big-gesture img{
       width: 1.8rem;
       height: 2.16rem;
    }
</style>
