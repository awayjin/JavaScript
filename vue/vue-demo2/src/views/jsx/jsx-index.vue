<template>
  <div>
    jsx
    <a href="https://github.com/geektime-geekbang/geektime-vue-1/tree/master/%E6%BC%94%E7%A4%BADEMO%E6%BA%90%E7%A0%81/src/views/1.10">
      jsx实现
    </a>
    <br>
    <br>
    <hr>

    template:
    <TemplateAnchorHeading1 :level="3">
      3
    </TemplateAnchorHeading1>

    <hr>

    jsx:
    <JsxAnchorHeading3 :level="2" >
      jsx heading
    </JsxAnchorHeading3>

    <hr>
    render:
    <RenderAnchorHeading2 :level="1">
      render function
    </RenderAnchorHeading2>
  </div>
</template>
<script>
import TemplateAnchorHeading1 from './template-anchor.vue'
import JsxAnchorHeading3 from './jsx-anchor.jsx'
import RenderAnchorHeading2 from './render-anchor.js'

export default {
  components: {
    TemplateAnchorHeading1,
    JsxAnchorHeading3,
    RenderAnchorHeading2
  }
}
</script>
