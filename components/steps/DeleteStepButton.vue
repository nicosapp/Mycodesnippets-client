<template>
  <v-btn class="mx-2" icon color="primary" @click="dialog">
    <v-icon dark> mdi-close-box </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    snippet: {
      required: true,
      type: Object,
    },
    currentStep: {
      required: true,
      type: Object,
    },
  },

  methods: {
    dialog() {
      this.$dialog.show({
        title: 'Delete',
        message: 'Do you really want to delete this step?',
        okFunction: () => {
          this.deleteStep()
        },
      })
    },

    async deleteStep() {
      try {
        await this.$axios.$delete(
          `snippets/${this.snippet.uuid}/steps/${this.currentStep.uuid}`
        )
        this.$notifier.success({ message: 'Step deleted!' })
        this.$emit('deleted', this.currentStep)
      } catch (e) {
        this.$notifier.error({
          message: 'Error when trying to delete your step',
        })
      }
    },
  },
}
</script>
