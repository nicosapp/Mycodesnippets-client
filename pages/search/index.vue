<template>
  <v-container class="pt-0">
    <div class="font-weight-medium grey--text text--darken-1">
      <template v-if="snippetsCount">
        Snippets found ({{ snippetsCount }})
      </template>
      <template v-else>No result</template>
    </div>
    <SnippetList :snippets="snippets">
      <LoadMoreButton :visible="canLoadMore" @click="loadMoreSnippets" />
    </SnippetList>
  </v-container>
</template>

<script>
import searchState from '@/mixins/search/search'

export default {
  layout: 'search',
  mixins: [searchState],
  data() {
    return {
      loading: true,
    }
  },

  mounted() {
    this.getSnippets()
    this.$store.dispatch('bottomBar/setActive', 'search')
  },
  middleware: ['verified'],
  head() {
    return {
      title: 'Search',
    }
  },
}
</script>
