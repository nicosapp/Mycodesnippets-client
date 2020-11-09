<template>
  <div>
    <h2 class="mb-4">Publishing</h2>
    <div class="mb-4">
      <v-checkbox
        :value="snippet.is_public"
        label="Make this snippet public"
        color="primary"
        class="flex-grow-1 mt-0"
        hide-details
        @change="changeSnippetProperty('is_public', $event)"
      ></v-checkbox>
    </div>
    <div class="mb-4">
      <v-textarea
        id="description"
        :value="snippet.description"
        name="description"
        counter="400"
        filled
        label="Description"
        @change="changeSnippetProperty('description', $event)"
      ></v-textarea>
    </div>
    <div class="text-center mb-4">
      <SnippetImageUpload />
    </div>
  </div>
</template>
<script>
import browseSnippet from '@/mixins/snippets/snippet'

import SnippetImageUpload from './SnippetImageUpload'
export default {
  components: {
    SnippetImageUpload,
  },

  mixins: [browseSnippet],
}
</script>
