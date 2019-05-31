import Vue from 'vue'
import Router from 'vue-router'
import { isError } from 'util';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      redirect : '/Home',
    },
    // {
    //   path : "/Notice",
    //   name : "Notice",//公告页
    //   component: () =>
    //     import ('@/views/Notice')
    // },
    {
      path : "/Home",
      name : 'Home',//首页
      // meta: {
      //   isUseCache: false,
      //   keepAlive: true
      // },
      component : () =>
        import ('@/views/Home')
    },
    {
      path : "/user/examList",//首页点更多出现的  考试列表
      name: "ExamList",
      component: () =>
        import ('@/views/user/ExamList')
    },
    {
      path : "/user/examRecord", //考试记录
      name: "ExamRecord",
      // meta: {
      //   keepAlive: true
      // },
      component: () =>
         import('@/views/user/ExamRecord')
    },
    {
      path : "/user/Rank",//认证排名
      name: "Rank",
      component: () =>
        import('@/views/user/Rank')
    },
    {
      path : "/user/cheat",//作弊举报
      name: "cheat",
      component: () =>
        import('@/views/user/cheat')
    },
    { path : "/reportError",
      name : "ReportError",
      component : () =>
        import('@/views/questionBanks/ReportError')
    },
    { path : "/successfully",//报错成功后跳转的该题库的安全专家
      name : "successfully",
      component: () =>
        import('@/views/questionBanks/Successfully')
    },
    { path : "/maintenanceRecord",  //题库里面 维护记录页面
      name : "MaintenanceRecord",
      component: () =>
        import('@/views/questionBanks/MaintenanceRecord')
    },
    { path : "/ownerList",  //题库里面 维护记录页面
      name : "OwnerList",
      component: () =>
        import('@/views/questionBanks/ownerList')
    },
    { path : "/questionbank", //试题报错页面，和春元确定一下，这个路由是否还在用。
      name : "QuestionBank",
      component: () =>
        import('@/views/questionBanks/QuestionBank')
    },
    { path : "/proclamation" ,//审核专家公示
      name : "Proclamation",
      component : () =>
        import('@/views/questionBanks/Proclamation')
    },
    {
      path : "/QuestionBankPage",//题库的答题模式和背题模式页面
      name : "QuestionBankPage",
      component : () =>
        import('@/components/questionsBankModule/QuestionBankPage')
    },
    {
      path : "/user/CertificationExam",//初级安全专业经理认证考试
      name : "CertificationExam",
      component : () =>
        import('@/views/user/CertificationExam')
    },
    {
      path : "/user/ExaminationRules",//全部考试规则
      name : "ExaminationRules",
      component : () =>
        import('@/views/user/ExaminationRules')
    },
    {
      path : "/user/ExpertReview",
      name : "ExpertReview",//专家审核
      // meta: {
      //   isUseCache: false,
      //   keepAlive: true
      // },
      component : () =>
        import('@/views/user/ExpertReview')
    },
    {
      path : "/user/WrongTitle",//错题详情->待审核页面
      name : "WrongTitle",
      component : () =>
        import('@/views/user/WrongTitle')
    },
    {
      path : "/user/WrongTitledetails",
      name : "WrongTitledetails", //错题详情->已审核页面
      component : () =>
        import('@/views/user/WrongTitledetails')
    },
    {
      path : "/user/WrongQuestion",
      name : "WrongQuestion",//专家提交题目错误
      component : () =>
        import('@/views/user/WrongQuestion')
    },
    {
      path : "/user/ToPointsDetails",
      name : "ToPointsDetails",//积分明细
      component : () =>
        import('@/views/user/ToPointsDetails')
    },
    {
      path : "/user/ViewMaintenanceRecord",
      name : "ViewMaintenanceRecord",//维护记录---普通员工
      meta: {
        keepAlive: true
      },
      component : () =>
         import('@/views/user/ViewMaintenanceRecord')
    },
    {
      name: "ExpertEdit",// 专家编辑
      path: "/user/ExpertEdit",
      component: () =>
      import('@/views/user/ExpertEdit')
    },
    {
      path : "/user/ExpertRecheck",
      name : "ExpertRecheck", //专家复审
      component :  () =>
        import('@/views/user/ExpertRecheck')
    },
    {
      path : "/user/Badge",
      name : "Badge",//徽章
      component : () =>
        import('@/views/user/Badge')
    },
    {
      path : "/EmployeeExamination",
      name : "EmployeeExamination",//考试
      component : () =>
        import('@/views/examinationModule/EmployeeExamination')
    },
    {
      path : "/user/RelegationExam",//保级考试规则
      name : "RelegationExam",
      component : () =>
         import('@/views/user/RelegationExam')
    },
     {
      path : "/testScore",
      name : "testScore",//交卷
      component : () =>
        import('@/views/examinationRecord/testScore')
    },
    {
      path : "/WrongQuestionView",//考试完成后的错题查看
      name : "WrongQuestionView",
      component : () =>
        import('@/views/examinationModule/WrongQuestionView')
    },
    {
      path : '/404',//404页面
      component : () =>
        import('@/views/errorPages/404')
    },
    {
      path : '/500',//500页面
      component : () =>
        import('@/views/errorPages/500')
    },
    {
      path : "*",
      redirect: "/404",
      hidden: true
    }
  ],
  scrollBehavior (to, from, savedPosition) {//记录返回位置
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
// const reloadInterceptor = (to, from) => {
//     if(from.name == 'home' && to.name == 'ViewMaintenanceRecord') {
//       let isReFresh = localStorage.getItem('isRefresh');
//       if(isReFresh == 0) {
//         localStorage.setItem('isRefresh',null);
//         window.location.reload();
//       }else {
//         localStorage.setItem('isRefresh',0)
//       }
//     }else if(from.name == 'ViewMaintenanceRecord' && to.name == 'home') {
//       localStorage.setItem('isRefresh',0)
//     }
// }
