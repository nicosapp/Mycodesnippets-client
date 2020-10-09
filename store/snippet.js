export const state = () => ({
  snippet: null,
  steps: null,
  currentStep: null,
})

export const getters = {
  snippet(state) {
    return state.snippet
  },
  steps(state) {
    return state.steps
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
