<template>
  <div>
    <h2>深入了解组件</h2>
    <router-link to="/component">index</router-link>  |
    <router-link to="/component/slot">slot</router-link>  |
    <router-view name="componentName" />
  </div>
</template>
