<template>
  <v-app-bar :clipped-left="false" fixed app>
    <!-- <v-app-bar-nav-icon @click.stop="toggleLeft" /> -->
    <v-btn v-if="!$auth.loggedIn" icon nuxt to="/search">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-spacer />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn> -->
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
