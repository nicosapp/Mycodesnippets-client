import { orderBy as _orderBy, clone as _clone } from 'lodash'

export const state = () => ({
  snippet: {},
  steps: [],
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
  SET_SNIPPET(state, snippet) {
    state.snippet = snippet.data.data
    state.steps = snippet.data.data.steps.data
  },
  UPDATE_SNIPPET_VALUE(state, { key, value }) {
    state.snippet = { ...state.snippet, [key]: value }
  },
  UPDATE_STEP(state, step) {
    state.steps = state.steps.map((s) => {
      if (s.uuid === step.uuid) {
        return step
      }
      return s
    })
  },
  ADD_STEP(state, { step }) {
    const orderedStepsAsc = _orderBy(state.steps, 'order', 'asc')
    orderedStepsAsc.map((s) => {
      if (s.order >= step.order) s.order++
    })
    state.steps.push(step)
  },
  DELETE_STEP(state, step) {
    state.steps = state.steps.filter((s) => {
      return s.uuid !== step.uuid
    })
  },
}

export const actions = {
  async getSnippet({ commit, state }, snippetUuid) {
    const snippet = await this.$axios.get(`snippets/${snippetUuid}`)
    commit('SET_SNIPPET', snippet)
  },
  updateSnippetValue({ commit }, { key, value }) {
    commit('UPDATE_SNIPPET_VALUE', { key, value })
  },
  updateStep({ commit }, step) {
    commit('UPDATE_STEP', step)
  },
  updateStepValue({ commit, dispatch }, { step, key, value }) {
    const newStep = _clone(step)
    newStep[key] = value
    dispatch('updateStep', newStep)
  },
  addStep({ commit }, step) {
    commit('ADD_STEP', { step })
  },
  deleteStep({ commit }, step) {
    commit('DELETE_STEP', step)
  },
}
