<template>
  <div
    id="task"
    :class="[this.task_status == 0 ? 'uncompleted' : 'completed']"
    style="transition: 0.2s"
  >
    <div class="task-groups">
      <div
        :class="[this.task_status == 0 ? 'text-gray3' : 'text-green']"
        v-on:click="edit_task()"
        style="transition: 0.2s"
      >
        <i class="fas fa-square fa-2x"></i>
      </div>
      <div class="task_name">{{ this.task_name }}</div>
    </div>
    <div class="task-groups">
      <div
        v-if="this.task_type > 1 && this.task_type < 4"
        :class="this.get_task_type.type"
      >
        {{ this.get_task_type.name }}
      </div>
      <div class="dropdown">
        <button class="btn-menu">
          <i class="fas fa-ellipsis-v fa-lg"></i>
        </button>
        <div class="dropdown-content">
          <button v-on:click="editing_task()">
            <i class="fas fa-circle fa-xs icon-edit"></i>Editar
          </button>
          <button v-on:click="deleting_task()">
            <i class="fas fa-circle fa-xs icon-delete"></i>Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Task",
  props: {
    task_name: { type: String, default: "Unnamed" },
    task_desc: { type: String, default: "Unnamed" },
    task_type: { type: Number, default: 1 },
    task_status: { type: Number, default: -1 },
    task_id: { type: Number, default: -1 },
  },

  data() {
    return {
      task_status_local: this.task_status,
    };
  },

  computed: {
    ...mapGetters(["task_manipulation"]),

    get_task_type() {
      switch (this.task_type) {
        case 2:
          return {
            type: "important",
            name: "Importante",
          };
        case 3:
          return {
            type: "urgent",
            name: "Urgente",
          };
        default:
          break;
      }

      return undefined;
    },
  },

  methods: {
    edit_task() {
      this.task_status_local == 0
        ? (this.task_status_local = 1)
        : (this.task_status_local = 0);

      this.$store.dispatch("edit_task", {
        task_name: this.task_name,
        task_desc: this.task_desc,
        task_type: this.task_type,
        task_status: this.task_status_local,
        task_id: this.task_id,
      });
    },

    deleting_task() {
      this.$store.commit("DELETING_TASK", {
        task_id: this.task_id,
        deleting_task: (this.task_manipulation.deleting_task =
          !this.task_manipulation.deleting_task),
      });
    },

    editing_task() {
      this.$store.commit("EDITING_TASK", {
        task_id: this.task_id,
        editing_task: (this.task_manipulation.editing_task =
          !this.task_manipulation.editing_task),
      });
    },
  },
};
</script>

<style lang="stylus">
#task
  width 100%
  padding padding
  border solid gray 2px
  border-radius border-radius;
  background-color white
  color black

  display flex
  justify-content space-between;
  align-items center;

.task-groups
  display flex
  align-items center

.task_name
  margin-left 10px
  font-weight 600

.urgent
  background-color red
  padding 5px
  border-radius border-radius2
  margin-right 10px

  font-size 0.75rem
  line-height 1rem
  font-weight 600

  color: white

.important
  background-color yellow
  padding 5px
  border-radius border-radius2;
  margin-right 10px

  font-size 0.75rem
  line-height 1rem
  font-weight 600

  color white

.dropdown
  position relative
  display flex

.dropdown-content
  display none
  position absolute
  background-color white
  box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.2)
  z-index: 1

.dropdown-content button
  width 100%
  cursor pointer
  padding padding

  display flex
  align-items center

  color gray4
  border none

  text-align center
  font-weight 600

  background none
  &:hover
    background-color gray

  transition 0.3s

.dropdown:hover .dropdown-content
  display block

.icon-edit
  margin-right 10px
  color yellow

.icon-delete
  margin-right 10px
  color red

.completed
  opacity 0.6
  text-decoration line-through

.uncompleted
  opacity 1
</style>
