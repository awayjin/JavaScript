<style>
  .mask {
    height: 400px;
    width: 500px;
    position: absolute;
    top: 270px;
    background-color: #000;
    opacity: .3;
    /*pointer-events: none;*/
    /*display: none;*/
  }
</style>
<template>
  <div>
    jsx
    <a href="https://github.com/geektime-geekbang/geektime-vue-1/tree/master/%E6%BC%94%E7%A4%BADEMO%E6%BA%90%E7%A0%81/src/views/1.10">
      jsx实现
    </a>
    <span >
      <input type="text" autofocus placeholder="ha" v-focus>
    </span>

    <div > clickOutside </div>
    <div v-clickOutSide="hideMask" style="background-color: #f0efd0; height: 80px;">
      <!--<button @click="toggleMask($event)">show modal</button>-->
      <button @click="show=!show">show modal</button>
      <div class="mask" v-show="show"></div>
    </div>
    <br>
    <br>

    <hr>
    template:
    <TemplateAnchorHeading1 :level="5">
      <template v-slot:header>
        <div>header</div>
      </template>
      <template v-slot:main>
        <div>main</div>
      </template>
      <template v-slot>
        <span>default-val</span>
      </template>
      <template v-slot:footer>
        <div>footer</div>
      </template>
    </TemplateAnchorHeading1>

    <hr>    <br>
    render:
    <RenderAnchorHeading2 :level="4">
      <slot >render function3</slot>
      <!--<slot v-slot:name="default">render default</slot>-->
    </RenderAnchorHeading2>

    <hr>
    jsx:
    <JsxAnchorHeading3 :level="2" >
      jsx heading
      <a href="https://www.jianshu.com/p/96dc63e4e263" target="_blank">demo</a>
      <br>
      <template v-slot:demo> demo-v-slot</template>
    </JsxAnchorHeading3>
  </div>
</template>
<script>
import TemplateAnchorHeading1 from './template-anchor.vue'
import RenderAnchorHeading2 from './render-anchor.js'
import JsxAnchorHeading3 from './jsx-anchor.jsx'

export default {
  components: {
    TemplateAnchorHeading1,
    JsxAnchorHeading3,
    RenderAnchorHeading2
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    hideMask () {
      this.show = false
    }
  }
}
</script>
