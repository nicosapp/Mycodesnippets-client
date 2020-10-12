<template>
  <v-card>
    <v-img
      src=""
      :aspect-ratio="16 / 9"
      class="white--text align-end grey lighten-2"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title v-text="title"></v-card-title>
    </v-img>
    <v-card-subtitle
      >Listen to your favorite artists and albums whenever and wherever, online
      and offline.</v-card-subtitle
    >
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon @click.prevent="view">
        <v-icon>mdi-eye</v-icon>
      </v-btn>

      <v-btn icon @click.prevent="edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
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
    url() {
      return this.snippet.cover ? this.snippet.cover.thumbnailUrl : 'null'
    },
    description() {
      return ''
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
