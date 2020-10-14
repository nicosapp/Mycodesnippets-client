<template>
  <v-app-bar :hide-on-scroll="true" class="px-md-6" fixed app>
    <v-text-field
      v-model="searchText"
      type="search"
      hide-details="auto"
      placeholder="Snippet title"
      filled
      clearable
      class="flex-grow-1 mt-2"
      clear-icon="mdi-close-circle"
      append-icon="mdi-magnify"
      @click:append="search"
      @keydown="enter"
    ></v-text-field>

    <template v-slot:extension>
      <div>
        <SearchChip v-if="$auth.loggedin" v-model="isPublic">public</SearchChip>
        <SearchChip v-model="inStepsTitle">steps title</SearchChip>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import searchState from '@/mixins/search/search'
import SearchChip from '@/components/layout/search/SearchChip'
export default {
  components: {
    SearchChip,
  },
  mixins: [searchState],
  data() {
    return {}
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
