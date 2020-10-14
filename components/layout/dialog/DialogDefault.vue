<template>
  <v-dialog v-model="visible" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn color="primary" text @click="ok()">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import dialogHelper from '@/mixins/helper/dialogHelper'

export default {
  mixins: [dialogHelper],
  methods: {
    ok() {
      this.visible = false
      if (this.okFunction) this.okFunction()
    },
    cancel() {
      this.visible = false
      if (this.cancelFunction) this.cancelFunction()
    },
  },
}
</script>
