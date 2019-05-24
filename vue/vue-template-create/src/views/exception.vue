<template>
  <div class="page">
    <div class="bd">
      <div class="page-not-found">
        <h3 v-if="content.title !== ''" class="title">{{ content.title }}</h3>
        <p v-if="content.describe !== ''" class="describe">{{ content.describe }}</p>
        <div v-html="content.extra"></div>
      </div>
    </div>
  </div>
</template>

<script>
const INFORMATION_OPERATE = `<p class="redirect">返回 <a href="javascript:;" onclick="window.history.back()">上一页</a> | <a href="/">首页</a> | <a href="javascript:;"  @click="QRCode">退出重试</a></p>`

const exceptionList = {
  'default': {
    title: '',
    describe: '服务器发生未知异常',
    extra: INFORMATION_OPERATE
  },
  '403': {
    title: '403',
    describe: '没有权限,',
    extra: '<p class="redirect"><a href="javascript:;"  @click="QRCode">退出重试</a></p>'
    // extra: INFORMATION_OPERATE
  }
}

export default {
  mounted () {
    let exType = this.$route.params.type
    this.content = exceptionList[exType] ? exceptionList[exType] : exceptionList['default']
  },
  data () {
    return {
      content: {}
    }
  },
  methods: {
    QRCode () {
      let closeObj = {
        'method': 'closeWeb',
        'content': '',
        'success': '',
        'error': ''
      }
      window.location = '/native_service?data=' + JSON.stringify(closeObj)
    }
  }
}
</script>

<style lang='scss'>
  @import '../scss/vars';

  .page-not-found {
    padding-top: 40px;
    h3.title {
      font-size: 2.8rem;
      color: $black;
      text-align: center;
      font-weight: 400;
      text-shadow: 0 1px 1px $gray-brownish;
    }
    p {
      padding: 6px 0;
      font-size: 1.4rem;
      color: $black;
      text-align: center;
    }
    a {
      color: $green-emerald;
    }
  }
</style>
