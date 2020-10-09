<template>
  <div>
    <div>
      <h2 class="mb-4">
        <v-icon class="mr-2">mdi-table-of-contents</v-icon>Steps
      </h2>
      <ul style="list-style: none" class="mb-8">
        <li v-for="(step, index) in steps" :key="step.uuid" class="mb-1">
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
    <div class="d-none d-md-block">
      Use <span class="grey lighten-2 px-2 py-1 rounded">Ctrl</span> +
      <span class="grey lighten-2 px-2 py-1 rounded">Shift</span> +
      <span class="grey lighten-2 px-2 py-1 rounded">left or right</span>
      on your keyboard to navigate between steps
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      required: true,
      type: Array,
    },
    currentStep: {
      required: true,
      type: Object,
    },
  },
}
</script>
