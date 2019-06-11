<style lang="scss" >
  /*@import "../scss/account-list";*/
</style>

<template>
  <div class="account-header">
    <div class="account-fixed">
      <div class="account-row account-choose" @click="togglePeriod"
           :class="{ 'account-choose-cur': descEncTime == '激励时间' ? false : true }" >
        {{ descEncTime }} <span class="arrow" :class="{ 'arrow-current': periodShow }"></span>
      </div>
      <div class="account-row account-choose" @click="toggleOrigin"
           :class="{ 'account-choose-cur': descEncOrigin == '激励来源' ? false : true }" >
        {{ descEncOrigin }} <span class="arrow" :class="{ 'arrow-current': encourageShow }"></span>
      </div>
      <div class="account-count">
        收入：¥ {{ incomeTotal }} &nbsp;&nbsp; 扣减：¥ {{ spendingTotal }}
      </div>
    </div>

    <!-- 激励时间 Begin -->
    <div class="account-period-content hide"
         @click="togglePeriod"
         :class="{ show: periodShow }">
      <ul>
        <li @click="choseMonth(-1, $event)" :class="{ current: -1 === pickedYearMonth }">近一年</li>
        <li
          v-for="(item, index ) in recentlyMonth12"
          @click="choseMonth(item, $event)"
          :class="{ current: item === pickedYearMonth }"
          :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 激励时间 End -->

    <!-- encourageShow Begin -->
    <div class="account-period-content account-content-origin hide"
         @click="toggleOrigin"
         :class="{ show: encourageShow }">
      <ul>
        <li v-for="(item, index) in listEncOrigin"
            @click="choseOrigin(item, $event)"
            :class="{ current: item === pickedEncOrigin }"
            :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- encourageShow End -->

  </div>
</template>

<script>
// const LIST_ENV_ORIGIN = [
//   {
//     code: 'all',
//     codeName: '全部'
//   },
//   {
//     code: 'daily',
//     codeName: '日常考核'
//   },
//   {
//     code: 'plin',
//     codeName: '朴邻业务'
//   },
//   {
//     code: 'ylin',
//     codeName: '友邻业务'
//   }
// ]
export default {
  name: 'account-header',
  props: {
    incomeTotal: [String, Number],
    spendingTotal: [String, Number]
  },
  data () {
    return {
      periodShow: false,
      encourageShow: false,
      descEncTime: '激励时间', // a text option
      descEncOrigin: '激励来源', // a text option
      // listEncOrigin: LIST_ENV_ORIGIN,
      listEncOrigin: ['全部', '日常考核', '朴邻业务', '友邻业务'],
      pickedYearMonth: -1, // 选中的年月, -1默认是 '近一年'
      pickedEncOrigin: '全部', // 选中的激励来源,默认是 '全部'
      recentlyMonth12: []
    }
  },
  mounted () {
    this.getOneYear()
  },
  methods: {
    togglePeriod () {
      this.periodShow = !this.periodShow
      this.hideEncourage()
    },
    toggleOrigin  () {
      this.encourageShow = !this.encourageShow
      this.hidePeriod()
    },
    // hide
    hidePeriod () {
      this.periodShow = false
    },
    // hide
    hideEncourage () {
      this.encourageShow = false
    },
    // 激励时间-选择月份
    choseMonth (item, e) {
      e.stopPropagation()
      this.pickedYearMonth = item
      this.hidePeriod()
      this.hideEncourage()
      this.descEncTime = item === -1 ? '近一年' : item
      // console.log('item:', item)
      this.$emit('emit-enc-date', item)
    },
    // 选择激励来源
    choseOrigin (item, e) {
      this.pickedEncOrigin = item
      this.descEncOrigin = item
      this.$emit('emit-enc-origin', item)
    },
    // 最近一年
    getOneYear () {
      let dataArr = []
      let date = new Date()
      let month = date.getMonth() + 1
      date.setMonth(month, 1) // 获取到当前月份,设置月份
      for (let i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() - 1) // 每次循环一次 月份值减1
        let m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        dataArr.push(date.getFullYear() + '-' + m)
      }
      this.recentlyMonth12 = dataArr
    }
  }
}
</script>
