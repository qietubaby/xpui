let user = {
 namespaced: true,
 state: {
  userName: 'Frank'
 },
 mutations: {
  changeName(state, name) {
   state.userName = name
  }
 },
 actions: {
  changeNameAsync(store, name) {
   setTimeout(() => {
    store.commit('changeName', name)
   }, 1000)

  }
 }

}

export default user;