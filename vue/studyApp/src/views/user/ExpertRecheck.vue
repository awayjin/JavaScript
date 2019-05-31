<template>
    <div>
        <app-header :title='title' :rightObj="rightObj" :listFinish="finish"></app-header>
        <div class="audit-hader">
            <test-content :errId="errId" :questionCode="questionCode" :nextFlag="nextFlag" :questionId="questionId">
            </test-content>
        </div>
    </div>
</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引用
import TestContent from "@/components/testContent/TestContent";//错题详情下面的试题内容和报错和审批记录的组件引入
import passContent from "@/utils/passContent";
import { MessageBox, Toast } from 'mint-ui';//Toast MessageBox弹窗组件引用

export default {
    data(){
        return{
            title:'错题详情',

            errId: '',
            questionCode: '',
            nextFlag: '', // 2 复审，其它 初审
            questionId: '',
            detail: null,
            rightObj:{
                isMore:false,
                title:'',
                icon:'&#xe64d'
            }
        }
    },
    components : {
        AppHeader,
        TestContent
    },
    created() {
        let query = this.$route.query;
        //console.log(query);
        this.errId = query.id;
        this.questionCode = query.code;
        this.nextFlag = query.nextFlag;
        this.questionId = query.qid;
    },
    mounted() {

    },
    // beforeRouteLeave (to, from, next) {
      // if (to.name == 'ExpertReview') {
      //   this.$route.meta.isUseCache = true
      // }
      // next();
    // },
    methods: {
        getErrorHistoryDetail(id) {
            let self = this;
            request.getErrorHistoryDetail(id).then((data) => {
                //console.log(data);
                let detail = data[0];
               // detail.oldContent = JSON.parse(detail.oldContent.replace(/\t+/g, ''));
               //专家复审对于反斜杆的处理
                 detail.oldContent = passContent.passContent(detail.oldContent);
                let oldContent = JSON.parse(detail.oldContent);
                for(let i = 0; i < oldContent.choiceList.length; i++){
                    if(oldContent.choiceList[i].value && oldContent.choiceList[i].value.indexOf("&##") != -1 ){
                        oldContent.choiceList[i].value =oldContent.choiceList[i].value.replace(/&##/g, '\\');
                    }
                }
                self.detail = detail;
                //console.log(self.detail);
            });
        },
        recheckFail() {

        },
        recheckOK() {

        },
        finish(){},
    }
}
</script>
<style scoped>
    .audit-hader{
        padding-top: 1rem;
        height: 100%;
       /* padding-bottom: 1rem; */
    }

    .WrongTitle-btn{
        padding: 1.56rem 0.24rem 0rem 0.24rem;
        display: flex;
        align-items:center;
        justify-content:space-between;
    }
    #app-header-content{
        border-bottom: none !important;
    }
</style>
