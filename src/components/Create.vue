<template>
  <div id="create">
    <div class="overlay-form">
      <h1 class="h3">Cadastrar tarefa</h1>
      <form class="form">
        <label class="label" for="titulo">Título:</label>
        <input
          class="input3"
          type="text"
          name="titulo"
          id="titulo"
          v-model="task_name"
        />
        <label class="label" for="descricao">Descrição:</label>
        <textarea
          class="input3"
          name="descricao"
          id="descricao"
          cols="30"
          rows="10"
          style="resize: none"
          v-model="task_desc"
        ></textarea>
        <div class="task-details">
          <div class="task-details-type">
            <input
              class="task-details-radio"
              type="radio"
              name="type"
              id="urgent"
              :value="3"
              v-model="task_type"
            />
            <label for="urgent">Urgente</label>
            <input
              class="task-details-radio"
              type="radio"
              name="type"
              id="important"
              :value="2"
              v-model="task_type"
            />
            <label for="important">Importante</label>
            <input
              class="task-details-radio"
              type="radio"
              name="type"
              id="others"
              :value="1"
              v-model="task_type"
            />
            <label for="others">Outras</label>
          </div>
          <div>
            <button
              class="btn-secondary"
              type="button"
              v-on:click="cancel_creating_task()"
              style="margin-right: 8px"
            >
              Cancelar
            </button>
            <button
              class="btn-primary"
              type="button"
              v-on:click="add_task()"
              :disabled="this.task_name == '' || this.task_desc == ''"
              style="margin-left: 8px"
            >
              Adicionar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Create",
  data() {
    return {
      task_name: "",
      task_desc: "",
      task_type: 1,
    };
  },

  computed: {
    ...mapGetters(["task_manipulation"]),
  },

  methods: {
    add_task() {
      this.$store.dispatch("add_task", {
        task_name: this.task_name,
        task_desc: this.task_desc,
        task_type: this.task_type,
        task_status: 0,
        task_id: Date.now(),
      });
    },

    cancel_creating_task() {
      this.$store.commit("CREATING_TASK", {
        creating_task: (this.task_manipulation.creating_task =
          !this.task_manipulation.creating_task),
      });
    },
  },
};
</script>

<style lang="stylus">
#create
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

.overlay-form
    width 35%
    padding 2%
    background-color white
    font-weight 600
    border solid gray 2px
    border-radius border-radius

.form
  display flex
  flex-direction column

.task-details
  display flex
  justify-content space-between
  align-items center

.task-details-radio
  margin-left 10px
  margin-right 10px

.task-details-type
  color gray4
</style>
