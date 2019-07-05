export default {
  name: 'service-scope-header',
  data  () {
    return {
      current: 0,
      // 列表项
      list: [
        {
          id: 0,
          desc: '申请记录'
        },
        {
          id: 1,
          desc: '待处理'
        },
        {
          id: 2,
          desc: '已处理'
        }
      ]
    }
  },
  props: ['toggleTabEvent'],
  render () {
    return (
      <div class="list-tab">
        { this.list.map((item, index) => {
          return <div
            class={{ 'list-tab-row': true, 'current': this.current === index }}
            onClick={ this.toggleTab.bind(this, index) }>
            申请记录
          </div>
        }) }
      </div>
    )
  },
  methods: {
    // 切换 Tab
    toggleTab (value) {
      if (this.current === value) return
      this.current = value // current
      this.toggleTabEvent(value) // 触发父组件方法
    }
  }
}
