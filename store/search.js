import queryString from 'query-string'

export const state = () => ({
  searchText: '',
  isPublic: true,
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
  SET_SEARCHTEXT(state, value) {
    state.searchText = value
  },
  SET_IS_PUBLIC(state, value) {
    state.isPublic = value
  },
  SET_IN_STEPS_TITLE(state, value) {
    state.inStepsTitle = value
  },
  SET_COUNT(state, count) {
    state.count = count
  },
  SET_CURRENT_PAGE(state, value) {
    state.current_page = value
  },
  SET_LAST_PAGE(state, value) {
    state.last_page = value
  },
  SET_CAN_LOAD_MORE(state, value) {
    state.canLoadMore = value
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
    const snippets = await dispatch('loadSnippets')
    commit('SET_COUNT', snippets.meta.total)
    commit('SET_CURRENT_PAGE', snippets.meta.current_page)
    commit('SET_LAST_PAGE', snippets.meta.last_page)
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

  setSearchText({ commit }, value) {
    commit('SET_SEARCHTEXT', value)
  },

  setIsPublic({ commit }, value) {
    commit('SET_IS_PUBLIC', value)
  },

  setInStepsTitle({ commit }, value) {
    commit('SET_IN_STEPS_TITLE', value)
  },
}
