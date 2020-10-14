<template>
  <v-btn class="mx-2" icon :color="color" @click="deleteSnippet">
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    snippet: {
      required: true,
      type: Object,
    },
    color: {
      required: false,
      default: null,
      type: String,
    },
  },

  methods: {
    async deleteSnippet() {
      await this.$axios.$delete(`snippets/${this.snippet.uuid}`)
      this.notifier.success({ message: 'Snippet deleted!' })
      this.$emit('deleted', this.currentStep)
    },
  },
}
</script>
