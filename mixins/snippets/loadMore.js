import queryString from 'query-string'

export default {
  data() {
    return {
      current_page: 0,
      last_page: 0,
      total: 0,
    }
  },
  computed: {
    canLoadMore() {
      return this.current_page !== this.last_page
    },
  },
  methods: {
    async _loadMore(rootUrl) {
      if (this.canLoadMore) {
        this.current_page++
        const query = { page: this.current_page }
        const url = `${rootUrl}?${queryString.stringify(query)}`
        const response = await this.$axios.get(url)
        return response
      }
      return false
    },
  },
}
