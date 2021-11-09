<template>
  <div id="list">
    <div class="container">
      <div class="side-bar-logo">
        <div class="image-group">
          <img class="image-logo" src="@/assets/logo.png" alt="Facilita Logo" />
          <span class="image-icon"><i class="fas fa-check fa-lg"></i></span>
        </div>
      </div>
      <div class="side-bar">
        <button class="btn-side bg-dark-blue">
          <i class="far fa-chart-bar fa-3x"></i>
          Dashboard
        </button>
        <button class="btn-side">
          <i class="far fa-check-circle fa-3x"></i>
          Tarefas
        </button>
        <button class="btn-side">
          <i class="fas fa-user-cog fa-3x"></i>
          Configurações
        </button>
      </div>
      <div class="top-bar">
        <div style="margin-right: 15px">
          <div style="font-size: 1.4rem">
            {{ this.user.name }}
          </div>
          <div class="text-blue" style="font-size: 0.8rem">
            {{ this.user.type }}
          </div>
        </div>
      </div>
      <div class="side-bar-tabs">
        <h3 class="h3">Categorias</h3>
        <h4 class="h4 text-blue">
          > Todas
          <span class="tasks-stats text-gray4">{{ this.tasks.length }}</span>
        </h4>
        <h4 class="h4">
          > Urgentes
          <span class="tasks-stats bg-red text-white">{{
            get_tasks_stats.urgent
          }}</span>
        </h4>
        <h4 class="h4">
          > Importantes
          <span class="tasks-stats bg-yellow text-white">{{
            get_tasks_stats.important
          }}</span>
        </h4>
        <h4 class="h4">
          > Outras
          <span class="tasks-stats text-gray4">{{
            get_tasks_stats.others
          }}</span>
        </h4>
        <h4 class="h4">
          > Finalizadas
          <span class="tasks-stats text-gray4">{{
            get_tasks_stats.completed
          }}</span>
        </h4>
      </div>
      <div class="main">
        <div style="max-height: 80%">
          <div class="list-title" style="width: 100%">Minhas tarefas</div>
          <div class="list-subtitle" style="width: 100%">
            Olá,
            <span class="text-blue">{{ this.user.name }}</span
            >, você tem
            <u class="text-blue"> {{ get_tasks_stats.uncompleted }} tarefas </u>
            pendentes.
          </div>
          <div class="input-icon-group" style="width: 100%">
            <input
              class="input2"
              type="text"
              :placeholder="[
                this.tasks.length == 0
                  ? 'Você não tem nenhuma tarefa criada.'
                  : 'Buscar tarefas',
              ]"
              :disabled="this.tasks.length == 0"
              v-model="search"
            />
          </div>
          <div v-for="task in sort_tasks" :key="task.id" style="width: 100%">
            <Task
              :task_name="task.task_name"
              :task_desc="task.task_desc"
              :task_type="task.task_type"
              :task_status="task.task_status"
              :task_id="task.task_id"
            />
          </div>
        </div>
      </div>
    </div>
    <button class="btn-float" v-on:click="creating_task()">
      <i class="fas fa-plus fa-3x"></i>
    </button>
    <Create v-if="this.task_manipulation.creating_task" />
    <Delete v-if="this.task_manipulation.deleting_task" />
    <Edit v-if="this.task_manipulation.editing_task" />
  </div>
</template>

<script>
import Task from "@/components/list/Task.vue";
import Create from "@/components/Create.vue";
import Delete from "@/components/Delete.vue";
import Edit from "@/components/Edit.vue";

import { mapGetters } from "vuex";

export default {
  name: "List",
  components: {
    Task,
    Create,
    Delete,
    Edit,
  },

  data() {
    return {
      search: "",
    };
  },

  computed: {
    ...mapGetters(["user", "tasks", "task_manipulation"]),

    sort_tasks() {
      let researched_tasks = () => {
        if (this.search != "") {
          return this.tasks.filter((t) => {
            let by_name = t.task_name
              .toLowerCase()
              .includes(this.search.toLowerCase());

            let by_desc = t.task_desc
              .toLowerCase()
              .includes(this.search.toLowerCase());

            return by_name ? by_name : by_desc;
          });
        }

        return this.tasks.slice();
      };

      let sorted_tasks = researched_tasks().sort((t1, t2) => {
        if (t1.task_type == t2.task_type) return 0;

        return t1.task_type < t2.task_type ? 1 : -1;
      });

      return sorted_tasks;
    },

    get_tasks_stats() {
      let tasks_stats = {
        urgent: 0,
        important: 0,
        others: 0,
        completed: 0,
        uncompleted: 0,
      };

      this.tasks.slice().filter((t) => {
        if (t.task_type == 3) tasks_stats.urgent += 1;
        if (t.task_type == 2) tasks_stats.important += 1;
        if (t.task_type == 1) tasks_stats.others += 1;
        if (t.task_status == 1) tasks_stats.completed += 1;
        if (t.task_status == 0) tasks_stats.uncompleted += 1;
      });

      return tasks_stats;
    },
  },

  created() {
    this.$store.dispatch("sync_data");
  },

  methods: {
    creating_task() {
      this.$store.commit("CREATING_TASK", {
        creating_task: (this.task_manipulation.creating_task =
          !this.task_manipulation.creating_task),
      });
    },
  },
};
</script>

<style lang="stylus">
#list
  height 100%
  width 100%
  display flex
  align-items center

.image-group
  position relative
  display inline-block

.image-logo
  height 70px
  width 70px

.image-icon
  position absolute
  left 50px;
  top -5px
  color green

.list-title
  color black
  font-size 1.875rem
  line-height 2.25rem
  font-weight 600;

.list-subtitle
  color gray4
  font-size 1.25rem
  line-height 1.75rem
  font-weight 600

.input-icon-group
  position relative
  display inline-block
  color gray4

.input-icon
  position absolute
  left 230px
  top 45p

.container
  display grid
  grid-template-columns repeat(10, 1fr)
  grid-template-rows repeat(10, 1fr)
  grid-column-gap 0px
  grid-row-gap 0px
  width 100%
  height 100%

.side-bar-logo
  grid-area 1 / 1 / 2 / 2
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color blue

.side-bar
  grid-area 2 / 1 / 11 / 2
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color blue

.top-bar
  grid-area 1 / 2 / 2 / 11
  display flex
  flex-direction column
  justify-content center
  text-align right
  background-color white

.side-bar-tabs
  grid-area 2 / 2 / 11 / 4
  display flex
  flex-direction column
  justify-content center
  align-items left
  padding 20%
  background-color gray2

.main
  grid-area 2 / 4 / 11 / 11
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color gray3

.tasks-stats
  border none
  border-radius border-radius3
  padding 5px
</style>
