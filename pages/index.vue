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
  async asyncData({ app }) {
    try {
      const response = await app.$axios.get('snippets')
      return {
        snippets: response.data.data,
      }
    } catch (e) {}
  },
  data() {
    return {
      snippets: [],
    }
  },
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
