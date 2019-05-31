import service from './axios'
import { get } from 'http';
//题目
class requestMethodsClass {
  /// 获取题库试题： fieldId batchNo questionType isNext page
  questionBank(query) {
    return service({
        url : '/bank/tkQuestion/getQuestionList',
        method : 'get',
        params : query
    })
  }

  //对错统计
  errorStatistics(fieldId,questionType) {
    return service({
        url : `/bank/tkBatch/currentBatchStatistics/${fieldId}`,
        method : 'get',
        params : {}
    })
  }
  //题型选择 【已废】
  typeSelection(fieldId,questionType) {
    return service({
        url : `/bank/tkBatch/selectPattern/${fieldId}/${questionType}`,
        method : 'post',
        params : {}
    })
  }
  //专家提醒
  expertReminds() {
    return service({
      url : `/bank/tkErrorReport/unauditedCount`,
      method : 'get',
      params : {}
    })
  }
  //选择答案
  ChooseTtheAnswer(query) {
    return service({
        url : `/bank/tkUserQuestionType/questionPersistenceByUserId`,
        method : 'post',
        params : query
    })
  }
  //试题报错
  chooseTtheAnswer(query) {
    return service({
        url : `/bank/tkErrorReport`,
        method : 'post',
        data : query
    })
  }
  //专家公示
  expertPublicity(query) {
    return service({
        url : `/bank/tkExpert/All/${query}`,
        method : 'get',
        params : {}
    })
  }
  //维护记录/tkErrorReport/queryRecode
  maintenanceRecord(query) {
    return service({
        url : `/bank/tkErrorReport/queryErrRecord?questionCode=${query.questionCode}`,
        method : 'get',
        data : {}
    })
  }
  //维护记录 --首页
  ViewmaintenanceRecord(query) {
    return service({
        url : `/bank/tkErrorReport/queryRecode/All`,
        method : 'get',
        data : {}
    })
  }
  //试题状态
  getTestStatus(query) {
    return service({
        url : `/bank/tkErrorReport/queryRecode/queryErrorState/${query}`,
        method : 'get',
        data : {}
    })
  }
  // 获取题库列表singleList
  getTkList(query) {
    return service({
        url : `/bank/tkField/normalFields`,
        method : 'get',
        params : query
    })
  }

  //选择答案-题库
  chooseTheAnswer (query) {
    return service({
        url : `/bank/tkUserQuestion/questionPersistence`,
        method : 'post',
        data : query
    })
  }

  //考试
  examinationQuestions (query) {
    return service({
        url : `/exam/examRestructure/examRestructureBtn`,
        method : 'post',
        data : query,
        headers: {
          'Content-Type': 'application/json'
        }
    })
  }
  //获取题目
  getTheTitleURL (userPaperId,limit,page) {
    return service({
        url : `/exam/examTopic/getExamTopic?userPaperId=${userPaperId}&limit=${limit}&page=${page}`,
        method : 'get',
        params : {}
    })
  }
  //用户答题数据持久化
  examTopicPersistenceURL (query) {
    return service({
        url : `/exam/examTopic/examTopicPersistence`,
        method : 'put',
        data : query
    })
  }

  //交卷
  examTopicCompleteURL (query) {
    return service({
        url : `/exam/examTopic/examTopicCompleteNew`,
        method : 'put',
        data : query
    })
  }

  // 获取个人信息
  getUserInfo(query) {
    return service({
        url : `/exam/syncUser/queryUserinfo`,
        method : 'get',
        params : query
    })
  }

  // 获取积分信息
  getPointInfo(query) {
    return service({
      url: `/exam/syncUser/queryGrade`,
      method: 'get',
      params: query
    })
  }

  // 获取考试列表 {page: 1, limit: 4}
  getExamList(page, limit) {
    return service({
      url: `/exam/syncUser/paperPage`,
      method: 'get',
      params: {
        page: page,
        limit: limit
      }
    })
  }
  //考试试卷申请
  getExamApply(query) {
    return service({
      url: `/exam/syncUser/examApply`,
      method: 'get',
      params: query
    })
  }
  // 获取认证排名
  getRankList(query) {
    return service({
      url: `/exam/syncUser/authentication`,
      method: 'post',
      data: query
    })
  }

  // 获取考试历史记录
  getHistoryExamList(query) {
    return service({
      url: `/exam/syncUser/queryExamRecordAll`,
      method: 'get',
      data: query
    })
  }
   //考试记录详情
   getExamHistoryDetails (query) {
    return service({
      url: `/exam/examTopic/topicItem/${query}`,
      method: 'get'
    });
  }

