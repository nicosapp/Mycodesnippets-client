import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      snippets: 'search/snippets',
      searchTextValue: 'search/searchText',
      isPublicValue: 'search/isPublic',
      inStepsTitleValue: 'search/inStepsTitle',
      snippetsCount: 'search/count',
      canLoadMore: 'search/canLoadMore',
    }),
    searchText: {
      get() {
        return this.searchTextValue
      },
      set(searchText) {
        this.setFilters({ searchText })
      },
    },
    isPublic: {
      get() {
        return this.isPublicValue
      },
      set(value) {
        console.log(value)
        this.setFilters({ isPublic: value })
      },
    },
    inStepsTitle: {
      get() {
        return this.inStepsTitleValue
      },
      set(inStepsTitle) {
        this.setFilters({ inStepsTitle })
      },
    },
  },

  methods: {
    ...mapActions({
      setSnippets: 'search/setSnippets',
      getSnippets: 'search/getSnippets',
      loadMoreSnippets: 'search/loadMoreSnippets',
      setFilters: 'search/setFilters',
    }),
  },
}
