// import axios from "axios";

import axios from "axios";

export default {
  // Application state object
  state: {
    todos: [],
  },

  /* 
  Returns current value of state.
  Used as computed properties for stores,
  cached based on dependencies.
  */
  getters: {
    allTodos: (state) => state.todos,
  },

  /* 
  Actions object contains arbitrary async
  methods used to update and COMMIT mutations.
  */
  actions: {
    async fetchTodos({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );

      commit("setTodos", response.data);
    },
    async addTodo({ commit }, title) {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        { title, completed: false }
      );

      commit("newTodo", response.data);
    },
    async deleteTodo({ commit }, id) {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

      commit("removeTodo", id);
    },
    async filterTodos({ commit }, e) {
      //   Get selected number
      const limit = parseInt(
        e.target.options[e.target.options.selectedIndex].innerText
      );

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
      );

      commit("setTodos", response.data);
    },
    async updateTodo({ commit }, updatedTodo) {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
        updatedTodo
      );

      console.log(response.data);

      commit("updateTodo", response.data);
    },
  },

  /* 
  Mutations are responsible for modifying state.
  We cannot call mutations directly, must be done
  through an action.
  */
  mutations: {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, newTodo) => state.todos.unshift(newTodo),
    removeTodo: (state, id) =>
      (state.todos = state.todos.filter((todo) => todo.id !== id)),
    updateTodo: (state, updatedTodo) => {
      const index = state.todos.findIndex((todo) => (todo.id = updatedTodo.id));

      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo);
      }
    },
  },
};
