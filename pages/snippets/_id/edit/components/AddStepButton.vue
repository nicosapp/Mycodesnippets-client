<template>
  <v-btn
    :disabled="!currentStep"
    class="mx-2"
    icon
    color="primary"
    @click="addStep"
  >
    <v-icon dark> mdi-plus-box </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    snippet: {
      required: false,
      type: Object,
      default: null,
    },
    currentStep: {
      required: false,
      type: Object,
      default: null,
    },
  },
  methods: {
    async addStep() {
      try {
        const response = await this.$axios.$post(
          `snippets/${this.snippet.uuid}/steps`,
          {
            after: this.currentStep.uuid,
          }
        )
        this.$emit('added', response.data)
      } catch (e) {}
    },
  },
}
</script>
