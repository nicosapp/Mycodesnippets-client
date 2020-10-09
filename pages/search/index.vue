<template>
  <v-container class="pt-0">
    <v-row justify="center" class="pt-0">
      <v-col cols="12" md="8" class="pt-0">
        <v-form class="mb-6 grey lighten-4 pa-4 rounded">
          <v-text-field
            color="primary"
            :loading="loading"
            disabled
            prepend-icon="mdi-magnify"
            placeholder="Title"
          ></v-text-field>
          <div class="d-flex align-end">
            <div class="flex-grow-1">Search in:</div>
            <v-checkbox
              v-model="publicSnippets"
              label="Public snippets"
              color="primary"
              class="flex-grow-1 mt-0"
              hide-details
            ></v-checkbox>

            <v-checkbox
              v-model="stepsTitle"
              label="Steps title"
              color="primary"
              class="flex-grow-1 mt-0"
              hide-details
            ></v-checkbox>
          </div>
        </v-form>
        <ul>
          <li v-for="snippet in snippets" :key="snippet.uuid">
            <nuxt-link
              :to="{ name: 'snippets-id', params: { id: snippet.uuid } }"
              >{{ snippet.title || 'Untitled snippet' }}
            </nuxt-link>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ app }) {
    const response = await app.$axios.$get('snippets')
    return {
      snippets: response.data,
    }
  },
  data() {
    return {
      snippets: [],
      loading: true,
      publicSnippets: false,
      stepsTitle: false,
    }
  },
  middleware: ['verified'],
}
</script>
