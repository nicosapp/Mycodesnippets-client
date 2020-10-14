<template>
  <v-app dark>
    <TheAppBar />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <TheBottomBar v-if="$auth.loggedIn" />
    <TheFixedComponents />
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
