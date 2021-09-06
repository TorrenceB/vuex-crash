// import axios from "axios";

import axios from "axios";

export default {
  state: {
    todos: [],
  },

  getters: {
    allTodos: (state) => state.todos,
  },

  actions: {
    async fetchTodos() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );

      console.log(response.data);
      //   commit(response.data);
    },
  },

  mutations: {
    setTodos: (state, todos) => (state.todos = todos),
  },
};
