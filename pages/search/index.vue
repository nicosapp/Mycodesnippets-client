<template>
  <v-container>
    <v-row>
      <v-col>
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
    }
  },
}
</script>
