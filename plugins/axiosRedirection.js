export default function ({ $axios, redirect, app, store }) {
  $axios.onError((error) => {
    // console.log(error)
    if (error.response && error.response.status === 401) {
      console.log(error)
      redirect('/auth/signin')
      // app.notifyError({ title: 'Server error', text: 'There is a server internal error' })
    }
    if (error.response && error.response.status === 500) {
      // redirect('/sorry')
      // app.notifyError({ title: 'Server error', text: 'There is a server internal error' })
    }
  })
}
