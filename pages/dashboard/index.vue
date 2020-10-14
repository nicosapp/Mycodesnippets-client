<template>
  <div>Dashboard</div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch('bottomBar/setActive', 'dashboard')
  },
}
</script>