  // 获取积分详情 {apply_id: 报考id}
  getPointDetail(query) {
    return service({
      url: `/exam/syncUser/integralDetails/${query}`,
      method: 'get',
      // params: query
    })
  }

  // 待审核列表
  getToAuditList(page, limit) {
    return service({
      url: `/bank/tkErrorReport/page`,
      method: 'get',
      params: {
        type: 1,
        page: page,
        limit: limit
      }
    })
  }

  // 已审核列表
  getAuditedList(page, limit) {
    return service({
      url: `/bank/tkErrorReport/page`,
      method: 'get',
      params: {
        type: 2,
        page: page,
        limit: limit
      }
    })
  }

  // 历史报错详情 首页
  getErrorHistoryDetail(id) {
    return service({
      url: `/bank/tkErrorReport/queryRecode/queryRecordParticulars/${id}`,
      method: 'get'
    })
  }

  // 专家编辑
  submitExpertEdit(params) {
    return service({
      url: `/bank/tkErrAudit`,
      method: 'post',
      data: params
    })
  }

  // 错题维护记录
  getErrorHistoryList(params) {
    return service({
      url: `/bank/tkErrorReport/queryRecode`,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  // 作弊举报
  reportCheat(params) {
    return service({
      url: `/exam/examCheat`,
      method: 'post',
      data: params
    })
  }

  // 查看奖章信息
  badgeCheck(query) {
    return service({
      url: `/exam/examMedal/checkMedalExist`,
      method: 'get',
      params: query,
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
  }
  // 获取奖章信息
  badgeList(query) {
    return service({
      url: `/exam/examMedal/getExamMedalList`,
      method: 'get',
      params: query,
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
  }
  // 获取该批次做题统计
  getBatchStat(batchNo, fieldId) {
    return service({
      url: `/bank/tkUserQuestion/completeCurrentBatchStatistics/${fieldId}/${batchNo}`,
      method: 'get'
    });
  }
  //错题查看
  wrongSee(query) {
    return service({
      url: `/exam/examTopic/getExamTopicError`,
      method: 'get',
      params: query
    })
  }

  // 判断用户是否为该题库的专家
  isExpert(fieldId) {
    return service({
      url: `/bank/tkExpert/getTkExpertByIdentityIdAndFieldId?fieldId=${fieldId}`,
      method: 'get'
    });
  }

  // 获取题库试题（根据偏移量）
  getTkQuestions(query) { // startIndex=10&subLength=2
    return service({
      url: `/bank/tkQuestion/selectTkQuestionSubList`,
      method: 'get',
      params: query
    })
  }

  // 考试记录
  getExamHistory() {
    return service({
      url: `/bank/syncUser/queryExamRecordAll/`,
      method: 'get'
    });
  }
  //题型选择【new】
  selectionQuestionType(fieldId,questionType) {
    return service({
        url : `/bank/tkBatch/selectQuestionType/${fieldId}/${questionType}`,
        method : 'get',
        params : {}
    })
  }

  //试题操作日志接口 跟PC端的一样
  getQuestionLog(questionId) {
    return service({
      url: `/bank/tkQuestion/logList/${questionId}`,
      method: 'get'
    });
  }

  //检查token是否有效
  checkToken(token) {
    return service({
      url: `/api/app/check?token=${token}`,
      method: 'get'
    })
  }

  // 分页获取维护记录【首页】
  getMantenanceRecordByPage(query) {
    return service({
      url: `/bank/tkErrorReport/queryRecode/page?page=${query.page}&limit=${query.limit}&fieldId=${query.fieldId}`,
      method: 'get',
      data: {}
    });
  }
  //获取专家已审核与待审核记录
  queryReportAllPage(query){
    return service({
      url: `/bank/tkErrorReport/allPage?page=${query.page}&limit=${query.limit}&keyword=${query.keyword}`,
      method: 'get',
      params: {}
    })
  }
  // 分页获取题库
  getTkListByPage(page, limit) {
    return service({
      url: `/bank/tkField/page?page=${page}&limit=${limit}`,
      method: 'get'
    });
  }
  //试题责任人列表
  getquestionOwner(questionId){
    return service({
      url: `/bank/tkErrorReport/responsible?questionId=${questionId}`,
      method: 'GET'
    })
  }
}
const requestMethods = new requestMethodsClass();
export default requestMethods;
