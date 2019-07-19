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
      :income-total="incomeTotal | twoDecimal"
      :spending-total="spendingTotal | twoDecimal"
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
  methods: {
    goToQA() {
      window.console.log('goToQA')
    }
  }
}
</script>
