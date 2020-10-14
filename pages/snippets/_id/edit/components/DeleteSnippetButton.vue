<template>
  <v-btn class="mx-2" icon :color="color" @click="dialog">
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
    dialog() {
      this.$dialog.show({
        title: 'Delete',
        message: 'Do you really want to delete this snippet?',
        okFunction: () => {
          this.deleteSnippet()
        },
      })
    },
    async deleteSnippet() {
      try {
        await this.$axios.$delete(`snippets/${this.snippet.uuid}`)
        this.$notifier.success({ message: 'Snippet deleted!' })
        this.$emit('deleted', this.snippet)
      } catch (e) {
        this.$notifier.error({
          message: 'Error when trying to delete your snippet',
        })
      }
    },
  },
}
</script>
