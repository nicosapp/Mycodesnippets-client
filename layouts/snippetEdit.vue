<template>
  <v-app dark>
    <EditorAppBar />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <TheBottomBar />
    <EditorDrawerLeft />
    <EditorDrawerRight />
    <TheFixedComponents />
  </v-app>
</template>
