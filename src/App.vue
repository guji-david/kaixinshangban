<template>
  <div id="app">
    <keep-alive>
      <transition  mode='out-in' >
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
  @import "./App.less";

</style>
