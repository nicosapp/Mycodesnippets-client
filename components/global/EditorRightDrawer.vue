<template>
  <v-navigation-drawer v-model="drawer" :right="true" temporary fixed>
    Right Drawer
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      value: 'drawerRight/value',
    }),
    drawer: {
      get() {
        return this.value
      },
      set(drawer) {
        return this.setDrawer(drawer)
      },
    },
  },

  methods: {
    ...mapActions({
      setDrawer: 'drawerRight/setValue',
    }),
  },
}
</script>
