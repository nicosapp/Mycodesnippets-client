export const state = () => ({
  component: '',
  title: '',
  message: '',
  visible: false,
  timeout: -0,
  color: null,
  text: false,
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
  timeout(state) {
    return state.timeout
  },
  color(state) {
    return state.color
  },
  text(state) {
    return state.text
  },
}

export const mutations = {
  SHOW_MESSAGE(state, payload) {
    state.visible = true
    state.component = payload.component || 'ToastDefault'
    state.title = payload.title || null
    state.message = payload.message || ''
    state.timeout = payload.timeout || 2000
    state.color = payload.color || null
    state.text = payload.text || false
  },
  SET_VISIBLE(state, value) {
    state.visible = value
  },
}

export const actions = {
  setVisible({ commit }, value) {
    commit('SET_VISIBLE', value)
  },
  showMessage({ commit }, payload) {
    commit('SHOW_MESSAGE', payload)
  },
}
