export const state = () => ({
  value: false,
})

export const getters = {
  value(state) {
    return state.value
  },
}

export const mutations = {
  SET_VALUE(state, value) {
    state.value = value
  },
}

export const actions = {
  setValue({ commit, state }, value) {
    commit('SET_VALUE', value)
  },
}
