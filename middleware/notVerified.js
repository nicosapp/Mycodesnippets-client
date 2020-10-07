export default function ({ app, redirect, route }) {
  if (!app.$auth.loggedIn || !app.$auth.user.verified) {
    return redirect({
      name: 'auth-email',
    })
  }
}
