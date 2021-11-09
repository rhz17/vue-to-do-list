<template>
  <div id="app" style="overflow: hidden">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Auth",
};
</script>

<style lang="stylus">
@font-face
    font-family "Gilroy-Normal"
    src local("Gilroy-Normal"), url("./assets/fonts/SVN-Gilroy Regular.ttf") format("truetype")

@font-face
    font-family "Gilroy-Bold"
    src local("Gilroy-Bold"), url("./assets/fonts/SVN-Gilroy Bold.ttf") format("truetype")

*
  font-family Gilroy-Bold
  margin 0
  padding 0

#app
  height 100vh
</style>
