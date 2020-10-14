export default {
  methods: {
    updateUserProperty(key, value) {
      const updatedUser = { ...this.$auth.user }
      updatedUser[key] = value
      this.$auth.setUser(updatedUser)
    },
  },
}
