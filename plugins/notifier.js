export default ({ app, store }, inject) => {
  inject('notifier', {
    show(payload) {
      store.dispatch('toast/showMessage', payload)
    },
    error(payload) {
      const config = { color: 'error', text: true }
      payload = { ...payload, ...config }
      store.dispatch('toast/showMessage', payload)
    },
    error500() {
      const config = { color: 'error', text: true, message: 'Server error :(' }
      store.dispatch('toast/showMessage', config)
    },
    success(payload) {
      const config = { color: 'success', text: true }
      payload = { ...payload, ...config }
      store.dispatch('toast/showMessage', payload)
    },
    warn(payload) {
      const config = { color: 'warning', text: true }
      payload = { ...payload, ...config }
      store.dispatch('toast/showMessage', payload)
    },
    info(payload) {
      const config = { color: 'info', text: true }
      payload = { ...payload, ...config }
      store.dispatch('toast/showMessage', payload)
    },
  })
}
