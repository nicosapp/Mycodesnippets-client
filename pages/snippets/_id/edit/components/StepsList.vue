<template>
  <div>
    <div>
      <h2 class="mb-4">
        <v-icon class="mr-2">mdi-table-of-contents</v-icon>Steps
      </h2>
      <div class="d-flex">
        <div class="flex-grow-1">
          <ul style="list-style: none" class="mb-8">
            <li
              v-for="(step, index) in orderedStepsAsc"
              :key="step.uuid"
              class="mb-1"
            >
              <nuxt-link
                :to="{
                  query: {
                    step: step.uuid,
                  },
                }"
                class="text-decoration-none"
                :class="{ 'font-weight-bold': currentStep.uuid === step.uuid }"
              >
                {{ index + 1 }}. {{ step.title || 'Untitled step' }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="d-flex flex-column justify-space-between">
          <v-btn icon :disabled="!previousStep" @click="swapTo('previous')">
            <v-icon>mdi-arrow-up-bold-box</v-icon>
          </v-btn>
          <v-btn icon :disabled="!nextStep" @click="swapTo('next')">
            <v-icon>mdi-arrow-down-bold-box</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="d-none d-md-block">
      Use <span class="grey lighten-2 px-2 py-1 rounded">Ctrl</span> +
      <span class="grey lighten-2 px-2 py-1 rounded">Shift</span> +
      <span class="grey lighten-2 px-2 py-1 rounded">left or right</span>
      on your keyboard to navigate between steps
    </div>
  </div>
</template>

<script>
import browseSnippet from '@/mixins/snippets/snippet'

export default {
  mixins: [browseSnippet],
  methods: {
    swapTo(direction) {
      const adjacentStep = this[`${direction}Step`]
      const order = adjacentStep.order

      this.$axios.$patch(`steps/${adjacentStep.uuid}`, {
        order: this.currentStep.order,
      })
      this.updateStepValue({
        step: adjacentStep,
        key: 'order',
        value: this.currentStep.order,
      })
      this.changeStepValue('order', order)
    },
  },
}
</script>
