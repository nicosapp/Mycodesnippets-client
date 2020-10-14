import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      component: 'dialog/component',
      title: 'dialog/title',
      message: 'dialog/message',
      visibleValue: 'dialog/visible',
      color: 'dialog/color',
      okFunction: 'dialog/okFunction',
    }),
    visible: {
      get() {
        return this.visibleValue
      },
      set(newValue) {
        this.setVisible(newValue)
      },
    },
  },
  methods: {
    ...mapActions({
      setVisible: 'dialog/setVisible',
    }),
  },
}
