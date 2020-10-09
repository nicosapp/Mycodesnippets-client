<template>
  <v-app-bar class="px-md-6" :height="72" :clipped-left="false" fixed app>
    <!-- <v-app-bar-nav-icon @click.stop="toggleLeft" /> -->
    <!-- <v-toolbar-title v-text="title" /> -->
    <v-btn icon>
      <v-icon>mdi-close-box</v-icon>
    </v-btn>
    <v-spacer />
    <v-text-field
      v-model="snippet.title"
      hide-details="auto"
      placeholder="Snippet title"
      filled
      clearable
      class="flex-grow-1"
      clear-icon="mdi-close-circle"
    ></v-text-field>
    <v-spacer />
    <v-btn icon @click.stop="rightDrawer = !rightDrawer">
      <!-- <v-icon>mdi-table-of-contents</v-icon> -->
      <v-icon>mdi-eye</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      title: 'Editor',
      snippet: { title: 'Un test' },
    }
  },
  computed: {
    ...mapGetters({
      drawerRight: 'drawerRight/value',
    }),
  },
  methods: {
    ...mapActions({
      setDrawerRight: 'drawerRight/setValue',
    }),
    toggleLeft() {
      this.setDrawerRight(!this.drawerRight)
    },
  },
}
</script>
