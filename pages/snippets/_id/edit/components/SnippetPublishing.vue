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
        @change="changeSnippetValue('is_public', $event)"
      ></v-checkbox>
    </div>
  </div>
</template>
<script>
import browseSnippet from '@/mixins/snippets/snippet'
export default {
  mixins: [browseSnippet],
}
</script>
