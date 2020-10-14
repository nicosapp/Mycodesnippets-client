<template>
  <v-app-bar :clipped-left="false" fixed app>
    <v-btn v-if="!$auth.loggedIn" icon nuxt to="/search">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-spacer />
    <v-img
      class="mr-3"
      max-height="60px"
      max-width="60px"
      :aspect-ratio="1"
      :src="require('~/assets/logo.svg')"
    ></v-img>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />

    <SignOutButton v-if="$auth.loggedIn && page === 'account'" />
    <v-btn v-if="!$auth.loggedIn" icon nuxt to="/auth/signin">
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import SignOutButton from '@/components/layout/SignOutButton'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    SignOutButton,
  },
  props: {
    page: {
      required: false,
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      drawerLeft: 'drawerLeft/value',
    }),
    logo() {
      return '~/assets/logo.svg'
    },
    title() {
      switch (this.page) {
        case 'account':
          return 'Your profile'
        default:
          return 'MyCodeSnippets'
      }
    },
  },
  methods: {
    ...mapActions({
      setDrawerLeft: 'drawerLeft/setValue',
    }),
    toggleLeft() {
      this.setDrawerLeft(!this.drawerLeft)
    },
  },
}
</script>
