<template>
  <v-app-bar class="px-md-6" :height="72" :clipped-left="false" fixed app>
    <v-spacer />
    <v-img
      class="mr-3"
      max-height="60px"
      max-width="60px"
      :aspect-ratio="1"
      :src="require('~/assets/logo.svg')"
    ></v-img>
    <v-toolbar-title v-text="'MyCodeSnippet'" />
    <v-spacer />
    <v-btn
      icon
      nuxt
      :to="{
        name: 'snippets-id-edit',
        params: { id: snippet.uuid },
        query: { step: currentStep.uuid },
      }"
    >
      <v-icon dark> mdi-square-edit-outline </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import browseSnippet from '@/mixins/snippets/snippet'
export default {
  mixins: [browseSnippet],
}
</script>
