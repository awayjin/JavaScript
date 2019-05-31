<template>
    <div class="refer-box">
       <div class="refer-conter">
           <div class="refer-add"><img src="../../assets/images/icon-cheat-refer.png" alt="" class="refer-imges"><span class="refer-text">复核成功</span></div>
       </div>
    </div>
</template>
<script>
export default {
    
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
        z-index: 8888;
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
        margin-top: 4.4rem;
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
        z-index: 120;
    }
    .refer-add{
        display: flex;
        align-items: center;
        justify-content: center;
       background: #ffffff;
       padding: 0.56rem 1.9rem;
       border-radius: 0.16rem;
       /* z-index: 300; */
       
    }
</style>
