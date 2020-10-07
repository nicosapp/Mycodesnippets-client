<template>
  <v-app dark>
    <!-- <TheNavigationDrawerLeft /> -->
    <TheAppBar />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <TheBottomBar />
    <!-- <TheNavigationDrawerRight :open="rightDrawer" /> -->
  </v-app>
</template>
