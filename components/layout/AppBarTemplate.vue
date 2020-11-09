<template>
  <v-app-bar :clipped-left="false" fixed app>
    <v-row class="mx-n2" align="center">
      <v-col cols="2">
        <slot name="left" />
      </v-col>
      <v-col cols="8" class="d-flex justify-center align-center">
        <slot name="middle" />
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <slot name="right" />
      </v-col>
    </v-row>
  </v-app-bar>
</template>
