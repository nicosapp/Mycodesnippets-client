export const state = () => ({
  component: '',
  title: '',
  message: '',
  visible: false,
  color: null,
  okFunction: null,
  cancelFunction: null,
})

export const getters = {
  component(state) {
    return state.component
  },
  title(state) {
    return state.title
  },
  message(state) {
    return state.message
  },
  visible(state) {
    return state.visible
  },
  color(state) {
    return state.color
  },
  okFunction(state) {
    return state.okFunction
  },
  cancelFunction(state) {
    return state.cancelFunction
  },
}

export const mutations = {
  SHOW_DIALOG(state, payload) {
    state.visible = true
    state.component = payload.component || 'DialogDefault'
    state.title = payload.title || null
    state.message = payload.message || ''
    state.color = payload.color || null
    state.okFunction = payload.okFunction || null
    state.cancelFunction = payload.cancelFunction || null
  },
  SET_VISIBLE(state, value) {
    state.visible = value
  },
}

export const actions = {
  setVisible({ commit }, value) {
    commit('SET_VISIBLE', value)
  },
  showDialog({ commit }, payload) {
    commit('SHOW_DIALOG', payload)
  },
}
