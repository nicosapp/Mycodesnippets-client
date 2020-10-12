import queryString from 'query-string'

export const state = () => ({
  searchText: '',
  isPublic: true,
  inStepsTitle: false,
  snippets: [],
  count: 0,
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
}
export const mutations = {
  SET_SNIPPETS(state, snippets) {
    state.snippets = snippets
  },
  SET_COUNT(state, count) {
    state.count = count
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
}

export const actions = {
  async loadSnippets({ state }) {
    const query = { searchText: state.searchText }
    if (state.isPublic) {
      query.isPublic = 1
    }
    if (state.inStepsTitle) {
      query.inStepsTitle = 1
    }
    const snippets = await this.$axios.$get(
      `snippets?${queryString.stringify(query)}`
    )
    return snippets
  },
  async getSnippets({ commit, state, dispatch }) {
    const snippets = await dispatch('loadSnippets')
    commit('SET_COUNT', snippets.meta.total)
    commit('SET_SNIPPETS', snippets.data)
  },
  loadMoreSnippets({ commit, dispatch }) {
    const snippets = dispatch('loadSnippets')
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
