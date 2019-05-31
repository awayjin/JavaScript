<template>
    <div>
        <app-header :title='title'></app-header>
        <div class="audit-hader">
        </div>
        <div class="WrongTitle-btn">
            <mt-button type="default" style="border-radius: 0.5rem;width:3rem" @click="ReviewFailed" class="Wrong-btn-l">复核不通过</mt-button>
            <mt-button type="primary" @click="SubjectModification" style="border-radius: 0.5rem;width:3rem" class="Wrong-btn-r">复核通过</mt-button>
        </div>
    </div>
</template>
<script>
import { Button } from 'mint-ui';//mint-ui组件按钮引入
import { MessageBox } from 'mint-ui';//mint-ui 弹窗组件引用
import AppHeader from "@/components/appHeader/AppHeader"; //头部组件引入
export default {
    data(){
        return{
            title:'错题详情',
        }
    },
    methods:{
        ReviewFailed(){
            const textarea =  `<textarea placeholder="说点什么" rows="6" cols="38" style="outline: none;border:none"></textarea> ` 
           MessageBox({
                title:'',
                message: textarea,
                confirmButtonText:"提交",
                showCancelButton: false
            });
        },
        SubjectModification(){
            MessageBox({
                title:'',
                confirmButtonText:'复核通过',
                showCancelButton: false,
                cancelButtonHighlight:true,
            });
        }
    },
    components : {
        AppHeader,
        ModifySubmission
    },
}
</script>
<style scoped>
    .audit-hader{
        padding-top: 1rem;
    }
    .WrongTitle-btn{
        padding: 0.3rem 0.24rem 0rem 0.24rem;
        display: flex;
        align-items:center;
        justify-content:space-between;
    }
    .Wrong-btn-l{
        width: 50%;
        font-size:0.34rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(68,68,68,1);
        line-height:0.34rem;
    }
    .Wrong-btn-r{
        width: 50%;
        margin-left: 0.46rem;
        background-color:  #4FBF6B;
        font-size:0.34rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:0.34rem;
    }
</style>


