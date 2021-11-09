import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Vuex structure
export default new Vuex.Store({
  state: {
    user: {
      name: "Facilita",
      type: "Beta Tester",
    },

    tasks: [],

    task_manipulation: {
      task_id: -1,

      creating_task: false,
      editing_task: false,
      deleting_task: false,
    },
  },

  mutations: {
    SYNC_DATA(state) {
      // Is there already a task there or not?
      let current_tasks = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
      state.tasks = current_tasks;
    },

    ADD_TASK(state, payload) {
      state.tasks.push(payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));

      // Close dialog
      state.task_manipulation.creating_task = false;
    },

    EDIT_TASK(state, payload) {
      let task = state.tasks.find((t) => t.task_id == payload.task_id);

      task.task_name = payload.task_name;
      task.task_desc = payload.task_desc;
      task.task_type = payload.task_type;
      task.task_status = payload.task_status;

      localStorage.setItem("tasks", JSON.stringify(state.tasks));

      // Close dialog
      state.task_manipulation.editing_task = false;
    },

    DELETE_TASK(state, payload) {
      state.tasks = state.tasks.filter((t) => t.task_id != payload.task_id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));

      // Close dialog
      state.task_manipulation.task_id = -1;
      state.task_manipulation.deleting_task = false;
    },

    CREATING_TASK(state, payload) {
      state.task_manipulation.creating_task = payload.creating_task;
    },

    EDITING_TASK(state, payload) {
      state.task_manipulation.task_id = payload.task_id;
      state.task_manipulation.editing_task = payload.editing_task;
    },

    DELETING_TASK(state, payload) {
      state.task_manipulation.task_id = payload.task_id;
      state.task_manipulation.deleting_task = payload.deleting_task;
    },
  },

  actions: {
    sync_data(context) {
      context.commit("SYNC_DATA");
    },

    add_task(context, payload) {
      context.commit("ADD_TASK", payload);
    },

    edit_task(context, payload) {
      context.commit("EDIT_TASK", payload);
    },

    delete_task(context, payload) {
      context.commit("DELETE_TASK", payload);
    },
  },

  getters: {
    user: (state) => {
      return state.user;
    },

    tasks: (state) => {
      return state.tasks;
    },

    task_manipulation: (state) => {
      return state.task_manipulation;
    },
  },
});
