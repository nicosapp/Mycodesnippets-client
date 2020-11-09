<template>
  <v-card>
    <v-img
      :src="thumbnailUrl"
      :aspect-ratio="16 / 9"
      class="white--text align-end grey lighten-2"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title v-text="title"></v-card-title>
    </v-img>
    <v-card-subtitle>
      {{ description }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text> {{ snippet.steps_count }} Steps </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon @click.prevent="view">
        <v-icon>mdi-eye</v-icon>
      </v-btn>

      <v-btn v-if="canEdit" icon @click.prevent="edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <DeleteSnippetButton
        v-if="canEdit"
        :snippet="snippet"
        icon
        @deleted="$emit('snippet-deleted', snippet)"
      >
        <v-icon>mdi-delete</v-icon>
      </DeleteSnippetButton>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    snippet: {
      required: true,
      type: Object,
    },
  },
  computed: {
    title() {
      return this.snippet.title || 'Untitled snippet'
    },
    thumbnailUrl() {
      return this.snippet.cover ? this.snippet.cover.url : 'null'
    },
    description() {
      return this.snippet.description || ''
    },
    canEdit() {
      return (
        this.$auth.loggedIn &&
        this.snippet.author &&
        this.snippet.author.id === this.$auth.user.id
      )
    },
  },
  methods: {
    view() {
      this.$router.push({
        name: 'snippets-id',
        params: { id: this.snippet.uuid },
      })
    },
    edit() {
      this.$router.push({
        name: 'snippets-id-edit',
        params: { id: this.snippet.uuid },
      })
    },
  },
}
</script>
