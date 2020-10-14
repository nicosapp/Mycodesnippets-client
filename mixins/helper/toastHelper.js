import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      component: 'toast/component',
      title: 'toast/title',
      message: 'toast/message',
      visibleValue: 'toast/visible',
      timeout: 'toast/timeout',
      color: 'toast/color',
      text: 'toast/text',
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
      setVisible: 'toast/setVisible',
    }),
  },
}
