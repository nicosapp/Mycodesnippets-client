<template>
  <v-navigation-drawer v-model="open" :right="true" temporary fixed>
    <v-list>
      <v-list-item @click.native="right = !right">
        <v-list-item-action>
          <v-icon light> mdi-repeat </v-icon>
        </v-list-item-action>
        <v-list-item-title>Switch drawer (click me)</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    open: {
      required: true,
      type: Boolean,
    },
  },
}
</script>
