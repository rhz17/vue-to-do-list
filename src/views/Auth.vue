<template>
  <div id="auth">
    <Intro />
    <AuthForm />
  </div>
</template>

<script>
import AuthForm from "@/components/auth/AuthForm.vue";
import Intro from "@/components/auth/Intro.vue";

export default {
  name: "Auth",
  components: {
    AuthForm,
    Intro,
  },
};
</script>

<style lang="stylus">
#auth
  height 100%
  width 100%
  display flex
  align-items center
</style>
