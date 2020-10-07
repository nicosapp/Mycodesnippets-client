<template>
  <v-app-bar :clipped-left="clipped" fixed app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <v-btn icon @click.stop="clipped = !clipped">
      <v-icon>mdi-application</v-icon>
    </v-btn>
    <v-btn icon @click.stop="fixed = !fixed">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn> -->
    <SignOutButton v-if="$auth.loggedIn" />
    <v-btn v-else icon nuxt to="/auth/signin">
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import SignOutButton from '@/components/global/SignOutButton'
export default {
  components: {
    SignOutButton,
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      miniVariant: false,
      rightDrawer: false,
      title: 'MyCodeSnippets',
    }
  },
}
</script>
