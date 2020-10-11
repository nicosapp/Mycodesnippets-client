<template>
  <div>
    <div>{{ orderedStepsAsc }}</div>
    <div>{{ currentStep }}</div>
  </div>
</template>

<script>
import browseSnippet from '@/mixins/snippets/snippet'

export default {
  mixins: [browseSnippet],
  mounted() {
    this.getSnippet(this.$route.params.id)
  },
}
</script>
