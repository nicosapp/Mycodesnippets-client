import queryString from 'query-string'

export const state = () => ({
  searchText: '',
  isPublic: false,
  inStepsTitle: false,
  snippets: [],
  count: 0,
  current_page: 0,
  last_page: 0,
  canLoadMore: false,
})

export const getters = {
  snippets(state) {
    return state.snippets
  },
  searchText(state) {
    return state.searchText
  },
  isPublic(state) {
    return state.isPublic
  },
  inStepsTitle(state) {
    return state.inStepsTitle
  },
  count(state) {
    return state.count
  },
  current_page(state) {
    return state.current_page
  },
  last_page(state) {
    return state.last_page
  },
  canLoadMore(state) {
    return state.canLoadMore
  },
}
export const mutations = {
  SET_SNIPPETS(state, snippets) {
    state.snippets = snippets
  },

  PUSH_SNIPPETS(state, snippets) {
    state.snippets = [...state.snippets, ...snippets]
  },
  SET_FILTERS(state, payload) {
    state.searchText =
      payload.searchText !== undefined ? payload.searchText : state.searchText
    state.isPublic =
      payload.isPublic !== undefined ? payload.isPublic : state.isPublic
    state.inStepsTitle =
      payload.inStepsTitle !== undefined
        ? payload.inStepsTitle
        : state.inStepsTitle
  },

  SET_CAN_LOAD_MORE(state, value) {
    state.canLoadMore = value
  },
  SET_META(state, payload) {
    state.current_page = payload.current_page || state.current_page
    state.last_page = payload.last_page || state.last_page
    state.count = payload.count || state.count
  },
}

export const actions = {
  async loadSnippets({ state }) {
    const query = {}
    if (state.searchText.length) {
      query.searchText = state.searchText
    }
    if (state.isPublic) {
      query.isPublic = 1
    }
    if (state.inStepsTitle) {
      query.inStepsTitle = 1
    }
    if (state.current_page) {
      query.page = state.current_page
    }
    const snippets = await this.$axios.$get(
      `snippets?${queryString.stringify(query)}`
    )
    return snippets
  },
  async getSnippets({ commit, state, dispatch }) {
    commit('SET_META', { current_page: 1 })
    const snippets = await dispatch('loadSnippets')
    commit('SET_META', {
      current_page: snippets.meta.current_page,
      last_page: snippets.meta.last_page,
      count: snippets.meta.total,
    })
    commit('SET_SNIPPETS', snippets.data)
    if (snippets.meta.current_page < snippets.meta.last_page) {
      commit('SET_CAN_LOAD_MORE', true)
    }
  },
  async loadMoreSnippets({ commit, dispatch, state }) {
    if (state.current_page + 1 === state.last_page) {
      commit('SET_CAN_LOAD_MORE', false)
    }
    commit('SET_CURRENT_PAGE', state.current_page + 1)
    const snippets = await dispatch('loadSnippets')
    commit('PUSH_SNIPPETS', snippets.data)
  },

  setFilters({ commit }, payload) {
    commit('SET_FILTERS', payload)
  },
}
