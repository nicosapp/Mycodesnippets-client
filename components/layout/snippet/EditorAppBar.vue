<template>
  <AppBarTemplate>
    <template v-slot:left>
      <DeleteSnippetButton :snippet="snippet" @deleted="handleSnippetDeleted">
        <v-icon>mdi-close-box</v-icon>
      </DeleteSnippetButton>
    </template>
    <template v-slot:middle>
      <v-text-field
        :value="snippet.title"
        hide-details="auto"
        placeholder="Snippet title"
        filled
        :dense="$vuetify.breakpoint.mobile"
        clearable
        :append-icon="icon"
        :color="color"
        class="flex-grow-1"
        clear-icon="mdi-close-circle"
        @input="changeSnippetProperty('title', $event)"
      ></v-text-field>
    </template>
    <template v-slot:right>
      <v-btn
        icon
        :to="{
          name: 'snippets-id',
          params: { id: $route.params.id },
          query: { step: currentStep.uuid },
        }"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
  </AppBarTemplate>
</template>

<script>
import browseSnippet from '@/mixins/snippets/snippet'
export default {
  mixins: [browseSnippet],
  data() {
    return {}
  },
  computed: {
    icon() {
      return this.validationSnippet.title ? 'mdi-close-thick' : 'mdi-check-bold'
    },
    color() {
      return this.validationSnippet.title ? 'error' : 'success'
    },
  },
  methods: {
    handleSnippetDeleted() {
      this.$router.push({ name: 'search' })
    },
  },
}
</script>
