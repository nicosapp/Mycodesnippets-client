export default ({ app, store }, inject) => {
  inject('dialog', {
    show(payload) {
      store.dispatch('dialog/showDialog', payload)
    },
  })
}
