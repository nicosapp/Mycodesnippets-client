<template>
  <div>
    <v-bottom-navigation :value="value" grow horizontal app color="primary">
      <v-btn nuxt to="/" @click="value = 3">
        <span>Home</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn @click="createSnippet">
        <span>Create</span>

        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn nuxt to="/search" @click="value = 3">
        <span>Search</span>

        <v-icon>mdi-magnify</v-icon>
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
      tiles: [
        { icon: 'mdi-history', title: 'Snippets' },
        { icon: 'mdi-map-marker', title: 'Tutorial' },
      ],
    }
  },

  methods: {
    async createSnippet() {
      const snippet = await this.$axios.$post('snippets')
      this.value = 2
      this.$router.push({
        name: 'snippets-id-edit',
        params: { id: snippet.data.uuid },
      })
    },
  },
}
</script>
