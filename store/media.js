export const state = () => ({
  mimetypes: [],
  maxFileSize: [],
})

export const getters = {
  mimetypes(state) {
    return state.mimetypes
  },
  maxFileSize(state) {
    return state.maxFileSize
  },
}

export const mutations = {
  SET_MIMETYPES(state, value) {
    state.mimetypes = value
  },
  SET_MAX_FILE_SIZE(state, value) {
    state.maxFileSize = value
  },
}

export const actions = {
  async getMediaConfig({ commit, state }) {
    if (state.mimetypes.length === 0) {
      const response = await this.$axios.$get('media/config')
      commit('SET_MIMETYPES', response.data.mimetypes)
      commit('SET_MAX_FILE_SIZE', response.data.max_file_size)
    }
  },
}
