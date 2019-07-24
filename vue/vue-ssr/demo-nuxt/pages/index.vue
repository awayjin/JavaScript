<style lang="scss">
  @import '../assets/scss/vars.scss';
  @import '../assets/scss/layout.scss';
  @import '../assets/scss/account-list.scss';
  .page-content {
    margin-top: 4.4rem;
  }
</style>

<template>
  <div class="home account-wrap">
    <PageHeader
      :title="'我的账单'"
      :left-icon="'left-arrow'"
      :left-click-event="true"
      :right-icon="'right-list-qa'"
      @page-header-right-click="goToQA"
    />

    <AccountHeader
      :income-total="incomeTotal"
      :spending-total="spendingTotal"
      @emit-enc-date="responseEncDate"
      @emit-enc-origin="responseEncOrigin"
    />
  </div>
</template>

<script>
import PageHeader from '../components/page-header'
import AccountHeader from '../components/account-header'

export default {
  components: {
    PageHeader,
    AccountHeader
  },
  data () {
    return {
      incomeTotal: 2,
      spendingTotal: 2
    }
  },
  async asyncData (context) {
    let incomeTotal = 5
    // const vm = context
    const params = JSON.stringify({
      examCycleToDate: '2019-07-24', // 考核周期开始时间
      examCycleFromDate: '2018-07-01', // 考核周期结束时间
      rewardSource: 'all', // 激励来源
      staffIdentityId: '', // 人员身份证号
      page: 1, // 当前页
      pageSize: 20 // 每页数
    })
    // const url = vm.$appConfig.api.apiAccountList(params)
    const url = 'https://fancy-test.4009515151.com/capricom/billInfo/getBillInfoList'
    // const url = 'capricom/billInfo/getBillInfoList'
    // console.log('params:', params)
    await context.$axios.post(url, params).then((data) => {
      if (data.status === 200) {
        const result = data.data.result
        incomeTotal = 15.5 + '服务端请求'
        console.log('服务端请求', result)
      }
    }, (error) => {
      console.error('error::', error)
    })
    return {
      spendingTotal: 4.4,
      incomeTotal: incomeTotal
    }
  },
  // created 服务端渲染
  created () {
    console.log('created')
    // console.log(this.$axios)
    const vm = this
    const params = JSON.stringify({
      examCycleToDate: '2019-07-24', // 考核周期开始时间
      examCycleFromDate: '2018-07-01', // 考核周期结束时间
      rewardSource: 'all', // 激励来源
      staffIdentityId: '', // 人员身份证号
      page: 1, // 当前页
      pageSize: 20 // 每页数
    })
    const url = 'https://fancy-test.4009515151.com/capricom/billInfo/getBillInfoList'
    vm.$axios.post(url, params).then((data) => {
      if (data.status === 200) {
        const result = data.data.result
        // vm.incomeTotal = 5.5
        console.log('客户端请求', result)
      }
    }, (error) => {
      console.error('error::', error)
    })
  },
  methods: {
    goToQA () {
      window.console.log('goToQA')
    },
    responseEncDate () {
      window.console.log('responseEncDate')
    },
    responseEncOrigin () {
      window.console.log('responseEncOrigin')
    }
  }
}
</script>
