<template>
  <v-chip class="mr-2" ripple :color="color" :outlined="!value" @click="click">
    <slot />
  </v-chip>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    color() {
      return this.value ? 'primary' : null
    },
  },
  methods: {
    click() {
      this.$emit('input', !this.value)
    },
  },
}
</script>
