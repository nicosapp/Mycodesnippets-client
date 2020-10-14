<template>
  <v-container>
    <div v-if="total" class="font-weight-medium grey--text text--darken-1">
      Snippets found ({{ total }})
    </div>
    <SnippetList :snippets="snippets">
      <LoadMoreButton :visible="canLoadMore" @click.prevent="loadMore" />
    </SnippetList>
  </v-container>
</template>

<script>
import loadMoreHelper from '@/mixins/snippets/loadMore'
export default {
  mixins: [loadMoreHelper],
  async asyncData({ app }) {
    try {
      const response = await app.$axios.get('snippets/home')
      return {
        snippets: response.data.data,
        total: response.data.meta.total,
        current_page: response.data.meta.current_page,
        last_page: response.data.meta.last_page,
      }
    } catch (e) {}
  },
  data() {
    return {
      snippets: [],
    }
  },
  mounted() {
    this.$store.dispatch('bottomBar/setActive', 'home')
  },
  methods: {
    async loadMore() {
      const snippets = await this._loadMore('snippets/home')
      this.snippets = [...this.snippets, ...snippets.data.data]
    },
  },
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
