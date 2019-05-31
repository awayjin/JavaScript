<template>
    <div>
        <app-header :title='title' :rightObj="rightObj" :listFinish="finish"></app-header>
        <div class="audit-hader">
            <test-content :errId="errId" :questionCode="questionCode"></test-content>
        </div>
    </div>
</template>
<script>
import AppHeader from "@/components/appHeader/AppHeader";//头部组件引入
import TestContent from "@/components/testContent/TestContent";//试题内容和报错及审批记录组件引入
export default {
    data(){
        return{
            title:'错题详情',

            errId: '',
            questionCode: '',
            detail: null,
            rightObj: {
                idMore: false,
                icon:''
            }
        }
    },
    components : {
        AppHeader,
        TestContent
    },
    created() {
        let query = this.$route.query;
        // console.log(query);
        this.errId = query.id;
        this.questionCode = query.code;
    },
    mounted() {

    },
    // beforeRouteLeave (to, from, next) {
        // if (to.name == 'ViewMaintenanceRecord' || to.name == 'ExpertReview') {
        //     to.meta.keepAlive = true;
        // }else {
        //     to.meta.keepAlive = false;
        // }
        // next();
    // },
    methods: {
        getErrorHistoryDetail(id) {
            let self = this;
            request.getErrorHistoryDetail(id).then((data) => {
                // console.log(data);
                let detail = data[0];
                detail.oldContent = JSON.parse(detail.oldContent.replace(/\t+/g, ''));
                self.detail = detail;
                // console.log(self.detail);
            });
        },
        finish(){},
    }
}
</script>
<style scoped>
    .audit-hader{
        padding-top: 1rem;
    }
    #app-header-content{
        border-bottom: none !important;
    }
</style>
