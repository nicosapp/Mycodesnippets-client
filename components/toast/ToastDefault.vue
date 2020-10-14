<template>
  <v-snackbar v-model="visible" centered top :color="color" :text="text">
    <div v-if="title" class="mb-2 text-subtitle-2">
      {{ title }}
    </div>
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn icon :color="color" text v-bind="attrs" @click="visible = false">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import taostHelper from '@/mixins/helper/toastHelper'

export default {
  mixins: [taostHelper],
}
</script>
