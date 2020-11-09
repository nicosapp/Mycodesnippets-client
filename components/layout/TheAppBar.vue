<template>
  <AppBarTemplate>
    <template v-slot:left>
      <v-btn v-if="!$auth.loggedIn && isHomePage" icon nuxt to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn v-if="isSigninPage" :to="{ name: 'index' }" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </template>
    <template v-slot:middle>
      <v-img
        class="mr-3"
        max-height="60px"
        max-width="60px"
        :aspect-ratio="1"
        :src="require('~/assets/logo.svg')"
      ></v-img>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </template>
    <!-- MIDDLE -->
    <template v-slot:right>
      <SignOutButton v-if="$auth.loggedIn && isAccountPage" />
      <v-btn v-if="!$auth.loggedIn && isHomePage" icon nuxt to="/auth/signin">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </template>
  </AppBarTemplate>
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
    isSigninPage() {
      return this.$route.path.indexOf('signin') > 0
    },
    isAccountPage() {
      return this.$route.path.indexOf('account') > 0
    },
    isHomePage() {
      return this.$route.path.length === 1
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
