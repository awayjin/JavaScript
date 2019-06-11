let methods = {
  hideDetail () {
    this.detailShow = false
    this.showList = true
    this.$nextTick(() => {
      this.$appConfig.scrollTop.set(this.positionScroll)
    })
  },
  detailContent (item) {
    let pos = this.$appConfig.scrollTop.get()
    this.positionScroll = pos // 滚动位置
    window.scrollTo(0, 0)
    this.showList = false
    this.detailShow = true
    this.detail = item
  },
  // 触发激励时间
  responseEncOrigin (origin) {
    this.transformField(origin)
    this.initGetList()
  },
  transformField (value) {
    if (value === '全部') {
      this.rewardSource = 'all'
    } else if (value === '日常考核') {
      this.rewardSource = 'daily'
    } else if (value === '朴邻业务') {
      this.rewardSource = 'plin'
    } else if (value === '友邻业务') {
      this.rewardSource = 'ylin'
    }
  },
  // 触发激励时间
  responseEncDate (date) {
    this.curYearMonth = date

    if (date === -1) { // 近一年
      this.getCycleDate12()
    } else {
      // 分割年月
      // let arr = date.split('-')
      // let year = arr[0]
      // let month = arr[1]
      //
      // // 上一个月
      // let lastMonth = Number(month) - 1
      // lastMonth = lastMonth < 10 ? '0' + lastMonth : lastMonth
      // if (Number(lastMonth) === 0) {
      //   lastMonth = 12
      //   year = year - 1
      // }

      // this.startCycle = date + '-20' // start date
      // this.endCycle = year + '-' + lastMonth + '-21' // end date

      let arr = date.split('-')
      let year = arr[0]
      let month = arr[1]
      let day = new Date(year, month, 0).getDate()
      this.startCycle = date + '-01' // start date
      this.endCycle = date + '-' + day // end date
    }
    this.initGetList()
  },
  // 初始化加载数据
  initGetList () {
    window.scrollTo(0, 0)
    this.list = []
    this.pageNum = 1
    this.isTheLastPage = false
    this.loadMore()
    this.getIncomeExp()
  },
  // 加载更多-总经理列表
  loadMore () {
    if (this.isTheLastPage) return
    this.getList()
  },
  // 近一年
  getCycleDate12 () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    // let month = date.getMonth()
    month = month <= 10 ? '0' + month : month // month
    let day = date.getDate()
    day = day < 10 ? '0' + day : day // month
    let start = year + '-' + month + '-' + day // 20
    let end = (year - 1) + '-' + month + '-01' // 21
    this.startCycle = start
    this.endCycle = end
  },
  // 请求收入支出
  getIncomeExp () {
    let vm = this
    let params = JSON.stringify({
      examCycleToDate: vm.startCycle, // 考核周期开始时间
      examCycleFromDate: vm.endCycle, // 考核周期结束时间
      rewardSource: vm.rewardSource, // 激励来源
      staffIdentityId: vm.staffIdentityId || '' // 人员身份证号
    })
    const url = vm.$appConfig.api.apiIncomeExp()
    // vm.$axios.post(url, params)
    vm.$axios.get(url, params)
      .then(data => {
        let result = data.data.result.property
        if (data.status === 200 && result) {
          vm.incomeTotal = result.incomeTotal // 收入
          vm.spendingTotal = result.spendingTotal // 支出
        } else {
          vm.incomeTotal = '-'
          vm.spendingTotal = '-'
        }
      })
      // .catch(err => {
      //   console.error('Income:' + err)
      // })
  },
  // 获取数据
  getList () {
    const vm = this
    vm.isBusy = true
    let params = JSON.stringify({
      examCycleToDate: vm.startCycle, // 考核周期开始时间
      examCycleFromDate: vm.endCycle, // 考核周期结束时间
      rewardSource: vm.rewardSource, // 激励来源
      // staffIdentityId: vm.staffIdentityId || 'Wpnz0wtYkZz85VN1z10KxjqQ4LA7NU', // 人员身份证号
      staffIdentityId: vm.staffIdentityId || '', // 人员身份证号
      page: vm.pageNum, // 当前页
      pageSize: vm.pageSize // 每页数
    })
    const url = vm.$appConfig.api.apiAccountList(params)
    // console.log('params:', params)
    // vm.$axios.post(url, params).then(data => {
    vm.$axios.get(url).then(data => {
      vm.isBusy = false
      vm.pageNum++
      if (data.status === 200) {
        let result = data.data.result
        // vm.list = result.list
        if (result && result.list) {
          vm.list = [...vm.list, ...result.list]
        }
        // 最后一页
        if (result.list.length < vm.pageSize) {
          vm.isTheLastPage = true
        }
      }
    }, error => {
      vm.loadingMain = false
      console.error('error::', error)
    })
  }
}

export default methods
