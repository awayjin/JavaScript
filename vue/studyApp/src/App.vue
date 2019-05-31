<template>
    <div class="body-height body-height-box" >
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="body-router body-view"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="body-router body-view"></router-view>
    </div>
</template>
<style scoped>
  .body-height {
    height: 100%;
    width: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .body-height-box.body-height{
    -webkit-overflow-scrolling: unset !important;
  }
  .body-router.body-view{
    -webkit-overflow-scrolling: unset !important;
  }
</style>
