<template>
  <div id="delete">
    <div class="overlay-form">
      <div><i class="fas fa-trash-alt fa-5x back-icon"></i></div>
      <h1 style="margin-top: 20px">
        Tem certeza que deseja <span class="text-red">excluir</span> esta tarefa?
      </h1>
      <div style="margin-bottom: 20px">Esta ação não poderá ser desfeita.</div>
      <button
        class="btn-primary"
        style="margin-right: 8px"
        v-on:click="cancel_deleting_task()"
      >
        Cancelar
      </button>
      <button
        class="btn-secondary"
        style="margin-left: 8px"
        v-on:click="delete_task()"
      >
        Confirmar
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Delete",
  computed: {
    ...mapGetters(["task_manipulation"]),
  },

  methods: {
    delete_task() {
      this.$store.dispatch("delete_task", {
        task_id: this.task_manipulation.task_id,
      });
    },

    cancel_deleting_task() {
      this.$store.commit("DELETING_TASK", {
        deleting_task: (this.task_manipulation.deleting_task =
          !this.task_manipulation.deleting_task),
      });
    },
  },
};
</script>

<style lang="stylus">
#delete
  width 100%
  height 100%

  position fixed
  display block

  top 0
  left 0
  right 0
  bottom 0

  background-color rgba(0, 0, 0, 0.5)

  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center

.back-icon
  padding 20px
  background-color gray2
  color gray4
  border-radius border-radius3
</style>
