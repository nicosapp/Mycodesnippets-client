<template>
  <v-app dark>
    <TheAppBar page="account" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <TheBottomBar v-if="$auth.loggedIn" />
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
