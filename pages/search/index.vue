<template>
  <v-container class="pt-0">
    <div class="font-weight-medium grey--text text--darken-1">
      <template v-if="snippetsCount">
        Snippets found ({{ snippetsCount }})
      </template>
      <template v-else>No result</template>
    </div>
    <v-row>
      <v-col
        v-for="snippet in snippets"
        :key="snippet.uuid"
        cols="12"
        md="6"
        lg="4"
      >
        <SnippetListItem :snippet="snippet" />
      </v-col>
    </v-row>
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
  },
  middleware: ['verified'],
  head() {
    return {
      title: 'Search',
    }
  },
}
</script>
