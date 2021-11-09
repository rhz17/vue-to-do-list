<template>
  <div id="create">
    <div class="overlay-form">
      <h1 class="h3">Editar tarefa</h1>
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
              v-on:click="cancel_editing_task()"
              style="margin-right: 8px"
            >
              Cancelar
            </button>
            <button
              class="btn-primary"
              type="button"
              v-on:click="edit_task()"
              :disabled="this.task_name == '' || this.task_desc == ''"
              style="margin-left: 8px"
            >
              Editar
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
  name: "Edit",
  data() {
    return {
      task_name: "",
      task_desc: "",
      task_type: -1,
      task_status: -1,
      task_id: -1,
    };
  },

  computed: {
    ...mapGetters(["tasks", "task_manipulation"]),
  },

  created() {
    let task = this.tasks.find(
      (t) => t.task_id == this.task_manipulation.task_id
    );

    this.task_name = task.task_name;
    this.task_desc = task.task_desc;
    this.task_type = task.task_type;
    this.task_status = task.task_status;
    this.task_id = task.task_id;
  },

  methods: {
    edit_task() {
      this.$store.dispatch("edit_task", {
        task_name: this.task_name,
        task_desc: this.task_desc,
        task_type: this.task_type,
        task_status: this.task_status,
        task_id: this.task_id,
      });
    },

    cancel_editing_task() {
      this.$store.commit("EDITING_TASK", {
        editing_task: (this.task_manipulation.editing_task =
          !this.task_manipulation.editing_task),
      });
    },
  },
};
</script>

<style lang="stylus">
#edit
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
</style>
