<template>
  <div>
    <h2>深入了解组件</h2>
    <router-link to="/view">index</router-link>  |
    <router-link to="/view/mul">mul view</router-link>  |
    <router-view class="view-module one"  />
    <router-view class="view-module two" name="main" />
    <router-view class="view-module three" name="sidebar" />
  </div>
</template>
