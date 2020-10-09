import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      drawerLeft: 'drawerLeft/value',
    }),
    drawerLeftOpen: {
      get() {
        return this.drawerLeft
      },
      set(drawerLeft) {
        return this.setDrawerLeft(drawerLeft)
      },
    },
  },
  methods: {
    ...mapActions({
      setDrawerLeft: 'drawerLeft/setValue',
    }),
    toggleDrawerLeft() {
      this.setDrawerLeft(!this.drawerLeft)
    },
  },
}
