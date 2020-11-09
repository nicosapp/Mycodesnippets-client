<template>
  <v-app-bar :hide-on-scroll="true" class="px-md-6" fixed app>
    <v-text-field
      v-model="searchText"
      type="search"
      hide-details="auto"
      placeholder="Snippet title"
      filled
      clearable
      :dense="$vuetify.breakpoint.mobile"
      class="flex-grow-1 mt-2"
      clear-icon="mdi-close-circle"
      append-icon="mdi-magnify"
      @click:append="search"
      @keydown="enter"
    ></v-text-field>

    <template v-slot:extension>
      <div>
        <SearchChip v-if="$auth.loggedIn" v-model="isPublic">public</SearchChip>
        <SearchChip v-model="inStepsTitle">steps title</SearchChip>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import searchState from '@/mixins/search/search'
import SearchChip from '@/components/layout/search/SearchChip'

import { debounce as _debounce } from 'lodash'

export default {
  components: {
    SearchChip,
  },
  mixins: [searchState],
  data() {
    return {}
  },
  watch: {
    searchText: {
      handler: _debounce(async function (value) {
        await this.getSnippets()
      }, 500),
    },
  },
  methods: {
    enter(e) {
      if (e.key === 'Enter') this.search()
    },
    search() {
      this.getSnippets()
    },
  },
}
</script>
