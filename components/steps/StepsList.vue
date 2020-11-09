<template>
  <div>
    <StepsNavigationShortcut class="mb-4" />
    <div>
      <div class="d-flex align-items">
        <h2>
          <v-btn icon @click="open = !open">
            <v-icon class="mr-2">mdi-table-of-contents</v-icon>
          </v-btn>
          Steps
        </h2>
        <v-spacer></v-spacer>
        <template v-if="editor">
          <v-btn icon :disabled="!previousStep" @click="swapTo('previous')">
            <v-icon>mdi-arrow-up-bold-box</v-icon>
          </v-btn>
          <v-btn icon :disabled="!nextStep" @click="swapTo('next')">
            <v-icon>mdi-arrow-down-bold-box</v-icon>
          </v-btn>
        </template>
      </div>
      <v-slide-x-transition>
        <div v-if="open" class="d-flex">
          <div class="flex-grow-1">
            <ul style="list-style: none">
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
                  :class="{
                    'font-weight-bold': currentStep.uuid === step.uuid,
                  }"
                >
                  {{ index + 1 }}. {{ step.title || 'Untitled step' }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </v-slide-x-transition>
    </div>
  </div>
</template>

<script>
import browseSnippet from '@/mixins/snippets/snippet'

export default {
  mixins: [browseSnippet],
  props: {
    editor: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: true,
    }
  },
  methods: {
    swapTo(direction) {
      const adjacentStep = this[`${direction}Step`]
      const order = adjacentStep.order

      this.$axios.$patch(`steps/${adjacentStep.uuid}`, {
        order: this.currentStep.order,
      })
      this.updateStepProperty({
        step: adjacentStep,
        key: 'order',
        value: this.currentStep.order,
      })
      this.changeStepProperty('order', order)
    },
  },
}
</script>
