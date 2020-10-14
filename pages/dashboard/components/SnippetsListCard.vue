<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <div
        v-if="snippets.length === 0"
        class="d-flex justify-center align-center"
        style="min-height: 150px"
      >
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <v-list v-else dense class="pt-0">
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="snippet in snippets"
            :key="snippet.uuid"
            :to="{ name: 'snippets-id', params: { id: snippet.uuid } }"
          >
            <v-list-item-icon>
              <v-icon>mdi-code-tags</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ snippet.title || 'Untitled snippet' }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Contains {{ snippet.steps_count }} steps
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Snippets list',
    },
    url: {
      type: String,
      required: false,
      default: 'dashboard/lastUpdated',
    },
  },
  data() {
    return {
      snippets: [],
      item: null,
    }
  },
  async mounted() {
    const response = await this.$axios.get(this.url)
    this.snippets = response.data.data
  },
}
</script>
