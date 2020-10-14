<template>
  <v-btn v-if="visible" @click="click">
    <v-icon class="mr-2">mdi-download</v-icon>
    Load more
  </v-btn>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click(e) {
      this.$emit('click', e)
    },
  },
}
</script>
