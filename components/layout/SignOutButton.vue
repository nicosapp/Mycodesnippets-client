<template>
  <v-btn icon @click="signOut"> <v-icon>mdi-logout-variant</v-icon></v-btn>
</template>

<script>
export default {
  methods: {
    async signOut() {
      await this.$auth.logout()
      this.$router.replace({ name: 'index' })
    },
  },
}
</script>
