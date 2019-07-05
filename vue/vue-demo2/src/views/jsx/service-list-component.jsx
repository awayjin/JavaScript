export default {
  name: 'service-list-component',
  mounted () {
    this.getList() // list
  },
  data () {
    return {
      index: 0,
      list: [], // list
      pageNum: 1, // 当前页
      pageSize: 15, // 每页显示的数量
      isBusy: false, // 是否处于加载中
      isTheLastPage: false // 最后一页
    }
  },
  render () {
    return (
      <ul class="list-items"
        vInfiniteScroll={ this.loadMore }
        infinite-scroll-distance="30"
        infinite-scroll-disabled={ this.isBusy }
        infinite-scroll-immediate-check="true">
        {
          this.list.map((item, index) => {
            return <li onClick={ this.goToDetail }>
              <span class="list-img"><img src={ item.avatarUrl } alt=""/></span>
              <div class="list-describe">
                <div class="list-desc-title">{ item.applicationTitle }</div>
                <div class="list-sure-person">
                  确认人：
                  <span>
                    { item.confirmPeople.map((sub, subIndex) => {
                      return sub.employeeName + (item.confirmPeople.length === (subIndex + 1) ? '' : '、')
                    })}
                  </span>
                </div>
                <div class="list-apply-time">申请时间：{ item.startTime }</div>
              </div>
              <span class="list-status" >
                { this.transformStatus(item.status) }
              </span>
            </li>
          })
        }
        {
          <li class="list-load-all">
            <div class={{ 'loading-wrap': true, hide: this.isBusy }}>
              <span class="loading"></span>加载中...
            </div>

            <div class={{ 'loading-wrap hide': true, show: (this.list.length !== 0 && this.isTheLastPage) }}>
              <span v-show="isTheLastPage">已加载全部数据</span>
            </div>
          </li>
        }
      </ul>
    )
  },
  methods: {
    // 状态转换
    transformStatus (status) {
      let value
      if (status === 1) {
        value = '待确认'
      } else if (status === 2) {
        value = '确认中'
      } else if (status === 3) {
        value = '已确认'
      } else if (status === 4) {
        value = '已驳回'
      }
      return value
    },
    goToDetail () {
      this.$router.push('scope-service-apply')
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
    loadMore () {
      if (this.isTheLastPage) return
      this.getList()
    },
    // 获取数据
    getList () {
      const vm = this
      vm.isBusy = true
      let params = JSON.stringify({
        // staffIdentityId: vm.staffIdentityId || 'Wpnz0wtYkZz85VN1z10KxjqQ4LA7NU', // 人员身份证号
        staffIdentityId: vm.staffIdentityId || '', // 人员身份证号
        page: vm.pageNum, // 当前页
        pageSize: vm.pageSize // 每页数
      })
      const url = vm.$appConfig.api.apiListRecord(params)
      console.log('params 3:', params)
      // vm.$axios.post(url, params).then(data => {
      vm.$axios.get(url).then(data => {
        vm.isBusy = false
        vm.pageNum++
        if (data.status === 200) {
          let result = data.data.result
          // vm.list = result.list
          if (result && result.applyrecords) {
            vm.list = [...vm.list, ...result.applyrecords]
          }
          console.log('result.applyrecords.length:', result.applyrecords.length)
          // 最后一页
          if (result.applyrecords.length < vm.pageSize) {
            vm.isTheLastPage = true
          }
        }
      }, error => {
        vm.loadingMain = false
        console.error('error::', error)
      })
    }
  }
}
