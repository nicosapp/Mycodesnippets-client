<template>
  <v-navigation-drawer v-model="drawer" fixed temporary app>
    Drawer left
    <TheFooter />
  </v-navigation-drawer>
</template>

<script>
import TheFooter from '@/components/global/TheFooter'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    TheFooter,
  },
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      value: 'drawerLeft/value',
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
      setDrawer: 'drawerLeft/setValue',
    }),
  },
}
</script>
