<template>
    <div class="refer-box">
       <div class="refer-conter">
           <div class="refer-add">
               <div class="refer-imges-box">
                    <img src="../../assets/images/icon-cheat-refer.png" alt="" class="refer-imges"><span class="refer-text">提交成功</span> 
               </div>
                <p class="need-text" v-if="message">{{message}}</p>
           </div>
       </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['message'] // 2名专家复核通过后，将更新题库
}
</script>
<style scoped>
    .refer-box{
        /* width: 100%;
        height: 100%; */
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        background:rgba(0,0,0,0.3);
        opacity: 1;
       
    }
    .refer-box::before{
        content: '';
        background:rgba(0,0,0,0.3);
        filter: blur(0.5rem);
    }
    .refer-conter{
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
        position:fixed;
        top: 50%;
        margin-top: -0.9rem;
        padding: 0 0.96rem;
    }
    .refer-imges{
        width: 0.4rem;
        height: 0.4rem;
    }
    .refer-text{
        font-size:0.32rem;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.32rem;
        margin-left: 0.12rem;
    }
    .refer-add{
        
       background: #ffffff;
       padding: 0.5rem 1rem;
       border-radius: 0.16rem;
       z-index: 300;
       
    }
    .refer-imges-box{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .need-text{
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.34rem;
        margin-top: 0.16rem;
    }
</style>
