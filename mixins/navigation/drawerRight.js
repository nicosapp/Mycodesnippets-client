import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      drawerRight: 'drawerRight/value',
    }),
    drawerRightOpen: {
      get() {
        return this.drawerRight
      },
      set(drawerRight) {
        return this.setDrawerRight(drawerRight)
      },
    },
  },
  methods: {
    ...mapActions({
      setDrawerRight: 'drawerRight/setValue',
    }),
    toggleDrawerRight() {
      this.setDrawerRight(!this.drawerRight)
    },
  },
}
