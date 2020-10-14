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
      set(value) {
        this.setSearchText(value)
      },
    },
    isPublic: {
      get() {
        return this.isPublicValue
      },
      set(value) {
        this.setIsPublic(value)
      },
    },
    inStepsTitle: {
      get() {
        return this.inStepsTitleValue
      },
      set(value) {
        this.setInStepsTitle(value)
      },
    },
  },

  methods: {
    ...mapActions({
      setSnippets: 'search/setSnippets',
      getSnippets: 'search/getSnippets',
      loadMoreSnippets: 'search/loadMoreSnippets',
      setSearchText: 'search/setSearchText',
      setIsPublic: 'search/setIsPublic',
      setInStepsTitle: 'search/setInStepsTitle',
    }),
  },
}
