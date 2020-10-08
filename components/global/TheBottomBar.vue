<template>
  <div>
    <v-bottom-navigation :value="value" grow horizontal app color="primary">
      <v-btn nuxt to="/" @click="value = 1">
        <span class="d-none d-md-inline">Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn nuxt to="/search" @click="value = 2">
        <span class="d-none d-md-inline">Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn @click="createSnippet">
        <span class="d-none d-md-inline">Create</span>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn nuxt to="/" @click="value = 4">
        <span class="d-none d-md-inline">Browse</span>
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn>

      <v-btn nuxt to="/search" @click="value = 5">
        <span class="d-none d-md-inline">Account</span>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!-- <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-subheader>Open in</v-subheader>
        <v-list-item
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >
          <v-list-item-icon>
            <v-icon>{{ tile.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '1',
      sheet: false,
    }
  },

  methods: {
    async createSnippet() {
      const snippet = await this.$axios.$post('api/snippets')
      this.value = 3
      this.$router.push({
        name: 'snippets-id-edit',
        params: { id: snippet.data.uuid },
      })
    },
  },
}
</script>
