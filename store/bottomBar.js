export const state = () => ({
  active: 'home',
})

export const getters = {
  active(state) {
    return state.active
  },
}

export const mutations = {
  SET_ACTIVE(state, active) {
    state.active = active
  },
}

export const actions = {
  setActive({ commit, state }, active) {
    commit('SET_ACTIVE', active)
  },
}
