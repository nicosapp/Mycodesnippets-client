<template>
  <v-app-bar class="px-md-6" :height="72" :clipped-left="false" fixed app>
    <v-btn icon @click.prevent="deleteSnippet">
      <v-icon>mdi-close-box</v-icon>
    </v-btn>
    <v-spacer />
    <v-text-field
      :value="snippet.title"
      hide-details="auto"
      placeholder="Snippet title"
      filled
      clearable
      class="flex-grow-1"
      clear-icon="mdi-close-circle"
      @input="changeSnippetValue('title', $event)"
    ></v-text-field>
    <v-spacer />
    <v-btn
      icon
      :to="{
        name: 'snippets-id',
        params: { id: this.$route.params.id },
        query: { step: currentStep.uuid },
      }"
    >
      <v-icon>mdi-eye</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import browseSnippet from '@/mixins/snippets/snippet'
export default {
  mixins: [browseSnippet],
  data() {
    return {}
  },
  methods: {
    deleteSnippet() {},
  },
}
</script>
