<template>
  <div class="page">
    <div class="bd">
      <div class="page-not-found">
        <h3 class="title">404</h3>
        <p class="describe">该页面不存在</p>
        <p class="redirect">返回
          <a href="javascript:;" onclick="window.history.back()">上一页</a> |
          <router-link to="/">首页</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
  @import '../scss/vars';
  .page-not-found {
    padding-top: 40px;
    h3.title {
      font-size: 5.6rem;
      color: $black;
      text-align: center;
      font-weight: 400;
      text-shadow: 0 1px 1px $gray-base;
    }
    p {
      padding: 6px 0;
      font-size: 1.4rem;
      color: $black;
      text-align: center;
    }
    a {
      color: $green-cool;
    }
  }
</style>
