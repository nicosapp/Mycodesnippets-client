<template>
  <div class="d-flex justify-center align-center" :style="`height: ${height}`">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      required: false,
      default: '200px',
    },
  },
}
</script>
