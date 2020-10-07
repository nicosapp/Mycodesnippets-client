<template>
  <v-btn
    nuxt
    :to="
      step
        ? {
            query: {
              step: step.uuid,
            },
          }
        : {}
    "
    class="mx-2"
    :disabled="!step"
    icon
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    step: {
      required: false,
      type: Object,
      default: null,
    },
  },
}
</script>
