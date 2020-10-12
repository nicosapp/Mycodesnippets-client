<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto pa-4 mb-6" max-width="600">
          <div class="fill-height d-flex align-item-center">
            <div class="mr-4">
              <v-avatar color="primary" size="128" tile>
                <img src="http://www.gravatar.com/avatar/?d=mp" alt="John" />
              </v-avatar>
              <div class="font-weight-medium text-center">{{ user.name }}</div>
            </div>
            <div class="flex-grow-1">{{ user.description }}</div>
          </div>
        </v-card>

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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`users/${params.id}`)
    return {
      user: response.data,
    }
  },
  data() {
    return {
      user: null,
    }
  },
  computed: {
    snippets() {
      return this.user.snippets.data
    },
  },
}
</script>
