export const state = () => ({
  user: {}
})

export const mutations = {
  setUser (state, userData) {
    state.user = userData
  }
}

export const getters = {
  getUser(state) {
    return state.user
  }
}

export const actions = {
  setUser(context, userData) {
    context.commit('setUser', userData)
  }
}