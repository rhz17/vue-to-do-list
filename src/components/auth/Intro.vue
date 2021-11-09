<template>
  <div id="intro">
    <div>
      <div class="image">
        <img class="img" src="@/assets/logo.png" alt="Facilita Logo" />
        <span class="icon"><i class="fas fa-check fa-3x"></i></span>
      </div>
      <div class="title">FACILITA<span class="right-title text-normal">TASKS</span></div>
      <div class="text-normal">Gestão de tarefas pessoais</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intro",
}
</script>

<style lang="stylus">
#intro
  height 100%
  width 65%
  background-color blue
  display flex
  flex-direction column
  justify-content center
  align-items center
  color white

.title
  font-size 3.1rem
  line-height 1
  font-weight 900

.right-title
  font-size 3.0rem
  line-height 1rem
  font-weight 10

.image
  position relative
  display inline-block

.img
  height 120px
  width 120px

.icon
  position absolute
  left 85px
  top -12px
  color green
</style>
