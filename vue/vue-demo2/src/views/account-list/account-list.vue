<style lang="scss">
  @import "../../scss/vars";
  @import '../../scss/layout.scss';
  @import "../../scss/account-list";

  .account-wrap {
    margin-top: 1rem;
    .account-fixed, .page-header {
      position: relative;
      top: 2rem;
    }
  }
</style>

<template>
  <div class="home account-wrap">
    <PageHeader :title="'我的账单'"
                :left-icon="'left-arrow'"
                @page-header-right-click="goToQA"
                :right-icon="'right-list-qa'"  />

    <ul>
      <li>33333333</li>
      <PageHeader :title="'default-c'"></PageHeader>
    </ul>

    <AccountHeader
      :incomeTotal="incomeTotal | twoDecimal"
      :spendingTotal="spendingTotal | twoDecimal"
      @emit-enc-date="responseEncDate"
      @emit-enc-origin="responseEncOrigin" />

    <!-- account-content Begin -->
    <div class="account-content" v-if="showList">
      <ul class="account-list account-list-wrap"
          v-if="loadingMain"
          v-infinite-scroll="loadMore"
          infinite-scroll-distance="30"
          infinite-scroll-disabled="isBusy"
          infinite-scroll-immediate-check="true">
        <li class="account-list-item"
            @click="detailContent(item)"
            v-for="(item, index) in list"
            :key="index">
          <div class="account-row account-row-date">
            <span>{{ item.rewardTime.substr(5, 5) }}</span>
          </div>
          <div class="account-row">
            <div class="bold">
              <span v-if="item.rewardSource === 'all'">全部</span>
              <span v-if="item.rewardSource === 'daily'">日常考核</span>
              <span v-if="item.rewardSource === 'plin'">朴邻业务</span>
              <span v-if="item.rewardSource === 'ylin'">友邻业务</span>
            </div>
            <div class="gray">
              加分绩效
            </div>
          </div>
          <div class="account-row account-earnings">
            <span class="color color-minus color-addition" v-if="item.rewardAmount > 0">+{{ item.rewardAmount | twoDecimal }}</span>
            <span class="color color-minus" v-else>{{ item.rewardAmount | twoDecimal }}</span>
          </div>
        </li>
        <li class="list-load-all">
          <div class="loading-wrap" v-show="isBusy">
            <!--<mt-spinner type="fading-circle" color="#979797" :size="20"></mt-spinner>-->
            <span class="loading"></span>加载中...
          </div>

          <div class="loading-wrap last-none" v-show="isTheLastPage">
            <span v-show="isTheLastPage">已加载全部数据</span>
          </div>
        </li>
      </ul>
      <!-- 列表 End -->
      <ul v-else>
        <li>
          <div class="loading-wrap" >
            暂无数据.
          </div>
        </li>
      </ul>
    </div>
    <!-- account-content End -->

    <!-- 账单详情 Begin -->
    <div class="account-detail hide" :class="{ show: detailShow }">
      <PageHeader :left-main="true" @page-header-left-click="hideDetail" :left-click-event="true" :title="'账单详情'"  :left-icon="'left-arrow'"   />
      <div class="account-detail-content">
        <!-- big-area Begin -->
        <div class="big-area">
          <div>
            <div class="area-money-til">激励金额</div>
            <div class="area-money-money">
              <span class="number">{{ detail. rewardAmount }}</span>
              <span>元</span>
            </div>
          </div>
        </div>
        <!-- big-area End -->

        <ul class="account-detail-desc">
          <li>
            <span class="detail-desc-til" v-if="detail.rewardAmount < 0">扣减来源</span>
            <span class="detail-desc-til" v-else>激励来源</span>
            <span class="detail-desc-con">{{ detail.rewardSource }}</span>
          </li>
          <li>
            <span class="detail-desc-til">订单编号</span>
            <span class="detail-desc-con">{{ detail.orderNo }}</span>
          </li>
          <li>
            <span class="detail-desc-til" v-if="detail.rewardAmount < 0">扣减时间</span>
            <span class="detail-desc-til" v-else>激励时间</span>
            <span class="detail-desc-con">{{ detail.rewardTime }}</span>
          </li>
          <li>
            <span class="detail-desc-til" v-if="detail.rewardAmount < 0">扣减原因</span>
            <span class="detail-desc-til" v-else>激励原因</span>
            <span class="detail-desc-con">{{ detail.rewardReason }}</span>
          </li>
          <li>
            <span class="detail-desc-til" v-if="detail.rewardAmount < 0">扣减分配人</span>
            <span class="detail-desc-til" v-else>激励分配人</span>
            <span class="detail-desc-con">{{ detail.rewardDisPerson }}</span>
          </li>
          <li>
            <span class="detail-desc-til" >详情描述</span>
            <span class="detail-desc-con">{{ detail.rewardDetail }}</span>
          </li>
        </ul>

      </div>
    </div>
    <!-- 账单详情 End -->
  </div>
</template>

<script>
// @ is an alias to /src
import PageHeader from '../../components/page-header'
import AccountHeader from '../../components/account-header'
import Methods from './account-list-methods.js'

export default {
  name: 'home',
  components: {
    PageHeader,
    AccountHeader
  },
  filters: {
    twoDecimal (value) {
      if (Object.prototype.toString.call(value) !== '[object Number]') {
        return '-'
      }
      let dealValue = '-'
      if (value < 0) {
        dealValue = -Math.floor(Math.abs(value) * 100) / 100
      } else {
        dealValue = Math.floor(value * 100) / 100
      }
      // return Math.floor(value * 100) / 100
      return dealValue
    }
  },
  data () {
    return {
      showList: true, // showList
      detailShow: false,
      loadingMain: true,
      staffIdentityId: '', // UID
      positionScroll: '', // 滚动位置
      detail: {}, // 详情
      incomeTotal: '', // 收入
      spendingTotal: '', // 统计
      curYearMonth: '', // 选中的年月
      rewardSource: 'all', // 激励来源
      startCycle: '', // 周期开始时间
      endCycle: '', // 周期结束时间
      list: [], // list
      pageNum: 1, // 当前页
      pageSize: 20, // 每页显示的数量
      isBusy: false, // 是否处于加载中
      isTheLastPage: false // 最后一页
    }
  },
  mounted () {
    this.getCycleDate12()
    this.staffIdentityId = this.$appConfig.ls.get('USER_UID')
    console.log('1. this.staffIdentityId:', this.staffIdentityId)
    this.getList() // list
    this.getIncomeExp() // 收入支出
  },
  methods: {
    // qa
    goToQA () {
      this.$router.push({
        path: '/qa'
      })
    },
    ...Methods
  }
}
</script>
