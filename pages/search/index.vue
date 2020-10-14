<template>
  <v-container class="pt-0">
    <div class="font-weight-medium grey--text text--darken-1">
      <template v-if="snippetsCount">
        Snippets found ({{ snippetsCount }})
      </template>
      <template v-else>No result</template>
    </div>
    <SnippetList :snippets="snippets" @snippet-deleted="handleSnippetDelete">
      <LoadMoreButton :visible="canLoadMore" @click="loadMoreSnippets" />
    </SnippetList>
  </v-container>
</template>

<script>
import searchHelper from '@/mixins/search/search'

export default {
  layout: 'search',
  mixins: [searchHelper],
  data() {
    return {
      loading: true,
    }
  },

  mounted() {
    this.getSnippets()
    this.$store.dispatch('bottomBar/setActive', 'search')
  },
  methods: {
    handleSnippetDelete(snippet) {
      const snippets = this.snippets.filter((s) => s.uuid !== snippet.uuid)
      this.setSnippets(snippets)
    },
  },
  head() {
    return {
      title: 'Search',
    }
  },
}
</script>
