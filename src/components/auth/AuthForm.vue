<template>
  <div id="authform">
    <div class="authform">
      <h3 class="h3">Entre com seus dados de acesso.</h3>
      <form class="form">
        <label class="label" for="user">Nome de usuário ou e-mail:</label>
        <input class="input" type="text" name="user" id="user" />
        <label class="label" for="password">Senha:</label>
        <input class="input" type="password" name="password" id="password" />
        <button
          class="btn-primary"
          type="button"
          v-on:click="$router.push('/list')"
        >
          Entrar
        </button>
      </form>
      <h5 class="h5">
        <router-link to="/reset">Esqueci minha senha</router-link>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthForm",
}
</script>

<style lang="stylus" scoped>
#authform
  height 100%
  width 100%
  display flex
  flex-direction column
  justify-content center
  align-items center

.authform
  width 40%
  font-weight 600

.form
  display flex
  flex-direction column
</style>
