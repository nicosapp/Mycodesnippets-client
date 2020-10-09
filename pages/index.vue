<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      HELLO
      {{ $auth.user }}
      <p>This is some random text to check if it works</p>
      <template v-if="$auth.user"><SignOutButton /></template>
      <template v-else
        ><nuxt-link to="/auth/signin">Sign in</nuxt-link></template
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
