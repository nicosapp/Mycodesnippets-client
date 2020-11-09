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
