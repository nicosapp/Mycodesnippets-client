<template>
  <v-btn class="mx-2" icon color="primary" @click="deleteStep">
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
    async deleteStep() {
      await this.$axios.$delete(
        `snippets/${this.snippet.uuid}/steps/${this.currentStep.uuid}`
      )
      this.$emit('deleted', this.currentStep)
    },
  },
}
</script>
