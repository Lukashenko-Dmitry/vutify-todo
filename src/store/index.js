import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: null,
    tasks: [
      {
        id:1,
        title: 'Get up',
        done: false,
        dueDate:'2022-03-03',
      },
      {
        id: 2,
        title: 'Wash face',
        done: false,
        dueDate:'2022-03-03',
      },
      {
        id: 3,
        title: 'Have a breakfast',
        done: false,
        dueDate:null,
      },
    ],
    snackbar:{
      show: false,
      text: '',
    }
  },
  mutations: {
    setSearch(state, value){
      state.search = value;
    },
    addTask(state, newTaskTitle){
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      }
      state.tasks.push(newTask);     
    },
    doneTask(state, id){
      let task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id){
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    showSnackbar(state, text){
      let timeout = 0;
      if(state.snackbar.show){
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout)      
    },
    snackbarHide(state){
      state.snackbar.show = false;
    },
    updateTaskTitle(state, payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
      
    }
  },
  actions: {
    addTask({commit}, newTaskTitle){
      commit('addTask', newTaskTitle)
      commit('showSnackbar', 'Task added!')
    },
    deleteTask({commit}, id){
      commit('deleteTask', id)
      commit('showSnackbar', 'Task deleted!')
    },
    updateTaskTitle({commit}, payload){
      commit('updateTaskTitle', payload)
      commit('showSnackbar', 'Task updated!')
    },
    updateTaskDueDate({commit}, payload){
      commit('updateTaskDueDate', payload)
      commit('showSnackbar', 'Date updated!')
    }
  },
  getters: {
    taskFiltered(state){
      if(!state.search){
        return state.tasks
      }
      else {
        return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase())  )
      }
    }
  }
})
